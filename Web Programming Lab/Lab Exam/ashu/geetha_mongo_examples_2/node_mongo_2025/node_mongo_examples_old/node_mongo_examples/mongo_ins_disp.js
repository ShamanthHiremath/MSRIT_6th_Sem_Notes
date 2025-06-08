var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/mydb', function(err, db) {
    if(err) throw err;

    var collection = db.collection('employee');
    collection.insert({empid:551,empname:"civil"}, function(err, docs) {
        collection.count(function(err, count) {
            console.log("count = %s", count);
        });
    });

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
    });
});