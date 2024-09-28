const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const resetPasswordController = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        // Find the user by the reset token and ensure the token is not expired
        const user = await userModel.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpires: { $gt: Date.now() }, // Token expiry check
        });

        if (!user) {
            return res.json({
                message: "Invalid or expired reset token",
                success: false,
                error: true,
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.json({
            message: "Password has been reset successfully",
            success: true,
            error: false,
        });

    } catch (err) {
        return res.json({
            message: err?.message || "An error occurred while resetting your password",
            error: true,
            success: false,
        });
    }
};

module.exports = resetPasswordController;
