const mongoose = require("mongoose");

const dsaSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },

  solved: {
    type: Number,
    default: 0
  },

  total: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DSA", dsaSchema);