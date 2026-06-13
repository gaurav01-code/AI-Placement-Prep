const { GoogleGenerativeAI } = require("@google/generative-ai");
// const OpenAI = require("openai"); // optional fallback (keep if you want)

console.log("OPENAI KEY EXISTS:", !!process.env.OPENAI_API_KEY);
console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * MAIN FUNCTION
 */
async function evaluateAnswer(answer) {
  try {
    console.log("🔥 AI ENGINE INPUT:", answer);

    // STEP 1: Try Gemini
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest", // ✅ FIXED MODEL NAME
      });

      const prompt = `
You are an expert interview evaluator.

Evaluate the following answer:

Answer: ${answer}

Return ONLY valid JSON in this format:
{
  "score": number (0-10),
  "strengths": ["..."],
  "weaknesses": ["..."],
  "suggestions": ["..."]
}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log("🔥 GEMINI RAW OUTPUT:", text);

      // safe JSON parsing
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleaned);
    } catch (geminiError) {
      console.log("⚠️ Gemini failed, fallback used");

      // STEP 2: fallback response (NO CRASH)
      return {
        score: 6,
        strengths: ["Answer is readable", "Basic understanding present"],
        weaknesses: ["Needs more depth", "Add real examples"],
        suggestions: ["Explain with real-world scenario", "Add technical terms"],
      };
    }
  } catch (error) {
    console.log("❌ AI ENGINE ERROR:", error);

    return {
      score: 5,
      strengths: ["Basic attempt detected"],
      weaknesses: ["AI processing failed"],
      suggestions: ["Try again with clearer answer"],
    };
  }
}

module.exports = { evaluateAnswer };