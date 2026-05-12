import React, { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-hologram.png';
import PredictionGame from './PredictionGame';
import './Hero.css';

const Hero = () => {
  const [showPredictionGame, setShowPredictionGame] = useState(false);

  return (
    <header className="cm-hero" id="home" aria-label="CricketMind hero">
      <div className="cm-hero-bg" aria-hidden>
        <svg className="cm-blob" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6e00ff" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path fill="url(#g1)" opacity="0.12" d="M421,40Q520,120,538,228Q556,336,475,402Q394,468,291,439Q188,410,130,319Q72,228,143,150Q214,72,321,46Q428,20,421,40Z" />
        </svg>
      </div>

      <div className="cm-hero-inner container">
        <motion.div className="cm-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="cm-badge">CRICKETMIND • LIVE</div>

          <h1 className="cm-title">Predict the player. <span className="cm-accent">Win XP & Rise.</span></h1>

          <p className="cm-sub">12 rapid MCQs, evidence-weighted AI reasoning, and a live leaderboard — quick rounds built for competitive cricket fans.</p>

          <div className="cm-ctas">
            <button className="cm-btn cm-primary" onClick={() => setShowPredictionGame(true)} aria-label="Join the game">Join The Game • 12 Qs</button>
            <button className="cm-btn cm-ghost" onClick={() => (window.location.href = '#leaderboard')}>Leaderboard</button>
          </div>

          <ul className="cm-features" aria-hidden>
            <li>🎯 Evidence-weighted MCQs</li>
            <li>🏆 Real-time leaderboard</li>
            <li>⚡ Instant AI predictions</li>
          </ul>
        </motion.div>

        <motion.div className="cm-right"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cm-visual">
            <motion.img src={heroImage} alt="Holographic Cricket AI" className="cm-holo" animate={{ rotate: [0, 6, 0] }} transition={{ duration: 10, repeat: Infinity }} />

            <div className="cm-overlay">
              <div className="cm-stat">
                <div className="v">94%</div>
                <div className="l">Avg Accuracy</div>
              </div>
              <div className="cm-stat">
                <div className="v">+10</div>
                <div className="l">XP / Win</div>
              </div>
            </div>

            <div className="cm-rings" />
          </div>
        </motion.div>
      </div>

      {showPredictionGame && <PredictionGame onClose={() => setShowPredictionGame(false)} />}
    </header>
  );
};

export default Hero;
