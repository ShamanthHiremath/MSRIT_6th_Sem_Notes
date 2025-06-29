// (b) Develop a Node.js application using Express and MongoDB to create a portal for recording student startup ideas with the following features:
// Accept the following details from a web form: ID, Team_Name, Title, Domain, and Funding_Required.
// Store the submitted data in a MongoDB collection.
// Implement a GET route to display all startup ideas in the "EdTech" domain where the Funding Required exceeds ₹5 lakhs.
// Required and Store records. Display all startup ideas in "EdTech" domain needing funding > 5 lakhs

// in command line
// mongosh
// use StartupDB
// db.createCollection('startupIdeas')


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
      db = client.db('StartupDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'startup.html'));
  res.send(`
    <h1>Student Startup Ideas Portal</h1>
    
    <h2>Submit Your Startup Idea</h2>
    <form action="/inserting" method="POST">
      ID: <input type="text" name="id" required><br><br>
      Team Name: <input type="text" name="teamName" required><br><br>
      Title: <input type="text" name="title" required><br><br>
      Domain: <input type="text" name="domain" required placeholder="e.g., EdTech, FinTech, HealthTech"><br><br>
      Funding Required (₹ in lakhs): <input type="number" name="fundingRequired" required min="0" step="0.01"><br><br>
      <button type="submit">Submit Startup Idea</button>
    </form>
    
    <h2>Funding Information</h2>
    <p><strong>Note:</strong> Enter funding amount in lakhs (e.g., 5 for ₹5 lakhs, 10 for ₹10 lakhs)</p>
    <p><strong>Example:</strong> If you need ₹7.5 lakhs funding, enter 7.5</p>
    
    <br>
    <a href="/getting">View EdTech Ideas Needing > ₹5 Lakhs</a><br>
    <a href="/all-startups">View All Startup Ideas</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { id, teamName, title, domain, fundingRequired } = req.body;
    
    await db.collection('startupIdeas').insertOne({ 
      id: id,
      teamName: teamName,
      title: title,
      domain: domain,
      fundingRequired: parseFloat(fundingRequired)
    });
    res.send(`Startup idea submitted successfully!<br>
              <strong>ID:</strong> ${id}<br>
              <strong>Team Name:</strong> ${teamName}<br>
              <strong>Title:</strong> ${title}<br>
              <strong>Domain:</strong> ${domain}<br>
              <strong>Funding Required:</strong> ₹${fundingRequired} lakhs<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('startupIdeas').find({ 
      domain: 'EdTech',
      fundingRequired: { $gt: 5 }
    }).toArray();
    let html = '<h1>EdTech Startup Ideas Needing > ₹5 Lakhs</h1>';
    if (results.length === 0) {
      html += '<p>No EdTech startup ideas found that require funding exceeding ₹5 lakhs.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>ID:</strong> ${value.id}<br>
                   <strong>Team Name:</strong> ${value.teamName}<br>
                   <strong>Title:</strong> ${value.title}<br>
                   <strong>Domain:</strong> ${value.domain}<br>
                   <strong>Funding Required:</strong> ₹${value.fundingRequired} lakhs
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all startup ideas
app.get('/all-startups', async (req, res) => {
  try {
    const results = await db.collection('startupIdeas').find({}).toArray();
    let html = '<h1>All Startup Ideas</h1>';
    if (results.length === 0) {
      html += '<p>No startup ideas found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>ID:</strong> ${value.id}<br>
                   <strong>Team Name:</strong> ${value.teamName}<br>
                   <strong>Title:</strong> ${value.title}<br>
                   <strong>Domain:</strong> ${value.domain}<br>
                   <strong>Funding Required:</strong> ₹${value.fundingRequired} lakhs
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
    const { id } = req.body;
    const result = await db.collection('startupIdeas').deleteMany({ id: id });
    res.send(`Deleted ${result.deletedCount} startup idea records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { id, teamName, title, domain, fundingRequired } = req.body;
    
    const result = await db.collection('startupIdeas').updateOne(
      { id: id }, 
      { 
        $set: { 
          teamName: teamName,
          title: title,
          domain: domain,
          fundingRequired: parseFloat(fundingRequired)
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Startup idea updated successfully.<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Startup idea not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});