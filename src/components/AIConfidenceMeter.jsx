import React, { useState, useEffect } from 'react';

const AIConfidenceMeter = ({ confidence = 65, mode = 'narrowing' }) => {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedConfidence(prev => {
        const target = confidence;
        if (prev < target) {
          return Math.min(prev + 1, target);
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [confidence]);

  const getModeLabel = () => {
    if (animatedConfidence < 40) return 'Exploration Mode';
    if (animatedConfidence < 80) return 'Narrowing Mode';
    return 'Prediction Mode';
  };

  const getModeColor = () => {
    if (animatedConfidence < 40) return '#0099FF';
    if (animatedConfidence < 80) return '#00D9FF';
    return '#FFD700';
  };

  return (
    <div className="central-confidence-meter">
      <div className="particle-background">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <div className="neural-scan-line"></div>

      <div className="confidence-circular-container">
        <div className="confidence-outer-ring"></div>
        <div className="confidence-middle-ring"></div>
        <div className="confidence-inner-ring"></div>

        <div className="confidence-meter-display">
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              background: `conic-gradient(${getModeColor()} 0deg, ${getModeColor()} ${animatedConfidence * 3.6}deg, rgba(255,255,255,0.05) ${animatedConfidence * 3.6}deg)`,
              zIndex: 1,
              opacity: 0.2,
            }}
          ></div>

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            <p className="confidence-percentage">{animatedConfidence}%</p>
            <p className="confidence-label">AI Confidence</p>
            <p className="confidence-mode">{getModeLabel()}</p>
          </div>

          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="confidence-wave"
              style={{
                width: `${100 + i * 20}%`,
                height: `${100 + i * 20}%`,
                left: `${-i * 10}%`,
                top: `${-i * 10}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIConfidenceMeter;
