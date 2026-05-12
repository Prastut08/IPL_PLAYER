import React, { useState, useEffect } from 'react';

const AIPersonalityLayer = ({ answerCount = 0, isThinking = false }) => {
  const [commentary, setCommentary] = useState('');
  const [showTyping, setShowTyping] = useState(false);

  const commentaries = [
    "Analyzing IPL history…",
    "Pattern detected. Shifting focus…",
    "Interesting response. Narrowing possibilities…",
    "That changes the prediction significantly.",
    "You picked a difficult player 👀",
    "Cross-referencing batting statistics…",
    "Probability matrix updating…",
    "Deduction in progress…",
    "The data suggests…",
    "Fascinating choice. Recalculating…",
  ];

  useEffect(() => {
    if (!isThinking) {
      setShowTyping(false);
      setCommentary('');
      return;
    }

    setShowTyping(true);
    const selected = commentaries[answerCount % commentaries.length];
    setCommentary(selected);

    const timer = setTimeout(() => {
      setShowTyping(false);
    }, 3000 + selected.length * 40);

    return () => clearTimeout(timer);
  }, [isThinking, answerCount]);

  if (!showTyping && !commentary) return null;

  return (
    <div className="ai-personality-bubble">
      <div>{commentary}</div>
      {showTyping && (
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}
    </div>
  );
};

export default AIPersonalityLayer;
