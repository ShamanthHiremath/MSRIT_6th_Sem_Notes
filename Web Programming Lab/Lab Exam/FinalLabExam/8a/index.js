function vowelCount(str) {
    const vowels = "aeiouAEIOU"
    const counts = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    
    // Convert string to lowercase and count vowels
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            counts[char]++;
        }
    }
    
    // Format output
    const result = `a, e, i, o, and u appear, respectively, ${counts.a}, ${counts.e}, ${counts.i}, ${counts.o}, ${counts.u} times`;
    console.log(`Input: vowelCount('${str}')`);
    console.log(`Output: ${result}`);
    
    return counts;
}

// Test the function
vowelCount('Le Tour de France');
vowelCount('Hello World');
vowelCount('Programming');
