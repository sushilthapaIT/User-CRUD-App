const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
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
        },
        email: {
            type: String,
            required: [true, "Please add your email address."],
            unique: true,
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
