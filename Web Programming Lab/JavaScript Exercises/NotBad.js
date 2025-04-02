function notBad(sentence) {
    let notIndex = sentence.indexOf('not');
    let badIndex = sentence.indexOf('bad');
    if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
        return sentence.slice(0, notIndex) + 'good' + sentence.slice(badIndex + 3);
    }
    return sentence;
}

console.log(notBad('This dinner is not that bad!'));
console.log(notBad('This movie is not so bad!'));
console.log(notBad('This dinner is bad!'));