import React, { useState, useEffect } from 'react';
import '../styles/cricketmind-unified.css';

// Import sub-components for the game
import AIConfidenceMeter from './AIConfidenceMeter';
import ProbabilityRankingPanel from './ProbabilityRankingPanel';
import NeuralReasoningViz from './NeuralReasoningViz';
import ConfidenceTimeline from './ConfidenceTimeline';
import FinalPredictionReveal from './FinalPredictionReveal';
import ReasoningBreakdown from './ReasoningBreakdown';
import PredictionFeedback from './PredictionFeedback';
import PredictionGame from './PredictionGame';

// Sample data
const IPL_PLAYERS = [
  { id: 1, name: 'Virat Kohli', role: 'Batsman', emoji: '🏏', team: 'RCB', probability: 78, meta: ['Captain', '2008+'] },
  { id: 2, name: 'Rohit Sharma', role: 'Batsman', emoji: '👨‍🦱', team: 'MI', probability: 65, meta: ['Captain', 'Overseas'] },
  { id: 3, name: 'MS Dhoni', role: 'WK-Batsman', emoji: '🥅', team: 'CSK', probability: 52, meta: ['Captain', 'Finisher'] },
  { id: 4, name: 'AB de Villiers', role: 'All-rounder', emoji: '🎯', team: 'RCB', probability: 38, meta: ['Overseas', 'Explosive'] },
  { id: 5, name: 'Jasprit Bumrah', role: 'Bowler', emoji: '⚡', team: 'MI', probability: 22, meta: ['Pacer', 'Death'] },
];

const QUESTIONS = [
  { id: 1, text: 'Is this player primarily a batsman?', category: 'Role' },
  { id: 2, text: 'Does this player have captaincy experience in IPL?', category: 'Leadership' },
  { id: 3, text: 'Is this player known for aggressive playing style?', category: 'Style' },
  { id: 4, text: 'Has this player won an IPL trophy?', category: 'Achievement' },
  { id: 5, text: 'Is this player an international star?', category: 'Fame' },
  { id: 6, text: 'Does this player prefer fast-paced matches?', category: 'Preference' },
];

const REASONING_DATA = [
  { label: 'Batting Style', value: 'Aggressive Finisher', confidence: 92 },
  { label: 'Team Match', value: 'Premium Franchises', confidence: 85 },
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

const CricketMind = () => {
  const [gameState, setGameState] = useState('home'); // 'home' | 'game' | 'prediction' | 'feedback'
  const [showPredictionGame, setShowPredictionGame] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionReady, setPredictionReady] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Start game
  const handleStartGame = () => {
    setGameState('game');
    setConfidence(0);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowPrediction(false);
    setPredictionReady(false);
    setShowPredictionGame(true);
  };

  // Simulate confidence building
  useEffect(() => {
    if (gameState !== 'game' || showPrediction) return;

    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev < 85) return prev + Math.random() * 2.5;
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [gameState, showPrediction]);

  // Trigger prediction
  useEffect(() => {
    if (confidence >= 80 && !predictionReady && gameState === 'game') {
      setPredictionReady(true);
      setTimeout(() => setShowPrediction(true), 1500);
    }
  }, [confidence, predictionReady, gameState]);

  const handleQuestion = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleCorrect = () => {
    setFeedbackType('correct');
    setGameState('feedback');
  };

  const handleWrong = () => {
    setFeedbackType('wrong');
    setGameState('feedback');
  };

  const handleFeedbackSubmit = (playerName) => {
    setTimeout(() => handleStartGame(), 2000);
  };

  const handlePlayAgain = () => {
    handleStartGame();
  };

  // HOME PAGE
  if (gameState === 'home') {
    return (
      <div className="cricketmind-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background">
            <div className="hero-glow top-left"></div>
            <div className="hero-glow bottom-right"></div>
            <div className="particles"></div>
          </div>

          <div className="hero-content">
            <div className="hero-badge">🏆 IPL AI AKINATOR</div>
            
            <h1 className="hero-title">
              CricketMind
              <span className="title-accent">.</span>
            </h1>

            <p className="hero-subtitle">
              Let AI guess your favorite IPL player through intelligent questioning
            </p>

            <button className="cta-button" onClick={handleStartGame}>
              <span className="button-icon">🎮</span>
              <span>Start Playing</span>
              <span className="button-shine"></span>
            </button>

            {showPredictionGame && (
              <PredictionGame onClose={() => setShowPredictionGame(false)} />
            )}

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Players</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Leagues</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">AI</span>
                <span className="stat-label">Powered</span>
              </div>
            </div>
          </div>

          {/* Features Showcase */}
          <div className="features-showcase">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <div className="feature-title">Intelligent Asking</div>
              <div className="feature-desc">AI adapts questions based on your answers</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <div className="feature-title">Confidence Tracking</div>
              <div className="feature-desc">Watch AI build confidence in real-time</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Fast Predictions</div>
              <div className="feature-desc">Get accurate predictions in just 6 questions</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <div className="feature-title">Learn & Improve</div>
              <div className="feature-desc">AI learns from your feedback</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
            <div className="scroll-text">Scroll for more</div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-title">Think of a Player</div>
              <div className="step-desc">Pick any IPL player in your mind</div>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-title">Answer Questions</div>
              <div className="step-desc">Answer AI's intelligent questions</div>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-title">AI Predicts</div>
              <div className="step-desc">AI makes its prediction</div>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-title">Give Feedback</div>
              <div className="step-desc">AI learns from results</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Play?</h2>
          <p>Challenge CricketMind to guess your favorite IPL player</p>
          <button className="cta-button large" onClick={handleStartGame}>
            <span className="button-icon">🚀</span>
            <span>Start Game Now</span>
          </button>
        </div>
      </div>
    );
  }

  // GAME PAGE
  if (gameState === 'game' && !showPrediction) {
    return (
      <div className="game-container">
        {/* Header */}
        <div className="game-header">
          <h1 className="game-title">CricketMind</h1>
          <button className="home-button" onClick={() => setGameState('home')}>
            ← Back to Home
          </button>
        </div>

        {/* Main Game Area */}
        <div className="game-main">
          {/* Central Confidence Meter */}
          <div className="game-center">
            <AIConfidenceMeter confidence={Math.round(confidence)} />
            
            {/* Current Question */}
            <div className="current-question-box">
              <div className="question-header">
                <span className="question-number">Q{currentQuestionIndex + 1}</span>
                <span className="questions-remaining">{QUESTIONS.length - currentQuestionIndex} left</span>
              </div>
              <div className="question-text">
                {QUESTIONS[currentQuestionIndex]?.text}
              </div>
              <div className="answer-buttons">
                <button className="answer-btn yes" onClick={() => handleQuestion('yes')}>
                  ✓ Yes
                </button>
                <button className="answer-btn maybe" onClick={() => handleQuestion('maybe')}>
                  ? Maybe
                </button>
                <button className="answer-btn no" onClick={() => handleQuestion('no')}>
                  ✗ No
                </button>
              </div>
            </div>
          </div>

          {/* Left Sidebar - Neural Reasoning */}
          <div className="game-sidebar left">
            <div className="sidebar-title">🧠 AI Reasoning</div>
            <NeuralReasoningViz reasoning={REASONING_DATA} />
          </div>

          {/* Right Sidebar - Probability Ranking */}
          <div className="game-sidebar right">
            <div className="sidebar-title">📊 Top Candidates</div>
            <ProbabilityRankingPanel players={IPL_PLAYERS} />
          </div>
        </div>

        {/* Bottom Timeline */}
        <div className="game-bottom">
          <ConfidenceTimeline timelineData={TIMELINE_DATA} />
        </div>

        {/* Prediction Ready Indicator */}
        {predictionReady && (
          <div className="prediction-ready-banner">
            <div className="pulse-dot"></div>
            <span>✓ AI Ready for Prediction</span>
            <div className="pulse-dot"></div>
          </div>
        )}
      </div>
    );
  }

  // PREDICTION PAGE
  if (showPrediction) {
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

  // FEEDBACK PAGE
  if (gameState === 'feedback') {
    return (
      <div className="feedback-container">
        <div className="feedback-content">
          {feedbackType === 'correct' ? (
            <div className="correct-feedback">
              <div className="trophy-animation">🏆</div>
              <h2>Perfect Guess!</h2>
              <p>CricketMind successfully predicted your player</p>
              <ReasoningBreakdown />
              <button className="play-again-btn" onClick={handlePlayAgain}>
                Play Again 🎮
              </button>
            </div>
          ) : (
            <PredictionFeedback 
              isWrong={true} 
              onSubmitFeedback={handleFeedbackSubmit}
            />
          )}
        </div>
      </div>
    );
  }
};

export default CricketMind;
