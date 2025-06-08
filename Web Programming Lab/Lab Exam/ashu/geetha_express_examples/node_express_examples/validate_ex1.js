var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
var expressValidator = require('express-validator');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(expressValidator());
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
app.post('/process_post', urlencodedParser, function (req, res) {  
req.checkBody('first_name', 'Invalid name').isAlpha().notEmpty();
var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    console.log("Firstname :"+req.body.first_name+" Last Name="+req.body.last_name);
	res.end("Firstname :"+req.body.first_name+" Last Name="+req.body.last_name); 
  }
})  
var server = app.listen(5000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  