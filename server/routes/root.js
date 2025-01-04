const express = require("express");
const router = express.Router();
const path = require("path");

/*
This route means it is for
"/" "/index" "/index.html"
*/

router.get("^/$|/index(.html)?", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
