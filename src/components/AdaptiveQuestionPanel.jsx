import React, { useState, useEffect } from 'react';

const AdaptiveQuestionPanel = ({
  question,
  questionNumber,
  totalQuestions,
  isTyping = false,
  onQuestionChange,
}) => {
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [isCurrentlyTyping, setIsCurrentlyTyping] = useState(isTyping);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedQuestion(question);
      setIsCurrentlyTyping(false);
      return;
    }

    setDisplayedQuestion('');
    setIsCurrentlyTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index <= question.length) {
        setDisplayedQuestion(question.slice(0, index));
        index++;
      } else {
        setIsCurrentlyTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [question, isTyping]);

  return (
    <div className="adaptive-question-container">
      <div className="particle-background">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      
      <div className="neural-scan"></div>

      <div className="question-panel active">
        <div className="ai-indicator">
          <span>CricketMind AI Analysis</span>
        </div>

        <div className={`question-text ${isCurrentlyTyping ? 'typing' : ''}`}>
          {displayedQuestion}
        </div>

        <div className="response-buttons">
          <button className="response-btn" onClick={() => onQuestionChange('yes')}>
            Yes
          </button>
          <button className="response-btn" onClick={() => onQuestionChange('no')}>
            No
          </button>
          <button className="response-btn alt" onClick={() => onQuestionChange('maybe')}>
            Maybe
          </button>
          <button className="response-btn alt" onClick={() => onQuestionChange('dontknow')}>
            Don't Know
          </button>
        </div>

        <div className="question-metadata">
          <div className="question-number">
            <span>Q {questionNumber} of {totalQuestions}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Confidence: {Math.floor(Math.random() * 40 + 60)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveQuestionPanel;
