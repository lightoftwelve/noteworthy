// Importing a random id using version 4 of the UUID library | https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');

// Function to generate a unique ID
module.exports = function generateUniqueId() {
    return uuidv4(); // Returns a randomly generated UUID from version 4 of the UUID library
}