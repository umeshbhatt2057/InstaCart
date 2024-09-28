const userModel = require("../../models/userModel");

async function allUsers(req, res) {
    try {
        console.log("userid all Users", req.userId);

        const user = await userModel.findById(req.userId);

        if (user.role !== 'SUPERADMIN') {
            return res.status(403).json({
                message: "Access denied",
                error: true,
                success: false
            });
        }

        const allUsers = await userModel.find();

        res.json({
            message: "All Users",
            data: allUsers,
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

module.exports = allUsers;
