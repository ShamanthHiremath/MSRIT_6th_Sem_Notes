/*
FixStart
•	Create a function called fixStart. It should take a single argument, a string, and return a version where all occurences of its first character have been replaced with '*', except for the first character itself. You can assume that the string is at least one character long. For example:
	fixStart('babble'): 'ba**le'

*/

function fixStart(str) {
    // Ensure the string is at least one character long
    if (str.length < 1) {
        return "String must be at least one character long";
    }
    
    // Get the first character
    let firstChar = str[0];
    
    // Replace all occurrences of the first character except the first one
    let modifiedStr = firstChar + str.slice(1).replace(new RegExp(firstChar, 'g'), '*');
    
    return modifiedStr;
}

// Example usage
console.log(fixStart('babble')); // Output: 'ba**le'
console.log(fixStart('google')); // Output: 'go*gle'