const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/student_records';

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to student_records database');
        db = database;        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Student Records</h1>
        <form action="/students" method="POST">
            USN: <input type="text" name="USN" required><br><br>
            Name: <input type="text" name="Name" required><br><br>
            Subject Code: <input type="text" name="Subject_code" required><br><br>
            CIE: <input type="number" name="CIE" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        <br>
        <a href="/students/low-cie">View Students with CIE < 20</a>
    `);
});

app.post('/students', (req, res) => {
    const { USN, Name, Subject_code, CIE } = req.body;   
    var collection = db.collection('students');
    collection.insert({USN: USN, Name: Name, Subject_code: Subject_code, CIE: parseInt(CIE)}, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${Name} added successfully. <a href="/">Back</a>`);
        }
    });
});

app.get('/students/low-cie', (req, res) => {
    var collection = db.collection('students');
    collection.find({ CIE: { $lt: 20 } }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Students with CIE < 20</h1>';
            results.forEach(student => {
                html += `<p>${student.USN} - ${student.Name} - ${student.Subject_code} - CIE: ${student.CIE}</p>`;
            });
            html += '<a href="/">Back</a>';
            res.send(html);
        }
    });
});