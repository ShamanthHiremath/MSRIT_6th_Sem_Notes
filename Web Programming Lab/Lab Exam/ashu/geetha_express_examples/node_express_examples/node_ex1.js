var my_http = require("http");
my_http.createServer(function(request,response){
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.write("Hello MSRIT");
  response.end();
}).listen(5000);
console.log("Server Running on 5000"); 