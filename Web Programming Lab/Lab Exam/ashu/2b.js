const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;

const mongoHost = process.env.MONGO_HOST || '127.0.0.1';

MongoClient.connect(`mongodb://${mongoHost}:27017/student_records`, function(err, database) {
    if (err) return console.log('Connection failed', err);
    db = database; 
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});

app.get('/', (req, res) => {
    res.send(`
        <form action="/add" method="post">
            Student Name: <input name="Student_name"><br>
            USN: <input name="USN"><br>
            Semester: <input name="semester"><br>
            Exam Fee Paid? (yes/no): <input name="exam_fee"><br>
            <button type="submit">Submit</button>
        </form>
        <br>
        <form action="/delete" method="post">
            <button type="submit">Delete Students Who Didn't Pay Exam Fees</button>
        </form>
    `);
});

app.post('/add', (req, res) => {
    const student = {
        Student_name: req.body.Student_name,
        USN: req.body.USN,
        semester: req.body.semester,
        exam_fee: req.body.exam_fee.toLowerCase()
    };
    db.collection('students').insert(student, function(err, result) {
        if (err) return res.send('Failed to insert');
        res.send('Student added successfully');
    });
});


app.post('/delete', (req, res) => {
    db.collection('students').remove({ exam_fee: { $ne: 'yes' } }, function(err, result) {
        if (err) return res.send('Failed to delete');
        const count = result && result.result ? result.result.n : 0;
        res.send(`Deleted ${count} students who haven't paid exam fees.`);
    });
});