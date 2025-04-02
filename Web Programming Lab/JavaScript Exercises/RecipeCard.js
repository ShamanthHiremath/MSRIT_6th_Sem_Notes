/*
The Recipe Card
Never forget another recipe!
•	Create an object to hold information on your favorite recipe. It should have properties for title (a string), servings (a number), and ingredients (an array of strings).
•	On separate lines (one console.log statement for each), log the recipe information so it looks like:
	Mole
	Serves: 2
	Ingredients:
	cinnamon
	cumin
	cocoa

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

function logTopChoices(choices) {
    const suffixes = ["st", "nd", "rd"];
    
    choices.forEach((choice, index) => {
        let suffix = (index < 3) ? suffixes[index] : "th";
        console.log(`My ${index + 1}${suffix} choice is ${choice}.`);
    });
}

// Example usage
const topColors = ["blue", "red", "green", "yellow"];
logTopChoices(topColors);
// Output: 
// My 1st choice is blue.
// My 2nd choice is red.
// My 3rd choice is green.
// My 4th choice is yellow.

function displayRecipe(recipe) {
    console.log(recipe.title);
    console.log(`Serves: ${recipe.servings}`);
    console.log("Ingredients:");
    recipe.ingredients.forEach(ingredient => console.log(ingredient));
}

// Example recipe object
const favoriteRecipe = {
    title: "Mole",
    servings: 2,
    ingredients: ["cinnamon", "cumin", "cocoa"]
};

// Display the recipe
displayRecipe(favoriteRecipe);
// Output:
// Mole
// Serves: 2
// Ingredients:
// cinnamon
// cumin
// cocoa
