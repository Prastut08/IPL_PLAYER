import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShieldCheck, Zap, TrendingUp, Cpu, Sparkles } from 'lucide-react';
import CandidatePool from './CandidatePool';
import ProbabilityMeter from './ProbabilityMeter';
import ReasoningGraph from './ReasoningGraph';
import QuestionConsole from './QuestionConsole';

const INITIAL_PLAYERS = [
  { id: 1, name: "MS Dhoni", team: "CSK", prob: 5, role: "Keeper", eliminated: false },
  { id: 2, name: "Virat Kohli", team: "RCB", prob: 5, role: "Batter", eliminated: false },
  { id: 3, name: "Rohit Sharma", team: "MI", prob: 5, role: "Batter", eliminated: false },
  { id: 4, name: "Hardik Pandya", team: "MI", prob: 5, role: "All-rounder", eliminated: false },
  { id: 5, name: "Rashid Khan", team: "GT", prob: 5, role: "Bowler", eliminated: false },
  { id: 6, name: "Jasprit Bumrah", team: "MI", prob: 5, role: "Bowler", eliminated: false },
  { id: 7, name: "KL Rahul", team: "LSG", prob: 5, role: "Keeper", eliminated: false },
  { id: 8, name: "Shubman Gill", team: "GT", prob: 5, role: "Batter", eliminated: false },
  { id: 9, name: "Rishabh Pant", team: "DC", prob: 5, role: "Keeper", eliminated: false },
  { id: 10, name: "Sanju Samson", team: "RR", prob: 5, role: "Keeper", eliminated: false },
  { id: 11, name: "Andre Russell", team: "KKR", prob: 5, role: "All-rounder", eliminated: false },
  { id: 12, name: "Suryakumar Yadav", team: "MI", prob: 5, role: "Batter", eliminated: false }
];

const DeductionEngine = () => {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [confidence, setConfidence] = useState(12);
  const [step, setStep] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [predictionMode, setPredictionMode] = useState(false);

  const handleAnswer = (answer) => {
    setIsThinking(true);
    setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      
      // Simulate probability logic
      const newConfidence = Math.min(confidence + Math.floor(Math.random() * 20) + 10, 95);
      setConfidence(newConfidence);

      if (newConfidence >= 80) {
        setPredictionMode(true);
      }

      setPlayers(prev => prev.map(p => {
        if (p.eliminated) return p;
        const shouldEliminate = Math.random() > (newConfidence / 100 + 0.2);
        return {
          ...p,
          eliminated: shouldEliminate,
          prob: shouldEliminate ? 0 : Math.floor(Math.random() * (100 - newConfidence) / 2) + (newConfidence / 2)
        };
      }));

      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className={`engine-page ${predictionMode ? 'prediction-mode' : ''}`}>
      <div className="scanline" />
      <div className="scanning-bar" />
      
      <div className="container">
        <header className="engine-header">
          <div className="logo">
            <Cpu className="text-accent-cyan" size={32} />
            <span className="logo-text">CricketMind AI</span>
          </div>
          <div className="engine-status glass">
            <div className="status-dot animate-pulse" />
            <span>Neural Engine Active</span>
          </div>
        </header>

        <div className="engine-container">
          <section className="left-panel">
            <CandidatePool players={players} />
            <QuestionConsole 
              step={step} 
              isThinking={isThinking} 
              onAnswer={handleAnswer} 
            />
          </section>

          <aside className="right-panel">
            <ProbabilityMeter confidence={confidence} players={players} />
            <ReasoningGraph activeNodes={step} />
            
            <div className="thinking-module glass">
              <div className="thinking-text">
                <div className="thinking-dot" />
                {isThinking ? "Reducing Entropy..." : "Analyzing State"}
              </div>
              <div className="data-stream">
                {isThinking ? (
                  <>
                    {`> SCANNING CANDIDATE_POOL_ID: ${Math.random().toString(36).substring(7)}\n`}
                    {`> CALCULATING BAYESIAN_PROB: ${confidence}%\n`}
                    {`> ENTROPY_REDUCTION: ${Math.random().toFixed(4)} bits`}
                  </>
                ) : (
                  <>
                    {`> ENGINE_IDLE\n`}
                    {`> WAITING_FOR_INPUT\n`}
                    {`> CURRENT_DEPTH: ${step}`}
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {predictionMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prediction-overlay"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="text-accent-gold mb-4" size={64} />
              <h2 className="reveal-title">Neural Convergence Achieved</h2>
              <p className="text-secondary mb-8">The AI has reached 90% confidence. Finalizing deduction...</p>
              <div className="final-reveal glass">
                <h3 className="hero-title text-gradient-gold">MS Dhoni</h3>
                <p className="text-accent-cyan">Legendary Keeper | CSK</p>
              </div>
              <button className="btn btn-primary btn-lg mt-8" onClick={() => window.location.reload()}>
                Reset Neural Engine
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .engine-page {
          min-height: 100vh;
          background: var(--bg-dark);
          color: white;
          overflow: hidden;
          padding-bottom: 5rem;
        }
        .engine-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }
        .engine-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 10px #22c55e;
        }
        .left-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .right-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .final-reveal {
          padding: 3rem;
          border-color: var(--accent-gold);
          box-shadow: var(--glow-gold-intense);
        }
      `}</style>
    </div>
  );
};

export default DeductionEngine;
