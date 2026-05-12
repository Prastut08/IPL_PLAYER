import React from 'react';

const NeuralReasoningViz = ({ reasoning = [] }) => {
  const defaultReasoning = [
    { label: 'Batting Style', value: 'Aggressive Finisher', confidence: 92 },
    { label: 'Team Match', value: 'IPL Franchises', confidence: 85 },
    { label: 'Era Match', value: '2016 - 2026', confidence: 78 },
    { label: 'Role Detection', value: 'Middle Order', confidence: 88 },
    { label: 'Bowling Role', value: 'Not Applicable', confidence: 65 },
    { label: 'Nationality', value: 'Indian', confidence: 72 },
  ];

  const displayReasoning = reasoning.length > 0 ? reasoning : defaultReasoning;

  return (
    <div className="neural-reasoning-panel">
      <div className="reasoning-title">
        🧠 AI Reasoning Process
      </div>

      {displayReasoning.map((item, idx) => (
        <div
          key={idx}
          className={`reasoning-item ${item.confidence > 80 ? 'strong' : ''}`}
        >
          <div className="reasoning-label">{item.label}</div>
          <div className="reasoning-value">{item.value}</div>
          <div className="reasoning-confidence-bar">
            <div
              className="reasoning-confidence-fill"
              style={{ width: `${item.confidence}%` }}
            ></div>
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-secondary)',
            marginTop: '5px',
            textAlign: 'right',
          }}>
            {item.confidence}% match
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: 'rgba(160, 32, 240, 0.1)',
        border: '1px solid var(--neon-purple)',
        borderRadius: '8px',
        fontSize: '10px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
      }}>
        <strong style={{ color: 'var(--neon-purple)' }}>Neural Network Status</strong><br />
        Processing cricket attributes...
      </div>
    </div>
  );
};

export default NeuralReasoningViz;
