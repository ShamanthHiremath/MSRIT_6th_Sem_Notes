var http = require('http'),fs = require('fs'),
    url = require('url'),
    qs = require('querystring');
var server = http.createServer(function (req,res){
    var url_parts = url.parse(req.url,true);
    var body = '';
   		if(url_parts.pathname == '/')
			 fs.readFile('./form.html',function(error,data){ 
		     if(error){
				res.writeHead(404);
				res.write("Not Found!");	}
			else{
					res.writeHead(200, {'Content-Type': "text/html"});
					console.log('Serving the page form.html');
					res.write(data); 	}
			res.end();					
			});
		 
			if(req.method === 'POST'){
				if(url_parts.pathname == '/getData')			{
					console.log('Serving the Got Data.');    
					req.on('data', function (data) {
						body += data;
					//console.log('got data:'+data);	
					});
					req.on('end', function () {
					var POST = qs.parse(body);
					console.log("Sent data are (POST):"+POST.name+" and age:"+POST.age);
					res.end("Sent data are (POST):"+POST.name+" and age:"+POST.age);
					});
			}}
});
server.listen(5000);
console.log('Server listenning at localhost:5000');
