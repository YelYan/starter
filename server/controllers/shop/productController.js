const Product = require("../../models/product");
const asyncHanlder = require("express-async-handler");

const getFilterProducts = asyncHanlder(async (req, res) => {
  try {
    const { categories = [], brands = [], sortBy } = req.body;

    return res.status(200).json({
      success: true,
      categories,
      brands,
      sortBy,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});

module.exports = getFilterProducts;
