const Product = require("../../models/product");
const asyncHanlder = require("express-async-handler");

const getFilterProducts = asyncHanlder(async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.body;

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
    }

    const filterData = await Product.find({
      category: {
        $in: category,
      },
      brand: {
        $in: brand,
      },
    }).sort(sort);

    return res.status(200).json({
      success: true,
      data: filterData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});

module.exports = {
  getFilterProducts,
};
