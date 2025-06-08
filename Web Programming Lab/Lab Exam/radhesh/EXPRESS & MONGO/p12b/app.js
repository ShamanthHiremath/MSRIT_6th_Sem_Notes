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
  db = client.db("ExamDB");
  console.log("MongoDB connected");

  // Home Form
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // Insert student marks
  app.post("/add", async (req, res) => {
    const { usn, name, subject, marks } = req.body;
    await db.collection("students").insertOne({
      usn,
      name,
      subject,
      marks: parseInt(marks)
    });

    res.send("Student record added. <a href='/'>Back</a>");
  });

  // Not Eligible List
  app.get("/noteligible", async (req, res) => {
    const students = await db.collection("students").find({ marks: { $lt: 20 } }).toArray();

    let html = "<h2>Not Eligible Students (Marks < 20)</h2><ul>";
    students.forEach(stu => {
      html += `<li>${stu.name} (${stu.usn}) - ${stu.subject}: ${stu.marks}</li>`;
    });
    html += "</ul><a href='/'>Back</a>";
    res.send(html);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);
