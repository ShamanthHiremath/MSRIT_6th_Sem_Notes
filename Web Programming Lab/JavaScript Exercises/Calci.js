function squareNumber(num) {
    let squared = num * num;
    console.log(`The result of squaring the number ${num} is ${squared}.`);
    return squared;
}

function halfNumber(num) {
    let half = num / 2;
    console.log(`Half of ${num} is ${half}.`);
    return half;
}

function percentOf(num1, num2) {
    let percent = (num1 / num2) * 100;
    console.log(`${num1} is ${percent}% of ${num2}.`);
    return percent;
}

function areaOfCircle(radius) {
    let area = Math.PI * radius * radius;
    let roundedArea = area.toFixed(2); // Rounds to 2 decimal places
    console.log(`The area for a circle with radius ${radius} is ${roundedArea}.`);
    return parseFloat(roundedArea);
}

function combinedOperations(num) {
    let half = halfNumber(num);
    let squared = squareNumber(half);
    let area = areaOfCircle(squared);
    let percentage = percentOf(area, squared * squared);
    
    console.log(`Final percentage: ${percentage}%`);
    return percentage;
}

// Example calls
let testNumber = 4;
combinedOperations(testNumber);
function areaOfCircle(radius) {
    let area = Math.PI * radius * radius;
    let roundedArea = area.toFixed(2); // Rounds to 2 decimal places
    console.log(`The area for a circle with radius ${radius} is ${roundedArea}.`);
    return parseFloat(roundedArea);
}

function combinedOperations(num) {
    let half = halfNumber(num);
    let squared = squareNumber(half);
    let area = areaOfCircle(squared);
    let percentage = percentOf(area, squared * squared);
    
    console.log(`Final percentage: ${percentage}%`);
    return percentage;
}

// Example calls
testNumber = 4;
combinedOperations(testNumber);