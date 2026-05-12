import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Globe, Zap, Trophy } from 'lucide-react';

const features = [
  {
    icon: <Brain size={32} />,
    title: "AI Insights",
    desc: "Advanced neural networks processing millions of data points for precise match outcomes.",
    color: "blue"
  },
  {
    icon: <Globe size={32} />,
    title: "Global Leaderboard",
    desc: "Compete with cricket analysts worldwide and climb the ranks to become the ultimate predictor.",
    color: "cyan"
  },
  {
    icon: <Zap size={32} />,
    title: "IPL Predictions",
    desc: "Real-time probability updates during live matches based on pitch, weather, and form.",
    color: "gold"
  },
  {
    icon: <Trophy size={32} />,
    title: "Win Rewards",
    desc: "Earn XP, unlock exclusive rank badges, and win rewards for consistent accuracy.",
    color: "blue"
  }
];

const Features = () => {
  return (
    <section className="features container" id="how-it-works">
      <div className="section-header">
        <h2 className="section-title">Engineered For <span className="text-gradient-blue">Accuracy</span></h2>
        <p className="section-subtitle">The most advanced prediction engine ever built for the gentleman's game.</p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            className="feature-card glass glass-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`feature-icon icon-${f.color}`}>
              {f.icon}
            </div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
            <div className="feature-glow" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
