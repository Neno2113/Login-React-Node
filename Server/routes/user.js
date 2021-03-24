'use strict'


var express = require('express');
var userController = require('../controllers/user');



var router = express.Router();
var md_auth = require('../middlewares/authenticated');




//Routes
router.post('/save', userController.create);
router.post('/login', userController.login);
router.post('/test', md_auth.authenticated, userController.test);



module.exports = router
