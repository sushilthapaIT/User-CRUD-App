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




// Header Comment: Your name and CNumber

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const Contact = require("./models/contactModel");  // Assuming 'contactModel' corresponds to the 'users' collection

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

// Add User Page (using 'contact' model here for users)
app.get("/users/add", (req, res) => {
    res.render("add", { title: "Add User" });  // Adjusted title to "Add User"
});

// Add User (POST request to save user)
app.post("/users/add", async (req, res) => {
    try {
        const contact = new Contact(req.body);  // Using 'Contact' model for creating a new user
        await contact.save();
        res.redirect("/users");  // Redirect to the list of users (contacts)
    } catch (error) {
        res.status(400).send("Error adding user: " + error.message);  // Improved error message
    }
});

// Update User Page (GET request to show the form)
app.get("/users/update/:id", async (req, res) => {
    try {
        // Fetch the user by ID
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).send("User not found");
        }

        // Pass 'contact' object to the view as 'user'
        res.render("update", { title: "Update User", user: contact });
    } catch (error) {
        res.status(400).send("Error retrieving user for update: " + error.message);
    }
});


// Update User (POST request to save the changes)
app.post("/users/update/:id", async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, req.body);  // Using 'Contact' model to update user
        res.redirect("/users");  // Redirect to the list of users after update
    } catch (error) {
        res.status(400).send("Error updating user: " + error.message);  // Improved error message
    }
});

// Delete User (POST request to delete the user)
app.post("/users/delete/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);  // Delete the user from the 'contact' collection
        res.redirect("/users");  // Redirect to the list of users after deletion
    } catch (error) {
        res.status(400).send("Error deleting user: " + error.message);  // Improved error message
    }
});

// Display Users Page (Show all users in the 'users' collection)
app.get("/users", async (req, res) => {
    try {
        const contacts = await Contact.find();  // Use the 'Contact' model to fetch all users
        res.render("display", { title: "User List", users: contacts || [] });  // Pass contacts as an empty array if undefined
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users.");  // Improved error message
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
