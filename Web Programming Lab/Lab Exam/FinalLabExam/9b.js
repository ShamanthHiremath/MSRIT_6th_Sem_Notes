// (b) Create a Node.js application using Express and MongoDB with the following features:
// Accept student details from a web page: User_Name, Branch, and Semester.
// Store the data in a MongoDB collection.
// Implement a GET route to display all students who belong to the 6th Semester and are from the CSE branch.

// in command line
// mongosh
// use StudentDB
// db.createCollection('students')


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const path = require('path');

const app = express();
const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoUrl = 'mongodb://127.0.0.1:27017';
// const mongoUrl = 'mongodb://localhost:27017';


MongoClient.connect(mongoUrl)
  .then(
    client => {
      console.log("mongodb connected");
      db = client.db('StudentDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'student.html'));
  res.send(`
    <h1>Student Management System</h1>
    
    <h2>Add New Student</h2>
    <form action="/inserting" method="POST">
      User Name: <input type="text" name="userName" required><br><br>
      Branch: <input type="text" name="branch" required><br><br>
      Semester: <input type="number" name="semester" required min="1" max="8"><br><br>
      <button type="submit">Add Student</button>
    </form>
    
    <br>
    <a href="/getting">View 6th Semester CSE Students</a><br>
    <a href="/all-students">View All Students</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { userName, branch, semester } = req.body;
    
    await db.collection('students').insertOne({ 
      userName: userName,
      branch: branch.toUpperCase(), // Store branch in uppercase for consistency
      semester: parseInt(semester)
    });
    res.send(`Student added successfully!<br>
              <strong>User Name:</strong> ${userName}<br>
              <strong>Branch:</strong> ${branch.toUpperCase()}<br>
              <strong>Semester:</strong> ${semester}<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('students').find({ 
      semester: 6,
      branch: 'CSE'
    }).toArray();
    let html = '<h1>6th Semester CSE Students</h1>';
    if (results.length === 0) {
      html += '<p>No students found in 6th Semester CSE branch.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>User Name:</strong> ${value.userName}<br>
                   <strong>Branch:</strong> ${value.branch}<br>
                   <strong>Semester:</strong> ${value.semester}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all students
app.get('/all-students', async (req, res) => {
  try {
    const results = await db.collection('students').find({}).toArray();
    let html = '<h1>All Students</h1>';
    if (results.length === 0) {
      html += '<p>No students found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>User Name:</strong> ${value.userName}<br>
                   <strong>Branch:</strong> ${value.branch}<br>
                   <strong>Semester:</strong> ${value.semester}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/deleting', async (req, res) => {
  try {
    const { userName } = req.body;
    const result = await db.collection('students').deleteMany({ userName: userName });
    res.send(`Deleted ${result.deletedCount} student records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { userName, branch, semester } = req.body;
    
    const result = await db.collection('students').updateOne(
      { userName: userName }, 
      { 
        $set: { 
          branch: branch.toUpperCase(),
          semester: parseInt(semester)
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Student updated successfully.<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Student not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});