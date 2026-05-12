import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-hologram.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <h1 className="hero-title">
            Predict The Winners. <br />
            <span className="text-gradient-blue">Own The Game.</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered IPL match predictions, fantasy insights, and real-time analytics 
            engineered for the next generation of cricket fans.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg">Join The Game</button>
            <button className="btn btn-outline btn-lg">Explore Predictions</button>
          </div>
        </motion.div>

        <div className="hero-visual">
          <div className="sphere-container">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="energy-ring ring-1"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="energy-ring ring-2"
            />
            <motion.img 
              src={heroImage} 
              alt="Holographic Cricket AI" 
              className="hero-sphere animate-float"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Floating UI Elements */}
            <motion.div 
              className="floating-data glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ top: '10%', right: '-10%' }}
            >
              <div className="data-item">
                <span className="data-label">Win Prob</span>
                <span className="data-value text-gradient-blue">84%</span>
              </div>
            </motion.div>

            <motion.div 
              className="floating-data glass"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ bottom: '20%', left: '-5%' }}
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
