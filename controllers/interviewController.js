const Interview = require("../models/Interview");

// Save Interview
const saveInterview = async (req, res) => {
  try {
    const interview =
      await Interview.create(req.body);

    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get User Interviews
const getUserInterviews = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

    res.json(interviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Interview
const getInterviewById = async (
  req,
  res
) => {
  try {
    const interview =
      await Interview.findById(
        req.params.id
      );

    res.json(interview);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Interview
const deleteInterview = async (
  req,
  res
) => {
  try {
    await Interview.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  saveInterview,
  getUserInterviews,
  getInterviewById,
  deleteInterview,
};