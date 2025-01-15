const express = require("express");
const router = express.Router();
const searchProducts = require("../../controllers/shop/searchController");

router.get("/search", searchProducts);

module.exports = router;
