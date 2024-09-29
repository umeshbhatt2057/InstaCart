const mongoose = require('mongoose');

// Define the schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Make name required
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,  // Store emails in lowercase
        trim: true,       // Remove extra spaces
    },
    password: {
        type: String,
        required: true,  // Ensure password is required
    },
    profilePic: {
        type: String,
         
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SUPERADMIN', 'GENERAL'], // Ensure these match your intended roles
        default: 'GENERAL' // or any default role you wish
    },
    verificationToken: { // Added verificationToken field
        type: String,
    },
    isVerified: { // Added isVerified field
        type: Boolean,
        default: false, // Set to false by default
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});

// Create the user model from the schema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
