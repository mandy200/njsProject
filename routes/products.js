var express = require('express');
var router = express.Router();
let {Product, Size} = require('../model/models.js');
let db = require('../utils/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET product details page */
router.get('/detail', function(req, res, next) {
    return res.render('detail', {title: 'PDS', user:{}});
});

/* Search product*/
router.get('/search', function (req, res, next) {
    return res.render('searchproduct', {title: 'PDS', user:{}});
});

/*router.post('/search', function (req,res,next) {
    return res.render('searchproduct', {title:'PDS',user:{}});
});*/


// Search data by name
router.get('/searchByName/:name', function (req, res, next) {
    var { name } = req.params;

    db.product.searchName(name, function (err, product) {
        if (err) {
            console.log("err", err)
            return res.json(product)

        } else {
            console.log("product", product)

            return res.json(product)

        }
    });

});

// Search data by brand
router.get('/searchBrand/:brand', function (req, res, next) {
    var { brand } = req.params;

    db.product.searchBrand(brand, function (err, product) {
        if (err) {

            return res.json(product)

        } else {

            return res.json(product)

        }
    });

});

// Search all brands in order to display them in sidebar
router.get('/searchAllBrands', function (req, res, next) {

    db.product.searchAllBrands(function (err, product) {
        if (err) {

            return res.json(product)

        } else {

            return res.json(product)

        }
    });

});

// Search data by colour
router.get('/searchColour/:color', function (req, res, next) {
    var { color } = req.params;

    db.product.searchColour(color, function (err, product) {
        if (err) {
            return res.json(product)

        } else {

            return res.json(product)

        }
    });

});

//Search by category
router.get('/searchCat/:cate', function (req, res, next) {
    var { cate } = req.params;

    db.product.searchCat(cate, function (err, product) {
        if (err) {
            return res.json(product)

        } else {

            return res.json(product)

        }
    });

});


router.get('/searchMinPr/:minPr', function (req, res, next) {
    var { minPr } = req.params;

    db.product.searchMinPrice(minPr, function (err, product) {
        if (err) {
            res.json(product)

        } else {

            res.json(product)

        }
    });


});
router.get('/searchByPr/:maxPr', function (req, res, next) {
    var {maxPr} = req.params;
    if (maxPr === 'More-Than-1000') {
        db.product.searchByMoreMaxPrice(1000, function (err, product) {
            if (err) {
                res.json(product)

            } else {

                res.json(product)

            }
        });
    }
    else {
        db.product.searchMaxPrice(maxPr, function (err, product) {
            if (err) {
                res.json(product)

            } else {

                res.json(product)

            }
        });
    }
});


    /* insert product */
    router.post('/products', function (req, res, next) {
        //console.log(req.body);
        //if multiple input
        if (typeof req.body.name !== 'string') {
            for (var i = 0; i < req.body.name.length; i++) {
                var s = new Size();
                var p1 = new Product(req.body.name[i], req.body.desc[i], req.body.img[i], req.body.price[i], req.body.barcode[i], req.body.brand[i], req.body.colour[i], s, req.body.category[i]);
                db.product.insert(p1, function (task) {
                    //console.log(p1);
                });
            }
        } else {
            var s = new Size(req.body.weight, req.body.height, req.body.width, req.body.depth);
            var p2 = new Product(req.body.name, req.body.desc, req.body.img, req.body.price, req.body.barcode, req.body.brand, req.body.colour, s, req.body.category);
            db.product.insert(p2, function (task) {
                //console.log(p2);
            });
        }
        res.redirect('/products/products');
    })
    router.get('/product/:id', function (req, res, next) {
        let user = req.session.user;
        var id = req.params.id;
        if (id !== 'undefined') {
            db.product.get(id, function (err, product) {
                if (err) {
                    console.log("Error : " + product);
                    return res.render('product', {title: 'PDS', user: user, product: null});
                } else {
                    return res.render('product', {title: 'PDS', user: user, product: product.getProductView()});
                }
            });
        } else {
            res.redirect('/products/products');
        }
    });
    router.get('/products', function (req, res, next) {
        //if user is connected
        if (checkSession(req)) {
            //get product
            db.categoryProduct.getALL(function (err, categoryProducts) {
                if (err) {
                    console.log(categoryProducts)
                }
                else {
                    var retour = "";
                    db.product.getProduct(0, 4, function (err, rows) {
                        if (err) {
                            console.log(rows);
                        } else {
                            var compteur = 0;
                            var fin = true;
                            retour = "<div class='row'>";
                            for (row of rows) {
                                compteur++;
                                var s = new Size(row.weight, row.height, row.width, row.depth);
                                var produit = new Product(row.Name, row.Description, row.img, row.price, row.barcode, row.brand, row.colour, s);
                                retour += produit.getProductView();
                                if (compteur % 3 === 0) {
                                    retour += "</div><div class='row'>";
                                    fin = false;
                                }
                            }
                            if (!fin)
                                retour += "</div>";
                            res.render('products', {
                                title: 'PDS',
                                user: req.user,
                                products: retour,
                                categoryProduct: categoryProducts
                            });
                        }
                    });
                }
            });
        } else {
            console.log("NOTTTTLOOOOOOOGIN!");
            res.redirect('/users/login');
        }
    });

    function checkSession(req) {
        var session = req.session;
        if (session.user)
            return true
        else
            return false
}
module.exports = router;