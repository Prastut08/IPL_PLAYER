import React, { useState, useEffect } from 'react';

const CategoryAdaptation = ({ activeCategory = 'Team History', answerCount = 0 }) => {
  const categories = [
    { name: 'Team History', icon: '🏢' },
    { name: 'Batting Style', icon: '🏏' },
    { name: 'Bowling Role', icon: '⚾' },
    { name: 'IPL Awards', icon: '🏆' },
    { name: 'Captaincy', icon: '👑' },
    { name: 'Nationality', icon: '🌍' },
    { name: 'Match Situations', icon: '📊' },
  ];

  // Determine which categories fade based on answers
  const getFadedCategories = () => {
    if (answerCount < 3) return [];
    if (answerCount < 6) return [5, 6];
    if (answerCount < 9) return [4, 5, 6];
    return [3, 4, 5, 6];
  };

  const fadedIndices = getFadedCategories();

  return (
    <div className="category-pills-container">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className={`category-pill ${cat.name === activeCategory ? 'active' : ''} ${
            fadedIndices.includes(idx) ? 'faded' : ''
          }`}
          title={`${cat.name} ${cat.name === activeCategory ? '(Active)' : ''}`}
        >
          <span>{cat.icon} </span>
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryAdaptation;
