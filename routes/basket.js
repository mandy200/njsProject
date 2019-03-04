var express = require('express');
var router = express.Router();
let db = require('../utils/database');


router.get('/basket', function(req, res, next) {
    res.send('respond with a resource');
});
