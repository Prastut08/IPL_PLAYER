import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CandidatePool = ({ players }) => {
  return (
    <div className="candidate-pool">
      <AnimatePresence mode="popLayout">
        {players.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: p.eliminated ? 0.1 : 1, 
              scale: p.eliminated ? 0.8 : 1,
              filter: p.eliminated ? 'blur(4px) grayscale(1)' : 'none'
            }}
            className={`candidate-card glass ${p.eliminated ? 'eliminated' : 'probable'}`}
          >
            <div className="avatar-placeholder glass" style={{ width: 50, height: 50, borderRadius: '50%' }} />
            <span className="candidate-name">{p.name}</span>
            {!p.eliminated && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="candidate-prob"
              >
                {p.prob}%
              </motion.span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx="true">{`
        .avatar-placeholder {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default CandidatePool;
