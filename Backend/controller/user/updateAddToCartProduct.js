const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        const existingProduct = await addToCartModel.findOne({ _id: addToCartProductId, userId: currentUserId });

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found in the cart.",
                error: true,
                success: false,
            });
        }

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            { quantity: qty }
        );

        res.json({
            message: "Product Updated",
            data: updateProduct,
            error: false,
            success: true,
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
