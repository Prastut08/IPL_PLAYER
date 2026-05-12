import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import HolographicSphere from './HolographicSphere';
import MagneticCursor from './MagneticCursor';
import Leaderboard from './Leaderboard';
import '../styles/cricketmind-ai-3d.css';

// 3D Hero Scene
const HeroScene = () => (
  <Canvas
    className="hero-canvas"
    camera={{ position: [0, 0, 6], fov: 65 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true }}
    style={{ width: '100%', height: '100%' }}
  >
    {/* fog for depth */}
    <fog attach="fog" args={["#050612", 2, 12]} />
    <ambientLight intensity={0.4} />
    <pointLight position={[8, 8, 8]} intensity={1.0} color="#00d9ff" />
    <pointLight position={[-8, 6, 6]} intensity={0.8} color="#ffd700" />
    <HolographicSphere />
  </Canvas>
);

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">CricketMind AI</span>
        </div>
        
        <ul className="nav-menu">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#engine" className="nav-link">AI Engine</a></li>
          <li><a href="#predictions" className="nav-link">Predictions</a></li>
          <li><a href="#leaderboard" className="nav-link">Leaderboard</a></li>
          <li><a href="#community" className="nav-link">Community</a></li>
          <li><a href="#akinator" className="nav-link">Akinator</a></li>
        </ul>

        <div className="nav-buttons">
          <button className="btn btn-outline">Sign In</button>
          <button className="btn btn-primary">Join The Game</button>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" ref={containerRef} id="home">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="ai-badge">🤖 AI-POWERED PREDICTION ENGINE</div>
          <h1 className="hero-title">
            Predict The Winners.
            <br />
            <span className="gradient-text">Own The Game.</span>
          </h1>
          <motion.p className="hero-subtitle"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI-powered IPL predictions, fantasy intelligence, and real-time cricket analytics powered by advanced neural networks.
          </motion.p>

          <div className="hero-stats" aria-hidden>
            <div className="stat-item">
              <div className="stat-value">94.2%</div>
              <div className="stat-label">Avg Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">120K+</div>
              <div className="stat-label">Predictions / day</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24ms</div>
              <div className="stat-label">Avg Latency</div>
            </div>
          </div>
          
          <div className="hero-buttons">
            <motion.button
              className="btn btn-primary btn-large cta-neon"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
            >
              ⚡ Join The Game
            </motion.button>
            <motion.button
              className="btn btn-outline btn-large"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Predictions
            </motion.button>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
            <span>Scroll to explore</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-3d-container"
          style={{
            rotateX: `${mousePos.y * 20 - 10}deg`,
            rotateY: `${mousePos.x * 20 - 10}deg`
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        >
          <div className="holo-wave" aria-hidden />
          <HeroScene />
          <div className="holo-glint" aria-hidden />
        </motion.div>
      </div>

      <div className="hero-glow-orbs">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: '🧠',
      title: 'AI Insights',
      description: 'Advanced neural networks analyzing 100M+ data points for hyper-accurate predictions',
      delay: 0
    },
    {
      icon: '🏏',
      title: 'IPL Predictions',
      description: 'Real-time IPL match predictions with 94.2% accuracy across all formats',
      delay: 0.1
    },
    {
      icon: '🎮',
      title: 'Fantasy Intelligence',
      description: 'Optimize your fantasy team with AI-powered player recommendations',
      delay: 0.2
    },
    {
      icon: '⚡',
      title: 'Live Analytics',
      description: 'Real-time momentum tracking and confidence meters for live matches',
      delay: 0.3
    }
  ];

  return (
    <section className="features" id="engine">
      <motion.div
        className="features-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Powered By Advanced AI</h2>
        <p className="section-subtitle">Enterprise-grade prediction engine with real-time analytics</p>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: feature.delay }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              boxShadow: '0 30px 60px rgba(0, 217, 255, 0.3)'
            }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="feature-glow"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Live Predictions Dashboard
const PredictionsDashboard = () => {
  const [predictions, setPredictions] = useState([
    { id: 1, team1: 'Mumbai Indians', team2: 'Kolkata Knight Riders', aiProbability: 67, confidence: 94.2 },
    { id: 2, team1: 'Delhi Capitals', team2: 'Royal Challengers Bangalore', aiProbability: 58, confidence: 89.5 },
    { id: 3, team1: 'Sunrisers Hyderabad', team2: 'Chennai Super Kings', aiProbability: 72, confidence: 91.8 },
    { id: 4, team1: 'Rajasthan Royals', team2: 'Punjab Kings', aiProbability: 54, confidence: 87.3 }
  ]);

  // Live updates: use local server proxy if enabled, otherwise fallback to mock fluctuations
  useEffect(() => {
    const USE_PROXY = import.meta.env.VITE_USE_PREDICTION_PROXY === 'true';
    const PROXY_BASE = import.meta.env.VITE_PREDICTION_PROXY_BASE || '';

    if (USE_PROXY) {
      const fetchPredictions = async () => {
        try {
          const res = await fetch(`${PROXY_BASE}/api/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matches: predictions.map(p => ({ id: p.id, team1: p.team1, team2: p.team2 })) })
          });
          if (!res.ok) throw new Error('Proxy response not ok');
          const data = await res.json();
          // Expecting an array of prediction objects from the proxy
          if (Array.isArray(data) && data.length) {
            setPredictions(data);
          }
        } catch (e) {
          // fallback to local fluctuations if proxy fails
          setPredictions((prev) => prev.map((p) => {
            const delta = (Math.random() - 0.45) * 6;
            const newProb = Math.min(98, Math.max(2, Math.round((p.aiProbability + delta) * 10) / 10));
            const newConf = Math.min(99.9, Math.max(60, Math.round((p.confidence + (Math.random() - 0.5) * 2) * 10) / 10));
            return { ...p, aiProbability: newProb, confidence: newConf };
          }));
        }
      };

      fetchPredictions();
      const id = setInterval(fetchPredictions, 3000);
      return () => clearInterval(id);
    }

    // Mock fluctuations fallback
    const id = setInterval(() => {
      setPredictions((prev) => prev.map((p) => {
        const delta = (Math.random() - 0.45) * 6; // small fluctuations
        const newProb = Math.min(98, Math.max(2, Math.round((p.aiProbability + delta) * 10) / 10));
        const newConf = Math.min(99.9, Math.max(60, Math.round((p.confidence + (Math.random() - 0.5) * 2) * 10) / 10));
        return { ...p, aiProbability: newProb, confidence: newConf };
      }));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="predictions-dashboard" id="predictions">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Live IPL Predictions</h2>
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>Live Neural Analysis</span>
        </div>
      </motion.div>

      <div className="predictions-grid">
        {predictions.map((pred, idx) => (
          <motion.div
            key={idx}
            className="prediction-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="prediction-header">
              <span className="team-badge">{pred.team1}</span>
              <span className="vs">VS</span>
              <span className="team-badge">{pred.team2}</span>
            </div>

            <div className="prediction-content">
              <div className="probability-section">
                <div className="prob-label">{pred.team1} Win Probability</div>
                  <motion.div
                    className="probability-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.aiProbability}%` }}
                    transition={{ duration: 1.2 }}
                  >
                    <span className="prob-text">{pred.aiProbability}%</span>
                  </motion.div>
              </div>

              <div className="confidence-section">
                <div className="confidence-label">AI Confidence</div>
                <div className="confidence-meter">
                  <motion.div
                    className="confidence-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.confidence}%` }}
                    transition={{ duration: 1.2 }}
                  >
                    {pred.confidence}%
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="prediction-glow"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// AI Akinator Section with voice input and accessibility
const AkintorSection = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [eliminated, setEliminated] = useState(0);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const questions = [
    { q: 'Does this player bat in top 3?', players: 1200 },
    { q: 'Is this player a pace bowler?', players: 890 },
    { q: 'Has this player won an IPL title?', players: 450 },
    { q: 'Is this player active in current IPL?', players: 220 }
  ];

  useEffect(() => {
    // Setup Web Speech API (graceful fallback)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;
    const r = new SpeechRecognition();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.onresult = (e) => {
      const spoken = e.results[0][0].transcript.toLowerCase();
      if (spoken.includes('yes')) handleAnswer('yes');
      else if (spoken.includes('no')) handleAnswer('no');
      else if (spoken.includes('maybe') || spoken.includes('not sure')) handleAnswer('maybe');
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
  }, [questionIndex]);

  const handleAnswer = (answer) => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
      setEliminated(questions[questionIndex].players - questions[questionIndex + 1].players);
    }
  };

  const toggleListening = () => {
    const r = recognitionRef.current;
    if (!r) return alert('Voice input not supported in this browser');
    if (!listening) {
      r.start();
      setListening(true);
    } else {
      r.stop();
      setListening(false);
    }
  };

  return (
    <section className="akinator-section" id="akinator" aria-label="Akinator interactive">
      <motion.div
        className="akinator-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Can CricketMind AI Read Your Mind?</h2>
        <p className="section-subtitle">Answer a few questions and let AI guess your favorite player</p>
      </motion.div>

      <motion.div
        className="akinator-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="akinator-content">
          <div className="question-card">
            <div className="question-number">Question {questionIndex + 1} / 4</div>
            <motion.h3
              key={questionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="question-text"
            >
              {questions[questionIndex].q}
            </motion.h3>

            <div className="player-count">
              <span>Remaining Players:</span>
              <motion.span
                className="count-number"
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
              >
                {questions[questionIndex].players}
              </motion.span>
            </div>

            <div className="answer-buttons" role="group" aria-label="Answer choices">
              <motion.button
                className="answer-btn yes-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer('yes')}
                aria-label="Yes"
              >
                Yes
              </motion.button>
              <motion.button
                className="answer-btn maybe-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer('maybe')}
                aria-label="Maybe"
              >
                Maybe
              </motion.button>
              <motion.button
                className="answer-btn no-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer('no')}
                aria-label="No"
              >
                No
              </motion.button>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
              <button className="btn btn-outline" onClick={toggleListening} aria-pressed={listening}>
                {listening ? 'Stop Voice' : 'Voice Input'}
              </button>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{eliminated > 0 ? `${eliminated} eliminated` : ''}</div>
            </div>

            <div className="ai-reasoning" aria-live="polite">
              <div className="reasoning-label">🧠 AI is analyzing...</div>
              <div className="reasoning-text">{['Analyzing batting patterns...', 'Checking franchise history...', 'Evaluating death-over performance...'][questionIndex % 3]}</div>
            </div>
          </div>

          <div className="player-pool-visual">
            <div className="pool-title">Prediction Pool</div>
            <div className="player-grid">
              {Array.from({ length: Math.min(9, Math.ceil(questions[questionIndex].players / 50)) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="player-avatar"
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Gamification Section
const GamificationSection = () => {
  const ranks = [
    { rank: 'Novice', xp: 0, badge: '🌱', color: '#6b7280' },
    { rank: 'Analyst', xp: 500, badge: '📊', color: '#00d9ff' },
    { rank: 'Expert', xp: 2000, badge: '🔬', color: '#ffd700' },
    { rank: 'Legendary', xp: 5000, badge: '👑', color: '#a020f0' }
  ];

  return (
    <section className="gamification" id="gamification">
      <motion.div
        className="gamification-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Rise Through The Ranks</h2>
        <p className="section-subtitle">Compete, predict, and earn rewards in real-time</p>
      </motion.div>

      <div className="ranks-display">
        {ranks.map((r, idx) => (
          <motion.div
            key={idx}
            className="rank-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: 10, boxShadow: `0 0 30px ${r.color}40` }}
          >
            <div className="rank-badge" style={{ color: r.color }}>
              {r.badge}
            </div>
            <div className="rank-info">
              <h4 className="rank-name">{r.rank}</h4>
              <p className="rank-xp">{r.xp} XP Required</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="challenge-banner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3>⚔️ Can You Beat The AI?</h3>
        <p>Challenge the neural network in a live prediction duel</p>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Challenge
        </motion.button>
      </motion.div>
    </section>
  );
};

// Leaderboard Section connected to Firestore
const LeaderboardSection = () => {
  return <Leaderboard />;
};

// Community Section
const CommunitySection = () => {
  const posts = [
    { user: 'CricketPro', prediction: 'MI vs KKR - Calling a 78-run victory!', reactions: 234 },
    { user: 'AnalyticsKing', prediction: 'Death overs are CSK\'s weakness in this format', reactions: 189 },
    { user: 'FutureForecaster', prediction: 'AI predicts upset victory for underdogs', reactions: 145 }
  ];

  return (
    <section className="community" id="community">
      <motion.div
        className="community-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Community Intelligence</h2>
        <p className="section-subtitle">Connect with fellow predictors and share insights</p>
      </motion.div>

      <div className="community-posts">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            className="community-post"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="post-header">
              <span className="post-user">👤 {post.user}</span>
              <span className="post-reactions">❤️ {post.reactions}</span>
            </div>
            <p className="post-content">{post.prediction}</p>
            <div className="post-glow"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <motion.section
      className="cta-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Ready to Master Cricket Prediction?</h2>
      <p>Join the next generation of predictors and compete for massive rewards</p>
      <motion.button
        className="btn btn-primary btn-large"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Launch Your Journey
      </motion.button>
    </motion.section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>CricketMind AI</h4>
          <p>Revolutionizing cricket prediction with advanced AI</p>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="#predictions">Predictions</a></li>
            <li><a href="#akinator">Akinator</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#disclaimer">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 CricketMind AI. Powered by Advanced Neural Networks. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Component
export default function CricketMindAI3D() {
  return (
    <div className="cricketmind-ai-container">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PredictionsDashboard />
      <AkintorSection />
      <GamificationSection />
      <LeaderboardSection />
      <CommunitySection />
      <CTASection />
      <Footer />
      <MagneticCursor />
    </div>
  );
}
