const word = ['F', 'O', 'X'];
let guessedLetters = Array(word.length).fill('_');
let guessedHistory = new Set();
let reward = 0;
let hangmanState = 0;
const maxMistakes = 6;

function guessLetter(letter) {
    letter = letter.toUpperCase();
    
    if (guessedHistory.has(letter)) {
        console.log(`You already guessed '${letter}'. Try a different letter.`);
        return;
    }
    guessedHistory.add(letter);
    
    let found = false;
    let occurrences = 0;
    
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            guessedLetters[i] = letter;
            found = true;
            occurrences++;
        }
    }
    
    if (found) {
        let rewardAmount = Math.floor(Math.random() * 100) * occurrences;
        reward += rewardAmount;
        console.log(`Good job! You found a letter! Current word: ${guessedLetters.join(' ')}`);
        console.log(`You earned $${rewardAmount}. Total reward: $${reward}`);
    } else {
        hangmanState++;
        reward -= 10;
        console.log(`Wrong guess! You lost $10. Total reward: $${reward}`);
        console.log(`You have ${maxMistakes - hangmanState} tries left.`);
    }
    
    if (!guessedLetters.includes('_')) {
        console.log(`Congratulations! You guessed the word: ${word.join('')} and won $${reward}!`);
        return;
    }
    
    if (hangmanState >= maxMistakes) {
        console.log(`Game over! The word was '${word.join('')}'.`);
    }
}

const testGuesses = ['A', 'O', 'X', 'F', 'B', 'C', 'D'];
testGuesses.forEach(letter => guessLetter(letter));
