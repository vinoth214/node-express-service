var routes, options, express, bodyParser, path;
require('rootpath')();
routes     = require('./routes/express-routes.js');
express    = require('express');
bodyParser = require('body-parser');
path       = require('path');
var cors = require('cors');
var expressJwt = require('express-jwt');
var config = require('config.json');

var https = require('https');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var app = express({
    name: 'demo-NodeJS'
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));


// routes
app.use('/users', require('./api/controller/users.controller'));


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





// start server
var server = app.listen(4000, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)    
    console.log("server Started");
});


// var regSiteCtrl=require("./api/controller/regSiteController");
// var testCtrl=require("./api/controller/testController");
// var mockCtrl=require("./api/controller/mockController");

// app.get('/api/psqlGetFunction',function (req,res) {
//     regSiteCtrl.getUrlController(req,res);
// })

// app.get('/api/mongoGetFunction',function (req,res) {
//     testCtrl.testController(req,res);
// })

// app.get('/api/MongoInsert',function (req,res) {
//     testCtrl.insertTestController(req,res);
// })

// app.get('/api/MongoUpdate',function (req,res) {
//     testCtrl.updateTestController(req,res);
// })


// app.get('/api/MongoDelete',function (req,res) {
//     testCtrl.deleteTestController(req,res);
// })

// app.get('/api/syncMockService',function (req,res) {
//     mockCtrl.mockControllerSyncFunc(req,res);
// })

// app.get('/api/AsyncMockService',function (req,res) {
//     mockCtrl.mockControllerAsyncFunc(req,res);
// })
