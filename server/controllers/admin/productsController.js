const { supabase } = require("../../helpers/supabase/supabase.config");
const Product = require("../../models/product");
const asyncHandler = require("express-async-handler");

// @desc    Upload image to supabase storage
const handleImageUpload = async (req, res) => {
  try {
    const file = req.file;

    const { data: supabaseData, error } = await supabase.storage
      .from("e-commerce-img-upload")
      .upload(`e-commerce/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("e-commerce-img-upload")
      .getPublicUrl(supabaseData.path);

    res.status(200).json({
      success: true,
      url: data.publicUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//@desc get all products
const createProduct = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  const newlyCreateProduct = new Product({
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  });

  await newlyCreateProduct.save();

  res.status(201).json({
    success: true,
    data: newlyCreateProduct,
  });
});

//@desc get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const listOfProducts = await Product.find({});
  res.status(200).json({
    success: true,
    data: listOfProducts,
  });
});

// @desc edit single product
const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;

  let findProduct = await Product.findById(id);

  if (!findProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }

  // Update the product fields if they are provided in the request
  findProduct.title = title || findProduct.title;
  findProduct.description = description || findProduct.description;
  findProduct.category = category || findProduct.category;
  findProduct.brand = brand || findProduct.brand;
  findProduct.price = price === "" ? 0 : price || findProduct.price;
  findProduct.salePrice =
    salePrice === "" ? 0 : salePrice || findProduct.salePrice;
  findProduct.totalStock = totalStock || findProduct.totalStock;
  findProduct.image = image || findProduct.image;
  findProduct.averageReview = averageReview || findProduct.averageReview;

  // Save the updated product
  const updatedProduct = await findProduct.save();

  res.status(200).json({
    success: true,
    data: updatedProduct,
  });
});

// @desc dele single product
const deleteproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findProduct = await Product.findByIdAndDelete(id);

  if (!findProduct) {
    return res.status(404).json({
      success: false,
      message: "Product Not Foundd!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product successfully deleted!",
  });
});

module.exports = {
  handleImageUpload,
  deleteproduct,
  getAllProducts,
  createProduct,
  editProduct,
};
