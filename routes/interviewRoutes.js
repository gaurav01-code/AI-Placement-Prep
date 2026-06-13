const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING
const { evaluateAnswer } = require("../utils/aiEngine");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({ message: "Interview route working" });
});

// MAIN ROUTE
router.post("/evaluate", async (req, res) => {
  try {
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({
        message: "Answer is required",
      });
    }

    console.log("🔥 REQUEST RECEIVED:", req.body);

    const result = await evaluateAnswer(answer);

    return res.json(result);

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.status(500).json({
      message: "AI evaluation failed",
      error: error.message,
    });
  }
});

module.exports = router;