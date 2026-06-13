const express = require("express");

const router = express.Router();

router.post("/improve", async (req, res) => {
  try {
    const { text } = req.body;

    const improvedText = `
Original:
${text}

Improved Version:
Developed and implemented the above project using modern development practices, focusing on performance, usability, and problem-solving.
`;

    res.json({
      success: true,
      improvedText
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.get("/test", (req, res) => {
  res.json({
    message: "Improve route working"
  });
});
module.exports = router;