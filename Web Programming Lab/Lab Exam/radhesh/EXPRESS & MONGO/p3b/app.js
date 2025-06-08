const express = require("express");
const bodyParser = require('body-parser');
const {MongoClient} = require("mongodb");
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;
async function connect(){
    await client.connect();
    db = client.db("test");
    console.log("db connected")
}
connect()
app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.post('/add-employee', async (req, res) => {
  const { emp_name, email, phone, hire_date, job_title, salary } = req.body;

  await db.collection('employees').insertOne({
    emp_name,
    email,
    phone,
    hire_date: new Date(hire_date),
    job_title,
    salary: parseFloat(salary)
  });

  res.send("Employee added. <a href='/'>Back</a>");
});

app.get('/high-salary', async (req, res) => {
  const employees = await db.collection('employees').find({ salary: { $gt: 50000 } }).toArray();

  let html = "<h1>emp is </h1>"
  
  employees.forEach((emp)=>{
    html+=`<li>${emp.emp_name}</li>`
  })

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
