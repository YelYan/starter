const mongoose = require("mongoose");

const ProductScehma = new mongoose.schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductScehma);

module.exports = Product;
