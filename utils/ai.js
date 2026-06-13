function analyzeResume(text) {
  try {
    // simple AI-like logic (works instantly, no API needed)

    let score = 50;

    if (text.includes("React")) score += 10;
    if (text.includes("Node")) score += 10;
    if (text.includes("MongoDB")) score += 10;
    if (text.includes("project")) score += 10;
    if (text.length > 300) score += 10;

    const result = {
      atsScore: Math.min(score, 95),
      strengths: [
        "Has technical keywords",
        "Contains project experience"
      ],
      weaknesses: [
        "Needs more detailed achievements",
        "Add quantifiable results"
      ],
      suggestions: [
        "Add more real-world project descriptions",
        "Improve resume formatting",
        "Include internship experience if available"
      ]
    };

    return result;

  } catch (error) {
    return { error: "AI analysis failed" };
  }
}

module.exports = { analyzeResume };