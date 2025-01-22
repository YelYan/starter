const WishList = require("../../models/wishlist");
const asyncHandler = require("express-async-handler");

// add wishlist
const addWishList = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;

    // Queries the database to find a wishlist associated with the user.
    let wishList = await WishList.findOne({ user: userId });

    //check user already has wishlist
    if (!wishList) {
      // if not create wishlist for user
      wishList = new WishList({ user: userId, products: [productId] });
    } else {
      // Add the product to the wishlist if it's not already there
      if (!wishList.products.includes(productId)) {
        wishList.products.push(productId);
      }
    }

    // Save the wishlist to the database
    await wishList.save();

    return res.status(201).json({
      success: true,
      wishList,
      message: "Product added to wishlist!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
});

// remove wishlist
const removeWishList = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user.id;

    // find user's wishlist
    const wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
      return res.status(404).json({
        message: "WishList not found!",
      });
    }

    // remove product from wishList
    wishList.products = wishList.products.filter(
      (w) => w._id.toString() !== productId
    );

    console.log(wishList.products);
    // Save the wishlist to the database
    await wishList.save();

    return res.status(201).json({
      success: true,
      message: "Product removed from wishlist!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
});

// fetch and get wishlist
const getWishList = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const wishList = await WishList.findOne({ user: userId }).populate(
      "products"
    );

    if (!wishList) {
      return res.status(200).json({
        wishList: [],
      });
    }

    return res.status(201).json({
      success: true,
      wishList,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error" || error.message,
    });
  }
});

module.exports = { addWishList, removeWishList, getWishList };
