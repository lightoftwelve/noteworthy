// Import necessary modules and libraries
const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001; // Set up the default port for the server

const app = express(); // Create an instance of express

app.use(express.json()); // Middleware to recognize incoming request objects as JSON objects
app.use(express.urlencoded({ extended: true })); // Middleware to recognize incoming request objects as strings or arrays
app.use(express.static('public')); // Middleware to serve static files from the 'public' directory

app.use(cors());
app.use('/api', api); // Middleware for API routes

// Route to serve the landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Route to serve the notes page
app.get('/notes', (req, res) => {
    console.log("Trying to access /notes");
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Central Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    } else {
        res.status(500).send('Oh no! Something broke🫣!');
    }
});

// Start the server on the specified port and log the URL
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});