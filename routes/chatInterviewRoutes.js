const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// start interview
router.post("/start", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are a technical interviewer.
    Ask the first easy OOPs question.
    `;

    const result = await model.generateContent(prompt);

    res.json({
      question: result.response.text(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// follow-up question
router.post("/next", async (req, res) => {
  try {
    const { answer, history } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are interviewing a student.

    Previous QA:
    ${history}

    Student answer:
    ${answer}

    Ask next interview question or give feedback.
    `;

    const result = await model.generateContent(prompt);

    res.json({
      response: result.response.text(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;