// (b) Build an Internship Tracking System using Node.js, Express, and MongoDB with the following requirements:
// Create a MongoDB collection to store internship details with fields: Student_ID, Name, Company, Duration, and Status.
// Accept internship data through a web form and store it in the database.
// Implement a GET route to display all students interning at "Infosys".
// Implement a PUT route to update the status when a student's internship is marked as completed.

// in command line
// mongosh
// use InternshipDB
// db.createCollection('internships')

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
      db = client.db('InternshipDB');
      db.createCollection("internships");
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'internship.html'));
  res.send(`
    <h1>Internship Tracking System</h1>
    
    <h2>Add New Internship</h2>
    <form action="/inserting" method="POST">
      Student ID: <input type="text" name="studentId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Company: <input type="text" name="company" required><br><br>
      Duration: <input type="text" name="duration" required placeholder="e.g., 3 months"><br><br>
      Status: 
      <select name="status" required>
        <option value="">Select Status</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select><br><br>
      <button type="submit">Add Internship</button>
    </form>
    
    <!-- ##################### IMPORTANT ##################### -->


    <h2>Update Internship Status</h2>
      Student ID: <input id="upid" placeholder="Student ID">
      Status: 
      <select id="upstatus">
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
      <button onclick="update()">Update Status</button>
      <p id="updateResult"></p>

    <!-- ##################### IMPORTANT ##################### -->
      

    <script>
      function update() {
        const studentId = document.getElementById('upid').value;
        const status = document.getElementById('upstatus').value;
        fetch(\`/updating\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: studentId, status: status })
            })
            .then(res => res.text())
            .then(data => document.getElementById('updateResult').innerText = data);
        }
    </script>

    <br>
    <a href="/getting">View Infosys Interns</a><br>
    <a href="/all-internships">View All Internships</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { studentId, name, company, duration, status } = req.body;
    
    await db.collection('internships').insertOne({ 
      studentId: studentId,
      name: name, 
      company: company,
      duration: duration,
      status: status
    });
    res.send(`Internship record added successfully!<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('internships').find({ company: "Infosys" }).toArray();
    let html = '<h1>Students Interning at Infosys</h1>';
    if (results.length === 0) {
      html += '<p>No students found interning at Infosys.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Company:</strong> ${value.company}<br>
                   <strong>Duration:</strong> ${value.duration}<br>
                   <strong>Status:</strong> ${value.status}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all internships
app.get('/all-internships', async (req, res) => {
  try {
    const results = await db.collection('internships').find({}).toArray();
    let html = '<h1>All Internships</h1>';
    if (results.length === 0) {
      html += '<p>No internships found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Company:</strong> ${value.company}<br>
                   <strong>Duration:</strong> ${value.duration}<br>
                   <strong>Status:</strong> ${value.status}
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
    const result = await db.collection('internships').deleteMany({ studentId: studentId });
    res.send(`Deleted ${result.deletedCount} internship records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

// ✅ PUT - Update Internship Status
app.put('/updating', async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const result = await db.collection('internships').updateOne(
      { studentId: studentId },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      res.send(`Student with ID ${studentId} not found.`);
    } else {
      res.send(`Student ${studentId} internship status updated to ${status}.`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});