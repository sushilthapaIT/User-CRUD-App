const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests helps to parse
app.use(express.json());

app.get('/api/contacts', require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
