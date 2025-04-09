function squareNumber(num) {
    let squared = num * num;
    console.log(`✔ Squaring ${num} gives ${squared}.`);
    return squared;
}

function halfNumber(num) {
    let half = num / 2;
    console.log(`✔ Half of ${num} is ${half}.`);
    return half;
}

function percentOf(num1, num2) {
    let percent = (num1 / num2) * 100;
    console.log(`✔ ${num1} is ${percent.toFixed(2)}% of ${num2}.`);
    return percent;
}

function areaOfCircle(radius) {
    let area = Math.PI * Math.pow(radius, 2);
    let roundedArea = area.toFixed(2); 
    console.log(`✔ The area of a circle with radius ${radius} is ${roundedArea}.`);
    return parseFloat(roundedArea);
}

function combinedOperations(num) {
    console.log("\n🔵 Starting calculations for number:", num);
    let half = halfNumber(num);
    let squared = squareNumber(half);
    let area = areaOfCircle(squared);
    let percentage = percentOf(area, squared * squared);
    
    console.log(`🎯 Final percentage: ${percentage.toFixed(2)}%`);
    return percentage;
}

function getUserInput() {
    let input = prompt("Enter a number:");
    let number = parseFloat(input);
    
    if (isNaN(number)) {
        console.log("❌ Invalid input! Please enter a valid number.");
    } else {
        combinedOperations(number);
    }
}

// Start the program
getUserInput();
