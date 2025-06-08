const express = require("express");
const app = express();
  
const port = process.env.port || 3000;
app.get("/",function(req, res, next) {
    console.log("Welcome");
    next();
  },
  function(req, res) {
    res.send(`<div>
    <h2>Middleware Example</h2>
    
  </div>`);
  })
app.listen(port, function()  {
  console.log(`Listening to port ${port}`);
});


