const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, 'i', 'g');  // Case-insensitive, global search

    const products = await productModel.find({
      "$or": [
        { productName: regex },
        { category: regex },
        { brandName: regex }  // Add brandName to the search fields
      ]
    });

    res.json({
      data: products,
      message: "Search Product list",
      error: false,
      success: true
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

module.exports = searchProduct;
