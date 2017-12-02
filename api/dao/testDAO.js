var express = require('express');
var router  = express.Router();
var MongoClient = require('mongodb').MongoClient;

var mongoConString="mongodb://localhost:27017/MyDb";

function sampleGetFunction(callback){

    MongoClient.connect(mongoConString, function (err, db) {
        
         db.collection('testCollection', function (err, collection) {               

            collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);       
            return callback(null, items);     
        });
    });
                    
    });


    

}

function sampleInsertFunc(callback){


    MongoClient.connect(mongoConString, function (err, db) {
        
         db.collection('testCollection', function (err, collection) {
        //insert    
            collection.insert({ id: 7, firstName: 'Steve', lastName: 'Jobs' });
            collection.insert({ id: 8, firstName: 'Bill', lastName: 'Gates' });
            collection.insert({ id: 9, firstName: 'James', lastName: 'Bond' });           
            
    
            db.collection('testCollection').count(function (err, count) {
                if (err) throw err;
                
                console.log('Total Rows: ' + count);
            });
         
            return callback(null, 'Document inserted Successfully');
        
    });
                    
    });

}


function sampleUpdateFunc(callback){

    MongoClient.connect(mongoConString, function (err, db) {
        
        db.collection('testCollection', function (err, collection) {
            
            collection.update({id: 7}, { $set: { firstName: 'James', lastName: 'Gosling'} }, {w:1},
                                                         function(err, result){
                                                                    if(err) throw err;    
                                                                    console.log('Document Updated Successfully');
                                                            });
    
            
        });
        return callback(null, 'Document Updated Successfully');       
    });
    
}



function sampleDeleteFunc(callback){

    MongoClient.connect(mongoConString, function (err, db) {
        
        db.collection('testCollection', function (err, collection) {          
            
    
            collection.remove({id:3}, {w:1}, function(err, result) {
            
                if(err) throw err;    
            
                console.log('Document Removed Successfully');
            });

            return callback(null, 'Document Removed Successfully');  
    
        });
                    
    });


}








module.exports.sampleGetFunction = sampleGetFunction;
module.exports.sampleInsertFunc = sampleInsertFunc;
module.exports.sampleUpdateFunc = sampleUpdateFunc;
module.exports.sampleDeleteFunc = sampleDeleteFunc;