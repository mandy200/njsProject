var express = require('express');
var router = express.Router();
let {Client,Product,Customer, Shop, ShippingType, Size} = require('../model/models.js');
let db = require('../utils/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/shop/create', function(req, res, next) {
    var shop = new Shop(req.body.name);
    db.shop.insert(shop, function (task) {
    });
    res.redirect('/users/shop/create');

});



/* insert product */
router.post('/products', function(req,res,next) {
    //console.log(req.body);
    if(typeof req.body.name !== 'string' ) {
        for (var i = 0; i < req.body.name.length; i++) {
            var s = new Size();
            var p1 = new Product(req.body.name[i], req.body.desc[i], req.body.img[i], req.body.price[i], req.body.barcode[i],s);
            db.product.insert(p1, function (task) {
                //console.log(p1);
            });
        }
    }else {
        var s = new Size(req.body.weight,req.body.height,req.body.width,req.body.depth);
        var p2 = new Product(req.body.name, req.body.desc, req.body.img, req.body.price, req.body.barcode,s);
        db.product.insert(p2, function (task) {
            //console.log(p2);
        });
    }
    res.redirect('/users/products');
})
router.get('/product/:id', function(req,res,next) {
    let user = req.session.user;
    var id = req.params.id;
    if(id !== 'undefined') {
        db.product.get(id, function (err, product) {
            if (err) {
                console.log("Error : " + product);
            } else {
                return res.render('product', {title: 'PDS', user: user, product: product.getProductView()});
            }
        });
    }else {
        res.redirect('/users/products');
    }
});
router.get('/products', function(req, res, next) {
    let sess = req.session;
    let user = sess.user;
    if(true) {
        //recuperation des produits
        var retour = "";
        db.product.getProduct(0,4,function(err,rows) {
            if(err)
            {
                console.log(rows);
            }else{
                var compteur =0;
                var fin = true;
                retour = "<div class='row'>";
                for (row of rows) {
                    compteur ++;
                    var s = new Size(row.weight,row.height,row.width,row.depth);
                    var produit = new Product(row.Name, row.Description, row.img, row.price, row.barcode, s);
                    retour+=produit.getProductView();
                    if(compteur%3===0){
                        retour+="</div><div class='row'>";
                        fin=false;
                    }
                }
                if(!fin)
                    retour+="</div>";
                res.render('products',{title:'PDS',user:user,products : retour});
            }
        });

    }else {
        res.redirect('/users/login');
    }
});

/* Customer Part */
/* Insert customer */
router.get('/customers', function(req,res,next) {
    let session = req.session;
    res.render('customers',{title:'Customer',user:req.session.user,result : {}});
    console.log("Manual insert (customer) GET method");
    //var c2 = new Customer("Toto","titi","3 rue de la paix","e@gmail.fr","0101010101","toto","pass","FALSE");
    //db.customer.insert(c2, function (task) {
    //    console.log(c2);
    //});
    res.redirect('/users/customers');
});

router.get('/customer/:id', function(req,res,next) {
    let user = req.session.user;
    var id = req.params.id;
    if(id !== undefined) {
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
    var newCustomer = new Customer(req.body.firstName,req.body.lastName,req.body.birthday,req.body.gender,req.body.address,req.body.email,req.body.phone,req.body.login,req.body.password,req.body.newsletter,req.body.position);
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

router.get('/login', function(req,res,next) {
    let session = req.session;
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
