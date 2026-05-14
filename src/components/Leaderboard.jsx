import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { getTopLeaderboard, calculateBadge } from '../utils/firebaseUserUtils';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Use real-time listener so leaderboard updates immediately when XP changes
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc, index) => {
        const data = doc.data();
        const badge = calculateBadge(data.xp || 0);

        return {
          id: doc.id,
          rank: index + 1,
          name: data.name || doc.id.substring(0, 8),
          xp: data.xp || 0,
          accuracy: data.accuracy ? `${data.accuracy}%` : 'N/A',
          badge,
        };
      });
      setUsers(list);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error('Leaderboard snapshot error:', err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
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
