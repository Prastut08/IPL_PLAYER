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
const GEMINI_RETRIES = 2;
const GEMINI_RETRY_DELAY = 700; // ms

/**
 * Generate 12 questions for player prediction
 */
export const generateQuestions = async () => {
  // Prefer Gemini if API key present
  if (GEMINI_API_KEY) {
    // Try a small number of times with conservative sampling for accuracy
    for (let attempt = 0; attempt <= GEMINI_RETRIES; attempt++) {
      try {
        const prompt = `You are an assistant that creates highly discriminative multiple-choice questions to identify a cricket player. Produce between 10 and 12 concise MCQs (4 options each) that are maximally distinguishing across players (role, batting style, position, bowling type, era, captaincy, signature skills, notable achievements). Ensure options are mutually exclusive and balanced. Return a JSON array ONLY using this schema: [{"id":1,"question":"...","options":["A","B","C","D"]}, ...]. Do NOT include any explanatory text, markdown, or code fences. Keep questions short (<= 80 chars) and options short (<= 30 chars).`;

        const res = await fetch(GEMINI_URL(GEMINI_API_KEY), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 1200 }),
        });

        if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
        const data = await res.json();
        const content = data.candidates?.[0]?.content || data.output?.[0]?.content || '';
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error('Invalid Gemini response format');
        const questions = JSON.parse(jsonMatch[0]);
        return { success: true, questions };
      } catch (err) {
        console.warn(`Gemini generateQuestions attempt ${attempt + 1} failed:`, err.message || err);
        if (attempt < GEMINI_RETRIES) await new Promise((r) => setTimeout(r, GEMINI_RETRY_DELAY));
        else {
          console.error('Gemini generateQuestions error:', err);
          return { success: false, error: err.message, questions: getFallbackQuestions() };
        }
      }
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
    // Retry loop for increased robustness; ask for evidence-backed prediction
    for (let attempt = 0; attempt <= GEMINI_RETRIES; attempt++) {
      try {
        const answersText = answers.map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`).join('\n\n');
        const prompt = `You are an expert cricket analyst. Given the following concise answers, predict the single most likely cricket player the respondent is thinking of. Use the answers as evidence and map each piece of evidence back to the question number. Return a single JSON object with these keys:\n- playerName (string)\n- confidence (integer 0-100)\n- reasoning (short paragraph with bullet-like evidence mapping e.g. 'Q3 -> Power-hitter')\n- alternates (array of up to 2 player names, ordered)\nReturn JSON ONLY. Do not include explanation, commentary, or markdown.\n\nAnswers:\n${answersText}`;

        const res = await fetch(GEMINI_URL(GEMINI_API_KEY), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: { text: prompt }, temperature: 0.2, maxOutputTokens: 700 }),
        });

        if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
        const data = await res.json();
        const content = data.candidates?.[0]?.content || data.output?.[0]?.content || '';
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Invalid Gemini prediction format');
        const prediction = JSON.parse(jsonMatch[0]);
        // Basic validation
        if (!prediction.playerName || typeof prediction.confidence !== 'number') throw new Error('Incomplete prediction fields');
        return { success: true, prediction };
      } catch (err) {
        console.warn(`Gemini predictPlayer attempt ${attempt + 1} failed:`, err.message || err);
        if (attempt < GEMINI_RETRIES) await new Promise((r) => setTimeout(r, GEMINI_RETRY_DELAY));
        else {
          console.error('Gemini predictPlayer error:', err);
          try { return localPredict(answers); } catch (e) { return { success: false, error: err.message }; }
        }
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
            content: `You are an expert cricket analyst. Given these answers, return a single JSON object with playerName, confidence (0-100), reasoning (evidence mapped to question numbers), and alternates (array up to 2). Return JSON only.\n\nAnswers:\n${answersText}`,
          },
        ],
        max_tokens: 700,
        temperature: 0.2,
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
    if (!prediction.playerName || typeof prediction.confidence !== 'number') throw new Error('Incomplete prediction fields');
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
