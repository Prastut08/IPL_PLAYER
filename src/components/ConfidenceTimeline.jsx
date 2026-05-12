import React from 'react';

const ConfidenceTimeline = ({ timelineData = [] }) => {
  const defaultTimeline = [
    { question: 'Q1', confidence: 18 },
    { question: 'Q2', confidence: 35 },
    { question: 'Q3', confidence: 52 },
    { question: 'Q4', confidence: 68 },
    { question: 'Q5', confidence: 76 },
    { question: 'Q6', confidence: 85 },
  ];

  const displayTimeline = timelineData.length > 0 ? timelineData : defaultTimeline;
  const maxConfidence = Math.max(...displayTimeline.map(d => d.confidence));
  const avgConfidence = Math.round(
    displayTimeline.reduce((sum, d) => sum + d.confidence, 0) / displayTimeline.length
  );

  return (
    <div className="confidence-timeline-panel">
      <div className="timeline-title">
        📈 Confidence Evolution
      </div>

      <div className="timeline-chart">
        {displayTimeline.map((item, idx) => {
          const heightPercent = (item.confidence / maxConfidence) * 100;
          return (
            <div
              key={idx}
              className={`timeline-node ${idx === displayTimeline.length - 1 ? 'active' : ''}`}
              style={{
                animation: `floatUp 0.5s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div
                className="timeline-fill"
                style={{
                  height: `${heightPercent}%`,
                }}
              ></div>
              <div className="timeline-label">{item.question}</div>
              <div className="timeline-value">{item.confidence}%</div>
            </div>
          );
        })}
      </div>

      <div className="timeline-stats">
        <div className="timeline-stat">
          <div className="stat-label">Current</div>
          <div className="stat-value">{displayTimeline[displayTimeline.length - 1]?.confidence}%</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-label">Average</div>
          <div className="stat-value">{avgConfidence}%</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-label">Peak</div>
          <div className="stat-value">{maxConfidence}%</div>
        </div>
        <div className="timeline-stat">
          <div className="stat-label">Progress</div>
          <div className="stat-value">
            +{displayTimeline[displayTimeline.length - 1]?.confidence - displayTimeline[0]?.confidence}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceTimeline;
