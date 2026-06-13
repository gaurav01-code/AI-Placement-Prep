const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    required: true
  },

  extractedText: {
    type: String,
    default: ""
  },

  aiResult: {
    type: Object,
    default: {}
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", resumeSchema);