// (b) Develop an Attendance Management System using Node.js, Express, anc MongoDB with the following features:
// Create a student database with appropriate fields such as:
// Student_ID, Name, Course, Total_Attendance, Classes_Attended, and Attendance_Percentage.
// Calculate the Attendance_Percentage as:
// Attendance_Percentage = (Classes_Attended / Total_Attendance) * 100.
// Implement a GET route to display all students whose attendance is below 75%.

// in command line
// mongosh
// use AttendanceDB
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
      db = client.db('AttendanceDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'attendance.html'));
  res.send(`
    <h1>Attendance Management System</h1>
    
    <h2>Add Student Attendance Record</h2>
    <form action="/inserting" method="POST">
      Student ID: <input type="text" name="studentId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Course: <input type="text" name="course" required><br><br>
      Total Attendance: <input type="number" name="totalAttendance" required min="1"><br><br>
      Classes Attended: <input type="number" name="classesAttended" required min="0"><br><br>
      <button type="submit">Add Student Record</button>
    </form>
    
    <h2>Attendance Calculation</h2>
    <p><strong>Formula:</strong> Attendance_Percentage = (Classes_Attended / Total_Attendance) × 100</p>
    <p><strong>Example:</strong> If Total Classes = 50 and Attended = 40, then Attendance = (40 / 50) × 100 = 80%</p>
    <p><strong>Minimum Requirement:</strong> Students need at least 75% attendance</p>
    
    <br>
    <a href="/getting">View Students Below 75% Attendance</a><br>
    <a href="/all-students">View All Student Records</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { studentId, name, course, totalAttendance, classesAttended } = req.body;
    
    // Calculate Attendance Percentage using the formula: (Classes_Attended / Total_Attendance) * 100
    const totalAttendanceNum = parseInt(totalAttendance);
    const classesAttendedNum = parseInt(classesAttended);
    
    // Validation: Classes attended cannot exceed total attendance
    if (classesAttendedNum > totalAttendanceNum) {
      return res.send(`Error: Classes attended (${classesAttendedNum}) cannot exceed total attendance (${totalAttendanceNum})<br><a href="/">Back</a>`);
    }
    
    const attendancePercentage = (classesAttendedNum / totalAttendanceNum) * 100;
    
    await db.collection('students').insertOne({ 
      studentId: studentId,
      name: name,
      course: course,
      totalAttendance: totalAttendanceNum,
      classesAttended: classesAttendedNum,
      attendancePercentage: parseFloat(attendancePercentage.toFixed(2))
    });
    res.send(`Student attendance record added successfully!<br>
              <strong>Student ID:</strong> ${studentId}<br>
              <strong>Name:</strong> ${name}<br>
              <strong>Course:</strong> ${course}<br>
              <strong>Total Attendance:</strong> ${totalAttendance}<br>
              <strong>Classes Attended:</strong> ${classesAttended}<br>
              <strong>Attendance Percentage:</strong> ${attendancePercentage.toFixed(2)}%<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('students').find({ 
      attendancePercentage: { $lt: 75 }
    }).toArray();
    let html = '<h1>Students with Attendance Below 75%</h1>';
    if (results.length === 0) {
      html += '<p>No students found with attendance below 75%.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ff6b6b; margin: 10px; padding: 10px; background-color: #ffe6e6;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Course:</strong> ${value.course}<br>
                   <strong>Total Attendance:</strong> ${value.totalAttendance}<br>
                   <strong>Classes Attended:</strong> ${value.classesAttended}<br>
                   <strong>Attendance Percentage:</strong> <span style="color: red; font-weight: bold;">${value.attendancePercentage}%</span><br>
                   <strong>Shortfall:</strong> ${(75 - value.attendancePercentage).toFixed(2)}% below requirement
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all student records
app.get('/all-students', async (req, res) => {
  try {
    const results = await db.collection('students').find({}).toArray();
    let html = '<h1>All Student Attendance Records</h1>';
    if (results.length === 0) {
      html += '<p>No student attendance records found.</p>';
    }
    else {
      results.forEach(value => {
        const statusColor = value.attendancePercentage < 75 ? "red" : "green";
        const bgColor = value.attendancePercentage < 75 ? "#ffe6e6" : "#e6ffe6";
        const status = value.attendancePercentage >= 75 ? "Sufficient" : "Below Requirement";
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px; background-color: ${bgColor};">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Course:</strong> ${value.course}<br>
                   <strong>Total Attendance:</strong> ${value.totalAttendance}<br>
                   <strong>Classes Attended:</strong> ${value.classesAttended}<br>
                   <strong>Attendance Percentage:</strong> <span style="color: ${statusColor}; font-weight: bold;">${value.attendancePercentage}%</span><br>
                   <strong>Status:</strong> <span style="color: ${statusColor};">${status}</span>
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
    res.send(`Deleted ${result.deletedCount} student attendance records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { studentId, name, course, totalAttendance, classesAttended } = req.body;
    
    // Recalculate Attendance Percentage if attendance data is updated
    const totalAttendanceNum = parseInt(totalAttendance);
    const classesAttendedNum = parseInt(classesAttended);
    
    // Validation: Classes attended cannot exceed total attendance
    if (classesAttendedNum > totalAttendanceNum) {
      return res.send(`Error: Classes attended (${classesAttendedNum}) cannot exceed total attendance (${totalAttendanceNum})<br><a href="/">Back</a>`);
    }
    
    const attendancePercentage = (classesAttendedNum / totalAttendanceNum) * 100;
    
    const result = await db.collection('students').updateOne(
      { studentId: studentId }, 
      { 
        $set: { 
          name: name,
          course: course,
          totalAttendance: totalAttendanceNum,
          classesAttended: classesAttendedNum,
          attendancePercentage: parseFloat(attendancePercentage.toFixed(2))
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Student attendance record updated successfully. New Attendance Percentage: ${attendancePercentage.toFixed(2)}%<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Student not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});