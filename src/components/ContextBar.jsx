import React from 'react';
import { History, BrainCircuit } from 'lucide-react';

const ContextBar = ({ history, strategy }) => {
  return (
    <div className="context-bar glass">
      <div className="strategy-breadcrumb">
        <div className="breadcrumb-info">
          <span className="breadcrumb-label">Active Strategy</span>
          <div className="strategy-text">
            <BrainCircuit size={18} className="text-accent-cyan" />
            <span>{strategy}</span>
          </div>
        </div>
      </div>

      <div className="history-section">
        <span className="breadcrumb-label">Context Memory</span>
        <div className="answer-timeline">
          {history.length === 0 ? (
            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Awaiting initial data...</span>
          ) : (
            history.map((h, i) => (
              <div key={i} className={`timeline-pill ${h.answer}`}>
                <History size={12} />
                <span>{h.answer === 'yes' ? 'TRUE' : 'FALSE'} • {h.question.slice(0, 15)}...</span>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx="true">{`
        .strategy-text {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: white;
          font-size: 1.1rem;
        }
        .history-section {
          flex: 1;
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default ContextBar;
