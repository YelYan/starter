const express = require("express");
const router = express.Router();
const {
  getWishList,
  addWishList,
  removeWishList,
} = require("../../controllers/shop/wishListController");
const { authMiddleware } = require("../../controllers/auth/authControllers");

router.get("/wishList/get", authMiddleware, getWishList);
router.post("/wishList/add", authMiddleware, addWishList);
router.post("/wishList/remove", authMiddleware, removeWishList);

module.exports = router;
