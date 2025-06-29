// (a) Write a java script program to convert month number to month name using closures.
// If the user enters a number less than 1 or greater than 12 or a non-number, have the function write "Bad Number" in the monthName field.
// If the user enters a decimal between 1 and 12 (inclusive), strip the decimal portion of the number.

function createMonthConverter()
{
    const months=["January","February","March","April","May","June","July","August","September",'October', 'November', 'December'];
    function convertMonth(monthNumber)
    {
        if(isNaN(monthNumber))
            return "Bad Number";
        const no=parseInt(monthNumber);
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
console.log(monthConverter(8.999));      // "August"*/
