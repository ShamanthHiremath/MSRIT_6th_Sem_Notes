//module3.js
function multiply(a,b){
   console.log("%d * %d is = %d",a,b,a*b);
}
function divide(a,b){
   console.log("%d / %d is = %d",a,b,a/b);
}
//call the functions from the module.exports as the JSON objects. 
module.exports={
 multiply:multiply,     
 divide:divide
};

