const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        firstName: {
            type: String,
            required: [true, "Please add your First Name."]
        },
        lastName: {
            type: String,
            required: [true, "Please add your Last Name."]
        },
        dob: {
            type: Date,
            required: [true, "Please add your Date of Birth."]
        },
        address1: {
            type: String,
            required: [true, "Please add your address."]
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
            required: [true, "Please add your city."]
        },
        postalCode: {
            type: String,
            required: [true, "Please add your postal code."]
        },
        country: {
            type: String,
            required: [true, "Please add your country."]
        },
        number: {
            type: String,
            required: [true, "Please add the contact phone number."],
            unique: true,
            match: [/^\d{10}$/, 'Please add a valid phone number'] // Validate phone number
        },
        email: {
            type: String,
            required: [true, "Please add your email address."],
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please add a valid email address'] // Validate email
        },
        userNotes: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// Ensure unique indexes are created for phone number and email
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ number: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);
