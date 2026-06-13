const express = require("express");
const router = express.Router();
const pdf = require("html-pdf");

router.post("/generate", (req, res) => {
  const { content } = req.body;

  pdf.create(content).toFile("resume.pdf", (err, result) => {
    if (err) return res.send(err);

    res.download(result.filename);
  });
});

module.exports = router;