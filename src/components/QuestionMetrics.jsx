import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Zap } from 'lucide-react';

const QuestionMetrics = ({ metrics }) => {
  return (
    <div className="metrics-card glass">
      <h4 className="panel-title">Question Intelligence</h4>
      
      <div className="metric-item">
        <div className="metric-header">
          <span><Zap size={14} className="text-accent-gold" /> Info Gain</span>
          <span className="text-accent-gold">{metrics.gain.toFixed(1)}%</span>
        </div>
        <div className="row-bar-container">
          <motion.div 
            className="row-bar-fill" 
            animate={{ width: `${metrics.gain}%` }}
            style={{ background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }}
          />
        </div>
      </div>

      <div className="metric-item">
        <div className="metric-header">
          <span><Activity size={14} className="text-accent-cyan" /> Entropy Reduction</span>
          <span className="text-accent-cyan">-{metrics.entropy.toFixed(2)} bits</span>
        </div>
        <div className="row-bar-container">
          <motion.div 
            className="row-bar-fill" 
            animate={{ width: `${(1 - metrics.entropy) * 100}%` }}
            style={{ background: 'var(--accent-cyan)' }}
          />
        </div>
      </div>

      <div className="intelligence-ring">
        <div className="ring-bg glass" style={{ width: 100, height: 100, borderRadius: '50%' }} />
        <div className="ring-value" style={{ position: 'absolute', textAlign: 'center' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{metrics.efficiency.toFixed(0)}</span>
          <br />
          <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>EFFICIENCY</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionMetrics;
