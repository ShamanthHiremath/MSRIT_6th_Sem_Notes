// (b) write a Node.js application using Express and MongoDB with the following functionality:
// Accept student details via a web form: Student name, USN, Semester, and Exam fee.
// Store the submitted data in a MongoDB collection.
// Implement a feature to delete all students from the database who have not paid the exam fee (Exam fee = 0 or null).

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
      Student Name: <input type="text" name="studentName" required><br><br>
      USN: <input type="text" name="usn" required><br><br>
      Semester: <input type="number" name="semester" required min="1" max="8"><br><br>
      Exam Fee: <input type="number" name="examFee" min="0" step="0.01"><br><br>
      <button type="submit">Add Student</button>
    </form>
    
    <h2>Delete Unpaid Students</h2>
    <form action="/deleting" method="POST">
      <button type="submit" onclick="return confirm('Are you sure you want to delete all students who have not paid exam fee?')">Delete Students with No Exam Fee</button>
    </form>
    
    <br>
    <a href="/getting">View Paid Students</a><br>
    <a href="/all-students">View All Students</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { studentName, usn, semester, examFee } = req.body;
    
    await db.collection('students').insertOne({ 
      studentName: studentName,
      usn: usn, 
      semester: parseInt(semester),
      examFee: examFee ? parseFloat(examFee) : 0
    });
    res.send(`Student added successfully!<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('students').find({ examFee: { $gt: 0 } }).toArray();
    let html = '<h1>Students Who Have Paid Exam Fee</h1>';
    if (results.length === 0) {
      html += '<p>No students found who have paid exam fee.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Name:</strong> ${value.studentName}<br>
                   <strong>USN:</strong> ${value.usn}<br>
                   <strong>Semester:</strong> ${value.semester}<br>
                   <strong>Exam Fee:</strong> ₹${value.examFee}
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
                   <strong>Name:</strong> ${value.studentName}<br>
                   <strong>USN:</strong> ${value.usn}<br>
                   <strong>Semester:</strong> ${value.semester}<br>
                   <strong>Exam Fee:</strong> ₹${value.examFee}
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
    // Delete students who have not paid exam fee (examFee = 0 or null)
    const result = await db.collection('students').deleteMany({ 
      $or: [
        { examFee: 0 }, 
        { examFee: null },
        { examFee: { $exists: false } }
      ]
    });
    res.send(`Deleted ${result.deletedCount} students who have not paid exam fee<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { usn, examFee } = req.body;
    const result = await db.collection('students').updateOne(
      { usn: usn }, 
      { $set: { examFee: parseFloat(examFee) } }
    );
    if (result.modifiedCount > 0) {
      res.send(`Student exam fee updated successfully<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Student not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});