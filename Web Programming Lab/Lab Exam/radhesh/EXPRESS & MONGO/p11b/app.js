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
  db = client.db("AttendanceDB");
  console.log("MongoDB connected");

  // Home Form
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // Insert student
  app.post("/add", async (req, res) => {
    const { usn, name, total_classes, attended_classes } = req.body;
    const total = parseInt(total_classes);
    const attended = parseInt(attended_classes);
    const percent = ((attended / total) * 100).toFixed(2);

    await db.collection("students").insertOne({
      usn,
      name,
      total_classes: total,
      attended_classes: attended,
      percentage: parseFloat(percent)
    });

    res.send("Student added successfully. <a href='/'>Back</a>");
  });

  // Display students with attendance < 75%
  app.get("/shortage", async (req, res) => {
    const students = await db.collection("students").find({ percentage: { $lt: 75 } }).toArray();

    let html = "<h2>Students with Attendance below 75%</h2><ul>";
    students.forEach(stu => {
      html += `<li>${stu.name} (${stu.usn}) - ${stu.percentage}%</li>`;
    });
    html += "</ul><a href='/'>Back</a>";
    res.send(html);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);
