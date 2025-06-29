// (b) Develop a Node.js application using Express and MongoDB to manage hospital data with the following requirements:
// Accept and store hospital details: Hospital_ID, Name, Location, Total_Beds, and Occupied_Beds using a web form.
// Store this information in a MongoDB collection.
// Implement a GET route to display all hospitals where available beds (Total_Beds - Occupied_Beds) are less than 10.
// Implement a POST route to admit a patient, which will increment the Occupied_Beds count for the specified hospital.

// in command line
// mongosh
// use HospitalDB
// db.createCollection('hospitals')


const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const path = require('path');

const app = express();
const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const mongoUrl = 'mongodb://127.0.0.1:27017';
// const mongoUrl = 'mongodb://localhost:27017';


MongoClient.connect(mongoUrl)
  .then(
    client => {
      console.log("mongodb connected");
      db = client.db('HospitalDB');
      app.listen(port, () => {
        console.log(`Server is connected at ${port}`);
      });
  })
  .catch(err => {
    console.log("Cant connect to mongodb, Error:", err);
  });

app.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, 'hospital.html'));
  res.send(`
    <h1>Hospital Data Management System</h1>
    
    <h2>Add New Hospital</h2>
    <form action="/inserting" method="POST">
      Hospital ID: <input type="text" name="hospitalId" required><br><br>
      Name: <input type="text" name="name" required><br><br>
      Location: <input type="text" name="location" required><br><br>
      Total Beds: <input type="number" name="totalBeds" required min="1"><br><br>
      Occupied Beds: <input type="number" name="occupiedBeds" required min="0"><br><br>
      <button type="submit">Add Hospital</button>
    </form>
    
    <h2>Admit Patient</h2>
    <form action="/deleting" method="POST">
      Hospital ID: <input type="text" name="hospitalId" required><br><br>
      <button type="submit">Admit Patient (Increment Occupied Beds)</button>
    </form>
    
    <h2>Bed Availability Info</h2>
    <p><strong>Available Beds</strong> = Total Beds - Occupied Beds</p>
    <p>The system will show hospitals with <strong>less than 10 available beds</strong> as they need urgent attention.</p>
    
    <br>
    <a href="/getting">View Hospitals with Low Bed Availability (< 10)</a><br>
    <a href="/all-hospitals">View All Hospitals</a>
  `);
});

app.post('/inserting', async (req, res) => {
  try {
    const { hospitalId, name, location, totalBeds, occupiedBeds } = req.body;
    
    const totalBedsNum = parseInt(totalBeds);
    const occupiedBedsNum = parseInt(occupiedBeds);
    
    // Validation: Occupied beds cannot exceed total beds
    if (occupiedBedsNum > totalBedsNum) {
      return res.send(`Error: Occupied beds (${occupiedBedsNum}) cannot exceed total beds (${totalBedsNum})<br><a href='/'>Back</a>`);
    }
    
    const availableBeds = totalBedsNum - occupiedBedsNum;
    
    await db.collection('hospitals').insertOne({ 
      hospitalId: hospitalId,
      name: name, 
      location: location,
      totalBeds: totalBedsNum,
      occupiedBeds: occupiedBedsNum,
      availableBeds: availableBeds
    });
    res.send(`Hospital added successfully!<br>
              <strong>Available Beds:</strong> ${availableBeds}<br>
              <a href='/'>Back</a>`);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getting', async (req, res) => {
  try {
    // Find hospitals where available beds (Total_Beds - Occupied_Beds) are less than 10
    const results = await db.collection('hospitals').find({
      $expr: { $lt: [{ $subtract: ["$totalBeds", "$occupiedBeds"] }, 10] }
    }).toArray();
    
    let html = '<h1>Hospitals with Low Bed Availability (< 10 beds)</h1>';
    if (results.length === 0) {
      html += '<p>No hospitals found with available beds less than 10.</p>';
    } else {
      results.forEach(value => {
        const availableBeds = value.totalBeds - value.occupiedBeds;
        const occupancyRate = ((value.occupiedBeds / value.totalBeds) * 100).toFixed(1);
        html += `<div style="border: 1px solid #red; margin: 10px; padding: 10px; background-color: #ffe6e6;">
                   <strong>Hospital ID:</strong> ${value.hospitalId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Location:</strong> ${value.location}<br>
                   <strong>Total Beds:</strong> ${value.totalBeds}<br>
                   <strong>Occupied Beds:</strong> ${value.occupiedBeds}<br>
                   <strong>Available Beds:</strong> ${availableBeds} ⚠️<br>
                   <strong>Occupancy Rate:</strong> ${occupancyRate}%
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional route to view all hospitals
app.get('/all-hospitals', async (req, res) => {
  try {
    const results = await db.collection('hospitals').find({}).toArray();
    let html = '<h1>All Hospitals</h1>';
    if (results.length === 0) {
      html += '<p>No hospitals found.</p>';
    }
    else {
      results.forEach(value => {
        const availableBeds = value.totalBeds - value.occupiedBeds;
        const occupancyRate = ((value.occupiedBeds / value.totalBeds) * 100).toFixed(1);
        const bedStatus = availableBeds < 10 ? '⚠️ Low' : '✅ Good';
        html += `<div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                   <strong>Hospital ID:</strong> ${value.hospitalId}<br>
                   <strong>Name:</strong> ${value.name}<br>
                   <strong>Location:</strong> ${value.location}<br>
                   <strong>Total Beds:</strong> ${value.totalBeds}<br>
                   <strong>Occupied Beds:</strong> ${value.occupiedBeds}<br>
                   <strong>Available Beds:</strong> ${availableBeds}<br>
                   <strong>Bed Status:</strong> ${bedStatus}<br>
                   <strong>Occupancy Rate:</strong> ${occupancyRate}%
                 </div>`;
      });
    }
    html += '<a href="/">Back</a>';
    res.send(html);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to admit a patient (increment Occupied_Beds count)
app.post('/deleting', async (req, res) => {
  try {
    const { hospitalId } = req.body;
    
    // First, get the current hospital data
    const hospital = await db.collection('hospitals').findOne({ hospitalId: hospitalId });
    
    if (!hospital) {
      return res.send(`Hospital with ID "${hospitalId}" not found<br><a href="/">Back</a>`);
    }
    
    // Check if hospital has available beds
    if (hospital.occupiedBeds >= hospital.totalBeds) {
      return res.send(`Cannot admit patient. Hospital "${hospital.name}" is at full capacity!<br>
                       Total Beds: ${hospital.totalBeds}, Occupied: ${hospital.occupiedBeds}<br>
                       <a href="/">Back</a>`);
    }
    
    // Increment occupied beds count
    const result = await db.collection('hospitals').updateOne(
      { hospitalId: hospitalId },
      { 
        $inc: { occupiedBeds: 1 },
        $set: { availableBeds: hospital.availableBeds - 1 }
      }
    );
    
    if (result.modifiedCount > 0) {
      const newAvailableBeds = hospital.totalBeds - (hospital.occupiedBeds + 1);
      res.send(`Patient admitted successfully!<br>
                Hospital: ${hospital.name}<br>
                Occupied Beds: ${hospital.occupiedBeds + 1}/${hospital.totalBeds}<br>
                Available Beds: ${newAvailableBeds}<br>
                <a href="/">Back</a>`);
    } else {
      res.send(`Failed to admit patient<br><a href="/">Back</a>`);
    }
  } 
  catch (err) {
    res.send('Failed to admit patient<br><a href="/">Back</a>');
  }
});

app.post('/updating', async (req, res) => {
  try {
    const { hospitalId, totalBeds, occupiedBeds } = req.body;
    
    const totalBedsNum = parseInt(totalBeds);
    const occupiedBedsNum = parseInt(occupiedBeds);
    
    // Validation
    if (occupiedBedsNum > totalBedsNum) {
      return res.send(`Error: Occupied beds cannot exceed total beds<br><a href="/">Back</a>`);
    }
    
    const availableBeds = totalBedsNum - occupiedBedsNum;
    
    const result = await db.collection('hospitals').updateOne(
      { hospitalId: hospitalId }, 
      { 
        $set: { 
          totalBeds: totalBedsNum,
          occupiedBeds: occupiedBedsNum,
          availableBeds: availableBeds
        } 
      }
    );
    if (result.modifiedCount > 0) {
      res.send(`Hospital data updated successfully<br>Available Beds: ${availableBeds}<br><a href="/">Back</a>`);
    }
    else {
      res.send(`Hospital not found<br><a href="/">Back</a>`);
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});