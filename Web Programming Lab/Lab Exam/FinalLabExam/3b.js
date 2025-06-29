// // (b) Develop a Node.js application using Express and MongoDB to perform the following tasks:
// Create a database named HR with a collection called employees.
// Each employee document should include the following fields: emp name, email, phone, hire date, job title, and salary.
// Design a web form to collect this information from the user and store it in the MongoDB database.
// Implement a GET route to display all employee records where the salary is greater than 50,000.


// in command line
// mongosh
// use HR
// db.createCollection('employees')

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
      db = client.db('HR');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'employee.html'));
  res.send(`
    <h1>HR Employee Management System</h1>
    
    <h2>Add New Employee</h2>
    <form action="/inserting" method="POST">
      Employee Name: <input type="text" name="empName" required><br><br>
      Email: <input type="email" name="email" required><br><br>
      Phone: <input type="tel" name="phone" required><br><br>
      Hire Date: <input type="date" name="hireDate" required><br><br>
      Job Title: <input type="text" name="jobTitle" required><br><br>
      Salary: <input type="number" name="salary" required min="0" step="0.01"><br><br>
      <button type="submit">Add Employee</button>
    </form>
    
    <br>
    <a href="/getting">View High Salary Employees (>50,000)</a><br>
    <a href="/all-employees">View All Employees</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { empName, email, phone, hireDate, jobTitle, salary } = req.body;
    
    await db.collection('employees').insertOne({ 
      empName: empName,
      email: email, 
      phone: phone,
      hireDate: new Date(hireDate),
      jobTitle: jobTitle,
      salary: parseFloat(salary)
    });
    res.send(`Employee added successfully!<br><a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('employees').find({ salary: { $gt: 50000 } }).toArray();
    // const xxx = await db.collection('employees').find({ jobTitle: { $in: ["manager", "sde"], }}).toArray();
    let html = '<h1>High Salary Employees (Salary > 50,000)</h1>';
    if (results.length === 0) {
      html += '<p>No employees found with salary greater than 50,000.</p>';
    } else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Name:</strong> ${value.empName}<br>
                   <strong>Email:</strong> ${value.email}<br>
                   <strong>Phone:</strong> ${value.phone}<br>
                   <strong>Hire Date:</strong> ${value.hireDate.toDateString()}<br>
                   <strong>Job Title:</strong> ${value.jobTitle}<br>
                   <strong>Salary:</strong> $${value.salary.toLocaleString()}
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all employees
app.get('/all-employees', async (req, res) => {
  try {
    const results = await db.collection('employees').find({}).toArray();
    let html = '<h1>All Employees</h1>';
    if (results.length === 0) {
      html += '<p>No employees found.</p>';
    }
    else {
      results.forEach(value => {
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Name:</strong> ${value.empName}<br>
                   <strong>Email:</strong> ${value.email}<br>
                   <strong>Phone:</strong> ${value.phone}<br>
                   <strong>Hire Date:</strong> ${value.hireDate.toDateString()}<br>
                   <strong>Job Title:</strong> ${value.jobTitle}<br>
                   <strong>Salary:</strong> $${value.salary.toLocaleString()}
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
    const { empName } = req.body;
    const result = await db.collection('employees').deleteMany({ empName: empName });
    res.send(`Deleted ${result.deletedCount} employee records<br><a href="/">Back</a>`);
  } 
  catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { empName, salary } = req.body;
    const result = await db.collection('employees').updateOne(
      { empName: empName }, 
      { $set: { salary: parseFloat(salary) } }
    );
    if (result.modifiedCount > 0) {
      res.send(`Employee salary updated successfully<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Employee not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});