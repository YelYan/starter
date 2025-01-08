const { supabase } = require("../../helpers/supabase/supabase.config");

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

    res
      .status(200)
      .json({
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

module.exports = handleImageUpload;
