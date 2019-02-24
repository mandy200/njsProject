var express = require('express');
var router = express.Router();
let {Customer} = require('../model/models.js');
let db = require('../utils/database');


router.post('/search', function(req, res, next){
    let sess = req.session;
    let value =  req.body.customerSearch;
    console.log('Valeur  : ' + value);
    //ajout du callback
    if (Customer.checkingSearch(value)){
        res.render('../views/searchCustomer', {title : 'Search Customer', user:{},result:value});
    }else {
        db.customer.searchCustomer(value, function (error, value) {
            if (error) {
                console.log(value);
                value ="null"
                res.render('../views/searchCustomer', {title: 'Search Customer', user: {}, result: value});
            } else {
                //affichage du resultat
                console.log(value);
                res.render('../views/searchCustomer', {
                    title: 'Search Customer',
                    user: {},
                    result: value
                });
            }
        });
    }
    //res.redirect('../views/searchCustomer');

});

//search Customer

router.get('/search', function(req, res, next){

    var newURL = req.url;
    var regex = new RegExp('nom');
    var query = "";
    var count ="";



    //ajout du callback
    if (!newURL.match(regex)) {
        res.render('../views/searchCustomer', {title: 'Search Customer', user: {}, result: query});
    } else {

        let sess = req.session;
        let first = req.query.prenom;
        let eFirst = req.query.prenomExact;
        let last = req.query.nom;
        let eLast = req.query.nomEcart;
        let gender = req.query.gender;
        let mail = req.query.email;
        let eMail = req.query.emailExact;
        let phone = req.query.phone;
        let ePhone = req.query.phoneExact;
        let login = req.query.login;
        let eLogin = req.query.eLogin;
        let news = req.query.newsletter;
        let pos = req.query.position;
        let rBday = req.query.birthdayInf;
        let lBday = req.query.birthdaySup;
        let rNum = req.query.numInf;
        let lNum = req.query.numSup;
        let prof = req.query.profile;

        console.log(prof);

        if (lBday == undefined || (lBday == '' && rBday =='') || rBday == undefined) {
            query = query;
        } else if (lBday != '' && rBday=='') {
            query = query + "AND customers.\"Birthday\" < '" + lBday + "'";
        } else if (lBday == ''  && rBday !='') {
            query = query + "AND customers.\"Birthday\" > '" + rBday + "'";
        } else if (lBday != ''  && rBday !=''){
            query = query + "AND customers.\"Birthday\" between '" + rBday + "' AND '" + lBday + "'";
        }

        if (lNum == undefined || (lNum == '' && rNum =='') || rNum == undefined) {
            count = count;
        } else if (lNum != '' && rNum=='') {
            count = "HAVING count(orders.\"IdClient\") <'" + lNum + "'";
        } else if (lNum == ''  && rNum !='') {
            count = "HAVING count(orders.\"IdClient\") >'" + rNum + "'";
        } else if (lNum != ''  && rNum !=''){
            count = "HAVING count(orders.\"IdClient\") between'" + rNum + "' AND '" + lNum + "'";
        }

        if (first == undefined || first == '') {
            query = query;
        } else if (first != '' && eFirst == "yes") {
            query = query + "AND customers.\"Firstname\" = '" + first + "'"
        } else if (first != ''  && eFirst != "yes") {
            query = query + "AND customers.\"Firstname\" ilike '%" + first + "%'";
        }

        if (last == undefined || last == '') {
            query = query;
        }else if (last != '' && eLast == "yes") {
            query = query + "AND customers.\"Lastname\" = '" + last + "'"
        }else if (last != '' && eLast != "yes") {
            query = query + "AND customers.\"Lastname\" ilike '%" + last + "%'";
        }

        if (mail == '' || mail == undefined) {
            query = query;
        }else if (mail != '' && eMail == "yes") {
            query = query + "AND customers.\"Email\" = '" + mail + "'"
        }else if (mail != ''  && eMail != "yes") {
            query = query + "AND customers.\"Email\" ilike '%" + mail + "%'";
        }

        if (phone == ''|| phone == undefined) {
            query = query;
        }else if (phone != '' && ePhone == "yes") {
            query = query + "AND customers.\"Phone\" = '" + phone + "'"
        }else if (phone != '' && ePhone != "yes") {
            query = query + "AND customers.\"Phone\" ilike '%" + phone + "%'";
        }

        if (login == '' || login == undefined) {
            query = query;
        }else if (login != '' && eLogin == "yes") {
            query = query + "AND customers.\"Login\" = '" + login + "'"
        }else if (login != '' && eLogin != "yes") {
            query = query + "AND customers.\"Login\" ilike '%" + login + "%'";
        }

        if (prof == '' || prof == undefined || prof == 'None') {
            query = query;
        }else if (prof != '') {
            query = query + "AND p.\"ProfileName\" ILIKE '" + prof + "'"
        }

        if (gender == '' || gender === undefined || gender == 'both') {
            query = query;
        }else if (gender != '') {
            query = query + "AND customers.\"Gender\" ILIKE '" + gender + "'"
        }

        if (news == '' || news === undefined || news == 'both') {
            query = query;
        }else if (news != '') {
            query = query + "AND customers.\"Newsletter\" = " + news + " "
        }

        if (pos === undefined || pos == '' || pos == 'both') {
            query = query;
        }else if (pos != '') {
            query = query + "AND customers.\"Position\" = " + pos + " "
        }

        db.customer.filterCustomer(query, count, function (error, query) {
            if (error) {
                console.log(query);
                query ="null";
                res.render('../views/searchCustomer', {title: 'Search Customer', user: {}, result: query});
            } else {
                //affichage du resultat
                console.log(query);
                res.render('../views/searchCustomer', {
                    title: 'Search Customer',
                    user: {},
                    result: query
                });
            }
        });
    }
    //res.redirect('../views/searchCustomer');

});







module.exports = router;
