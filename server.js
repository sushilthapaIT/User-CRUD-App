/*
Sushil Thapa
C0919991
*/

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const Contact = require("./models/contactModel");  

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use(express.static("public"));


// Set Home page to render the home.pug template
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });  // Render home page by default
});

// Add User Page
app.get("/users/add", (req, res) => {
    res.render("add", { title: "Add User" });
});

// Add User (POST)
app.post("/users/add", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error adding user: " + error.message);
    }
});

// Update User Page
app.get("/users/update/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send("User not found");
        }
        res.render("update", { title: "Update User", user: contact });
    } catch (error) {
        res.status(400).send("Error retrieving user for update: " + error.message);
    }
});

// Update User (POST)
app.post("/users/update/:id", async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error updating user: " + error.message);
    }
});

// Delete User (POST)
app.post("/users/delete/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect("/users");
    } catch (error) {
        res.status(400).send("Error deleting user: " + error.message);
    }
});

// Display Users Page with Pagination
app.get("/users", async (req, res) => {
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = 10;  // Number of users per page
    const skip = (page - 1) * limit;  // Skip users for current page

    try {
        const users = await Contact.find().skip(skip).limit(limit);  // Paginate users
        const totalUsers = await Contact.countDocuments();  // Total number of users
        const totalPages = Math.ceil(totalUsers / limit);  // Calculate total pages

        // Render users with pagination details
        res.render("display", {
            title: "User List",
            users: users,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
