/*
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