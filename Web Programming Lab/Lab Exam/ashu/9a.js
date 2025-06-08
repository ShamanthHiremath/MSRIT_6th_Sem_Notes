const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <p>Welcome to the Online Training Site!</p>
    <nav>
      <a href="/">Home</a> | 
      <a href="/registration">Registration</a> | 
      <a href="/announcements">Announcements</a> | 
      <a href="/contact">Contact</a>
    </nav>
  `);
});

app.get('/registration', (req, res) => {
  res.send(`
    <h1>Registration Page</h1>
    <p>Register for courses here.</p>
    <nav>
      <a href="/">Home</a> | 
      <a href="/registration">Registration</a> | 
      <a href="/announcements">Announcements</a> | 
      <a href="/contact">Contact</a>
    </nav>
  `);
});

app.get('/announcements', (req, res) => {
  res.send(`
    <h1>Announcements Page</h1>
    <p>Latest announcements will be displayed here.</p>
    <nav>
      <a href="/">Home</a> | 
      <a href="/registration">Registration</a> | 
      <a href="/announcements">Announcements</a> | 
      <a href="/contact">Contact</a>
    </nav>
  `);
});

app.get('/contact', (req, res) => {
  res.send(`
    <h1>Contact Page</h1>
    <p>Contact us at contact@example.com.</p>
    <nav>
      <a href="/">Home</a> | 
      <a href="/registration">Registration</a> | 
      <a href="/announcements">Announcements</a> | 
      <a href="/contact">Contact</a>
    </nav>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});