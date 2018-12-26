var express = require('express');
var router = express.Router();
let {Shop} = require('../model/models.js');
let db = require('../utils/database');



/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.redirect('/users/login');
// });

router.get('/create', function(req, res, next) {

    let sess = req.session;
    let user = sess.user;



    //if(checkSession(req)) {
        //recuperation des shops
        var retour = "";
        db.shop.getShop(0,3,function(err,rows) {
            if(err)
            {
                console.log(rows);
            }else{
                retour = "<div class='row'>";
                for (row of rows) {
                    var shop = new Shop(row.Name);
                    retour+=shop.getShopView();
                    retour+="</div><div class='row'>";
                }
                retour+="</div>";
                res.render('shops',{title:'PDS',user:user,shop : retour });
            }
        });

    // } else {
    //     console.log('not logged in');
    //     res.redirect('/users/login');
    // }

});

router.post('/create', function(req, res, next) {
    var shop = new Shop(req.body.name);
    if(shop.check()){
        db.shop.insert(shop, function (task) {
        });
    };
    res.redirect('/shops/create');
});


module.exports = router;
