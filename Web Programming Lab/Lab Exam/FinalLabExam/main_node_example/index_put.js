// // (b) Write a Complaint Management API using Node.js, Express, and MongoDB with the following features:
// Each complaint should include: Complaint ID, User Name, Issue, and Status.
// Implement a POST route to submit a new complaint.
// Implement a PUT route to update the status of a complaint (e.g., "In Progress", "Resolved").
// Implement a GET route to retrieve all complaints that are currently pending.

// in command line
// mongosh
// use mydb
// db.createCollection('complaints')

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
      db = client.db('my_db');
      db.createCollection("my_collection");
        // db.createCollection("complaints"); // Uncomment if you want to create a collection explicitly
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err.message);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'complaint.html'));
  res.send(`
    <h1>Complaint Management System</h1>
    
    <h2>Submit New Complaint</h2>
    <form action="/inserting" method="POST">
      User Name: <input type="text" name="userName" required><br><br>
      Issue: <input type="text" name="issue" required ><br><br>
      <button type="submit">Submit Complaint</button>
    </form>
    

    <!-- ##################### IMPORTANT ##################### -->


    <h2>Update Complaint Status</h2>
      Complaint ID: <input type="text" id="upid" placeholder="Complaint ID">
      Status: 
      <select id="upstatus">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <button onclick="update()">Update</button>
      <p id="updateResult"></p>
    
    
      <!-- ##################### IMPORTANT ##################### -->

    <script>
      function update() {
        const complaintId = document.getElementById('upid').value;
        const status = document.getElementById('upstatus').value;


        fetch(\`/updating\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complaintId: complaintId, status: status })
            })
            .then(res => res.text())
            .then(data => document.getElementById('updateResult').innerText = data);
        }
    </script>

    <br>
    <a href="/getting">View Pending Complaints</a><br>
    <a href="/all-complaints">View All Complaints</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { userName, issue } = req.body;
    
    // Generate a unique complaint ID
    const complaintId = 'CMP' + Date.now();
    
    await db.collection('my_collection').insertOne({ 
      complaintId: complaintId,
      userName: userName, 
      issue: issue,
      status: "Pending"
    });
    res.send(`Complaint submitted successfully! Complaint ID: ${complaintId}<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('my_collection').find({ status: "Pending" }).toArray();
    let html = '<h1>Pending Complaints</h1>';
    if (results.length === 0) {
      html += '<p>No pending complaints found.</p>';
    } else {
        // res.json(results);
      results.forEach(value => {
        html += `<div >
                   <strong>Complaint ID:</strong> ${value.complaintId}<br>
                   <strong>User:</strong> ${value.userName}<br>
                   <strong>Issue:</strong> ${value.issue}<br>
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

// Additional route to view all complaints
app.get('/all-complaints', async (req, res) => {
  try {
    const results = await db.collection('my_collection').find({}).toArray();
    let html = '<h1>All Complaints</h1>';
    if (results.length === 0) {
      html += '<p>No complaints found.</p>';
    }
    else {
        // res.json(results);
      results.forEach(value => {
        html += `<div >
                   <strong>Complaint ID:</strong> ${value.complaintId}<br>
                   <strong>User:</strong> ${value.userName}<br>
                   <strong>Issue:</strong> ${value.issue}<br>
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
    const { name } = req.body;
    const result = await db.collection('my_collection').deleteMany({ name: name });
    res.send(`Deleted ${result.deletedCount} entries<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

// ✅ PUT - Update Complaint Status
app.put('/updating', async (req, res) => {
  try {
    const { complaintId, status } = req.body;

    const result = await db.collection('my_collection').updateOne(
      { complaintId: complaintId },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      res.send(`Complaint with ID ${complaintId} not found.`);
    } else {
      res.send(`Complaint ${complaintId} status updated to ${status}.`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});