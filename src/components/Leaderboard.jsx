import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const users = [
  { rank: 1, name: "CryptoCricket", xp: 45200, accuracy: "94%", badge: "Grandmaster" },
  { rank: 2, name: "AI_Analyst", xp: 42100, accuracy: "91%", badge: "Pro" },
  { rank: 3, name: "NeuralKnight", xp: 39800, accuracy: "89%", badge: "Expert" }
];

const Leaderboard = () => {
  return (
    <section className="leaderboard container" id="leaderboard">
      <div className="section-header">
        <h2 className="section-title">Hall of <span className="text-gradient-blue">Fame</span></h2>
        <p className="section-subtitle">The world's elite cricket minds. Rise through the ranks and claim your glory.</p>
      </div>

      <div className="leaderboard-container glass">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Predictor</span>
          <span>Accuracy</span>
          <span>XP Points</span>
          <span>Badge</span>
        </div>
        
        <div className="user-list">
          {users.map((u, i) => (
            <motion.div 
              key={i}
              className="user-row"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="rank-cell">
                {u.rank === 1 ? <Trophy className="text-gradient-gold" size={20} /> : u.rank}
              </div>
              <div className="name-cell">
                <div className="avatar glass" />
                <span>{u.name}</span>
              </div>
              <div className="stat-cell">{u.accuracy}</div>
              <div className="stat-cell text-gradient-blue">{u.xp.toLocaleString()}</div>
              <div className="badge-cell">
                <span className={`badge-tag ${u.badge.toLowerCase()}`}>{u.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
