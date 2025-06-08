var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var server = http.createServer(function (req,res){
    var url_parts = url.parse(req.url,true);
    var body = '';
	displayForm(req,res,url_parts);
   	
});
server.listen(5000);
console.log('Server listenning at localhost:5000');
function displayForm(req,res,url_parts)
{
	if(req.method === 'GET')
	{
		if(url_parts.pathname == '/')
			 fs.readFile('./form.html',function(error,data){ 
				console.log('Serving the page form.html');
				res.end(data);    
			});
		else 
		if(url_parts.pathname == '/getData')
		{
			console.log('Serving the Got Data.');
			getData(res,url_parts);
		} }}
function  getData(res,url_parts){
 console.log("Data submitted by the user (GET):"+url_parts.query.name+" and age:"+url_parts.query.age);
        res.end("Data submitted by the user (GET):"+url_parts.query.name+" and age:"+url_parts.query.age);}