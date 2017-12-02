var express = require('express');
var router  = express.Router();
var testDAO = require("./../../api/dao/testDAO");



function testController(req, res){

    testDAO.sampleGetFunction(function(err,getData){
        if(err){
           res.send(err);
         }else {
             res.send(getData);
         }
    })
}

function insertTestController(req, res){
    
        testDAO.sampleInsertFunc(function(err,data){
            if(err){
               res.send(err);
             }else {
                 res.send(data);
             }
        })
    }

    function updateTestController(req, res){
        
            testDAO.sampleUpdateFunc(function(err,data){
                if(err){
                   res.send(err);
                 }else {
                     res.send(data);
                 }
            })
        }

        function deleteTestController(req, res){
            
                testDAO.sampleDeleteFunc(function(err,data){
                    if(err){
                       res.send(err);
                     }else {
                         res.send(data);
                     }
                })
            }


module.exports.testController =testController ;
module.exports.insertTestController =insertTestController ;
module.exports.updateTestController =updateTestController ;
module.exports.deleteTestController =deleteTestController ;