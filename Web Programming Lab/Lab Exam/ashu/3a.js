/*function priceCalculator() {
    return function(sellingPrice, taxRate) {
        const tax = sellingPrice * (taxRate / 100);
        const netPrice = sellingPrice + tax;
        
        return {
            sellingPrice: sellingPrice,
            tax: tax,
            netPrice: netPrice
        };
    };
}
const calculate = priceCalculator();
console.log(calculate(100, 18));    // { sellingPrice: 100, tax: 18, netPrice: 118 }
console.log(calculate(500, 12));    // { sellingPrice: 500, tax: 60, netPrice: 560 }
console.log(calculate(200, 5));     // { sellingPrice: 200, tax: 10, netPrice: 210 }*/
/*Closures are a fundamental concept in JavaScript that allow functions to access variables from their outer scope even after the outer function has returned.

*What is a Closure?*
A closure is created when a function is defined inside another function, and the inner function uses variables from the outer function's scope. When the outer function returns, the inner function still has access to the outer function's variables.

*Example*
```
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

*Key Characteristics*
- *Lexical scope*: Closures have access to the variables of their outer scope.
- *Function returned*: The outer function returns the inner function.
- *Variables preserved*: The inner function can modify and access the outer function's variables even after the outer function has returned.

*Use Cases*
- *Private variables*: Closures can be used to create private variables that are not accessible from outside the function.
- *Callbacks*: Closures are often used as callbacks in functions like `setTimeout` or event listeners.
- *Factory functions*: Closures can be used to create factory functions that return other functions with specific behaviors.

*Benefits*
- *Encapsulation*: Closures provide a way to encapsulate data and behavior.
- *Modularity*: Closures can be used to create modular code that is reusable and maintainable.

Closures are a powerful tool in JavaScript that can help you write more efficient, modular, and maintainable code.*/

function priceCalculator(){
    return function(price,tax){
        const net=price+(price*(tax/100));
        return {
            price:price,
            tax:tax,
            finalPrice:net
        }
    }
}

const getPrice=priceCalculator();
console.log(getPrice(100, 18));    // { sellingPrice: 100, tax: 18, netPrice: 118 }
console.log(getPrice(500, 12));    // { sellingPrice: 500, tax: 60, netPrice: 560 }
console.log(getPrice(200, 5));  