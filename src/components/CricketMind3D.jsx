import React, { useEffect, useRef, useState } from 'react';
import '../styles/cricketmind-3d.css';

export default function CricketMind3D(){
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({rx:0, ry:0});

  useEffect(()=>{
    const el = stageRef.current;
    if(!el) return;
    const onMove = (e)=>{
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const ry = x * 18;
      const rx = -y * 18;
      setTilt({rx, ry});
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = ()=>{ setTilt({rx:0,ry:0}); el.style.transform='rotateX(0deg) rotateY(0deg)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return ()=>{ el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); }
  },[]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">⚡ CricketMind</div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-ctas">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-background">
          <div className="grid-bg"></div>
          <div className="glow-orb glow-1"></div>
          <div className="glow-orb glow-2"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">🚀 AI-POWERED PREDICTIONS</div>
            <h1 className="hero-title">
              The Next Level of 
              <span className="gradient"> Cricket Prediction</span>
            </h1>
            <p className="hero-subtitle">
              Harness the power of advanced machine learning and real-time analytics to dominate fantasy cricket leagues and win big rewards with precision predictions.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-large btn-lg-primary">Start Predicting Now</button>
              <button className="btn btn-large btn-secondary">Watch Demo</button>
            </div>
          </div>

          <div className="hologram-container" ref={stageRef}>
            <div className="hologram-card">
              <div className="holo-content">
                <div className="holo-core"></div>
                <div className="holo-text">AI Cricket Prediction Engine</div>
              </div>
              <div className="holo-rings">
                <div className="holo-ring ring-1"></div>
                <div className="holo-ring ring-2"></div>
                <div className="holo-ring ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" id="stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">10.5M+</div>
            <div className="stat-label">Predictions Made</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">94.2%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">$5.2M+</div>
            <div className="stat-label">Rewards Given</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI Insights</h3>
            <p>Advanced neural networks analyzing millions of data points for accurate predictions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Analytics</h3>
            <p>Live match predictions with instant confidence meters and win probabilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Global Leaderboard</h3>
            <p>Compete with players worldwide and climb the global rankings</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Win Rewards</h3>
            <p>Earn XP points, badges, and exclusive rewards for accurate predictions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Assistant</h3>
            <p>AI-powered player recommendations based on form, matchups, and conditions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Stats</h3>
            <p>Comprehensive player analytics including venue stats and historical performance</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Dominate?</h2>
          <p>Join thousands of winning predictors and start earning rewards today</p>
          <div className="cta-buttons">
            <button className="btn btn-large btn-lg-primary">Get Started Free</button>
            <button className="btn btn-large btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 CricketMind. All rights reserved. Powered by Advanced AI.</p>
      </footer>
    </>
  );
}
