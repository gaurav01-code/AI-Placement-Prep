console.log("✅ RESUME ROUTES LOADED");

const express = require("express");
const Resume = require("../models/Resume");
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const { analyzeResume } = require("../utils/ai");

// PDF parser
const pdfParse = require("pdf-parse/lib/pdf-parse");

const router = express.Router();

/**

* Test Route
* GET /api/resume/test
  */
  router.get("/test", (req, res) => {
  res.json({
  message: "Resume route working"
  });
  });

/**

* Upload + Analyze Resume
* POST /api/resume/upload
  */
  router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
  try {
  if (!req.file) {
  return res.status(400).json({
  message: "No file uploaded"
  });
  }

  const filePath = req.file.path;

  // Read PDF
  const pdfBuffer = fs.readFileSync(filePath);

  // Extract text
  const pdfData = await pdfParse(pdfBuffer);
  const extractedText = pdfData.text;

  // AI Analysis
  const aiResult = await analyzeResume(extractedText);

  // Save to MongoDB
  const resume = await Resume.create({
  resumeUrl: filePath,
  extractedText,
  aiResult
  });

  return res.status(201).json({
  message: "Resume Uploaded & Analyzed Successfully",
  resume,
  aiResult
  });

  } catch (error) {
  console.error("UPLOAD ERROR:", error);

  return res.status(500).json({
  message: error.message
  });
  }
  }
  );
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({
      uploadedAt: -1
    });

    res.json(resumes);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;
