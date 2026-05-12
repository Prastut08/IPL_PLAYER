import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-hologram.png';
import PredictionGame from './PredictionGame';

const Hero = () => {
  const [showPredictionGame, setShowPredictionGame] = useState(false);

  return (
    <section className="hero game-hero" id="home">
      <div className="hero-arena">
        <div className="arena-top">
          <div className="scoreboard">
            <div className="score team-ai">
              <div className="label">AI</div>
              <div className="value">94%</div>
            </div>
            <div className="versus">VS</div>
            <div className="score team-player">
              <div className="label">YOU</div>
              <div className="value">—</div>
            </div>
          </div>
        </div>

        <div className="container hero-content">
          <motion.div className="hero-panel"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-left">
              <div className="hero-badge neon">CRICKETMIND • LIVE</div>
              <h1 className="hero-title game-title">Predict & Play —<span className="accent"> Beat The AI</span></h1>

              <p className="hero-subtitle game-sub">Answer 12 quick MCQs — our model uses evidence-weighted reasoning to guess your player. Fast, fun, competitive.</p>

              <div className="hero-ctas">
                <button className="btn start-btn" onClick={() => setShowPredictionGame(true)}>
                  <span className="ping" />
                  <span className="label">JOIN THE GAME</span>
                  <small className="sub">12 Questions • 30s avg</small>
                </button>

                <button className="btn ghost-btn">Explore Predictions</button>
              </div>

              <div className="hero-features">
                <div className="f">🎯 High accuracy</div>
                <div className="f">⚡ Instant results</div>
                <div className="f">🏆 Earn XP</div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hologram-wrap">
                <motion.img src={heroImage} alt="hologram" className="holo" animate={{ rotate: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity }} />
                <div className="grid-overlay" />
                <div className="pulse-ring" />
              </div>
            </div>

            {showPredictionGame && <PredictionGame onClose={() => setShowPredictionGame(false)} />}
          </motion.div>
        </div>

        <div className="arena-bottom">
          <div className="ticker">Live: IPL predictions • Top predictor: draunzerkai1119</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-hologram.png';
import PredictionGame from './PredictionGame';

const Hero = () => {
  const [showPredictionGame, setShowPredictionGame] = useState(false);

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-glow top-left" />
        <div className="hero-glow bottom-right" />
      </div>

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <div className="hero-badge">⚡ AI-POWERED • REAL-TIME</div>

          <h1 className="hero-title">
            Predict The Winners.
            <br />
            <span className="text-gradient-blue">Own The Game.</span>
          </h1>

          <p className="hero-subtitle">
            Bite-sized, evidence-driven MCQs that help our AI identify players with high accuracy. Fast, fun, and built for cricket fans.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">94.2%</div>
              <div className="stat-label">Avg Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-value">120K+</div>
              <div className="stat-label">Predictions / day</div>
            </div>
            <div className="stat">
              <div className="stat-value">24ms</div>
              <div className="stat-label">Avg Latency</div>
            </div>
          </div>

          <div className="hero-actions hero-ctas">
            <button className="btn btn-primary btn-lg glow" onClick={() => setShowPredictionGame(true)}>Join The Game</button>
            <button className="btn btn-outline btn-lg">Explore Predictions</button>
          </div>

          {showPredictionGame && <PredictionGame onClose={() => setShowPredictionGame(false)} />}
        </motion.div>

        <div className="hero-visual">
          <div className="sphere-container">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="energy-ring ring-1"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="energy-ring ring-2"
            />

            <motion.img
              src={heroImage}
              alt="Holographic Cricket AI"
              className="hero-sphere animate-float"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="floating-data glass"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ top: '8%', right: '-6%' }}
            >
              <div className="data-item">
                <span className="data-label">Win Prob</span>
                <span className="data-value text-gradient-blue">84%</span>
              </div>
            </motion.div>

            <motion.div
              className="floating-data glass"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ bottom: '18%', left: '-6%' }}
            >
              <div className="data-item">
                <span className="data-label">AI Confidence</span>
                <span className="data-value text-gradient-gold">High</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
