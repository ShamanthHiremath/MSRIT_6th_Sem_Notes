const express = require('express');
const app = express();
const port = 3000;

// Visitor count storage
let visitorCount = 0;
let visitorIPs = {};

// Logger middleware
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip ;
    
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    next();
};

// Visitor counter middleware
const visitorCounter = (req, res, next) => {
    const ip = req.ip ;
    
    if (!visitorIPs[ip]) {
        visitorIPs[ip] = 0;
    }
    
    visitorIPs[ip]++;
    visitorCount++;
    
    req.visitorCount = visitorCount;
    req.userVisits = visitorIPs[ip];
    
    next();
};

// Apply middleware
app.use(logger);
app.use(visitorCounter);

// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Website</h1>
        <p>Total website visits: ${req.visitorCount}</p>
        <p>Your visits: ${req.userVisits}</p>
        <a href="/about">About Page</a> | 
        <a href="/contact">Contact Page</a>
    `);
});

app.get('/about', (req, res) => {
    res.send(`
        <h1>About Page</h1>
        <p>Total website visits: ${req.visitorCount}</p>
        <p>Your visits: ${req.userVisits}</p>
        <a href="/">Home</a> | 
        <a href="/contact">Contact</a>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <h1>Contact Page</h1>
        <p>Total website visits: ${req.visitorCount}</p>
        <p>Your visits: ${req.userVisits}</p>
        <a href="/">Home</a> | 
        <a href="/about">About</a>
    `);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});