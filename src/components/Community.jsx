import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Share2, Heart, TrendingUp } from 'lucide-react';

const threads = [
  { user: "Siddharth", text: "AI predicts 180+ for RCB tonight. Pitch looks dry. Thoughts?", likes: 42, comments: 12 },
  { user: "CricketGuru", text: "Bumrah's death over stats against CSK are insane. Must be in every fantasy team.", likes: 89, comments: 24 }
];

const Community = () => {
  return (
    <section className="community container" id="community">
      <div className="section-header">
        <h2 className="section-title">Global <span className="text-gradient-cyan">Community</span></h2>
        <p className="section-subtitle">Join thousands of analysts. Discuss, debate, and share your predictions.</p>
      </div>

      <div className="community-grid">
        <div className="discussions">
          {threads.map((t, i) => (
            <motion.div 
              key={i}
              className="thread-card glass"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="thread-header">
                <div className="avatar glass" />
                <span className="username">{t.user}</span>
                <span className="timestamp">• 2h ago</span>
              </div>
              <p className="thread-text">{t.text}</p>
              <div className="thread-actions">
                <div className="action"><Heart size={16} /> {t.likes}</div>
                <div className="action"><MessageSquare size={16} /> {t.comments}</div>
                <div className="action"><Share2 size={16} /></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="trending glass">
          <h3 className="trending-title"><TrendingUp size={20} className="text-accent-cyan" /> Trending Now</h3>
          <div className="trending-items">
            <div className="trending-item">
              <span className="tag">#RCBvCSK</span>
              <span className="count">12.4k Predictions</span>
            </div>
            <div className="trending-item">
              <span className="tag">#BumrahMagic</span>
              <span className="count">8.1k Discussions</span>
            </div>
            <div className="trending-item">
              <span className="tag">#AIWinRate</span>
              <span className="count">5.2k Shares</span>
            </div>
          </div>
          <button className="btn btn-outline full-width">Join Discussion</button>
        </div>
      </div>
    </section>
  );
};

export default Community;
