import React, { useState } from 'react';

const PredictionFeedback = ({ onSubmitFeedback, isWrong = false }) => {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onSubmitFeedback?.(playerName);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="prediction-feedback-form">
        <div style={{
          textAlign: 'center',
          fontSize: '24px',
          marginBottom: '15px',
        }}>
          🧠 ⚡ 📊
        </div>
        <div className="feedback-question">
          Thank you! AI is learning...
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginTop: '15px',
          animation: 'neuralPulse 1.5s ease-in-out infinite',
        }}>
          Neural network updated with new cricket data
        </div>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '10px',
          fontSize: '12px',
          color: 'var(--accent-green)',
          textAlign: 'center',
        }}>
          ✓ Feedback recorded - AI improving!
        </div>
      </div>
    );
  }

  if (isWrong) {
    return (
      <div className="prediction-feedback-form">
        <div className="feedback-question">
          Who was your player?
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="feedback-input"
            placeholder="Enter the player name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            autoFocus
          />
          <div className="feedback-buttons">
            <button
              type="submit"
              className="feedback-btn"
              disabled={!playerName.trim()}
              style={{
                opacity: !playerName.trim() ? 0.5 : 1,
                cursor: !playerName.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default PredictionFeedback;
