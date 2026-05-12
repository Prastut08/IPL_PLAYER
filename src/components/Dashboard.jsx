import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const matches = [
  { team1: "MI", team2: "CSK", prob1: 58, prob2: 42, confidence: 92, status: "Live" },
  { team1: "RCB", team2: "KKR", prob1: 45, prob2: 55, confidence: 85, status: "Starting Soon" }
];

const Dashboard = () => {
  return (
    <section className="dashboard container" id="predictions">
      <div className="section-header">
        <h2 className="section-title">Live <span className="text-gradient-gold">Intelligence</span></h2>
        <p className="section-subtitle">Real-time match analytics and AI-driven outcome probabilities.</p>
      </div>

      <div className="match-grid">
        {matches.map((m, i) => (
          <motion.div 
            key={i}
            className="match-card glass"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="match-header">
              <span className={`status-badge ${m.status === 'Live' ? 'status-live' : ''}`}>
                {m.status === 'Live' && <span className="pulse-dot" />}
                {m.status}
              </span>
              <div className="ai-meter">
                <ShieldCheck size={16} />
                <span>AI Confidence: {m.confidence}%</span>
              </div>
            </div>

            <div className="teams-comparison">
              <div className="team">
                <div className="team-logo glass">{m.team1}</div>
                <span className="team-name">{m.team1}</span>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <div className="team-logo glass">{m.team2}</div>
                <span className="team-name">{m.team2}</span>
              </div>
            </div>

            <div className="probability-section">
              <div className="prob-header">
                <span>Win Probability</span>
                <TrendingUp size={16} className="text-accent-blue" />
              </div>
              <div className="prob-bar-container">
                <div className="prob-bar-fill" style={{ width: `${m.prob1}%`, background: 'var(--accent-blue)' }} />
                <div className="prob-bar-fill" style={{ width: `${m.prob2}%`, background: 'var(--accent-cyan)', right: 0 }} />
                <div className="prob-labels">
                  <span>{m.prob1}%</span>
                  <span>{m.prob2}%</span>
                </div>
              </div>
            </div>

            <button className="btn btn-outline full-width">View Full Analytics</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
