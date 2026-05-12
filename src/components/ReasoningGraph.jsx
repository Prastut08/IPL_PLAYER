import React from 'react';
import { motion } from 'framer-motion';

const ReasoningGraph = ({ activeNodes }) => {
  const nodes = [
    { id: 1, label: "Team", x: 50, y: 50 },
    { id: 2, label: "Role", x: 150, y: 100 },
    { id: 3, label: "Style", x: 50, y: 150 },
    { id: 4, label: "Cap", x: 250, y: 50 },
    { id: 5, label: "Age", x: 350, y: 120 },
    { id: 6, label: "Franchise", x: 250, y: 180 }
  ];

  const connections = [
    [1, 2], [1, 4], [2, 3], [2, 5], [4, 5], [3, 6], [5, 6]
  ];

  return (
    <div className="neural-graph">
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        {connections.map(([a, b], i) => {
          const n1 = nodes.find(n => n.id === a);
          const n2 = nodes.find(n => n.id === b);
          const isActive = activeNodes > i;
          return (
            <motion.line
              key={i}
              x1={n1.x} y1={n1.y}
              x2={n2.x} y2={n2.y}
              stroke={isActive ? "var(--accent-cyan)" : "var(--accent-blue)"}
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{ 
                pathLength: isActive ? 1 : 0.5, 
                opacity: isActive ? 0.8 : 0.2 
              }}
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          className={`node ${activeNodes > i ? 'active' : ''}`}
          style={{ left: n.x - 4, top: n.y - 4 }}
          animate={{ scale: activeNodes > i ? 1.5 : 1 }}
        >
          <span className="node-label">{n.label}</span>
        </motion.div>
      ))}

      <style jsx="true">{`
        .node-label {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.6rem;
          color: var(--text-secondary);
          white-space: nowrap;
          text-transform: uppercase;
          pointer-events: none;
        }
        .node.active .node-label {
          color: var(--accent-cyan);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default ReasoningGraph;
