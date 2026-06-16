const express = require("express");
const router = express.Router();

const { evaluateAnswer } = require("../utils/aiEngine");

const interviewController = require(
  "../controllers/interviewController"
);

console.log(interviewController);

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({
    message: "Interview route working",
  });
});

// AI Evaluation
router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message:
          "Question and answer are required",
      });
    }

    const result = await evaluateAnswer(
      question,
      answer
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "AI evaluation failed",
      error: error.message,
    });
  }
});

// Save interview
router.post(
  "/save",
  interviewController.saveInterview
);

// Get all interviews of a user
router.get(
  "/user/:userId",
  interviewController.getUserInterviews
);

// Get one interview
router.get(
  "/history/:id",
  interviewController.getInterviewById
);

// Delete interview
router.delete(
  "/history/:id",
  interviewController.deleteInterview
);

module.exports = router;