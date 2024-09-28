const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        const product = await addToCartModel.findOne({ _id: addToCartProductId, userId: currentUserId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you don't have permission to delete this product",
                error: true,
                success: false,
            });
        }

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId });

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct,
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteAddToCartProduct;
