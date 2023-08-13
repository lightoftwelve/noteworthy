// Importing necessary modules and helper functions
const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readNotes, writeNotes } = require('../helpers/fs');

// GET Route for retrieving all the notes from the database
notes.get('/api/notes', async (req, res) => {
    try {
        const notes = await readNotes(); // Read the notes from the database file
        res.json(notes); // Return the notes as JSON
    } catch (err) {
        res.status(500).json({ error: 'Error, failed to retrieve notes' }); // Send an error response if there's an issue reading the notes
    }
});

// POST Route for submitting notes
notes.post('/api/notes', async (req, res) => {
    console.info(`${req.method} request to receive notes, received`); // Logging the type of request received

    const { title, text } = req.body; // Destructuring the title and text fields from the request body

    // Checking if both title and text fields are present
    if (title && text) {
        // Creating a new note object
        const createNote = {
            title,
            text,
            noteId: uuid(), // Generating a unique ID for the new note
        };

        try {
            const currentNotes = await readNotes(); // Reading the current notes from the database
            currentNotes.push(createNote); // Adding the new note to the current notes list
            await writeNotes(currentNotes); // Writing the updated notes list back to the database
            // Sending a success response with the newly added note
            res.json({
                status: 'success',
                body: createNote
            });
        } catch (error) {
            // Sending an error response if there's an issue writing to the database
            res.status(500).json({
                error: 'Error in writing the note to the file.'
            });
        }
    } else {
        // Sending an error response if title or text is missing
        res.status(400).json({
            error: 'Title and text are required fields'
        });
    }
});

// Exporting the router to be used in other parts of the application
module.exports = notes;