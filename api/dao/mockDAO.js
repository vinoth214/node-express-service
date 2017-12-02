var express = require('express');
var router  = express.Router();
var fs = require('fs');
//var mock_json = require("./../../api/mock_json/sample");

function mockSyncFunction(callback){
    var obj = JSON.parse(fs.readFileSync('./api/mock_json/sample.json', 'utf8'));
    console.log("objjjjj",obj);
    return callback(null, obj);  
}


function mockAsyncFunction(callback){

    var obj;
    fs.readFile('./api/mock_json/sample.json', 'utf8', function (err, data) {
        if (err) {
            callback(err, null)
          }else{
            obj = JSON.parse(data);
            console.log("object",obj)
            return callback(null, obj);
          }
      
    });
      

}



module.exports.mockSyncFunction = mockSyncFunction;

module.exports.mockAsyncFunction = mockAsyncFunction;