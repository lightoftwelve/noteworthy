const express = require('express'); // Importing necessary modules

const notesRoute = require('./notesRoutes.js'); // Importing route definitions from other files

const router = express.Router(); // Create an instance of the Express Router to handle routing

router.use('/notes', notesRoute); // Use the notes routes when the URL matches the path '/notes'

module.exports = router; // Export the router to be used in the main server file