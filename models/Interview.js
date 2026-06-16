const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      default: "Medium",
    },

    score: {
      type: Number,
      default: 0,
    },

    questions: [
      {
        question: String,
        answer: String,
        feedback: String,
        score: Number,
      },
    ],

    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);