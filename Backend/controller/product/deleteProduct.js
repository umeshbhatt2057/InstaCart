const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        // Check if the user has permission to delete the product
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        // Extract the product ID from the request body
        const { _id } = req.body;

        if (!_id) {
            throw new Error("Product ID is required");
        }

        // Find and delete the product by ID
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        if (!deletedProduct) {
            throw new Error("Product not found or already deleted");
        }

        // Respond with a success message
        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false
        });

    } catch (err) {
        // Handle errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteProductController;
