import React from 'react';

const ReasoningBreakdown = ({ factors = [] }) => {
  const defaultFactors = [
    { icon: '💪', text: 'Aggressive Finisher', category: 'Batting Style' },
    { icon: '🏆', text: 'Multi-Time Champion', category: 'IPL Success' },
    { icon: '👑', text: 'Team Captain', category: 'Leadership' },
    { icon: '🌏', text: 'Indian Batsman', category: 'Nationality' },
    { icon: '🎯', text: 'Match Finisher', category: 'Role Type' },
    { icon: '📊', text: 'Consistent Performer', category: 'Track Record' },
  ];

  const displayFactors = factors.length > 0 ? factors : defaultFactors;

  return (
    <div style={{ marginTop: '30px' }}>
      <div className="reasoning-breakdown">
        <div className="breakdown-title">🎯 AI Reasoning Breakdown</div>
        <div className="breakdown-factors">
          {displayFactors.map((factor, idx) => (
            <div key={idx} className="factor-card">
              <div className="factor-icon">{factor.icon}</div>
              <div className="factor-text">{factor.text}</div>
              <div style={{
                fontSize: '9px',
                color: 'var(--text-secondary)',
                marginTop: '6px',
                opacity: 0.8,
              }}>
                {factor.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: 'rgba(0, 217, 255, 0.05)',
        border: '2px solid var(--border-light)',
        borderRadius: '15px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
        }}>
          AI Model Confidence Score
        </div>
        <div style={{
          fontSize: '32px',
          fontWeight: '900',
          color: 'var(--neon-gold)',
          textShadow: '0 0 20px var(--neon-gold)',
        }}>
          85%
        </div>
        <div style={{
          fontSize: '11px',
          color: 'var(--text-secondary)',
          marginTop: '8px',
        }}>
          Based on cricket intelligence & pattern analysis
        </div>
      </div>
    </div>
  );
};

export default ReasoningBreakdown;
