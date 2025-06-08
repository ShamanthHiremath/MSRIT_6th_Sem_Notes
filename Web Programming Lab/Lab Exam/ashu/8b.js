const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoUrl = `mongodb://${mongoHost}:27017/FinalYears`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to FinalYears database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Final Year Campus Placement System</h1>
        <form action="/add-student" method="POST">
            USN: <input type="text" name="usn" required><br><br>
            Name: <input type="text" name="name" required><br><br>
            Company Name: <input type="text" name="company_name" required><br><br>
            <button type="submit">Add Student</button>
        </form>
        
        <a href="/infosys-students">View Infosys Selected Students</a> | 
        <a href="/all-students">View All Students</a>
    `);
});

app.post('/add-student', (req, res) => {
    const { usn, name, company_name } = req.body;
    
    var collection = db.collection('finalyears');
    collection.insert({
        usn: usn,
        name: name,
        company_name: company_name
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Student ${name} selected for ${company_name} added successfully. <a href="/">Back</a>`);
        }
    });
});

app.get('/infosys-students', (req, res) => {
    var collection = db.collection('finalyears');
    collection.find({ company_name: 'Infosys' }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>Students Selected for Infosys</h1>';
            if(results.length > 0) {
                results.forEach(student => {
                    html += `<p>${student.usn} - ${student.name} - ${student.company_name}</p>`;
                });
            } else {
                html += '<p>No students selected for Infosys</p>';
            }
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});

app.get('/all-students', (req, res) => {
    var collection = db.collection('finalyears');
    collection.find({}).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>All Placed Students</h1>';
            results.forEach(student => {
                html += `<p>${student.usn} - ${student.name} - ${student.company_name}</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});