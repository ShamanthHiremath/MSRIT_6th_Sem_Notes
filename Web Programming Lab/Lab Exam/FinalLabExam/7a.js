const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Engineering College Branches</h1>
    <nav>
      <a href="/cse">Computer Science</a> | 
      <a href="/ece">Electronics</a> | 
      <a href="/mechanical">Mechanical</a>
    </nav>
  `);
});

app.get('/cse', (req, res) => {
  res.send(`
    <body style="background-color: lightblue; font-family: Arial;">
      <h1>Computer Science Engineering</h1>
      <p>Duration: 4 years</p>
      <p>Subjects: Programming, Data Structures, Algorithms</p>
      <a href="/">Back to Home</a>
    </body>
  `);
});

app.get('/ece', (req, res) => {
  res.send(`
      <body style="background-color: peachpuff; font-family: Verdana;">
          <h1>Electronics & Communication Engineering</h1>
          <p>Duration: 4 years</p>
          <p>Subjects: Circuit Analysis, Digital Electronics, Signal Processing</p>
          <a href="/">Back to Home</a>
      </body>
  `);
});

app.get('/mechanical', (req, res) => {
  res.send(`
    <body style="background-color: lightyellow; font-family: Times;">
      <h1>Mechanical Engineering</h1>
      <p>Duration: 4 years</p>
      <p>Subjects: Thermodynamics, Fluid Mechanics, Machine Design</p>
      <a href="/">Back to Home</a>
    </body>
  `);
});

