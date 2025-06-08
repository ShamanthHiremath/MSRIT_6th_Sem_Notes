const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files like HTML

async function connectDB() {
    await client.connect();
    db = client.db("examDB");
    console.log("Connected to MongoDB");
}
connectDB();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add-student", async (req, res) => {
    const { name, usn, semester, subject, grade } = req.body;
    const student = { name, usn, semester, subject, grade };

    await db.collection("students").insertOne(student);
    res.send("🎉 Student record added! <br><a href='/s-grade'>View 'S' Grade Students</a>");
});

app.get("/s-grade", async (req, res) => {
    const students = await db.collection("students").find({ grade: "S" }).toArray();

    let html = "<h2>Students with 'S' Grade</h2><ul>";
    students.forEach(s => {
        html += `<li>${s.name} (USN: ${s.usn}, Semester: ${s.semester}, Subject: ${s.subject})</li>`;
    });
    html += "</ul><a href='/'>Add More</a>";

    res.send(html);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
