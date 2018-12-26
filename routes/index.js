//FRONTOFFICE
var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/' , function(req,res,next) {
    res.send('Matthieu supprimme ton ajout Pierre et lois');
    //res.render('index', {title: 'PhyGIT Accueil',user:{}});
});
router.get('/register', function(req,res,next) {
    res.render('register', {title: 'PhyGIT Register',user:{}});
})
router.post('/register', function(req,res,next) {
    console.log(req.body.name);
    res.redirect('/users/login');
})




module.exports = router;
