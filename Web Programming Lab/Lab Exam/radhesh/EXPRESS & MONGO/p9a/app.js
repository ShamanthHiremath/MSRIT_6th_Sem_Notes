const express = require("express");
const path = require("path");

const app = express();

// Serve static HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
