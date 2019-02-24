var express = require('express');
var router = express.Router();
let {ShippingType} = require('../model/models.js');
let db = require('../utils/database');

//insert shipping type
router.get('/', function (req,res,next) {
    res.render('../views/shippingType', {title : 'Shipping types', user:{}});
});

router.post('/', function (req,res,next) {
    var name = req.body.name;
    var price = req.body.price;
    db.shippingType.insert(new ShippingType(0, name, price));
    res.redirect('/shippingType');
});
router.get('/search', function (req,res,next) {
   res.render('../views/searchShippingType', {title : 'Shipping types', user:{},result : "0"});
});
router.post('/search' ,function (req,res,next) {
    var name = req.body.name;
    db.shippingType.findByName(name, function(err,value) {
        if(err) {
            res.render('../views/searchShippingType', {title: 'Shipping types', user: {}, result: value})
        }else {
            retour = "";
            for(row of value)
            {
                retour+="Nom :"+row.Name+"; Price : "+row.Price+"<br>";
            }
            console.log(retour);
            res.render('../views/searchShippingType', {title: 'Shipping types', user: {} , result: retour})
        }
        });
})

module.exports = router;