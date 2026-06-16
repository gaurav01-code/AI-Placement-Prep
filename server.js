console.log("🔥 SERVER FILE LOADED");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log("OPENAI KEY EXISTS:", !!process.env.OPENAI_API_KEY);
console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const improvementRoutes = require("./routes/improvementRoutes");
const dsaRoutes = require("./routes/dsaRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const chatInterviewRoutes = require("./routes/chatInterviewRoutes");
const pdfRoutes = require("./routes/pdfRoutes");





const app = express();

// Connect DB
connectDB();

// Middleware (IMPORTANT ORDER)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/improve", improvementRoutes);
app.use("/api/dsa", dsaRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/chat-interview", chatInterviewRoutes);
app.use("/api/pdf", pdfRoutes);
console.log("🚀 ROUTES MOUNTED SUCCESSFULLY");

// Debug routes
app.get("/debug", (req, res) => {
  res.json({ ok: true, time: new Date() });
});

app.get("/check-resume", (req, res) => {
  res.send("resume route mounted");
});

// Root route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});