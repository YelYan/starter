const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/supabase/supabase.config");

const handleImageUpload = require("../../controllers/admin/productsController");

router.post("/products/upload-image", upload.single("file"), handleImageUpload);

module.exports = router;
