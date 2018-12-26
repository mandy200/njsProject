var express = require('express');
var router = express.Router();
let {Product,Customer, ShippingType, Size} = require('../model/models.js');
let db = require('../utils/database');



/* Customer Part */
/* Insert customer */
router.get('/customers', function(req,res,next) {
    let session = req.session;
    res.render('customers',{title:'Customer',user:req.session.user});
    console.log("Manual insert (customer) GET method");
    //var c2 = new Customer("Toto","titi","3 rue de la paix","e@gmail.fr","0101010101","toto","pass","FALSE");
    //db.customer.insert(c2, function (task) {
    //    console.log(c2);
    //});
    res.redirect('/users/customers');
});

router.get('/customer/:id', function(req,res,next) {
    var id = req.params.id;
    if(id !== 'undefined') {
        Customer.get(id, function (err, customer) {
            if (err) {
                console.log("Error : " + customer);
            } else {
                return res.render('customer', {title: 'PDS', user: user, customer: customer.getCustomerView()});
            }
        });
    }else {
        res.redirect('/users/customer');
    }
});

//Insert new customer
router.post('/customers', function(req, res, next) {
    let sess = req.session;
    console.log("Insert customer (POST) method with regex check");
    var newCustomer = new Customer(req.body.firstName,req.body.lastName,req.body.address,req.body.email,req.body.phone,req.body.login,req.body.password,req.body.newsletter);
    var resultCheckCustomer = newCustomer.checkCustomer(newCustomer);
    if (resultCheckCustomer.length == 0)
    {
        db.customer.insert(newCustomer, function (task) {
            console.log(newCustomer);
        });
        res.redirect('/users/login');
    }else{
        res.render('../views/error',{title : 'Error',message: resultCheckCustomer});
    }
});

//insert shipping type
router.get('/shippingType', function (req,res,next) {
    res.render('../views/shippingType', {title : 'Shipping types', user:{}});
});

router.post('/shippingType', function (req,res,next) {
    var name = req.body.name;
    var price = req.body.price;
    db.shippingType.insert(new ShippingType(0, name, price));
    res.redirect('/users/shippingType');
});

router.get('/login', function(req,res,next) {
    let session = req.session;
    session.login = req.body.login;
    res.render('login',{title:'PDS',user:req.session.user});
});
router.post('/login', function (req,res,next) {
    sess = req.session;
    sess.user = "blalblabl";
    res.redirect('/products/products');
});
function checkSession(req)
{
    var session = req.session;
    if(session.user)
        return true
    else
        return false
}

module.exports = router;
