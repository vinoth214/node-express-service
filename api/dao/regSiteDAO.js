var express = require('express');
var router  = express.Router();
var pg = require("pg");
var conString = "pg://postgres:vinoth@localhost:5432/postgres";



function getUrlDAO(callback) {
    var client = new pg.Client(conString);
    console.log("client",client)
    client.connect(function (err, response) {
            if (err) {
                callback(err, null);
            } else {
                var results = [];
                var convertString=[];
                var query = client.query("SELECT * FROM test.sample_table "
                    , function (err, result) {
                        if (err) {
                          callback(err, null)
                        }
                    results=result.rows
                    convertString= JSON.stringify(results)                   
                    
                    console.log("after result", JSON.parse(convertString) );

                     return callback(null, convertString);

                    }
                );

            }
        }
    );
}

module.exports.getUrlDAO = getUrlDAO;

