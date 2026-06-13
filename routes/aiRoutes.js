const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../utils/ai");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "AI route is working perfectly" });
});

// ANALYZE ROUTE
router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const result = await analyzeResume(text);

    res.json({
      success: true,
      result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;