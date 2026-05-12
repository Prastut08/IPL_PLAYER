import React, { useState, useEffect } from 'react';

const FinalPredictionReveal = ({
  playerName = 'Virat Kohli',
  playerEmoji = '🏏',
  confidence = 85,
  onCorrect,
  onWrong,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 800);

    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 1500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="prediction-reveal-container">
      <div className="prediction-reveal-content">
        {!isRevealed && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              fontSize: '48px',
              animation: 'victoryPulse 1s ease-in-out infinite',
            }}>
              🔍
            </div>
          </div>
        )}

        {isRevealed && (
          <>
            <div className="prediction-silhouette">
              {playerEmoji}
            </div>

            <div className="prediction-text">
              You're thinking of...
            </div>

            <div className="prediction-player-name">
              {playerName}
            </div>

            <div className="prediction-confidence-display">
              AI Confidence: <span className="percentage">{confidence}%</span>
            </div>

            {showButtons && (
              <>
                <div className="reveal-buttons">
                  <button
                    className="reveal-button correct"
                    onClick={onCorrect}
                  >
                    ✓ Correct
                  </button>
                  <button
                    className="reveal-button wrong"
                    onClick={onWrong}
                  >
                    ✗ Wrong Guess
                  </button>
                </div>

                <div className="reasoning-breakdown">
                  <div className="breakdown-title">Prediction Factors</div>
                  <div className="breakdown-factors">
                    <div className="factor-card">
                      <div className="factor-icon">💪</div>
                      <div className="factor-text">Aggressive Finisher</div>
                    </div>
                    <div className="factor-card">
                      <div className="factor-icon">🏆</div>
                      <div className="factor-text">Multi-Time Champion</div>
                    </div>
                    <div className="factor-card">
                      <div className="factor-icon">👑</div>
                      <div className="factor-text">Team Captain</div>
                    </div>
                    <div className="factor-card">
                      <div className="factor-icon">🌏</div>
                      <div className="factor-text">Indian Batsman</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FinalPredictionReveal;
