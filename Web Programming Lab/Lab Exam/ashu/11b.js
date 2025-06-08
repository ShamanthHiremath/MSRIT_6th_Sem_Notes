const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1:27017';
const mongoUrl = `mongodb://${mongoHost}/attendance_db`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to attendance_db database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Attendance Management System</h1>
        <form action="/add-student" method="POST">
            Student Name: <input type="text" name="name" required><br><br>
            USN: <input type="text" name="usn" required><br><br>
            Class: <input type="text" name="class" required><br><br>
            Total Classes: <input type="number" name="total_classes" required><br><br>
            Classes Attended: <input type="number" name="classes_attended" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <a href="/low-attendance">View Students with Below 75% Attendance</a> | 
        <a href="/all-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { name, usn, class: studentClass, total_classes, classes_attended } = req.body;
    
    const attendance_percentage = (parseInt(classes_attended) / parseInt(total_classes)) * 100;
    
    var collection = db.collection('students');
    collection.insert({
        name: name,
        usn: usn,
        class: studentClass,
        total_classes: parseInt(total_classes),
        classes_attended: parseInt(classes_attended),
        attendance_percentage: parseFloat(attendance_percentage.toFixed(2))
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${name} added with ${attendance_percentage.toFixed(2)}% attendance. <a href="/">Back</a>`);
        }
    });
});

app.get('/low-attendance', (req, res) => {
    var collection = db.collection('students');
    collection.find({ attendance_percentage: { $lt: 75 } }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Students with Below 75% Attendance</h1>';
            if(results.length > 0) {
                results.forEach(student => {
                    html += `<p>${student.name} - ${student.usn} - ${student.class} - ${student.attendance_percentage}% (${student.classes_attended}/${student.total_classes})</p>`;
                });
            } else {
                html += '<p>No students found with below 75% attendance</p>';
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
            let html = '<h1>All Students Attendance</h1>';
            results.forEach(student => {
                html += `<p>${student.name} - ${student.usn} - ${student.class} - ${student.attendance_percentage}% (${student.classes_attended}/${student.total_classes})</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});