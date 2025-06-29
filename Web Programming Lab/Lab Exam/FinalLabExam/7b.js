// (b) Create a Node.js application using Express and MongoDB to manage course enrollments with the following features:
// Accept enrollment details through a web form: Student_ID, Name, Course Name, Duration, and Status.
// Store the enrollment data in a MongoDB collection.
// Implement a GET route to display all active enrollments (Status: "active").
// Implement a PUT route to update the status of an enrollment to "completed" based on Student_ID or Course_Name.

// in command line
// mongosh
// use CourseEnrollmentDB
// db.createCollection('enrollments')

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
      db = client.db('CourseEnrollmentDB');
      db.createCollection("enrollments");
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'enrollment.html'));
  res.send(`
    <h1>Course Enrollment Management System</h1>
    
    <h2>Add New Enrollment</h2>
    <form action="/inserting" method="POST">
      Student ID: <input type="text" name="studentId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Course Name: <input type="text" name="courseName" required><br><br>
      Duration: <input type="text" name="duration" required placeholder="e.g., 3 months"><br><br>
      Status: 
      <select name="status" required>
        <option value="">Select Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="dropped">Dropped</option>
      </select><br><br>
      <button type="submit">Add Enrollment</button>
    </form>


    <!-- ##################### IMPORTANT ##################### -->

    
    <h2>Update Enrollment Status to Completed</h2>
      <label>Search by:</label><br>
      <input type="radio" name="searchType" value="studentId" id="searchByStudentId" checked>
      <label for="searchByStudentId">Student ID</label><br>
      <input type="radio" name="searchType" value="courseName" id="searchByCourseName">
      <label for="searchByCourseName">Course Name</label><br><br>
      
      <input id="searchValue" placeholder="Enter Student ID or Course Name">
      <button onclick="update()">Mark as Completed</button>
      <p id="updateResult"></p>
    

    <!-- ##################### IMPORTANT ##################### -->


    <script>
      function update() {
        const searchType = document.querySelector('input[name="searchType"]:checked').value;
        const searchValue = document.getElementById('searchValue').value;
        
        let updateData = { status: "completed" };
        if (searchType === "studentId") {
          updateData.studentId = searchValue;
        } else {
          updateData.courseName = searchValue;
        }
        
        fetch(\`/updating\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            })
            .then(res => res.text())
            .then(data => document.getElementById('updateResult').innerText = data);
        }
    </script>

    <br>
    <a href="/getting">View Active Enrollments</a><br>
    <a href="/all-enrollments">View All Enrollments</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { studentId, name, courseName, duration, status } = req.body;
    
    await db.collection('enrollments').insertOne({ 
      studentId: studentId,
      name: name, 
      courseName: courseName,
      duration: duration,
      status: status
    });
    res.send(`Enrollment added successfully!<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('enrollments').find({ status: "active" }).toArray();
    let html = '<h1>Active Enrollments</h1>';
    if (results.length === 0) {
      html += '<p>No active enrollments found.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Course Name:</strong> ${value.courseName}<br>
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

// Additional route to view all enrollments
app.get('/all-enrollments', async (req, res) => {
  try {
    const results = await db.collection('enrollments').find({}).toArray();
    let html = '<h1>All Enrollments</h1>';
    if (results.length === 0) {
      html += '<p>No enrollments found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Student ID:</strong> ${value.studentId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Course Name:</strong> ${value.courseName}<br>
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
    const result = await db.collection('enrollments').deleteMany({ studentId: studentId });
    res.send(`Deleted ${result.deletedCount} enrollment records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

// ✅ PUT - Update Enrollment Status to Completed based on Student_ID or Course_Name
app.put('/updating', async (req, res) => {
  try {
    const { studentId, courseName, status } = req.body;
    let query = {};
    let identifier = "";

    // Determine search criteria based on provided data
    if (studentId) {
      query = { studentId: studentId };
      identifier = `Student ID: ${studentId}`;
    } else if (courseName) {
      query = { courseName: courseName };
      identifier = `Course Name: ${courseName}`;
    } else {
      return res.send("Please provide either Student ID or Course Name.");
    }

    const result = await db.collection('enrollments').updateMany(
      query,
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      res.send(`No enrollments found for ${identifier}.`);
    } else {
      res.send(`${result.modifiedCount} enrollment(s) updated to ${status} for ${identifier}.`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});