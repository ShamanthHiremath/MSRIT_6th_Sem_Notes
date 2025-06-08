var mod1 = require('./module2.js');
var mod2= require('./module1.js')
mod2();
mod1("msrit")

var module3=require('./module3.js');
module3.multiply(12,10);
module3.divide(12,10);