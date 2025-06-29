// github.com/shamanthhiremath/1MS22CS128/tree/main/

/*
QN 1
Name:Shamanth M Hiremath, USN: 1MS22CS128, Section: C
*/

var score = 0;

function question1() {
    var ans = prompt("Who is the actor who plays the role of Iron Man \n 1. Robert Downey Jr. \n 2. Chris Evans \n 3. Chris Hemsworth \n 4. Tom Holland");
    if (ans === "Robert Downey Jr." || ans === "1") {
        alert("Correct!");
        score++;
    } else {
        alert("Wrong!");
    }
};

var question2 = function() {
    var ans = prompt("What is teh OS in Ubuntu Distros?");
    if (ans.toLowerCase() === "paris") {
        alert("Correct!");
        score++;
    } else {
        alert("Wrong!");
    }
};

function question3() {
    var ans = prompt("What is 5 * 3?");
    if (ans.toLowerCase() === result) {
        alert("Correct!");
        score++;
    } else {
        alert("Wrong! DISPLAYING HOISTING EFFECT");
        alert("The hoisting effect is displayed here: " + result); // hoisting effect displayed here
    }
    var result = "15"; // hoisting effect displayed here
    // the use of "result" exists before the definition and assignment of a var result , but it will be undefined
};

function review() {
    try {
        alert("Your score is: " + score);
        alert("Local variable: " + ans);
    } catch (e) {
        alert("error: " + e.message);
    }
};

function start() {
    question1();
    question2();
    question3();
    alert("total score: " + score);
};



/*

QN 2
Name:Shamanth M Hiremath, USN: 1MS22CS128, Section: C
*/


// Scope in js, is what decides where we can use a variable. If a variable is declared globally, like studName and act_scores in our js example below, we can use it anywhere un the code. But if a variable is inside a function, like totalScore inside  total(), it exists only within that function, and is limited to the function block and   lifetime. Using var inside blocks, like scopeVar_test, avoids block scope and is accessible outside the block as well. The lexical scope in report() lets inner functions access outer variables. Hoisting repostions or shifts the   var declarations to the top, making them available irrespective of the position of function calls.


let studName = "BigBoy";

// 1. global variable usage
let act_scores = [10, 20, 15, 5]; 


// 2. fn to get total
function total() { 
    let totalScore = 0;
    for (let score of act_scores) {
        totalScore += score;
    }
    return totalScore;
};

// 3. fn to eval expression
const evalRank = function(totalScore) {   
    if (totalScore > 40) {
        return "Star Performer";
    } else if (totalScore >= 30 && totalScore <= 40) {
        return "Active";
    } else {
        return "Inactive";
    }
};

// 4. anonymous fn 
const calcAvg = function() { 
    let totalScore = total();
    return totalScore / act_scores.length;
};

// 5. lexical scoping task demo
function report() { 
    function showDets() {
        let totalScore = total();
        let rank = evalRank(totalScore);
        let avg = calcAvg();

        console.log("Student: " + studName);
        console.log("Activity Scores: " + act_scores);
        console.log("Total Score: " + totalScore);
        console.log("Average Score: " + avg);
        console.log("Rank: " + rank);
    }
    showDets();
}

// 6. hoisting effect
var category = "Star Performer"; 

// 7. isolation of a variable in a block scope
if (true) {
    var scopeVar_test = "This is function scope"; 
}


// cals and wraps
console.log(scopeVar_test); 
let totalScore = tot();
let rank = evalRank(totalScore);
let averageScore = calcAvg();

console.log("Student: " + studName);
console.log("Activity Scores: " + act_scores);
console.log("Total Score: " + totalScore);
console.log("Average Score: " + averageScore);
console.log("Rank: " + rank);

report();