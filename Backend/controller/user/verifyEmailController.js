const userModel = require("../../models/userModel");

async function verifyEmailController(req, res) {
    try {
        const { token } = req.params;  // Extract token from request params

        // Find the user with the matching verification token
        const user = await userModel.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "Email is already verified" });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Remove verification token from the user
        await user.save(); // Save changes to the database

        // Respond with success
        res.status(200).json({ success: true, message: "Email verified successfully!" });
    } catch (err) {
        // Catch and handle any server errors
        console.error("Email verification error:", err.message);
        res.status(500).json({ success: false, message: "An error occurred during email verification. Please try again later." });
    }
}

module.exports = verifyEmailController;
