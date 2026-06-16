const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(
"GEMINI KEY EXISTS:",
!!process.env.GEMINI_API_KEY
);

const genAI = new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

async function evaluateAnswer(answer) {
try {
console.log(
"🔥 AI ENGINE INPUT:",
answer
);

// Empty answer
if (
  !answer ||
  answer.trim().length < 5
) {
  return {
    score: 0,
    strengths: [],
    weaknesses: [
      "Answer is too short."
    ],
    suggestions: [
      "Please write a meaningful answer."
    ]
  };
}

// Nonsense answer
const words = answer
  .trim()
  .split(/\s+/);

if (words.length < 3) {
  return {
    score: 1,
    strengths: [],
    weaknesses: [
      "Answer does not contain meaningful content."
    ],
    suggestions: [
      "Try explaining the concept properly."
    ]
  };
}

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

const prompt = `

You are an expert interview evaluator.

Question:
Explain OOPs in your own words.

Candidate Answer:
${answer}

IMPORTANT:

- If the answer is meaningless, random characters, or unrelated to the question, give a score between 0 and 2.
- If the answer is partially correct, give a score between 3 and 6.
- If the answer is good and contains technical concepts and examples, give a score between 7 and 10.

Return ONLY valid JSON.

{
"score": number,
"strengths": [],
"weaknesses": [],
"suggestions": []
}
`;

const result =
  await model.generateContent(
    prompt
  );

const response =
  await result.response;

const text =
  response.text();

console.log(
  "🔥 GEMINI RAW OUTPUT:"
);
console.log(text);

const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

try {
  return JSON.parse(
    cleaned
  );
} catch (parseError) {
  console.log(
    "❌ JSON PARSE ERROR"
  );
  console.log(cleaned);

  return {
    score: 5,
    strengths: [
      "Answer received"
    ],
    weaknesses: [
      "AI returned invalid JSON."
    ],
    suggestions: [
      "Please try again."
    ]
  };
}

} catch (error) {
console.log(
"❌ AI ENGINE ERROR:"
);
console.log(error);

return {
  score: 5,
  strengths: [
    "Answer is readable"
  ],
  weaknesses: [
    "AI evaluation unavailable"
  ],
  suggestions: [
    "Please try again later."
  ]
};

}
}

module.exports = {
evaluateAnswer,
};