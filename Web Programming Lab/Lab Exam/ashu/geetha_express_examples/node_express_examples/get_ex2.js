var express = require('express'); 
var app = express();  
 
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );    
})  
app.get('/process_get', function (req, res) {  
res.send('<p>First name: ' + req.query['first_name']+'</p><p>Last name: '+req.query['last_name']+'</p>');  
})  
var server = app.listen(5000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  

