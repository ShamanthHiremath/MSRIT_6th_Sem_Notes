var MongoClient = require('mongodb').MongoClient;
//https://docs.mongodb.com/manual/tutorial/query-array-of-documents/
// Connect to the db
MongoClient.connect("mongodb://127.0.0.1/mydb", function(err, db) {
  if(!err) {
    console.log("We are connected");
	var doc1 = ({empid:7,empname:"bio"});
	//db.collection('employee').insert(doc1);
	//db.collection('employee').insert({empid:550,empname:"ele"});
	
	db.collection('employee', function (err, collection) {
        collection.insert({ empid: "1", empname: 'Steve' });
        collection.insert({ empid: "2", empname: 'Bill' });
        collection.insert({ empid: "3", empname: 'James' });
        
        db.collection('employee').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
		 });
	//db.collection('employee').insertOne({empid:4,empname:"cse"});

	//db.collection('employee').insertMany( [
		//{empid:500,empname:"xxx"},
		//{empid:501,empname:"yyy"},
		//{empid:502,empname:"zzz"},]);       works in windows

var cursor = db.collection('employee').find();
console.log("All Records");
  cursor.each(function(err,doc){
 console.log(doc);
});
// To Update a Single Document
//db.collection('employee').updateOne({"empname":"newemp"},{$set:{"empname":"oldemp"}});
// To Update a multiple Document
//db.collection('employee').update({"empname":"newemp"},{$set:{"empname":"oldemp"}});    
db.collection('employee').deleteOne({"empname":"xxx"});
db.collection('employee').remove({empname:'ele'})
// counting number of records

db.collection('employee').count({}, function(error, numOfDocs){
            if (error) throw error;
                 console.dir("count: " + numOfDocs);
           });// end of count
		    
db.collection('employee').find({'empname':'Martin'}).nextObject(function(err, doc) {            
          console.log("Returned #1 documents");
		  console.log(doc)
        });	
		
var myEmployee = db.collection('employee').find( { empid : { $gt:4 }});
//db.employee.find({empid:{$gt:4}});  mongodb shell command
console.log("greater than 4");
myEmployee.each(function(err,doc)
{
	console.log(doc)
});
	
var myEmp = db.collection('employee').find( { empname: 'oldemp'});
console.log("old employees");
myEmp.each(function(err,doc)
{
	console.log(doc)
});
//var cursor = db.collection('employee').find();
//cursor.each(function(err,doc){
//console.log(doc);
//});
    db.close();
  }
});
