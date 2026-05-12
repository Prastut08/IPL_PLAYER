import React, { useState, useEffect } from 'react';

const QuestionIntelligenceMeter = ({
  questionEffectiveness = 78,
  informationGain = 65,
  entropyReduction = 72,
  confidenceIncrease = 83,
}) => {
  const [animatedValues, setAnimatedValues] = useState({
    effectiveness: 0,
    gain: 0,
    entropy: 0,
    confidence: 0,
  });

  useEffect(() => {
    const animate = () => {
      setAnimatedValues({
        effectiveness: Math.min(animatedValues.effectiveness + 1, questionEffectiveness),
        gain: Math.min(animatedValues.gain + 1, informationGain),
        entropy: Math.min(animatedValues.entropy + 1, entropyReduction),
        confidence: Math.min(animatedValues.confidence + 1, confidenceIncrease),
      });
    };

    const interval = setInterval(animate, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="intelligence-meter">
      <div className="meter-title">Question Intelligence Metrics</div>

      <div className="meter-item">
        <div className="meter-label">
          <span>Question Effectiveness</span>
          <span>{animatedValues.effectiveness}%</span>
        </div>
        <div className="meter-bar">
          <div
            className="meter-fill"
            style={{ width: `${animatedValues.effectiveness}%` }}
          ></div>
        </div>
      </div>

      <div className="meter-item">
        <div className="meter-label">
          <span>Information Gain</span>
          <span>{animatedValues.gain}%</span>
        </div>
        <div className="meter-bar">
          <div
            className="meter-fill"
            style={{ width: `${animatedValues.gain}%` }}
          ></div>
        </div>
      </div>

      <div className="meter-item">
        <div className="meter-label">
          <span>Entropy Reduction</span>
          <span>{animatedValues.entropy}%</span>
        </div>
        <div className="meter-bar">
          <div
            className="meter-fill"
            style={{ width: `${animatedValues.entropy}%` }}
          ></div>
        </div>
      </div>

      <div className="meter-item">
        <div className="meter-label">
          <span>Confidence Increase</span>
          <span>{animatedValues.confidence}%</span>
        </div>
        <div className="meter-bar">
          <div
            className="meter-fill"
            style={{ width: `${animatedValues.confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="circular-meter">
        <div className="circular-progress">
          <div className="progress-text">
            {Math.floor((animatedValues.effectiveness + animatedValues.gain + animatedValues.entropy + animatedValues.confidence) / 4)}%
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '15px',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Overall Intelligence Score
      </div>
    </div>
  );
};

export default QuestionIntelligenceMeter;
