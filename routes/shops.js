var express = require('express');
var router = express.Router();
let {Shop,ShopPlaces} = require('../model/models.js');
let db = require('../utils/database');

router.get('/test', function(req, res, next) {
    let sess = req.session;
    let user = sess.user;



});

router.get('/create', function(req, res, next) {

    let sess = req.session;
    let user = sess.user;


    const getShopWithoutShopPlaceRender = async function(cb){
        db.shop.searchAllShopWithoutShopPlace(function(err,rows) {
            if(err){
                console.log(rows);
            }else{
                var retour = "<table>" +
                    "<caption>Shop Without ShopPlace</caption>"+
                    "<th>shopId</th>" +
                    "<th>name</th>" +
                    "";
                for (row of rows) {
                    var shop = new Shop(row.id,row.Name);
                    retour+=shop.getShopView();
                }
                retour+="</table>";
                cb(retour);

            }
        });
    };

    const getShopWithShopPlaceRender = async function(cb){
        db.shop.searchAllShopWithShopPlace(function(err,tabobj1) {
            if(err){
                console.log(tabobj1);
            }else{
                shopPlacesModel.searchShopInformationById(tabobj1,function(err,tabobj2){
                    if(err){
                        console.log(tabobj2);
                    }else {

                        console.log(JSON.stringify(tabobj1));

                        for (var objjson1 in tabobj1) {
                            for (var objjson2 in tabobj2){
                                if(tabobj1[objjson1]['shopPlaceId']==tabobj2[objjson2]['id']){
                                    tabobj1[objjson1]['Surface'] = tabobj2[objjson2]['Surface'];
                                    tabobj1[objjson1]['Rent'] = tabobj2[objjson2]['Rent'];
                                }
                            }
                        }
                        var retour = "<table>" +
                            "<caption>Shop With ShopPlace</caption>"+
                            "<th>shopId</th>" +
                            "<th>name</th>" +
                            "<th>rent</th>" +
                            "<th>surface</th>" +
                            "<th>dissociate</th>" +

                            "";
                        for (var objjson1 in tabobj1) {
                            var shop = new Shop(tabobj1[objjson1]['id'],tabobj1[objjson1]['Name'],tabobj1[objjson1]['Rent'],tabobj1[objjson1]['Surface']);
                            retour+=shop.getShopCompleteView(tabobj1[objjson1]['id']);
                        }
                        retour+="</table>";
                        cb(retour);
                    }

                })
            }
        });

    };
    const getShopPlacesWhithoutShopRender = async function(cb) {

        db.shop.searchAllShopWithShopPlace(function (err, tabobj) {
            if (err) {
                console.log(tabobj1);
            } else {
                db.shopPlaces.searchAllShopPlacesWithoutShop(tabobj, function (err, tabobj2) {
                    var retour = "<table>" +
                        "<caption>ShopPlaces Without Shop</caption>"+
                        "<th>shopPlaceId</th>" +
                        "<th>rent</th>" +
                        "<th>surface</th>" +
                        "";

                    for (var objjson1 in tabobj2) {

                        var shopPlaces = new ShopPlaces(tabobj2[objjson1]['id'],tabobj2[objjson1]['Rent'],tabobj2[objjson1]['Surface']);
                        retour+=shopPlaces.getShopPlaceView();
                    }
                    retour+="</table>";
                    cb(retour);
                });
            }
        });
    };

    getShopWithoutShopPlaceRender(function(arg1){
        getShopWithShopPlaceRender(function(arg2){
            getShopPlacesWhithoutShopRender(function(arg3){
                res.render('shops',{title:'PDS',user:user,shopsWithShopPlace : arg2,shopsWithoutShopPlace: arg1,shopPlacesWithoutShop:arg3});
            })
        });
    });





});

router.post('/create/shop', function(req, res, next) {
    var shop = new Shop("",req.body.name,"","");
    db.shop.insert(shop);
    res.redirect('/shops/create');
});

router.post('/create/shopplace', function(req, res, next) {
    var shopPlace = new ShopPlaces("",req.body.surface,req.body.rent,"");
    db.shopPlaces.insert(shopPlace);
    res.redirect('/shops/create');
});

router.get('/create/dissociate', function(req, res, next) {
    var shop = new Shop(req.query.shopId);
    db.shop.deleteShopPlaceId(shop);
    res.redirect('/shops/create');
});


router.get('/search', function(req, res, next) {

    let sess = req.session;
    let user = sess.user;

    res.render('shopsSearch', {title: 'PDS', user: user, shop: ""});

});
router.get('/map',function(req,res,next) {
    res.render('shopMap', {title: 'PDS', user: null, shop: ""})
})
router.get('/map/:id',function(req,res,next) {
    db.shopPlaces.searchShopPlacesId(req.params.id,function(err,result) {
        if(!err) {
            //console.log(result);
            //res.render('shopMap', {title: 'PDS', user: null, shop: ""})
            res.json(JSON.stringify(result));
        }else
        {
            console.log(res);
        }
    });
});
router.get('/map/namePlaceId/:id',function(req,res,next){
    db.shop.searchByPlaceId(req.params.id, function(err,result) {
        if(!err) {
            //console.log(result);
            //res.render('shopMap', {title: 'PDS', user: null, shop: ""})
            console.log(JSON.stringify(result));
            res.json(JSON.stringify(result));
        }else
        {
            console.log(res);
        }
    })
})
router.get('/map2/number',function(req,res,next) {
   db.shopPlaces.getNumber(function(err,result) {
       if(!err) {
           res.json(JSON.stringify(result));
       }else
       {
           console.log(result);
       }
   })
});



router.post('/search', function(req, res, next) {

    let sess = req.session;
    let user = sess.user;

    var shop = new Shop(req.body.search);
    var retour = "";

    if(shop.check()){ //back-end control

        if (Number.isInteger(shop)){
            console.log("INTEGER")
            db.shop.searchShopId(shop, function (err, rows) {
                if(err) {
                    retour = "oops something wrong happened";
                    res.render('shopsSearch', {title: 'PDS', user: user,  shop: retour});
                }
                else {
                    for (r of rows) { //we loop in the the array return by the sql request
                        var s = new Shop(r.Name); //a new model is created with the name fetched
                        retour += s.getShopView(); //printing the name of the new model
                        retour+="<div class='row'></div>";
                    }
                    res.render('shopsSearch', {title: 'PDS', user: user,  shop: retour});
                }
            })
        } else if (typeof String(shop) == 'string') {
            db.shop.searchShopName(shop.getShopName(), function (err,rows) {
                if(err) {
                    retour = "oops something wrong happened";
                    res.render('shopsSearch', {title: 'PDS', user: user,  shop: retour});
                } else {
                    for (r of rows) { //we loop in the the array return by the sql request
                        var s = new Shop(r.Name); //a new model is created with the name fetched
                        retour += s.getShopView(); //printing the name of the new model
                        retour+="<div class='row'></div>";
                    }
                    res.render('shopsSearch', {title: 'PDS', user: user,  shop: retour});
                }
            })
        }
    };

});






module.exports = router;
