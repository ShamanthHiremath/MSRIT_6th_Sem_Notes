/*
The Pluralizer
•	Write a function named pluralize that:
	takes 2 arguments, a noun and a number.
	returns the number and pluralized form, like "5 cats" or "1 dog".
•	Call that function for a few different scores and log the result to make sure it works.
•	Bonus: Make it handle a few collective nouns like "sheep" and "geese".

*/
function pluralize(noun, number) {
    // Define exceptions for collective nouns
    const irregularPlurals = {
        "sheep": "sheep",
        "goose": "geese",
        "child": "children",
        "man": "men",
        "woman": "women",
        "tooth": "teeth",
        "foot": "feet",
        "mouse": "mice",
        "person": "people"
    };
    
    // Determine the plural form
    let pluralNoun;
    if (number === 1) {
        pluralNoun = noun;
    } else if (irregularPlurals[noun]) {
        pluralNoun = irregularPlurals[noun];
    } else if (noun.endsWith("y") && !["a", "e", "i", "o", "u"].includes(noun[noun.length - 2])) {
        pluralNoun = noun.slice(0, -1) + "ies";
    } else if (noun.endsWith("s") || noun.endsWith("x") || noun.endsWith("z") || noun.endsWith("ch") || noun.endsWith("sh")) {
        pluralNoun = noun + "es";
    } else {
        pluralNoun = noun + "s";
    }
    
    return `${number} ${pluralNoun}`;
}

// Example usage
console.log(pluralize("cat", 5)); // Output: '5 cats'
console.log(pluralize("dog", 1)); // Output: '1 dog'
console.log(pluralize("sheep", 3)); // Output: '3 sheep'
console.log(pluralize("goose", 2)); // Output: '2 geese'
console.log(pluralize("baby", 4)); // Output: '4 babies'
console.log(pluralize("box", 6)); // Output: '6 boxes'
