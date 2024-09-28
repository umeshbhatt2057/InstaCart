const userModel = require('../../models/userModel');
const crypto = require('crypto');
const sendResetEmail = require('../../helpers/sendResetEmail'); // Correct import

const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email not Found!",
                success: false,
                error: true,
            });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Save the token and its expiry to the user's record
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 300000; // 5 minutes expiry
        await user.save();

        // Send the reset email
        await sendResetEmail(user.email, resetToken);

        return res.json({
            message: "Password reset link has been sent to your email",
            success: true,
            error: false,
        });

    } catch (err) {
        return res.status(500).json({
            message: err?.message || "An error occurred while processing your request",
            error: true,
            success: false,
        });
    }
};

module.exports = forgotPasswordController;
