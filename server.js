var routes, options, express, bodyParser, path;

routes     = require('./routes/express-routes.js');
express    = require('express');
bodyParser = require('body-parser');
path       = require('path');
var https = require('https');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var app = express({
    name: 'demo-NodeJS'
});

var regSiteCtrl=require("./api/controller/regSiteController");
var testCtrl=require("./api/controller/testController");
var mockCtrl=require("./api/controller/mockController");

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






var options = {
    key: fs.readFileSync('cert/private.pem'),
    cert: fs.readFileSync('cert/public.pem')
};
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});
//  app.set(cookieParser());
//  app.set(bodyParser.urlencoded({extended: true}));
//  app.set(bodyParser.json());
 
//  app.use(express.static('public'));
//  app.use('/', routes);

//  app.set('/home/', express.static(__dirname + '/public'));


// routes.do_routing(app);

var server = app.listen(3001, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)    
    console.log("server Started");
});

//http.createServer(options,app).listen('3000');
