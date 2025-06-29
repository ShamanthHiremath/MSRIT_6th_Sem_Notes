//(b) Develop a Node.js application using Express and MongoDB to manage student records with the following features:
// Accept student details from a web form: Name, USN, Department, and Grade.
// Store the submitted information in a MongoDB database.
// Implement a PUT route to update the grade of a student by specifying the Name.
// Implement a GET route to display all student records from the database.

// in command line
// mongosh
// use StudentRecordsDB
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
      db = client.db('StudentRecordsDB');
      db.createCollection("students");
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
    <h1>Student Records Management System</h1>
    
    <h2>Add New Student</h2>
    <form action="/inserting" method="POST">
      Name: <input type="text" name="name" required><br><br>
      USN: <input type="text" name="usn" required><br><br>
      Department: <input type="text" name="department" required><br><br>
      Grade: 
      <select name="grade" required>
        <option value="">Select Grade</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select><br><br>
      <button type="submit">Add Student</button>
    </form>

    <!-- ##################### IMPORTANT ##################### -->

    
    <h2>Update Student Grade</h2>
      Student Name: <input id="upname" placeholder="Student Name">
      New Grade: 
      <select id="upgrade">
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
      <button onclick="update()">Update Grade</button>
      <p id="updateResult"></p>
    
    <!-- ##################### IMPORTANT ##################### -->


    <script>
      function update() {
        const name = document.getElementById('upname').value;
        const grade = document.getElementById('upgrade').value;
        fetch(\`/updating\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, grade: grade })
            })
            .then(res => res.text())
            .then(data => document.getElementById('updateResult').innerText = data);
        }
    </script>

    <br>
    <a href="/getting">View All Student Records</a><br>
    <a href="/all-students">View All Students (Alternative)</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { name, usn, department, grade } = req.body;
    
    await db.collection('students').insertOne({ 
      name: name,
      usn: usn, 
      department: department,
      grade: grade
    });
    res.send(`Student record added successfully!<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('students').find({}).toArray();
    let html = '<h1>All Student Records</h1>';
    if (results.length === 0) {
      html += '<p>No student records found.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>USN:</strong> ${value.usn}<br>
                   <strong>Department:</strong> ${value.department}<br>
                   <strong>Grade:</strong> ${value.grade}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all students (alternative implementation)
app.get('/all-students', async (req, res) => {
  try {
    const results = await db.collection('students').find({}).toArray();
    let html = '<h1>All Students (Alternative View)</h1>';
    if (results.length === 0) {
      html += '<p>No students found.</p>';
    }
    else {
      html += '<table border="1" style="border-collapse: collapse; width: 100%;">';
      html += '<tr><th>Name</th><th>USN</th><th>Department</th><th>Grade</th></tr>';
      results.forEach(value => {
        html += `<tr>
                   <td>${value.name}</td>
                   <td>${value.usn}</td>
                   <td>${value.department}</td>
                   <td>${value.grade}</td>
                 </tr>`;
      });
      html += '</table>';
    }
    html += '<br><a href="/">Back</a>';
    res.send(html);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/deleting', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.collection('students').deleteMany({ name: name });
    res.send(`Deleted ${result.deletedCount} student records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

// ✅ PUT - Update Student Grade by Name
app.put('/updating', async (req, res) => {
  try {
    const { name, grade } = req.body;

    const result = await db.collection('students').updateOne(
      { name: name },
      { $set: { grade: grade } }
    );

    if (result.matchedCount === 0) {
      res.send(`Student with name "${name}" not found.`);
    } else {
      res.send(`Student "${name}" grade updated to ${grade}.`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});