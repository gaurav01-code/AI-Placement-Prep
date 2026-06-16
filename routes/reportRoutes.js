const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Interview = require("../models/Interview");

router.get("/:userId", async (req, res) => {
  try {
    const interviews =
      await Interview.find({
        userId: req.params.userId,
      });

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(22).text(
      "AI Placement Report",
      {
        align: "center",
      }
    );

    doc.moveDown();

    interviews.forEach(
      (item, index) => {
        doc
          .fontSize(16)
          .text(
            `Interview ${
              index + 1
            }`
          );

        doc.text(
          `Category: ${item.category}`
        );

        doc.text(
          `Score: ${item.score}/100`
        );

        doc.text(
          `Date: ${new Date(
            item.createdAt
          ).toLocaleDateString()}`
        );

        doc.moveDown();
      }
    );

    doc.end();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;