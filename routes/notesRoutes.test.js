// Required libraries for testing and setting up test environment
const request = require('supertest'); // Library for testing HTTP requests/responses
const express = require('express');   // Express server framework
const notesRouter = require('./notesRoutes');  // The notes route definitions

// Set up an express instance and configure it for testing
const app = express();
app.use(express.json()); // Middleware to handle JSON payloads
app.use('/api/notes', notesRouter); // Attaching notes router to testing instance of express

// Test suite for the Notes API
describe('Notes API', () => {
    // Test case for GET request to fetch all notes
    it('should fetch all of the notes', async () => {
        const res = await request(app).get('/api/notes');
        expect(res.statusCode).toEqual(200);  // Expecting a successful HTTP status code
        expect(Array.isArray(res.body)).toBeTruthy(); // Expecting the response to be an array
    });

    // Test case for POST request to add a new note
    it('should post a new note and then delete it', async () => {
        const newNote = { title: 'Test Note', text: 'This is a test note.' };

        // Create a note
        let res = await request(app).post('/api/notes').send(newNote);
        expect(res.statusCode).toEqual(200);  // Expecting a successful HTTP status code
        expect(res.body.body).toHaveProperty('title', newNote.title); // Expecting the response to contain the title of the new note

        // Get the ID of the newly created note
        const noteId = res.body.body.noteId;

        // Delete the note using the fetched ID
        res = await request(app).delete(`/api/notes/${noteId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'Success');
    });

    // Test case for POST request without a title
    it('should fail to post a new note without a title', async () => {
        const newNote = { text: 'This is a test note without a title.' };
        try {
            const res = await request(app).post('/api/notes').send(newNote);
            expect(res.statusCode).toEqual(400);  // Expecting a failure HTTP status code
            expect(res.body).toHaveProperty('status', 'error');
            expect(res.body).toHaveProperty('message', 'Title and text are required fields');
        } catch (error) {
            // An error should occur due to the title being missing. This is the expected behavior.
            expect(error.response.status).toEqual(400);
            expect(error.response.body).toHaveProperty('status', 'error');
            expect(error.response.body).toHaveProperty('message', 'Title and text are required fields');
        }
    }, 10000); // Set timeout to 10 seconds
});