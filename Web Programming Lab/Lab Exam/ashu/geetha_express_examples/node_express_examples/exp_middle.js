var express = require("express");
var http = require("http");
var app = express();

app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/html" });
  next();
});

app.get("/", function(request, response) {
  response.end("<h1>Welcome to the homepage!</h1>");
});

app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(5000);
console.log("Example app listening at http://localhost:5000")