const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1:27017';
const mongoUrl = `mongodb://${mongoHost}/exam_management`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to exam_management database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Exam Management System</h1>
        <form action="/add-student" method="POST">
            Student Name: <input type="text" name="name" required><br><br>
            USN: <input type="text" name="usn" required><br><br>
            Subject: <input type="text" name="subject" required><br><br>
            Marks: <input type="number" name="marks" required><br><br>
            Exam Date: <input type="date" name="exam_date" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <a href="/not-eligible">View Not Eligible Students (Marks < 20)</a> | 
        <a href="/all-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { name, usn, subject, marks, exam_date } = req.body;
    
    var collection = db.collection('students');
    collection.insert({
        name: name,
        usn: usn,
        subject: subject,
        marks: parseInt(marks),
        exam_date: exam_date,
        eligible: parseInt(marks) >= 20
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${name} added with ${marks} marks in ${subject}. <a href="/">Back</a>`);
        }
    });
});

app.get('/not-eligible', (req, res) => {
    var collection = db.collection('students');
    collection.find({ marks: { $lt: 20 } }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Not Eligible Students (Marks < 20)</h1>';
            if(results.length > 0) {
                results.forEach(student => {
                    html += `<p>${student.name} - ${student.usn} - ${student.subject} - ${student.marks} marks - ${student.exam_date}</p>`;
                });
            } else {
                html += '<p>No students found with marks below 20</p>';
            }
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});

app.get('/all-students', (req, res) => {
    var collection = db.collection('students');
    collection.find({}).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>All Students Exam Results</h1>';
            results.forEach(student => {
                html += `<p>${student.name} - ${student.usn} - ${student.subject} - ${student.marks} marks - ${student.exam_date}</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});