import React from 'react';
import { motion } from 'framer-motion';

const DecisionFlow = ({ history }) => {
  return (
    <div className="decision-flow glass">
      <h4 className="panel-title">Neural Decision Path</h4>
      <div className="flow-container" style={{ position: 'relative', paddingLeft: '20px' }}>
        <div className="flow-line-vertical" />
        {history.length === 0 ? (
          <div className="flow-node">Initializing...</div>
        ) : (
          history.map((h, i) => (
            <motion.div 
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flow-node-wrapper"
            >
              <div className="flow-dot" />
              <div className="flow-node">
                {h.question.slice(0, 30)}...
              </div>
            </motion.div>
          ))
        )}
      </div>

      <style jsx="true">{`
        .flow-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .flow-line-vertical {
          position: absolute;
          left: 0;
          top: 10px;
          bottom: 10px;
          width: 2px;
          background: linear-gradient(180deg, var(--accent-cyan), transparent);
          opacity: 0.3;
        }
        .flow-node-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .flow-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-cyan);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-cyan);
        }
        .flow-node {
          padding: 0.8rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          font-size: 0.75rem;
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default DecisionFlow;
