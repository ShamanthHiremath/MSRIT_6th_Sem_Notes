var express = require('express')
var app = express()
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
app.use(myLogger)
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
app.use(requestTime)

function hello(req,res,next){
  res.send('Hello \n');
  next()
}

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})
app.get('/hello',hello);

app.listen(5000)
console.log("Example app listening at http://localhost:5000")