const express = require("express");
const router = express.Router();

// Home router
router.get("/", (req, res) => {
  res.send("Main Router. Home Page.");
});

// About router
router.get("/about", (req, res) => {
  res.send("About Router. About Page.");
});

module.exports = router;
