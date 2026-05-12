import React, { useState, useEffect } from 'react';
import '../styles/cricketmind-premium.css';

const CricketMindPremium = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('predictions');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="premium-container">
      {/* Navbar */}
      <nav className="premium-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">CricketMind</span>
          </div>
          
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#predictions">Predictions</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li><a href="#community">Community</a></li>
          </ul>

          <div className="navbar-ctas">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-premium">
        <div className="hero-background">
          <div className="grid-overlay"></div>
          <div className="glow-orb top-left"></div>
          <div className="glow-orb bottom-right"></div>
          <div className="particles-container"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge-premium">🎮 AI-POWERED PREDICTION PLATFORM</div>
          
          <h1 className="hero-title-premium">
            Predict The Winners.
            <span className="gradient-accent"> Own The Game.</span>
          </h1>

          <p className="hero-subtitle-premium">
            AI-powered IPL match predictions, fantasy insights, and real-time analytics
            powered by advanced machine learning algorithms.
          </p>

          <div className="hero-hologram">
            <div className="holographic-sphere">
              <div className="sphere-core"></div>
              <div className="sphere-ring ring-1"></div>
              <div className="sphere-ring ring-2"></div>
              <div className="sphere-ring ring-3"></div>
              <div className="sphere-glow"></div>
              <svg className="cricket-ball" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#goldGradient)" strokeWidth="2"/>
                <path d="M 50 10 Q 50 50 50 90" stroke="url(#cyanGradient)" strokeWidth="1.5" fill="none"/>
                <circle cx="50" cy="50" r="3" fill="url(#goldGradient)"/>
              </svg>
            </div>
          </div>

          <div className="hero-ctas">
            <button className="btn-large btn-primary">Join The Game</button>
            <button className="btn-large btn-secondary">Explore Predictions</button>
          </div>

          <div className="hero-stats-premium">
            <div className="stat-prime">
              <span className="stat-number">10.5M+</span>
              <span className="stat-label">Predictions Made</span>
            </div>
            <div className="stat-prime">
              <span className="stat-number">94.2%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-prime">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-prime">
              <span className="stat-number">$2.5M+</span>
              <span className="stat-label">Rewards Distributed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-premium">
        <div className="section-header">
          <h2>Why Choose CricketMind?</h2>
          <p>The most advanced AI cricket prediction platform</p>
        </div>

        <div className="features-grid">
          <div className="feature-card-premium">
            <div className="feature-icon ai-icon">🧠</div>
            <h3>AI Insights</h3>
            <p>Advanced neural networks analyzing millions of data points for accurate predictions</p>
            <div className="feature-glow"></div>
          </div>

          <div className="feature-card-premium">
            <div className="feature-icon lb-icon">🏆</div>
            <h3>Global Leaderboard</h3>
            <p>Compete with players worldwide and climb the global rankings</p>
            <div className="feature-glow"></div>
          </div>

          <div className="feature-card-premium">
            <div className="feature-icon pred-icon">⚡</div>
            <h3>IPL Predictions</h3>
            <p>Real-time match predictions with confidence meters and win probabilities</p>
            <div className="feature-glow"></div>
          </div>

          <div className="feature-card-premium">
            <div className="feature-icon reward-icon">💎</div>
            <h3>Win Rewards</h3>
            <p>Earn XP points, badges, and exclusive rewards for accurate predictions</p>
            <div className="feature-glow"></div>
          </div>
        </div>
      </section>

      {/* Live Predictions Dashboard */}
      <section className="predictions-dashboard">
        <div className="section-header">
          <h2>Live Match Predictions</h2>
          <p>Real-time AI analytics for current IPL matches</p>
        </div>

        <div className="predictions-container">
          <div className="prediction-card">
            <div className="match-header">
              <span className="match-time">LIVE</span>
              <span className="match-id">Match #45</span>
            </div>
            <div className="teams-vs">
              <div className="team team-1">
                <span className="team-logo">🏏</span>
                <span className="team-name">Mumbai</span>
              </div>
              <span className="vs-badge">vs</span>
              <div className="team team-2">
                <span className="team-logo">🏏</span>
                <span className="team-name">Delhi</span>
              </div>
            </div>
            <div className="prediction-content">
              <div className="confidence-meter">
                <div className="confidence-label">Win Probability</div>
                <div className="probability-bars">
                  <div className="prob-bar team-bar-1">
                    <div className="prob-fill" style={{ width: '67%' }}></div>
                    <span className="prob-text">67%</span>
                  </div>
                  <div className="prob-bar team-bar-2">
                    <div className="prob-fill" style={{ width: '33%' }}></div>
                    <span className="prob-text">33%</span>
                  </div>
                </div>
              </div>
              <div className="match-meta">
                <span>Confidence: <strong>94%</strong></span>
              </div>
            </div>
            <button className="btn-small">View Details</button>
          </div>

          <div className="prediction-card">
            <div className="match-header">
              <span className="match-time">UPCOMING</span>
              <span className="match-id">Match #46</span>
            </div>
            <div className="teams-vs">
              <div className="team team-1">
                <span className="team-logo">🏏</span>
                <span className="team-name">Bangalore</span>
              </div>
              <span className="vs-badge">vs</span>
              <div className="team team-2">
                <span className="team-logo">🏏</span>
                <span className="team-name">Kolkata</span>
              </div>
            </div>
            <div className="prediction-content">
              <div className="confidence-meter">
                <div className="confidence-label">Win Probability</div>
                <div className="probability-bars">
                  <div className="prob-bar team-bar-1">
                    <div className="prob-fill" style={{ width: '58%' }}></div>
                    <span className="prob-text">58%</span>
                  </div>
                  <div className="prob-bar team-bar-2">
                    <div className="prob-fill" style={{ width: '42%' }}></div>
                    <span className="prob-text">42%</span>
                  </div>
                </div>
              </div>
              <div className="match-meta">
                <span>Confidence: <strong>89%</strong></span>
              </div>
            </div>
            <button className="btn-small">View Details</button>
          </div>

          <div className="prediction-card">
            <div className="match-header">
              <span className="match-time">UPCOMING</span>
              <span className="match-id">Match #47</span>
            </div>
            <div className="teams-vs">
              <div className="team team-1">
                <span className="team-logo">🏏</span>
                <span className="team-name">Rajasthan</span>
              </div>
              <span className="vs-badge">vs</span>
              <div className="team team-2">
                <span className="team-logo">🏏</span>
                <span className="team-name">Chennai</span>
              </div>
            </div>
            <div className="prediction-content">
              <div className="confidence-meter">
                <div className="confidence-label">Win Probability</div>
                <div className="probability-bars">
                  <div className="prob-bar team-bar-1">
                    <div className="prob-fill" style={{ width: '52%' }}></div>
                    <span className="prob-text">52%</span>
                  </div>
                  <div className="prob-bar team-bar-2">
                    <div className="prob-fill" style={{ width: '48%' }}></div>
                    <span className="prob-text">48%</span>
                  </div>
                </div>
              </div>
              <div className="match-meta">
                <span>Confidence: <strong>87%</strong></span>
              </div>
            </div>
            <button className="btn-small">View Details</button>
          </div>
        </div>
      </section>

      {/* Fantasy Team Assistant */}
      <section className="fantasy-section">
        <div className="section-header">
          <h2>Fantasy Team AI Assistant</h2>
          <p>Smart player recommendations powered by real-time analytics</p>
        </div>

        <div className="fantasy-container">
          <div className="fantasy-content">
            <div className="fantasy-info-card">
              <h3>AI-Powered Captain Selection</h3>
              <p>Our neural network analyzes player form, opponent matchups, and historical data to recommend the best captain for maximum points.</p>
              <ul className="feature-list">
                <li>✓ Real-time form analysis</li>
                <li>✓ Matchup predictions</li>
                <li>✓ Historical performance data</li>
                <li>✓ Injury & availability tracking</li>
              </ul>
            </div>

            <div className="fantasy-info-card">
              <h3>Player Performance Analytics</h3>
              <p>Get detailed insights on player performance metrics against specific opponents and conditions.</p>
              <ul className="feature-list">
                <li>✓ vs Different Bowlers</li>
                <li>✓ Venue Statistics</li>
                <li>✓ Weather Impact Analysis</li>
                <li>✓ Recent Form Tracking</li>
              </ul>
            </div>
          </div>

          <div className="team-selector">
            <div className="selected-team">
              <h4>Recommended Team</h4>
              <div className="player-picks">
                <div className="player-item">
                  <span className="player-name">Virat Kohli</span>
                  <span className="player-role">BAT</span>
                </div>
                <div className="player-item">
                  <span className="player-name">Jasprit Bumrah</span>
                  <span className="player-role">BOWL</span>
                </div>
                <div className="player-item captain">
                  <span className="captain-badge">C</span>
                  <span className="player-name">Rohit Sharma</span>
                  <span className="player-role">BAT</span>
                </div>
                <div className="player-item">
                  <span className="player-name">Suryakumar</span>
                  <span className="player-role">BAT</span>
                </div>
              </div>
              <button className="btn-small">Load Full Team</button>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="leaderboard-section">
        <div className="section-header">
          <h2>Global Leaderboard</h2>
          <p>Top predictors and their achievements</p>
        </div>

        <div className="leaderboard-container">
          <div className="leaderboard-table">
            <div className="leaderboard-header">
              <span className="rank">Rank</span>
              <span className="player">Player</span>
              <span className="points">XP Points</span>
              <span className="streak">Win Streak</span>
              <span className="badge">Badge</span>
            </div>
            
            <div className="leaderboard-row rank-1">
              <span className="rank">🥇 1</span>
              <span className="player">AlexThePred</span>
              <span className="points">24,500</span>
              <span className="streak">12</span>
              <span className="badge">⭐</span>
            </div>

            <div className="leaderboard-row rank-2">
              <span className="rank">🥈 2</span>
              <span className="player">CricketGuru</span>
              <span className="points">23,800</span>
              <span className="streak">9</span>
              <span className="badge">🔥</span>
            </div>

            <div className="leaderboard-row rank-3">
              <span className="rank">🥉 3</span>
              <span className="player">AnalyticsMaster</span>
              <span className="points">22,100</span>
              <span className="streak">15</span>
              <span className="badge">💎</span>
            </div>

            <div className="leaderboard-row">
              <span className="rank">4</span>
              <span className="player">ProspectPro</span>
              <span className="points">21,200</span>
              <span className="streak">6</span>
              <span className="badge">⚡</span>
            </div>

            <div className="leaderboard-row">
              <span className="rank">5</span>
              <span className="player">DataNinja</span>
              <span className="points">20,500</span>
              <span className="streak">8</span>
              <span className="badge">🎯</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <div className="section-header">
          <h2>Join The Community</h2>
          <p>Discuss strategies, share insights, and connect with fellow predictors</p>
        </div>

        <div className="community-grid">
          <div className="community-card">
            <div className="community-header">
              <span className="avatar">👤</span>
              <span className="username">ProCricket_AI</span>
              <span className="time">2h ago</span>
            </div>
            <h4>IPL 2026 Prediction Strategies</h4>
            <p>Sharing my latest machine learning model for IPL predictions. Accuracy improved to 95%!</p>
            <div className="engagement">
              <span>👍 245</span>
              <span>💬 48</span>
              <span>📤 12</span>
            </div>
          </div>

          <div className="community-card">
            <div className="community-header">
              <span className="avatar">👤</span>
              <span className="username">FantasyWizard</span>
              <span className="time">4h ago</span>
            </div>
            <h4>Best Captain for Tomorrow's Match</h4>
            <p>Based on recent form and weather conditions, here are my top 3 captain picks...</p>
            <div className="engagement">
              <span>👍 189</span>
              <span>💬 76</span>
              <span>📤 34</span>
            </div>
          </div>

          <div className="community-card">
            <div className="community-header">
              <span className="avatar">👤</span>
              <span className="username">DataDriven_Stats</span>
              <span className="time">6h ago</span>
            </div>
            <h4>Player Performance Breakdown</h4>
            <p>Detailed analysis of top players' performance metrics across venues and conditions...</p>
            <div className="engagement">
              <span>👍 512</span>
              <span>💬 103</span>
              <span>📤 67</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-premium">
        <div className="cta-content">
          <h2>Ready to Dominate?</h2>
          <p>Join thousands of winning predictors and start earning rewards today</p>
          <div className="cta-buttons">
            <button className="btn-large btn-primary">Start Free Today</button>
            <button className="btn-large btn-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="premium-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CricketMind</h4>
            <p>AI-powered cricket predictions and fantasy analytics platform</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 CricketMind. All rights reserved. Powered by Advanced AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default CricketMindPremium;
