// const express = require("express");
// const errorHandler = require("./middleware/errorHandler");
// const connectDB = require("./config/dbConnection");
// const dotenv = require("dotenv").config();

// connectDB();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware to parse JSON requests helps to parse
// app.use(express.json());

// app.get('/api/contacts', require("./routes/contactRoutes"));
// app.use(errorHandler);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });




// server.js
// Header Comment: Your name and CNumber

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const Contact = require("./models/contactModel");

connectDB();  // Connect to MongoDB using your own connectDB function

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // For JSON parsing
app.use(express.urlencoded({ extended: true }));  // For form data parsing
app.set("view engine", "pug");  // Set view engine to Pug
app.use(express.static("public"));  // Serve static files from the public directory

// Routes

// Home page, redirects to the users display page
app.get("/", (req, res) => res.redirect("/users"));

// Add Contact Page
app.get("/users/add", (req, res) => {
    res.render("add", { title: "Add Contact" });
});

// Add Contact (POST request)
app.post("/users/add", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error adding contact: " + error.message);
    }
});

// Update Contact Page (GET request to show the form)
app.get("/users/update/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send("Contact not found");
        }
        res.render("update", { title: "Update Contact", contact });
    } catch (error) {
        res.status(400).send("Error retrieving contact for update: " + error.message);
    }
});

// Update Contact (POST request to save the changes)
app.post("/users/update/:id", async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error updating contact: " + error.message);
    }
});

// Delete Contact (POST request to delete the contact)
app.post("/users/delete/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error deleting contact: " + error.message);
    }
});

// Display Contacts Page
app.get("/users", async (req, res) => {
    try {
        const contacts = await Contact.find();  // Use the correct model here
        res.render("display", { title: "Contact List", users: contacts || [] });  // Pass contacts as an empty array if undefined
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching contacts.");
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
