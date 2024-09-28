const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        const sessionUserDoc = await userModel.findById(sessionUser);

        if (sessionUserDoc.role !== 'SUPERADMIN') {
            return res.status(403).json({
                message: "Access denied",
                error: true,
                success: false
            });
        }

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        };

        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        res.json({
            data: updateUser,
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
