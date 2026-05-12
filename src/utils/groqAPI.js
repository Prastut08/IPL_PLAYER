/**
 * Groq API utility for player prediction game
 * Uses Groq API to generate questions and predict cricket players
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || "";
const GROQ_USE_API = (import.meta.env.VITE_GROQ_USE_API || "true").toLowerCase() === "true";

// Gemini / Google Generative API support (uses API key via VITE_GEMINI_API_KEY)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_URL = (key) => `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${key}`;

/**
 * Generate 12 questions for player prediction
 */
export const generateQuestions = async () => {
  // Prefer Gemini if API key present
  if (GEMINI_API_KEY) {
    try {
      const prompt = `Generate between 10 and 12 concise multiple-choice questions (MCQs) to predict which IPL/cricket player someone is thinking of. For each question return an object with keys: id (numeric), question (short text), options (array of exactly 4 option strings). Return a JSON array only, for example: [{"id":1,"question":"...","options":["A","B","C","D"]}, ...]. Do not return any extra explanation or text.`;

      const res = await fetch(GEMINI_URL(GEMINI_API_KEY), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.7,
          maxOutputTokens: 1200,
        }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
      const data = await res.json();
      const content = data.candidates?.[0]?.content || data.output?.[0]?.content || '';
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('Invalid Gemini response format');
      const questions = JSON.parse(jsonMatch[0]);
      return { success: true, questions };
    } catch (err) {
      console.error('Gemini generateQuestions error:', err);
      return { success: false, error: err.message, questions: getFallbackQuestions() };
    }
  }

  // Fallback to GROQ/OpenAI-style flow
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
            content: `Generate between 10 and 12 concise multiple-choice questions (MCQs) to predict which IPL/cricket player someone is thinking of. For each question return an object with keys:\n- id: numeric id\n- question: short question text\n- options: an array of exactly 4 option strings\nReturn a JSON array only, for example: [{"id":1,"question":"...","options":["A","B","C","D"]}, ...]. Do not return any extra explanation or text.`,
          },
        ],
        max_tokens: 1200,
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
  // If Gemini key present, use Google's Generative API
  if (GEMINI_API_KEY) {
    try {
      const answersText = answers.map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`).join('\n\n');
      const prompt = `Based on these answers about a cricket player, predict which player they are thinking of.\n\nAnswers:\n${answersText}\n\nReturn a JSON object with playerName, confidence (0-100), reasoning, alternates (array of 2). Return JSON only.`;

      const res = await fetch(GEMINI_URL(GEMINI_API_KEY), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.7, maxOutputTokens: 500 }),
      });

      if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
      const data = await res.json();
      const content = data.candidates?.[0]?.content || data.output?.[0]?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Invalid Gemini prediction format');
      const prediction = JSON.parse(jsonMatch[0]);
      return { success: true, prediction };
    } catch (err) {
      console.error('Gemini predictPlayer error:', err);
      // Fallback to local predictor when Gemini is unavailable
      try {
        return localPredict(answers);
      } catch (e) {
        return { success: false, error: err.message };
      }
    }
  }

  // Fallback to local/groq flow
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
  { id: 1, question: "What is the player's primary role?", options: ["Batsman","Bowler","All-rounder","Wicketkeeper"] },
  { id: 2, question: "Which country is the player primarily associated with?", options: ["India","Australia","England","Other"] },
  { id: 3, question: "Is the player known for power-hitting or finishing?", options: ["Power-hitter","Finisher","Anchor","All-round contributor"] },
  { id: 4, question: "Which batting position best describes the player?", options: ["Opener","Top-order","Middle-order","Lower-order"] },
  { id: 5, question: "What type of bowler describes the player (if applicable)?", options: ["Fast/Pacer","Swing/Seam","Spinner","Doesn't bowl"] },
  { id: 6, question: "Has the player captained an IPL team?", options: ["Yes, long-term","Yes, occasionally","No, but led other teams","Never"] },
  { id: 7, question: "Which era best fits the player?", options: ["2008-2015","2016-2020","2021-2026","Earlier eras"] },
  { id: 8, question: "Is the player more famous for IPL/T20 or international cricket?", options: ["IPL/T20 specialist","International star","Balanced career","Mostly domestic"] },
  { id: 9, question: "Is the player known for death-over bowling or powerplay bowling?", options: ["Death overs","Powerplay","Middle overs","Doesn't bowl"] },
  { id: 10, question: "Is the player left- or right-handed?", options: ["Left-handed batter","Right-handed batter","Left-handed bowler","Right-handed bowler"] },
  { id: 11, question: "Is the player regarded as a top-tier fielder?", options: ["Excellent","Good","Average","Not notable"] },
  { id: 12, question: "Is the player currently active?", options: ["Active internationally","Active domestically/IPL","Recently retired","Long retired"] },
];

export default {
  generateQuestions,
  predictPlayer,
};
