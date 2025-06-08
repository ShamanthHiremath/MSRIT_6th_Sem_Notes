const express = require('express');
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function connect() {
    await client.connect();
    db = client.db("test");
    console.log("the db is connected");
}
connect();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/addstudent", async (req, res) => {
    const { name, usn, sem, fee } = req.body;

    await db.collection("student").insertOne({
        name: name,
        usn: usn,
        sem: parseInt(sem),
        fee: parseFloat(fee)
    });
    
    res.send("user added");
});

app.get("/getall", async (req, res) => {
    const students = await db.collection("student").find({}).toArray();
    res.send(students);
});

app.listen(3000, () => {
    console.log("listening");
});
