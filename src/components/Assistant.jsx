import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, Award } from 'lucide-react';

const players = [
  { name: "Virat Kohli", role: "Batter", form: 9.8, suggestion: "Captain", team: "RCB" },
  { name: "Jasprit Bumrah", role: "Bowler", form: 9.5, suggestion: "Must Have", team: "MI" },
  { name: "Rashid Khan", role: "All-rounder", form: 9.2, suggestion: "Vice Captain", team: "GT" }
];

const Assistant = () => {
  return (
    <section className="assistant container" id="assistant">
      <div className="section-header">
        <h2 className="section-title">Fantasy <span className="text-gradient-blue">Assistant</span></h2>
        <p className="section-subtitle">Let AI build your winning squad with deep player performance analytics.</p>
      </div>

      <div className="assistant-content">
        <div className="analytics-sidebar">
          <div className="glass sidebar-card">
            <h3 className="sidebar-title"><Sparkles size={20} className="text-gradient-gold" /> AI Picks of the Day</h3>
            <div className="player-list">
              {players.map((p, i) => (
                <div key={i} className="player-item">
                  <div className="player-info">
                    <span className="player-name">{p.name}</span>
                    <span className="player-role">{p.team} • {p.role}</span>
                  </div>
                  <div className="player-badge glass">{p.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass sidebar-card stats-card">
            <div className="stat-item">
              <BarChart3 size={24} className="text-accent-blue" />
              <div>
                <span className="stat-val">94.2%</span>
                <span className="stat-label">Model Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="main-analytics glass">
          <div className="analytics-header">
            <h3>Neural Player Profiling</h3>
            <div className="tabs">
              <span className="tab active">Performance</span>
              <span className="tab">Consistency</span>
              <span className="tab">Matchup</span>
            </div>
          </div>
          
          <div className="chart-placeholder">
            <div className="visual-grid">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="grid-bar"
                  initial={{ height: '20%' }}
                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="chart-overlay">
              <div className="radar-circle" />
              <div className="radar-circle" />
              <div className="radar-line" />
            </div>
          </div>
          
          <div className="analytics-footer">
            <div className="insight-pill">
              <Award size={16} />
              <span>Higher success rate in Night Matches</span>
            </div>
            <button className="btn btn-primary">Generate Team</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assistant;
