// (b) Develop an Exam Management System using Node.js, Express, and MongoDB with the following functionality:
// Create a student database with appropriate fields such as: Student_ID, Name, Subject, Marks, and Eligibility_Status.
// Store the student data in a MongoDB collection.
// Implement logic to mark students as "Not Eligible" if their Marks < 20.
// Provide a GET route to display the list of students who are not eligible for the exam based on this criterion.

// in command line
// mongosh
// use ExamDB
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
      db = client.db('ExamDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'exam.html'));
  res.send(`
    <h1>Exam Management System</h1>
    
    <h2>Add Student Record</h2>
    <form action="/inserting" method="POST">
      Student ID: <input type="text" name="studentId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Subject: <input type="text" name="subject" required><br><br>
      Marks: <input type="number" name="marks" required min="0" max="100"><br><br>
      <button type="submit">Add Student</button>
    </form>
    
    <h2>Eligibility Criteria</h2>
    <p><strong>Eligibility Rule:</strong> Students with marks < 20 are marked as "Not Eligible"</p>
    <p><strong>Example:</strong> If a student scores 18 marks, they will be automatically marked as "Not Eligible"</p>
    
    <br>
    <a href="/getting">View Not Eligible Students</a><br>
    <a href="/all-students">View All Students</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { studentId, name, subject, marks } = req.body;
    
    // Implement logic to determine eligibility status based on marks
    const marksNum = parseFloat(marks);
    const eligibilityStatus = marksNum < 20 ? "Not Eligible" : "Eligible";
    
    await db.collection('students').insertOne({ 
      studentId: studentId,
      name: name,
      subject: subject,
      marks: marksNum,
      eligibilityStatus: eligibilityStatus
    });
    res.send(`Student record added successfully!<br>
              <strong>Student ID:</strong> ${studentId}<br>
              <strong>Name:</strong> ${name}<br>
              <strong>Subject:</strong> ${subject}<br>
              <strong>Marks:</strong> ${marks}<br>
              <strong>Eligibility Status:</strong> ${eligibilityStatus}<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('students').find({ 
      eligibilityStatus: "Not Eligible"
    }).toArray();
    let html = '<h1>Students Not Eligible for Exam</h1>';
    if (results.length === 0) {
      html += '<p>No students found who are not eligible for the exam.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ff6b6b; margin: 10px; padding: 10px; background-color: #ffe6e6;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Subject:</strong> ${value.subject}<br>
                   <strong>Marks:</strong> ${value.marks}<br>
                   <strong>Eligibility Status:</strong> <span style="color: red; font-weight: bold;">${value.eligibilityStatus}</span>
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
    let html = '<h1>All Student Records</h1>';
    if (results.length === 0) {
      html += '<p>No student records found.</p>';
    }
    else {
      results.forEach(value => {
        const statusColor = value.eligibilityStatus === "Not Eligible" ? "red" : "green";
        const bgColor = value.eligibilityStatus === "Not Eligible" ? "#ffe6e6" : "#e6ffe6";
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px; background-color: ${bgColor};">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Subject:</strong> ${value.subject}<br>
                   <strong>Marks:</strong> ${value.marks}<br>
                   <strong>Eligibility Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${value.eligibilityStatus}</span>
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
    const { studentId } = req.body;
    const result = await db.collection('students').deleteMany({ studentId: studentId });
    res.send(`Deleted ${result.deletedCount} student records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { studentId, name, subject, marks } = req.body;
    
    // Recalculate eligibility status based on updated marks
    const marksNum = parseFloat(marks);
    const eligibilityStatus = marksNum < 20 ? "Not Eligible" : "Eligible";
    
    const result = await db.collection('students').updateOne(
      { studentId: studentId }, 
      { 
        $set: { 
          name: name,
          subject: subject,
          marks: marksNum,
          eligibilityStatus: eligibilityStatus
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Student record updated successfully. New Eligibility Status: ${eligibilityStatus}<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Student not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});