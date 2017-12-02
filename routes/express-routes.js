var express = require('express');
var router  = express.Router();


//var loginCtrl = require("./../api/controller/loginController");
var regSiteCtrl=require("./../api/controller/regSiteController");


// router.post('/login', function (req, res) {
// 	loginCtrl.loginController(req,res);
// })


router.post('/api/siteRegister',function (req,res) {
	regSiteCtrl.regSiteController(req,res);
})

router.get('/api/getUrl',function (req,res) {
    regSiteCtrl.getUrlController(req,res);
})