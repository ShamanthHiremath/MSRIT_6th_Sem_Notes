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
  db = client.db("FinalYears");
  console.log("MongoDB connected");

  // Serve form
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"));
  });

  // Handle form submission
  app.post("/add", async (req, res) => {
    const { usn, name, company } = req.body;
    await db.collection("students").insertOne({ usn, name, company });
    res.send("Student added successfully. <a href='/'>Back</a>");
  });

  // Show Infosys-selected students
  app.get("/infosys", async (req, res) => {
    const selected = await db.collection("students").find({ company: "Infosys" }).toArray();

    let html = "<h2>Students Selected for Infosys</h2><ul>";
    selected.forEach(s => {
      html += `<li>${s.name} (${s.usn})</li>`;
    });
    html += "</ul><a href='/'>Back</a>";

    res.send(html);
  });

  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}

start().catch(console.error);
