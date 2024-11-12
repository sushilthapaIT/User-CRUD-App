const express = require("express");
const router = express.Router();  // Create a new router instance

// Importing the controller functions
const { getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact } = require("../controllers/contactController");

// Method chaining for handling different HTTP requests
// For the '/contacts' route:
router.route('/')  // Handle GET and POST requests for contacts
    .get(getContacts)  // GET request to retrieve all contacts
    .post(createContact);  // POST request to create a new contact

// For the '/contacts/:id' route (where :id is a dynamic parameter representing a contact's ID):
router.route('/:id')  
    .get(getContact)  // GET request to fetch a specific contact by ID
    .put(updateContact)  // PUT request to update a contact by ID
    .delete(deleteContact);  // DELETE request to remove a contact by ID

module.exports = router;  // Export the router to be used in other parts of the application