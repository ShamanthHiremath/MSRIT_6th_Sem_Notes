//works for mongodb driver(node_modules) 3 and above and server(pc) 4 and above
//mongod --version(for server) npm list mongodb(for driver)
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;
const mongoUrl = 'mongodb://127.0.0.1:27017';

MongoClient.connect(mongoUrl)
  .then(
    client => {
      console.log("mongodb connected");
      db = client.db('my_db');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
  res.send(`
    <h1>Student Records</h1>
    
    <h2>Add Student</h2>
    <form action="/inserting" method="POST">
      Name: <input type="text" name="name" required><br><br>
      Semester: <input type="number" name="semester" required><br><br>
      <button type="submit">Add Student</button>
    </form>
    
    <h2>Update Student</h2>
    <form action="/updating" method="POST">
      Student Name to Update: <input type="text" name="name" required><br><br>
      New Semester: <input type="number" name="semester" required><br><br>
      <button type="submit">Update</button>
    </form>
    
    <h2>Delete Student</h2>
    <form action="/deleting" method="POST">
      Student Name to Delete: <input type="text" name="name" required><br><br>
      <button type="submit">Delete</button>
    </form>
    
    <br>
    <a href="/getting">View All Students</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { name, semester } = req.body;
    await db.collection('my_collection').insertOne({ 
      name: name, 
      semester: parseInt(semester) 
    });
    res.send("Insertion successful!<br><a href='/'>Back</a>");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    const results = await db.collection('my_collection').find({}).toArray();
    let html = '<h1>All Students</h1>';
    results.forEach(value => {
      html += `<p>${value.name} - Semester: ${value.semester}</p>`;
    });
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/deleting', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await db.collection('my_collection').deleteMany({ name: name });
    res.send(`Deleted ${result.deletedCount} entries<br><a href="/">Back</a>`);
  } catch (err) {
    res.send('Failed to delete<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { name, semester } = req.body;
    const result = await db.collection('my_collection').updateOne(
      { name: name }, 
      { $set: { semester: parseInt(semester) } }
    );
    if (result.modifiedCount > 0) {
      res.send(`Successfully updated<br><a href="/">Back</a>`);
    } else {
      res.send(`Data not found<br><a href="/">Back</a>`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});