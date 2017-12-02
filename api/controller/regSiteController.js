var express = require('express');
var router  = express.Router();
var regSiteDAO = require("./../../api/dao/regSiteDAO");
var getUrlDAO = require("./../../api/dao/regSiteDAO");


function getUrlController(req, res) {
    
    getUrlDAO.getUrlDAO(function (err, getData) {
            if(err){
               // log.error(err);
                res.send(err);
            }else {
                res.send(getData);
            }
        })
    }



module.exports.getUrlController =getUrlController ;