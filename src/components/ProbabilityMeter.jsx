import React from 'react';
import { motion } from 'framer-motion';

const ProbabilityMeter = ({ confidence, players }) => {
  const topCandidates = [...players]
    .filter(p => !p.eliminated)
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 5);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  return (
    <div className="probability-panel glass">
      <div className="confidence-section">
        <svg className="confidence-svg" width="180" height="180">
          <circle
            cx="90" cy="90" r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          <motion.circle
            cx="90" cy="90" r={radius}
            fill="transparent"
            stroke="var(--accent-cyan)"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px var(--accent-cyan))' }}
          />
          <text 
            x="90" y="85" 
            textAnchor="middle" 
            fill="white" 
            style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6 }}
          >
            Confidence
          </text>
          <text 
            x="90" y="115" 
            textAnchor="middle" 
            fill="white" 
            style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit' }}
          >
            {confidence}%
          </text>
        </svg>
      </div>

      <div className="top-candidates">
        <h4 className="panel-title">Neural Rankings</h4>
        {topCandidates.map((c, i) => (
          <div key={c.id} className="candidate-row">
            <span className="row-rank">#{i + 1}</span>
            <span className="row-name">{c.name}</span>
            <div className="row-bar-container">
              <motion.div 
                className="row-bar-fill" 
                initial={{ width: 0 }}
                animate={{ width: `${c.prob}%` }}
              />
            </div>
            <span className="row-val">{c.prob}%</span>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .probability-panel {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .confidence-section {
          display: flex;
          justify-content: center;
        }
        .confidence-svg { transform: rotate(-90deg); }
        .confidence-svg text { transform: rotate(90deg); transform-origin: center; }

        .panel-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          opacity: 0.6;
        }
        .candidate-row {
          display: grid;
          grid-template-columns: 30px 1fr 100px 40px;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }
        .row-rank { color: var(--accent-cyan); font-weight: 700; }
        .row-bar-container {
          height: 4px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .row-bar-fill {
          height: 100%;
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
        }
        .row-val { font-weight: 700; color: var(--accent-cyan); text-align: right; }
      `}</style>
    </div>
  );
};

export default ProbabilityMeter;
