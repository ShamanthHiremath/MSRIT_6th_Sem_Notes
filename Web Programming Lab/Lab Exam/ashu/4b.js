const express = require('express');
const app = express();
const port = 3000;

// Home page route
app.get('/', (req, res) => {
    res.send(`
        <h1>Online Training Site - Home</h1>
        <nav>
            <a href="/">Home</a> |
            <a href="/registration">Registration</a> |
            <a href="/announcements">Announcements</a> |
            <a href="/contact">Contact</a>
        </nav>
        <p>Welcome to our online training site.</p>
    `);
});

// Registration page route
app.get('/registration', (req, res) => {
    res.send(`
        <h1>Registration</h1>
        <nav>
            <a href="/">Home</a> |
            <a href="/registration">Registration</a> |
            <a href="/announcements">Announcements</a> |
            <a href="/contact">Contact</a>
        </nav>
        <p>Registration page content.</p>
    `);
});

// Announcements page route
app.get('/announcements', (req, res) => {
    res.send(`
        <h1>Announcements</h1>
        <nav>
            <a href="/">Home</a> |
            <a href="/registration">Registration</a> |
            <a href="/announcements">Announcements</a> |
            <a href="/contact">Contact</a>
        </nav>
        <p>Latest announcements will be posted here.</p>
    `);
});

// Contact page route
app.get('/contact', (req, res) => {
    res.send(`
        <h1>Contact</h1>
        <nav>
            <a href="/">Home</a> |
            <a href="/registration">Registration</a> |
            <a href="/announcements">Announcements</a> |
            <a href="/contact">Contact</a>
        </nav>
        <p>Contact information goes here.</p>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Online Training Site running on port ${port}`);
});
