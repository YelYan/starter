const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/supabase/supabase.config");

const {
  handleImageUpload,
  editProduct,
  createProduct,
  getAllProducts,
  deleteproduct,
} = require("../../controllers/admin/productsController");

router.post("/products/upload-image", upload.single("file"), handleImageUpload);
router.post("/products/create", createProduct);
router.get("/products/list", getAllProducts);
router.put("/products/edit/:id", editProduct);
router.delete("/products/delete/:id", createProduct);

module.exports = router;
