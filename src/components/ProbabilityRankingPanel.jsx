import React from 'react';

const ProbabilityRankingPanel = ({
  players = [],
  topRankIndex = 0,
}) => {
  // Sample player data if none provided
  const defaultPlayers = [
    { id: 1, name: 'Virat Kohli', role: 'Batsman', probability: 78, team: 'RCB', meta: ['Captain', '2016+'] },
    { id: 2, name: 'Rohit Sharma', role: 'Batsman', probability: 65, team: 'MI', meta: ['Captain', 'Overseas'] },
    { id: 3, name: 'MS Dhoni', role: 'WK-Bat', probability: 52, team: 'CSK', meta: ['Captain', 'Finisher'] },
    { id: 4, name: 'AB de Villiers', role: 'All-rounder', probability: 38, team: 'RCB', meta: ['Overseas', 'Explosive'] },
    { id: 5, name: 'Jasprit Bumrah', role: 'Bowler', probability: 22, team: 'MI', meta: ['Pacer', 'Death'] },
  ];

  const displayPlayers = players.length > 0 ? players : defaultPlayers;
  const sorted = [...displayPlayers].sort((a, b) => b.probability - a.probability);

  return (
    <div className="probability-ranking-panel">
      <div className="ranking-title">
        <span>Top Candidates</span>
      </div>

      {sorted.map((player, idx) => (
        <div
          key={player.id}
          className={`player-card ${idx === 0 ? 'top-rank' : ''}`}
        >
          <div className="player-rank-header">
            <div className="player-name">
              #{idx + 1} {player.name}
            </div>
            <div className="player-probability">{player.probability}%</div>
          </div>

          <div className="player-role">{player.role}</div>

          <div className="player-progress-bar">
            <div
              className="player-progress-fill"
              style={{ width: `${player.probability}%` }}
            ></div>
          </div>

          <div className="player-meta">
            <span className="player-meta-tag">📊 {player.team}</span>
            {player.meta?.map((tag, i) => (
              <span key={i} className="player-meta-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(0, 217, 255, 0.05)',
        borderRadius: '10px',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
      }}>
        <strong style={{ color: 'var(--neon-cyan)' }}>🎯 Top Match</strong><br />
        {sorted[0]?.name} - {sorted[0]?.probability}% confidence
      </div>
    </div>
  );
};

export default ProbabilityRankingPanel;
