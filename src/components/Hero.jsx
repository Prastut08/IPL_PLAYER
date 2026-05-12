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
