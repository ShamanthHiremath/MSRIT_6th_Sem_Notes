const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1:27017';
const mongoUrl = `mongodb://${mongoHost}/student_info`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to student_info database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Student Information System</h1>
        <form action="/add-student" method="POST">
            User Name: <input type="text" name="username" required><br><br>
            Branch: <input type="text" name="branch" required><br><br>
            Semester: <input type="number" name="semester" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <a href="/cse-6th-sem">View 6th Semester CSE Students</a> | 
        <a href="/all-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { username, branch, semester } = req.body;
    
    var collection = db.collection('students');
    collection.insert({
        username: username,
        branch: branch,
        semester: parseInt(semester)
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${username} from ${branch} branch, ${semester} semester added successfully. <a href="/">Back</a>`);
        }
    });
});

app.get('/cse-6th-sem', (req, res) => {
    var collection = db.collection('students');
    collection.find({ branch: 'CSE', semester: 6 }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>6th Semester CSE Students</h1>';
            if(results.length > 0) {
                results.forEach(student => {
                    html += `<p>${student.username} - ${student.branch} - Semester ${student.semester}</p>`;
                });
            } else {
                html += '<p>No students found in 6th semester CSE</p>';
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
                html += `<p>${student.username} - ${student.branch} - Semester ${student.semester}</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});