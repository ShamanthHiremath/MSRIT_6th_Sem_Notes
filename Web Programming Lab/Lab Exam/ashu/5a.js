function pluralize(noun, number) {
    const irregularPlurals = {
        'sheep': 'sheep',
        'deer': 'deer',
        'fish': 'fish',
        'goose': 'geese',
        'mouse': 'mice',
        'child': 'children',
        'person': 'people',
        'foot': 'feet',
        'tooth': 'teeth',
        'man': 'men',
        'woman': 'women'
    };
    if (number === 1) {
        return `${number} ${noun}`;
    }
    if (irregularPlurals[noun.toLowerCase()]) {
        return `${number} ${irregularPlurals[noun.toLowerCase()]}`;
    }
    let pluralForm = noun; 
    if (noun.endsWith('s') || noun.endsWith('sh') || noun.endsWith('ch') || noun.endsWith('x') || noun.endsWith('z')) {
        pluralForm = noun + 'es';
    } else if (noun.endsWith('y') && !'aeiou'.includes(noun[noun.length - 2])) {
        pluralForm = noun.slice(0, -1) + 'ies';
    } else if (noun.endsWith('f')) {
        pluralForm = noun.slice(0, -1) + 'ves';
    } else if (noun.endsWith('fe')) {
        pluralForm = noun.slice(0, -2) + 'ves';
    } else {
        pluralForm = noun + 's';
    }
    
    return `${number} ${pluralForm}`;
}
console.log(pluralize('cat', 5));      // "5 cats"
console.log(pluralize('dog', 1));      // "1 dog"
console.log(pluralize('sheep', 3));    // "3 sheep"
console.log(pluralize('goose', 4));    // "4 geese"
console.log(pluralize('mouse', 2));    // "2 mice"
console.log(pluralize('child', 6));    // "6 children"
console.log(pluralize('box', 3));      // "3 boxes"
console.log(pluralize('city', 2));     // "2 cities"
console.log(pluralize('knife', 4));    // "4 knives"
