const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoHost = process.env.MONGO_HOST || '127.0.0.1';
const mongoUrl = `mongodb://${mongoHost}:27017/HR`;

MongoClient.connect(mongoUrl, function(err, database) {
    if(err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to HR database');
        db = database;
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
});

// POST endpoint to add employee records
app.post('/employees', (req, res) => {
    const { emp_name, email, phone, hire_date, job_title, salary } = req.body;
    
    var collection = db.collection('employees');
    collection.insert({
        emp_name: emp_name,
        email: email,
        phone: phone,
        hire_date: hire_date,
        job_title: job_title,
        salary: salary
    }, function(err, docs) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Employee record added' });
        }
    });
});

// GET endpoint to retrieve employees with salary > 50000
app.get('/employees/high-salary', (req, res) => {
    var collection = db.collection('employees');
    collection.find({ salary: { $gt: 50000 } }).toArray(function(err, results) {
        if(err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
});