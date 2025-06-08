/*function createMonthConverter() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    function convertMonth(monthNumber) {
        if (isNaN(monthNumber)) {
            return "Bad Number";
        }
        const num = Math.floor(Number(monthNumber));
        if (num < 1 || num > 12) {
            return "Bad Number";
        }
        return months[num - 1];
    }
    return convertMonth;
}

const monthConverter = createMonthConverter();

console.log(monthConverter(1));        // "January"
console.log(monthConverter(12));       // "December"
console.log(monthConverter(5.7));      // "May" (decimal stripped)
console.log(monthConverter(0));        // "Bad Number"
console.log(monthConverter(13));       // "Bad Number"
console.log(monthConverter("abc"));     // "Bad Number"
console.log(monthConverter(-5));       // "Bad Number"
console.log(monthConverter(8.9));      // "August"*/
/*A closure in JavaScript is a fundamental concept where an inner function retains access to 
variables from its outer (parent) function's scope, even after the outer function has finished executing. 
This creates a powerful mechanism that allows functions to "remember" their lexical environment and 
maintain access to variables that would otherwise be out of scope.
*/

function createMonthConverter()
{
    const months=["January","February","March","April","May","June","July","August","September",'October', 'November', 'December'];
    function convertMonth(monthNumber)
    {
        if(isNaN(monthNumber))
            return "Bad Number";
        const no=Math.floor(parseInt(monthNumber));
        if(no<1 || no>12)
            return "Bad Number";
        return months[no-1];
    }
    return convertMonth;
}

const monthConverter=createMonthConverter();
console.log(monthConverter(1));        // "January"
console.log(monthConverter(12));       // "December"
console.log(monthConverter(5.7));      // "May" (decimal stripped)
console.log(monthConverter(0));        // "Bad Number"
console.log(monthConverter(13));       // "Bad Number"
console.log(monthConverter("abc"));     // "Bad Number"
console.log(monthConverter(-5));       // "Bad Number"
console.log(monthConverter(8.9));      // "August"*/
