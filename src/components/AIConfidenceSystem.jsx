import React, { useState, useEffect } from 'react';
import AIConfidenceMeter from './AIConfidenceMeter';
import ProbabilityRankingPanel from './ProbabilityRankingPanel';
import NeuralReasoningViz from './NeuralReasoningViz';
import ConfidenceTimeline from './ConfidenceTimeline';
import FinalPredictionReveal from './FinalPredictionReveal';
import ReasoningBreakdown from './ReasoningBreakdown';
import PredictionFeedback from './PredictionFeedback';
import '../styles/confidence-meter.css';

// Sample player database
const IPL_PLAYERS = [
  {
    id: 1,
    name: 'Virat Kohli',
    role: 'Batsman',
    emoji: '🏏',
    team: 'RCB',
    probability: 78,
    meta: ['Captain', '2008+'],
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    role: 'Batsman',
    emoji: '👨‍🦱',
    team: 'MI',
    probability: 65,
    meta: ['Captain', 'Overseas'],
  },
  {
    id: 3,
    name: 'MS Dhoni',
    role: 'WK-Batsman',
    emoji: '🥅',
    team: 'CSK',
    probability: 52,
    meta: ['Captain', 'Finisher'],
  },
  {
    id: 4,
    name: 'AB de Villiers',
    role: 'All-rounder',
    emoji: '🎯',
    team: 'RCB',
    probability: 38,
    meta: ['Overseas', 'Explosive'],
  },
  {
    id: 5,
    name: 'Jasprit Bumrah',
    role: 'Bowler',
    emoji: '⚡',
    team: 'MI',
    probability: 22,
    meta: ['Pacer', 'Death'],
  },
];

const REASONING_DATA = [
  { label: 'Batting Style', value: 'Aggressive Finisher', confidence: 92 },
  { label: 'Team Match', value: 'Premium IPL Franchises', confidence: 85 },
  { label: 'Era Match', value: '2008 - 2026', confidence: 78 },
  { label: 'Role Detection', value: 'Middle Order / Captain', confidence: 88 },
  { label: 'Performance Type', value: 'Consistent Excellence', confidence: 82 },
  { label: 'Nationality', value: 'Indian', confidence: 72 },
];

const TIMELINE_DATA = [
  { question: 'Q1', confidence: 18 },
  { question: 'Q2', confidence: 35 },
  { question: 'Q3', confidence: 52 },
  { question: 'Q4', confidence: 68 },
  { question: 'Q5', confidence: 76 },
  { question: 'Q6', confidence: 85 },
];

const AIConfidenceSystem = () => {
  const [confidence, setConfidence] = useState(0);
  const [showPrediction, setShowPrediction] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null); // 'correct' or 'wrong'
  const [predictionReady, setPredictionReady] = useState(false);

  // Simulate confidence building
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev < 85) {
          return prev + Math.random() * 3;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Trigger prediction when confidence is high
  useEffect(() => {
    if (confidence >= 80 && !predictionReady) {
      setPredictionReady(true);
      setTimeout(() => {
        setShowPrediction(true);
      }, 2000);
    }
  }, [confidence, predictionReady]);

  const handleCorrect = () => {
    setFeedbackType('correct');
    setShowFeedback(true);
  };

  const handleWrong = () => {
    setFeedbackType('wrong');
    setShowFeedback(true);
  };

  const handleFeedbackSubmit = (playerName) => {
    // Handle feedback
    console.log('Feedback received:', playerName);
    setTimeout(() => {
      // Reset for new game
      setConfidence(0);
      setShowPrediction(false);
      setShowFeedback(false);
      setPredictionReady(false);
    }, 2000);
  };

  const handleResetGame = () => {
    setConfidence(0);
    setShowPrediction(false);
    setShowFeedback(false);
    setPredictionReady(false);
  };

  if (showPrediction && feedbackType !== 'correct') {
    return (
      <FinalPredictionReveal
        playerName={IPL_PLAYERS[0].name}
        playerEmoji={IPL_PLAYERS[0].emoji}
        confidence={Math.round(confidence)}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
      />
    );
  }

  if (showFeedback) {
    return (
      <div
        className="confidence-system-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ maxWidth: '600px', width: '100%' }}>
          {feedbackType === 'correct' && (
            <div style={{
              textAlign: 'center',
              animation: 'floatUp 0.8s ease-out',
            }}>
              <div style={{
                fontSize: '60px',
                marginBottom: '20px',
                animation: 'victoryPulse 1s ease-in-out infinite',
              }}>
                🏆
              </div>
              <h2 style={{
                fontSize: '28px',
                color: 'var(--accent-green)',
                marginBottom: '15px',
                textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
              }}>
                Perfect Guess!
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                marginBottom: '30px',
              }}>
                CricketMind AI successfully predicted your player.
              </p>
              <ReasoningBreakdown />
              <button
                onClick={handleResetGame}
                style={{
                  marginTop: '30px',
                  padding: '14px 40px',
                  background: 'rgba(0, 217, 255, 0.1)',
                  border: '2px solid var(--neon-cyan)',
                  borderRadius: '15px',
                  color: 'var(--neon-cyan)',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 25px rgba(0, 217, 255, 0.4)';
                  e.target.style.borderColor = 'var(--neon-gold)';
                  e.target.style.color = 'var(--neon-gold)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = 'var(--neon-cyan)';
                  e.target.style.color = 'var(--neon-cyan)';
                }}
              >
                New Game
              </button>
            </div>
          )}

          {feedbackType === 'wrong' && <PredictionFeedback isWrong={true} onSubmitFeedback={handleFeedbackSubmit} />}
        </div>
      </div>
    );
  }

  return (
    <div className={`confidence-system-container ${predictionReady ? 'prediction-ready' : ''}`}>
      {/* Central Confidence Meter */}
      <AIConfidenceMeter confidence={Math.round(confidence)} />

      {/* Right Side - Probability Ranking */}
      <ProbabilityRankingPanel players={IPL_PLAYERS} />

      {/* Left Side - Neural Reasoning */}
      <NeuralReasoningViz reasoning={REASONING_DATA} />

      {/* Bottom - Confidence Timeline */}
      <ConfidenceTimeline timelineData={TIMELINE_DATA} />

      {/* Prediction Ready Indicator */}
      {predictionReady && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            background: 'rgba(0, 255, 136, 0.2)',
            border: '2px solid rgba(0, 255, 136, 0.5)',
            borderRadius: '12px',
            padding: '12px 20px',
            color: 'var(--accent-green)',
            fontSize: '13px',
            fontWeight: '700',
            zIndex: 50,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            animation: 'pulseConfidence 1s ease-in-out infinite',
          }}
        >
          ✓ Ready for Prediction
        </div>
      )}
    </div>
  );
};

export default AIConfidenceSystem;
