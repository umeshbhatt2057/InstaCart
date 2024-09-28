const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String,
    resetPasswordToken: String,        // Field to store the reset token
    resetPasswordExpires: Date,        // Field to store the token expiration date

    // New fields to store user's shipping information
    shippingAddress: {
        province: String,
        district: String,
        municipality: String,
        wardNo: String,
        village: String,
        mobileNumber: String,
    },
}, {
    timestamps: true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
