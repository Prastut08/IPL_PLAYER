import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <div className="logo">
          <Cpu className="logo-icon" size={32} />
          <span className="logo-text">CricketMind</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#predictions">Predictions</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
          <li><a href="#community">Community</a></li>
        </ul>
        
        <button className="btn btn-primary">Join The Game</button>
      </div>
    </nav>
  );
};

export default Navbar;
