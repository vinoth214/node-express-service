var express = require('express');
var app  = express.Router();


var regSiteCtrl=require("../api/controller/regSiteController");
var testCtrl=require("../api/controller/testController");
var mockCtrl=require("../api/controller/mockController");

app.get('/api/psqlGetFunction',function (req,res) {
    regSiteCtrl.getUrlController(req,res);
})

app.get('/api/mongoGetFunction',function (req,res) {
    testCtrl.testController(req,res);
})

app.get('/api/MongoInsert',function (req,res) {
    testCtrl.insertTestController(req,res);
})

app.get('/api/MongoUpdate',function (req,res) {
    testCtrl.updateTestController(req,res);
})


app.get('/api/MongoDelete',function (req,res) {
    testCtrl.deleteTestController(req,res);
})

app.get('/api/syncMockService',function (req,res) {
    mockCtrl.mockControllerSyncFunc(req,res);
})

app.get('/api/AsyncMockService',function (req,res) {
    mockCtrl.mockControllerAsyncFunc(req,res);
})
