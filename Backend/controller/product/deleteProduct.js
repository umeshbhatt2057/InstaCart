const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function deleteProductController(req, res) {
    try {
        const user = await uploadProductPermission(req.userId);
        if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN')) {
            throw new Error("Permission denied");
        }

        const { _id } = req.body;
        const deletedProduct = await productModel.findByIdAndDelete(_id);

        if (!deletedProduct) {
            throw new Error("Product not found");
        }

        res.json({
            message: "Product Deleted Successfully",
            data: deletedProduct,
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

module.exports = deleteProductController;
