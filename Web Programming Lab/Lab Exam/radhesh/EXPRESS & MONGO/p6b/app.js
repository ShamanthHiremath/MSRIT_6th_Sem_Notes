const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Engineering College Branch Info</h1>
    <ul>
      <li><a href="/cse">Computer Science</a></li>
      <li><a href="/ece">Electronics</a></li>
      <li><a href="/mech">Mechanical</a></li>
    </ul>
  `);
});

app.get("/cse", (req, res) => {
  res.sendFile(path.join(__dirname, "cse.html"));
});

app.get("/ece", (req, res) => {
  res.sendFile(path.join(__dirname, "ece.html"));
});

app.get("/mech", (req, res) => {
  res.sendFile(path.join(__dirname, "mech.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
