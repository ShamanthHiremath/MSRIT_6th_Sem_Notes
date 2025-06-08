const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoUrl = `mongodb://${mongoHost}:27017/exam_management`;

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
            Grade: <select name="grade" required>
                <option value="">Select Grade</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <a href="/s-grade-students">View S Grade Students</a> | 
        <a href="/all-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { name, usn, subject, marks, grade } = req.body;
    
    var collection = db.collection('students');
    collection.insert({
        name: name,
        usn: usn,
        subject: subject,
        marks: parseInt(marks),
        grade: grade,
        exam_date: new Date()
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${name} added successfully with grade ${grade}. <a href="/">Back</a>`);
        }
    });
});

app.get('/s-grade-students', (req, res) => {
    var collection = db.collection('students');
    collection.find({ grade: 'S' }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Students with S Grade</h1>';
            if(results.length > 0) {
                results.forEach(student => {
                    html += `<p>${student.name} - ${student.usn} - ${student.subject} - ${student.marks} marks - Grade: ${student.grade}</p>`;
                });
            } else {
                html += '<p>No students found with S grade</p>';
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
            let html = '<h1>All Students</h1>';
            results.forEach(student => {
                html += `<p>${student.name} - ${student.usn} - ${student.subject} - ${student.marks} marks - Grade: ${student.grade}</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});