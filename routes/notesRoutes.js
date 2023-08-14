// Importing necessary modules and helper functions
const notesRouter = require('express').Router(); // Renamed to avoid conflict with notes array variable inside the routes.
const uuid = require('../helpers/uuid');
const { readNotes, writeNotes } = require('../helpers/fs');
const { ApiError } = require('../helpers/errors');

// GET Route for retrieving all the notes from the database
notesRouter.get('/', async (req, res) => {
    try {
        const notes = await readNotes(); // Read the notes from the database file
        res.json(notes); // Return the notes as JSON
    } catch (err) {
        throw new ApiError('RetrievalError', 500, 'Failed to retrieve notes'); // Send an error response if there's an issue reading the notes
    }
});

// POST Route for submitting notes
notesRouter.post('/', async (req, res) => {
    console.info(`${req.method} request to receive notes, received`); // Logging the type of request received

    const { title, text } = req.body; // Destructuring the title and text fields from the request body

    // Checking if both title and text fields are present
    if (title && text) {
        const currentNotes = await readNotes(); // Reading the current notes from the database

        // Creating a new note object
        const createNote = {
            title,
            text,
            id: uuid(), // Generating a unique ID for the new note
        };

        try {
            currentNotes.push(createNote); // Adding the new note to the current notes list
            await writeNotes(currentNotes); // Writing the updated notes list back to the database
            // Sending a success response with the newly added note
            res.json({
                status: 'Success',
                body: createNote
            });
        } catch (error) {
            // Sending an error response if there's an issue writing to the database
            throw new ApiError('WriteError', 500, 'Error in writing the note to the file.');
        }
    } else {
        // Sending an error response if title or text is missing
        if (!title || !text) {
            return res.status(400).send({
                status: 'error',
                message: 'Title and text are required fields'
            });
        }
    }
});

// DELETE route that responds to the client's request to delete a note by its unique ID.
notesRouter.delete('/:id', async (req, res) => {
    try {
        const notes = await readNotes(); // Read the current notes from the database.
        const filteredNotes = notes.filter(note => note.id !== req.params.id); // Filter the array to exclude the note with the given ID.

        if (notes.length === filteredNotes.length) {
            // If the note cannot be found, it cant be deleted
            throw new ApiError('NotFoundError', 404, 'Note not found');
        }

        await writeNotes(filteredNotes); // Write the filtered notes back to the database.

        // Respond with a success message.
        res.json({
            status: 'Success',
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.error('Error while deleting note:', error);
        // If an error occurs, respond with a 500 status code and an error message.
        throw new ApiError('DeletionError', 500, 'Failed to delete the note');
    }
});

// Exporting the router to be used in other parts of the application
module.exports = notesRouter;