import React from 'react';
import { Cpu, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="logo">
            <Cpu className="logo-icon" size={24} />
            <span className="logo-text">CricketMind</span>
          </div>
          <p className="footer-desc">
            The next generation of cricket analytics. Powered by advanced neural networks 
            and real-time data streaming.
          </p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            <a href="#">Predictions</a>
            <a href="#">Leaderboard</a>
            <a href="#">Fantasy Assistant</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Ahead</h4>
          <p>Get weekly AI insights delivered to your inbox.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" className="glass" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 CricketMind AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
