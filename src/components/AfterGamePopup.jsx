import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { getUserRank, calculateBadge, getNextBadgeTier } from '../utils/firebaseUserUtils';
import '../styles/after-game-popup.css';

const AfterGamePopup = ({
  prediction,
  user,
  onClose,
  onPlayAgain,
  xpAwarded = 10,
}) => {
  const [activeTab, setActiveTab] = useState('result');
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch leaderboard data
  useEffect(() => {
    if (activeTab === 'leaderboard') {
      setLoading(true);
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
            isCurrentUser: user && doc.id === user.uid,
          };
        });
        setLeaderboardUsers(list);
        setLoading(false);
      });

      // Fetch current user rank
      if (user) {
        getUserRank(user.uid).then((res) => {
          if (res.success) setUserRank(res.rank);
        });
      }

      return () => unsubscribe();
    }
  }, [activeTab, user]);

  const tabVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      opacity: 0,
      x: direction < 0 ? 1000 : -1000,
    }),
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'result':
        return (
          <motion.div
            key="result"
            custom={1}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="tab-content result-content"
          >
            <div className="prediction-display">
              <div className="player-card">
                <div className="player-emoji">{prediction?.emoji || '🏏'}</div>
                <div className="player-info">
                  <p className="predicted-label">You're thinking of...</p>
                  <h3 className="predicted-player">{prediction?.playerName}</h3>
                </div>
              </div>

              <div className="confidence-section">
                <div className="confidence-header">
                  <span className="label">AI Confidence</span>
                  <span className="value">{prediction?.confidence}%</span>
                </div>
                <div className="confidence-bar">
                  <motion.div
                    className="confidence-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction?.confidence}%` }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                      backgroundColor:
                        prediction?.confidence > 80
                          ? '#00d9ff'
                          : prediction?.confidence > 60
                          ? '#ffd700'
                          : '#ff6b6b',
                    }}
                  />
                </div>
              </div>

              <div className="reasoning-section">
                <h4>Why This Player?</h4>
                <p>{prediction?.reasoning}</p>
              </div>

              {prediction?.alternates && prediction.alternates.length > 0 && (
                <div className="alternates-section">
                  <h4>Other Possibilities</h4>
                  <ul className="alternates-list">
                    {prediction.alternates.map((player, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        {player}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {user && (
                <div className="xp-reward-section">
                  <div className="xp-badge">
                    <Trophy size={20} />
                    <span>+{xpAwarded} XP Awarded!</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'leaderboard':
        const currentUser = leaderboardUsers.find(u => u.isCurrentUser);
        const nextBadgeTier = currentUser ? getNextBadgeTier(currentUser.badge) : null;

        return (
          <motion.div
            key="leaderboard"
            custom={-1}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="tab-content leaderboard-content"
          >
            <div className="leaderboard-mini">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading leaderboard...</p>
                </div>
              ) : (
                <>
                  {/* Personal Stats Card */}
                  {user && currentUser && (
                    <motion.div
                      className="personal-stats-card"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="stats-header">
                        <div className="rank-showcase">
                          <div className={`rank-circle rank-${currentUser.rank <= 3 ? currentUser.rank : 'default'}`}>
                            {currentUser.rank === 1 ? (
                              <Trophy size={32} />
                            ) : (
                              <span className="rank-number-large">#{currentUser.rank}</span>
                            )}
                          </div>
                          <div className="rank-info">
                            <p className="rank-label">Current Rank</p>
                            <p className="rank-title">{currentUser.name}</p>
                          </div>
                        </div>
                        <div className="badge-showcase">
                          <span className={`badge-tag-large ${currentUser.badge.toLowerCase()}`}>
                            {currentUser.badge}
                          </span>
                        </div>
                      </div>

                      <div className="xp-progress-section">
                        <div className="xp-header">
                          <span className="xp-current">XP: <span className="xp-number">{currentUser.xp.toLocaleString()}</span></span>
                          <span className="xp-target">Target: {nextBadgeTier?.xp.toLocaleString() || 'Max'}</span>
                        </div>
                        <div className="xp-progress-bar">
                          <motion.div
                            className="xp-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((currentUser.xp / (nextBadgeTier?.xp || 50000)) * 100, 100)}%` }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                          />
                        </div>
                        <p className="xp-remaining">
                          {nextBadgeTier?.xp > currentUser.xp 
                            ? `${(nextBadgeTier?.xp - currentUser.xp).toLocaleString()} XP until ${nextBadgeTier?.name}`
                            : 'Reached Maximum Rank!'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Leaderboard Table */}
                  <div className="leaderboard-table">
                    <div className="table-title">🏆 Top Players</div>
                    <div className="table-header">
                      <span className="col-rank">Rank</span>
                      <span className="col-name">Player</span>
                      <span className="col-xp">XP</span>
                      <span className="col-badge">Badge</span>
                    </div>

                    <div className="table-body">
                      {leaderboardUsers.map((u, idx) => (
                        <motion.div
                          key={u.id}
                          className={`table-row ${u.isCurrentUser ? 'current-user' : ''}`}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <div className="col-rank">
                            {u.rank === 1 ? (
                              <span className="rank-badge rank-1">
                                <Trophy size={16} />
                              </span>
                            ) : u.rank === 2 ? (
                              <span className="rank-badge rank-2">2</span>
                            ) : u.rank === 3 ? (
                              <span className="rank-badge rank-3">3</span>
                            ) : (
                              <span className="rank-number">#{u.rank}</span>
                            )}
                          </div>
                          <div className="col-name">
                            <div className="user-info">
                              <div className={`avatar ${u.isCurrentUser ? 'current' : ''}`} />
                              <div>
                                <p className="name">{u.name}</p>
                                {u.isCurrentUser && (
                                  <span className="you-badge">You</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-xp">
                            <span className="xp-value">{u.xp.toLocaleString()}</span>
                          </div>
                          <div className="col-badge">
                            <span className={`badge-tag ${u.badge.toLowerCase()}`}>
                              {u.badge}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {user && userRank && userRank > 10 && (
                    <motion.div
                      className="user-position-card"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="position-content">
                        <span className="position-label">📍 Your Position</span>
                        <span className="position-value">#{userRank}</span>
                        <p className="position-text">Keep playing to climb to the top 10!</p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        );

      case 'stats':
        return (
          <motion.div
            key="stats"
            custom={1}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="tab-content stats-content"
          >
            <div className="stats-grid">
              <motion.div
                className="stat-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <TrendingUp size={24} className="stat-icon" />
                <div className="stat-info">
                  <p className="stat-label">XP Gained</p>
                  <p className="stat-value">+{xpAwarded}</p>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Target size={24} className="stat-icon" />
                <div className="stat-info">
                  <p className="stat-label">Confidence</p>
                  <p className="stat-value">{prediction?.confidence}%</p>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Award size={24} className="stat-icon" />
                <div className="stat-info">
                  <p className="stat-label">Current Rank</p>
                  <p className="stat-value">#{userRank || '—'}</p>
                </div>
              </motion.div>
            </div>

            <div className="achievement-section">
              <h4>Achievement Unlocked!</h4>
              <div className="achievement-item">
                <div className="achievement-icon">🎯</div>
                <div className="achievement-text">
                  <p className="achievement-title">Prediction Master</p>
                  <p className="achievement-desc">
                    Made {prediction?.confidence > 80 ? 'a highly confident' : 'a'} prediction
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="after-game-container">
      <motion.div
        className="after-game-popup"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="popup-header">
          <h2>Game Complete</h2>
          <div className="header-shine" />
        </div>

        <div className="tabs">
          {[
            { id: 'result', label: 'Prediction', icon: '🔮' },
            { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
            { id: 'stats', label: 'Stats', icon: '📊' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div className="tab-underline" layoutId="underline" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="popup-content">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>

        <div className="popup-actions">
          <motion.button
            className="action-btn play-again"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Play Again
          </motion.button>
          <motion.button
            className="action-btn close"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AfterGamePopup;
