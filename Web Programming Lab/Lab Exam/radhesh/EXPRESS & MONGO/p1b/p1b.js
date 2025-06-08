const express = require("express");
const bodyParser = require('body-parser');
const {MongoClient} = require("mongodb");

const app = express();
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

const dbname = 'db';

let db;

async function connectdb(){
    await client.connect();
    db = client.db(dbname);
    console.log("connected to mongo")
}

connectdb()

app.post('/addstudent' , async (req  , res)=>{
    const {usn , name , code , cie} = req.body;
    const res1 = await db.collection('students').insertOne({
        usn,name, code , cie : parseInt(cie)
    })
res.send('success');

})

app.get('/low-cie' , async (req , res)=>{
    const students = await db.collection('students').find({cie: {$lt : 20}}).toArray();
    res.json(students);
})


app.listen(3000 , ()=>{
    console.log("server is running at 3000")
})