const {
GoogleGenerativeAI,
} = require(
"@google/generative-ai"
);

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY
);

async function evaluateAnswer(
question,
answer
) {
try {
console.log(
"Question:",
question
);
console.log(
"Answer:",
answer
);

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
    model:
      "gemini-2.0-flash",
  });

const prompt = `

You are an expert interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Rules:

1. Meaningless answers get 0-2.
2. Partial answers get 3-6.
3. Good technical answers get 7-10.

Return ONLY valid JSON:

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
  "GEMINI RESPONSE:"
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
} catch (e) {
  console.log(
    "JSON ERROR:",
    cleaned
  );

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
"AI ENGINE ERROR:"
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