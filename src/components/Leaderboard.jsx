import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { getTopLeaderboard } from '../utils/firebaseUserUtils';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const result = await getTopLeaderboard(10);
      if (result.success) {
        // Calculate badge based on XP
        const usersWithBadges = result.data.map((user) => {
          let badge = "Beginner";
          if (user.xp >= 50000) badge = "Grandmaster";
          else if (user.xp >= 40000) badge = "Pro";
          else if (user.xp >= 30000) badge = "Expert";
          else if (user.xp >= 20000) badge = "Advanced";
          else if (user.xp >= 10000) badge = "Intermediate";
          
          return {
            ...user,
            badge,
            accuracy: user.accuracy ? `${user.accuracy}%` : "N/A",
            name: user.name || user.id.substring(0, 8),
          };
        });
        setUsers(usersWithBadges);
        setError(null);
      } else {
        setError(result.error);
        // Show default users if database is empty
        setUsers([
          { rank: 1, name: "CryptoCricket", xp: 45200, accuracy: "94%", badge: "Grandmaster", id: "1" },
          { rank: 2, name: "AI_Analyst", xp: 42100, accuracy: "91%", badge: "Pro", id: "2" },
          { rank: 3, name: "NeuralKnight", xp: 39800, accuracy: "89%", badge: "Expert", id: "3" }
        ]);
      }
      setLoading(false);
    };

    fetchLeaderboard();

    // Refresh leaderboard every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#00d9ff' }}>Loading...</div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>No users on leaderboard yet</div>
          ) : (
            users.map((u, i) => (
              <motion.div 
                key={u.id || i}
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
