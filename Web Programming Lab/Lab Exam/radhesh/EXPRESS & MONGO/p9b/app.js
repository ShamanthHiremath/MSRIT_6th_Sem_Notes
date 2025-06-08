const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function start() {
  await client.connect();
  db = client.db("CollegeDB");
  console.log("MongoDB connected");

  // Serve the form
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // Insert student data
  app.post("/submit", async (req, res) => {
    const { name, branch, semester } = req.body;
    await db.collection("students").insertOne({ name, branch, semester: parseInt(semester) });
    res.send("Student added successfully. <a href='/'>Back</a>");
  });

  // Display students of 6th sem and CSE branch
  app.get("/cse6", async (req, res) => {
    const result = await db.collection("students").find({
      semester: 6,
      branch: { $regex: /^cse$/i }
    }).toArray();

    let html = "<h2>CSE - 6th Semester Students</h2><ul>";
    result.forEach(s => {
      html += `<li>${s.name} (${s.branch}, Semester ${s.semester})</li>`;
    });
    html += "</ul><a href='/'>Back</a>";

    res.send(html);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);