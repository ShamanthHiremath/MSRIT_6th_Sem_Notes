const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1:27017';
const mongoUrl = `mongodb://${mongoHost}/faculty_db`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to faculty_db database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Faculty Management System</h1>
        <form action="/add-faculty" method="POST">
            ID: <input type="text" name="id" required><br><br>
            Title: <input type="text" name="title" required><br><br>
            Name: <input type="text" name="name" required><br><br>
            Branch: <input type="text" name="branch" required><br><br>
            <button type="submit">Add Faculty</button>
        </form>
        
        <a href="/cse-professors">View CSE Professors</a> | 
        <a href="/all-faculty">View All Faculty</a>
    `);
});

app.post('/add-faculty', (req, res) => {
    const { id, title, name, branch } = req.body;
    
    var collection = db.collection('faculty');
    collection.insert({
        id: id,
        title: title,
        name: name,
        branch: branch
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send(`Faculty ${name} with title ${title} from ${branch} branch added successfully. <a href="/">Back</a>`);
        }
    });
});

app.get('/cse-professors', (req, res) => {
    var collection = db.collection('faculty');
    collection.find({ branch: 'CSE', title: 'PROFESSOR' }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>CSE Professors</h1>';
            if(results.length > 0) {
                results.forEach(faculty => {
                    html += `<p>ID: ${faculty.id} - ${faculty.title} ${faculty.name} - ${faculty.branch}</p>`;
                });
            } else {
                html += '<p>No professors found in CSE branch</p>';
            }
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});

app.get('/all-faculty', (req, res) => {
    var collection = db.collection('faculty');
    collection.find({}).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            let html = '<h1>All Faculty</h1>';
            results.forEach(faculty => {
                html += `<p>ID: ${faculty.id} - ${faculty.title} ${faculty.name} - ${faculty.branch}</p>`;
            });
            html += '<a href="/">Back to Home</a>';
            res.send(html);
        }
    });
});