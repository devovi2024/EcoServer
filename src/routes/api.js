const express = require("express");
const router = express.Router();

// Example route
router.get("/status", (req, res) => {
  res.json({ status: "API is working properly" });
});

module.exports = router;