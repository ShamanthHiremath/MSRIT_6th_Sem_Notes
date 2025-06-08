const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname, "registration.html"));
});

app.get("/announcements", (req, res) => {
    res.sendFile(path.join(__dirname, "announcements.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});