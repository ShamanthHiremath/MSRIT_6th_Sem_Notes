// a) Write a node.js Express program to create a custom middleware functions for
// i.  Logger
// ii. No of time the visitor visited the website


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

    // next() is called to pass control to the next middleware function
    next();
};

// Visitor counter middleware
const visitorCounter = (req, res, next) => {
    const ip = req.ip ;
    
    if (!(ip in visitorIPs)) {
        visitorIPs[ip] = 0;
    }
    
    visitorIPs[ip]++;
    visitorCount++;
    
    req.visitorCount = visitorCount;
    req.userVisits = visitorIPs[ip];

    console.log(`Visitor Count: ${visitorCount}, Your Visits: ${visitorIPs[ip]}`);

    // Call next() to pass control to the next middleware function
    next();
};


// Apply middleware
app.use(logger);
app.use(visitorCounter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Website</h1>
        <p>Total website visits: ${req.visitorCount}</p>
        <p>Your visits: ${req.userVisits}</p>
        <p>Your IP address: ${req.ip}</p>
        <p>Check the console for detailed logs.</p>
        <p>Refresh the page to see the visitor count increase.</p>
    `);
});

