// A base custom error class that extends the built-in Error class.
// It allows the creation of custom errors with more structured data.
class BaseError extends Error {
    /**
    * @param {string} name - Name for the custom error.
    * @param {number} statusCode - HTTP status code for the error.
    * @param {boolean} isOperational - Indicates if the error is operational or a programming/runtime error.
    * @param {string} description - Detailed error message.
    */
    constructor(name, statusCode, isOperational, description) {
        super(description); // Call to the parent Error class constructor with the description message
        this.name = name; // Name of the custom error
        this.statusCode = statusCode; // HTTP status code for the error
        this.isOperational = isOperational; // Boolean flag for the type of error
    }
}

// An ApiError class specifically designed for API related errors.
// It extends from the BaseError class and is always marked as operational.
class ApiError extends BaseError {
    /**
     * @param {string} name - Name for the API error.
     * @param {number} statusCode - HTTP status code for the error.
     * @param {string} description - Detailed error message.
     */
    constructor(name, statusCode, description) {
        super(name, statusCode, true, description); // Calls the BaseError constructor with `isOperational` always set to true
    }
}

// Export the ApiError class so that it can be used in other modules.
module.exports = ApiError;