const fs = require('fs').promises; // Importing the promises version of the fs module to use async/await syntax for filesystem operations

// Asynchronous function to read notes from the db.json file
async function readNotes() {
    try {
        const data = await fs.readFile('./db/db.json', 'uft8'); // Read the file content from db.json and parse it as a UTF-8 string
        return JSON.parse(data); // Parse the JSON string into a JavaScript object/array and return it
    } catch (err) {
        console.error('Error reading the file:', err); // Log any error that might occur during reading and parsing
        return []; // Return an empty array if there is an error
    }
}

// Asynchronous function to write notes to the db.json file
async function writeNotes(notesArray) {
    try {
        await fs.writeFile('./db/db.json', JSON.stringify(notesArray, null, 2)); // Converts notesArray into a nicely formatted JSON string and writes it to db.json. The 'null' in JSON.stringify is a replacer function, but since we're not altering the stringification process, it's set to null. '2' specifies the number of spaces to use for indentation when formatting the JSON string.
    } catch (err) {
        console.error("Error writing to the file:", err); // Log any error that might occur during writing
    }
}

// Exporting the readNotes and writeNotes functions so they can be imported in other files
module.exports = {
    readNotes,
    writeNotes
};