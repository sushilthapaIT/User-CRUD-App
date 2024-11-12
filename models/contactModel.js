const mongoose = require("mongoose");

// Define schema for Contact model
const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,  // Reference to the User model (optional)
            required: false,
            ref: "User",
        },
        firstName: {
            type: String,
            required: [true, "Please add your First Name."]  // Validation for First Name
        },
        lastName: {
            type: String,
            required: [true, "Please add your Last Name."]  // Validation for Last Name
        },
        dob: {
            type: Date,
            required: [true, "Please add your Date of Birth."]  // Validation for Date of Birth
        },
        address1: {
            type: String,
            required: [true, "Please add your address."]  // Validation for Address 1
        },
        address2: {
            type: String,  // Optional Address 2
        },
        city: {
            type: String,
            required: [true, "Please add your city."]  // Validation for City
        },
        postalCode: {
            type: String,
            required: [true, "Please add your postal code."]  // Validation for Postal Code
        },
        country: {
            type: String,
            required: [true, "Please add your country."]  // Validation for Country
        },
        number: {
            type: String,
            required: [true, "Please add the contact phone number."],  // Validation for Phone Number
            unique: true,  // Ensure unique phone numbers
        },
        email: {
            type: String,
            required: [true, "Please add your email address."],  // Validation for Email
            unique: true,  // Ensure unique email addresses
        },
        userNotes: {
            type: String,  // Optional user notes
        }
    },
    {
        timestamps: true,  // Automatically add createdAt and updatedAt fields
    }
);

// Ensure unique indexes are created for phone number and email
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ number: 1 }, { unique: true });

// Export the Contact model
module.exports = mongoose.model("Contact", contactSchema);
