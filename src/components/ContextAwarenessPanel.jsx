import React from 'react';

const ContextAwarenessPanel = ({ answers = [], reasoning = '', adaptiveStrategy = '' }) => {
  const contextItems = [
    { label: 'Query Phase', status: 'active' },
    { label: 'Player Database', status: 'active' },
    { label: 'Filter Criteria', status: 'active' },
    ...answers.slice(0, 5).map((answer, idx) => ({
      label: `Answer ${idx + 1}: ${answer}`,
      status: idx === answers.length - 1 ? 'active' : 'completed'
    })),
  ];

  return (
    <div className="context-panel">
      <div className="context-title">
        <span>Context Memory</span>
      </div>

      <div className="context-timeline">
        {contextItems.map((item, idx) => (
          <div key={idx} className={`context-item ${item.status}`}>
            ◆ {item.label}
          </div>
        ))}
      </div>

      {reasoning && (
        <div className="context-reasoning">
          <div style={{ fontWeight: '700', marginBottom: '8px', color: 'var(--neon-purple)' }}>
            AI Deduction Logic:
          </div>
          {reasoning}
          <div>
            <span className="reasoning-tag">Pattern Detection</span>
            <span className="reasoning-tag">Entropy Reduction</span>
            <span className="reasoning-tag">Adaptive Priority</span>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: 'rgba(0, 217, 255, 0.05)',
        borderRadius: '8px',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        lineHeight: '1.6'
      }}>
        <strong style={{ color: 'var(--neon-cyan)' }}>Current Strategy:</strong><br />
        {adaptiveStrategy || 'Analyzing player batting profiles and recent IPL performance metrics...'}
      </div>
    </div>
  );
};

export default ContextAwarenessPanel;
