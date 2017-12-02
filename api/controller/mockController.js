var express = require('express');
var router  = express.Router();
var mockDAO = require("./../../api/dao/mockDAO");


function mockControllerSyncFunc(req, res){
    
    mockDAO.mockSyncFunction(function(err,getData){
            if(err){
               res.send(err);
             }else {
                 res.send(getData);
             }
        })
    }
    

    function mockControllerAsyncFunc(req, res){
        
        mockDAO.mockAsyncFunction(function(err,getData){
                if(err){
                   res.send(err);
                 }else {
                     res.send(getData);
                 }
            })
        }

    module.exports.mockControllerSyncFunc =mockControllerSyncFunc ;
    module.exports.mockControllerAsyncFunc =mockControllerAsyncFunc ;