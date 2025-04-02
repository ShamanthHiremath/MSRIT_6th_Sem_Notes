/*
MixUp
•	Create a function called mixUp. It should take in two strings, and return the concatenation of the two strings (separated by a space) slicing out and swapping the first 2 characters of each. You can assume that the strings are at least 2 characters long. For example:
	  mixUp('mix', pod'): 'pox mid'
	  mixUp('dog', 'dinner'): 'dig donner'

*/

function mixUp(str1, str2) {
    // Ensure the strings are at least 2 characters long
    if (str1.length < 2 || str2.length < 2) {
        return "Strings must be at least 2 characters long";
    }
    
    // Swap the first two characters of each string
    let newStr1 = str2.slice(0, 2) + str1.slice(2);
    let newStr2 = str1.slice(0, 2) + str2.slice(2);
    
    // Return the concatenated result
    return `${newStr1} ${newStr2}`;
}

// Example usage
console.log(mixUp('mix', 'pod')); // Output: 'pox mid'
console.log(mixUp('dog', 'dinner')); // Output: 'dig donner'
