const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

const upload = multer({ storage: multer.memoryStorage() });

const options = {
  schema: process.env.SUPABASE_SCHEMA || "public",
  autorefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_SECRET_KEY || "",
  options
);

module.exports = { supabase, upload };
