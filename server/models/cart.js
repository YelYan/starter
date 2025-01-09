const mongoose = require("mongoose");

const AddToCartSchema = new mongoose(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: {
          required: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          required: true,
          type: Number,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AddToCart = mongoose.model("AddToCart", AddToCartSchema);

module.exports = AddToCart;
