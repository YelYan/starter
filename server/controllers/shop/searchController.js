const Product = require("../../models/product");
const asynchandler = require("express-async-handler");

const searchProducts = asynchandler(async (req, res) => {
  try {
    const query = req.query.q || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // i for case insentivie match
    const regEx = new RegExp(query, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { brand: regEx },
        { category: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery)
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    const totalProducts = await Product.countDocuments(createSearchQuery);

    // calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    console.log(totalPages);

    return res.json({
      success: true,
      data: searchResults,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while searching!" || err.message,
    });
  }
});

module.exports = searchProducts;
