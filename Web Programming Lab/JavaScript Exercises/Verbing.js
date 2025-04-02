function verbing(word) {
    if (word.length >= 3) {
        if (word.endsWith('ing')) {
            return word + 'ly';
        } else {
            return word + 'ing';
        }
    }
    return word;
}

console.log(verbing('swim'));
console.log(verbing('swimming'));
console.log(verbing('go'));
