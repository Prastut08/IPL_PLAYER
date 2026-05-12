/**
 * Groq API utility for player prediction game
 * Uses Groq API to generate questions and predict cricket players
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || "";
const GROQ_USE_API = (import.meta.env.VITE_GROQ_USE_API || "true").toLowerCase() === "true";

/**
 * Generate 12 questions for player prediction
 */
export const generateQuestions = async () => {
  // If API usage is disabled or key/model missing, use fallback
  if (!GROQ_USE_API || !GROQ_API_KEY || !GROQ_MODEL) {
    return { success: false, error: "API disabled or not configured", questions: getFallbackQuestions() };
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: `Generate exactly 12 concise yes/no/maybe questions to predict which cricket player someone is thinking of.\nReturn a JSON array of objects with {"id", "question"}. No extra text.`,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }
    const questions = JSON.parse(jsonMatch[0]);
    return { success: true, questions };
  } catch (error) {
    console.error("Error generating questions:", error);
    return { success: false, error: error.message, questions: getFallbackQuestions() };
  }
};

/**
 * Generate player prediction based on answers
 */
export const predictPlayer = async (answers) => {
  // If API not configured, run local heuristic predictor
  if (!GROQ_USE_API || !GROQ_API_KEY || !GROQ_MODEL) {
    return localPredict(answers);
  }

  try {
    const answersText = answers.map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`).join("\n\n");

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: `Based on these answers about a cricket player, predict which player they are thinking of.\n\nAnswers:\n${answersText}\n\nReturn a JSON object with playerName, confidence (0-100), reasoning, alternates (array of 2). Return JSON only.`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid prediction format");
    }
    const prediction = JSON.parse(jsonMatch[0]);
    return { success: true, prediction };
  } catch (error) {
    console.error("Error predicting player:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Simple local predictor used when API is not available.
 * Very basic heuristic: look for nationality, role keywords, era and T20 participation.
 */
const localPredict = (answers) => {
  const text = answers.map((a) => `${a.question} ${a.answer}`).join(" ").toLowerCase();

  // Simple rule table (example)
  let candidates = [];
  if (text.includes("india") || text.includes("indian")) candidates.push("Virat Kohli");
  if (text.includes("australia") || text.includes("australian")) candidates.push("David Warner");
  if (text.includes("pakistan") || text.includes("pakistani")) candidates.push("Babar Azam");
  if (text.includes("all-rounder") || text.includes("all rounder")) candidates.push("Ben Stokes");
  if (text.includes("spinner")) candidates.push("Ravichandran Ashwin");
  if (text.includes("fast") || text.includes("pace")) candidates.push("Jasprit Bumrah");

  const playerName = candidates.length ? candidates[0] : "Unknown Player";
  const confidence = Math.min(90, 20 + candidates.length * 25);
  const alternates = candidates.slice(1, 3);
  const reasoning = candidates.length
    ? `Matched keywords: ${candidates.join(", ")}`
    : "Not enough clues; used fallback heuristics.";

  return {
    success: true,
    prediction: {
      playerName,
      confidence,
      reasoning,
      alternates,
    },
  };
};

/**
 * Fallback questions if API fails
 */
const getFallbackQuestions = () => [
  { id: 1, question: "Is this player primarily a batsman?" },
  { id: 2, question: "Is this player from India?" },
  { id: 3, question: "Has this player played for their country recently (last 5 years)?" },
  { id: 4, question: "Is this player known for opening?" },
  { id: 5, question: "Is this player a right-handed batter?" },
  { id: 6, question: "Has this player scored an international century?" },
  { id: 7, question: "Is this player an all-rounder?" },
  { id: 8, question: "Is this player primarily a fast bowler?" },
  { id: 9, question: "Has this player played in T20 leagues like IPL?" },
  { id: 10, question: "Is this player from the last decade (born 1990 onwards)?" },
  { id: 11, question: "Has this player won a major tournament (World Cup, IPL)?" },
  { id: 12, question: "Is this player still actively playing?" },
];

export default {
  generateQuestions,
  predictPlayer,
};
