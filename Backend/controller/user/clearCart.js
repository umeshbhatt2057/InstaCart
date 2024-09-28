const addToCartModel = require("../../models/cartProduct");

const clearCart = async (req, res) => {
    try {
        const currentUser = req.userId;

        // Delete all products from the user's cart
        await addToCartModel.deleteMany({ userId: currentUser });

        res.json({
            message: "Cart cleared successfully.",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = clearCart;
