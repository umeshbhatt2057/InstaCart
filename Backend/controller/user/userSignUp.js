const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const sendEmail = require('../../helpers/sendEmail');  // Import sendEmail function
const crypto = require('crypto'); // Import crypto for token generation

async function userSignUpController(req, res) {
    try {
        const { email, password, name, profilePic } = req.body; // Added profilePic in destructuring

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);  // Use asynchronous method
        const hashPassword = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Prepare user payload
        const payload = {
            email,
            name,
            password: hashPassword,
            role: "GENERAL",
            isVerified: false,  // Add isVerified field
            verificationToken,  // Save verification token
            profilePic,  // Add profilePic field to payload
        };

        // Save user in the database
        const userData = new userModel(payload);
        await userData.save();

        // Send verification email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        const subject = "Verify your email address";
        const text = `Please verify your email by clicking the link: ${verificationLink}`;
        const html = `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`;

        await sendEmail(email, subject, text, html); // Send verification email

        // Send success response
        return res.status(201).json({
            success: true,
            message: "User created successfully! ",
        });

    } catch (err) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error"
        });
    }
}

module.exports = userSignUpController;
