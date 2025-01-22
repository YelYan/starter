const express = require("express");
const router = express.Router();
const {
  getFilterProducts,
} = require("../../controllers/shop/productController");

/**
 * For simple filter case we use get as a query but in this case
 * large dataset and multiple filtering so we use post method and get client data
 * from req body
 *
 * Pros - URL clean and consistent, good for nested filterd, ranges & arrays
 */
router.post("/products/filter", getFilterProducts);

module.exports = router;
