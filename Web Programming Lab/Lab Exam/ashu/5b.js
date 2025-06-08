const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoUrl = `mongodb://${mongoHost}:27017/student_db`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to student_db database');
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
            Name: <input type="text" name="name" required><br><br>
            USN: <input type="text" name="usn" required><br><br>
            Dept: <input type="text" name="dept" required><br><br>
            Grade: <input type="text" name="grade" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <form action="/update-grade" method="POST">
            Name: <input type="text" name="name" required><br><br>
            New Grade: <input type="text" name="grade" required><br><br>
            <button type="submit">Update Grade</button>
        </form>
        
        <a href="/view-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { name, usn, dept, grade } = req.body;
    var collection = db.collection('students');
    collection.insert({name: name, usn: usn, dept: dept, grade: grade}, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${name} added successfully. <a href="/">Back</a>`);
        }
    });
});

app.post('/update-grade', (req, res) => {
    const { name, grade } = req.body;
    console.log('Update request - Name:', name, 'Grade:', grade);
    var collection = db.collection('students');
    collection.update({name: name}, {$set: {grade: grade}}, function(err, result) {
        console.log('Update result - Error:', err, 'Result:', result);
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            const numUpdated = result.result ? result.result.n : result;
            if(numUpdated > 0) {
                res.send(`Grade updated for ${name} to ${grade}. <a href="/">Back</a>`);
            } else {
                res.send(`Student ${name} not found. <a href="/">Back</a>`);
            }
        }
    });
});

app.get('/view-students', (req, res) => {
    var collection = db.collection('students');
    collection.find({}).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>All Students</h1>';
            results.forEach(student => {
                html += `<p>${student.name} - ${student.usn} - ${student.dept} - ${student.grade}</p>`;
            });
            html += '<a href="/">Back</a>';
            res.send(html);
        }
    });
});