// // (a) Write a JavaScript function called notBad that takes a single argument, a string.
// It should find the first appearance of the substring 'not' and 'bad'.
// If the 'bad' follows the 'not', then it should replace the whole 'not'...'bad' substring with 'good' and return the result.
// If it doesn't find 'not' and 'bad' in the right sequence (or at all), just return the original sentence.

function notBad(str) {
  str = str.toLowerCase();
  const notIndex = str.indexOf('not');
  const badIndex = str.indexOf('bad');

  if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
      return str.slice(0, notIndex) + 'good' + str.slice(badIndex + 3);
  } else {
      return str;
  }
}

console.log(notBad('This dinner is not that bad!')); // Output: This dinner is good!
console.log(notBad('This dinner is bad!'));          // Output: This dinner is bad!
console.log(notBad('The movie is not so bad.'));     // Output: The movie is good.
console.log(notBad('It is not bad at all'));         // Output: It is good at all
console.log(notBad('Nothing bad here'));             // Output: good here
console.log(notBad('not nice'));                  // Output: not nice
console.log(notBad('bad not good'));              // Output: bad not good

