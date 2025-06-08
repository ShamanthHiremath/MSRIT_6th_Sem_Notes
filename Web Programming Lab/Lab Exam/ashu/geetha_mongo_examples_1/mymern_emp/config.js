var mongoose = require('mongoose');   
var db;
var uri = 'mongodb://127.0.0.1/myreactemp';
var promise = mongoose.connect(uri,{
      useMongoClient: true,
});
promise.openUri(uri,function(errr,db1){
if(errr){
        throw errr;
      }else{
        console.log("Connection Successfull");      
        db = db1;
      }
});

module.exports =db;


  
