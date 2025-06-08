'use strict';
module.exports = function(name, age) {
     return {
   get_name: function() {return name},
   get_age: function() {return age}
     }
}