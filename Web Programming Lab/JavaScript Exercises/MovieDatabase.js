/*
The Movie Database
It's like IMDB, but much much smaller!
•	Create an object to store the following information about your favorite movie: title (a string), duration (a number), and stars (an array of strings).
•	Create a function to print out the movie information like so: "Puff the Magic Dragon lasts for 30 minutes. Stars: Puff, Jackie, Living Sneezes."

The Cash Register
•	Write a function called cashRegister that takes a shopping cart object. The object contains item names and prices (itemName: itemPrice). The function should return the total price of the shopping cart.
•	Example

•	// Input
•	var cartForParty = {  
•	  banana: "1.25",
•	  handkerchief: ".99",
•	  Tshirt: "25.01",
•	  apple: "0.60",
•	  nalgene: "10.34",
•	  proteinShake: "22.36"
•	};
•	
•	// Output
•	cashRegister(cartForParty)); // 60.55

*/
// The Movie Database
const favoriteMovie = {
    title: "Puff the Magic Dragon",
    duration: 30,
    stars: ["Puff", "Jackie", "Living Sneezes"]
};

function printMovieInfo(movie) {
    console.log(`${movie.title} lasts for ${movie.duration} minutes. Stars: ${movie.stars.join(", ")}.`);
}

printMovieInfo(favoriteMovie);

// The Cash Register
function cashRegister(cart) {
    return Object.values(cart).reduce((total, price) => total + parseFloat(price), 0);
}

// Input
var cartForParty = {  
    banana: "1.25",
    handkerchief: ".99",
    Tshirt: "25.01",
    apple: "0.60",
    nalgene: "10.34",
    proteinShake: "22.36"
};

// Output
console.log(cashRegister(cartForParty)); // 60.55