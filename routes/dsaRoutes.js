const express = require("express");
const DSA = require("../models/DSA");

const router = express.Router();

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await DSA.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Add topic
router.post("/add", async (req, res) => {
  try {
    const { topic, solved, total } = req.body;

    const newTopic = await DSA.create({
      topic,
      solved,
      total
    });

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;