const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product collection
      required: true,
    },
    reviewValue: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewMessage: {
      type: String,
      required: true,
      maxlength: 500, // Limit review message to 500 characters
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
ReviewSchema.index({ userId: 1 }); // Index for querying by userId
ReviewSchema.index({ productId: 1 }); // Index for querying by productId

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
