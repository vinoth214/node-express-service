/**
 * New node file
 */


var pg = require("pg");

var conString = "pg://postgres:admin@10.145.64.158:5432/postgres";

var client = new pg.Client(conString);
client.connect();


function getFromDB(query, callback) {
    pg.connect(database.rules, function (err, client, done) {
        if (err) {
            log.error("error in dataAccess: " + query + " message: " + err.message);
            var error = errors.dbConnectionError(err);
            done();
            return callback(error, null);

        }

        // creating an array in which the whole result shall be passed
        var results = [];

        // generating the db query using the client connection
        var dbQuery = client.query(query, function (err, result) {
            if (err) {
                log.error("error in executing query "+err.message);
                client.end();
                var error = errors.queryError(err);
                done();
                return callback(error, null);
            }
            done();
            return callback(null, result.rows);
        });
    });
}

module.exports.getFromDB=getFromDB;