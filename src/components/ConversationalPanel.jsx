import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ["Batting", "Bowling", "Team", "Era", "Nationality", "Awards"];

const QUESTIONS = [
  { text: "Is your player known for explosive finishing?", cat: "Batting" },
  { text: "Does he bowl in the powerplay regularly?", cat: "Bowling" },
  { text: "Has he ever represented more than 3 IPL franchises?", cat: "Team" },
  { text: "Was he active in the inaugural 2008 season?", cat: "Era" },
  { text: "Is he an Australian national?", cat: "Nationality" }
];

const ConversationalPanel = ({ comment, onResponse }) => {
  const [idx, setIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const currentQ = QUESTIONS[idx % QUESTIONS.length];

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const timer = setInterval(() => {
      setDisplayText((prev) => prev + currentQ.text[i]);
      i++;
      if (i >= currentQ.text.length) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [idx]);

  const handleNext = (ans) => {
    onResponse(ans, currentQ);
    setIdx(idx + 1);
  };

  return (
    <div className="question-area glass">
      <div className="ai-commentary">
        <motion.span 
          key={comment}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {comment}
        </motion.span>
      </div>

      <div className="category-pills">
        {CATEGORIES.map(c => (
          <div key={c} className={`category-pill ${currentQ.cat === c ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.h2 
          key={idx}
          className="question-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {displayText}
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-accent-cyan"
          >
            _
          </motion.span>
        </motion.h2>
      </AnimatePresence>

      <div className="answer-grid">
        <button className="btn btn-primary" onClick={() => handleNext('yes')}>YES</button>
        <button className="btn btn-outline" onClick={() => handleNext('no')}>NO</button>
        <button className="btn btn-outline" onClick={() => handleNext('maybe')}>MAYBE</button>
        <button className="btn btn-outline" onClick={() => handleNext('unknown')}>UNKNOWN</button>
      </div>
    </div>
  );
};

export default ConversationalPanel;
