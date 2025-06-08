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
  db = client.db("FacultyDB");
  console.log("MongoDB connected");

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "faculty.html"));
  });

  app.post("/addfaculty", async (req, res) => {
    const { id, title, name, branch } = req.body;
    await db.collection("faculty").insertOne({
      id,
      title,
      name,
      branch
    });
    res.send("Faculty added successfully. <a href='/'>Back</a>");
  });

  app.get("/cseprofessors", async (req, res) => {
    const result = await db.collection("faculty").find({
      branch: { $regex: /^cse$/i },
      title: { $regex: /^professor$/i }
    }).toArray();

    let html = "<h2>CSE Professors</h2><ul>";
    result.forEach(f => {
      html += `<li>${f.name} (ID: ${f.id}) - ${f.title} in ${f.branch}</li>`;
    });
    html += "</ul><a href='/'>Back</a>";

    res.send(html);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);
