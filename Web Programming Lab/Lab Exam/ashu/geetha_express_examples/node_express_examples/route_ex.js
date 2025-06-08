var express = require('express');  
var bodyParser = require('body-parser'); 
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', function (req, res) {  
   console.log("Got a GET request for the homepage");  
   res.send('<h1>Welcome to MSRIT</h1>');  
})
  
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );    
})  

app.get('/process_get', function (req, res) {  
console.log("Sent data are (GET): first name :"+req.query.first_name+" and last name :"+req.query.last_name);
res.send('<p>First name: ' + req.query['first_name']+'</p><p>Last name: '+req.query['last_name']+'</p>');  
}) 

app.post('/process_post', urlencodedParser, function (req, res) {  
   console.log("Sent data are (POST):Firstname :"+req.body.first_name+" Last Name="+req.body.last_name);
   //console.log(res);  
   res.end("Firstname :"+req.body.first_name+" Last Name="+req.body.last_name);  
})

app.get('/about', function (req, res) {  
   console.log("Got a GET request for /about");  
   res.send('MSRIT, Dept. of CSE');  
})  
 
var server = app.listen(5000, function () {  
var host = server.address().address  
  var port = server.address().port  
console.log("Example app listening at http://%s:%s", host, port)  
})  