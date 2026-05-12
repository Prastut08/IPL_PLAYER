import React, { useEffect, useRef } from 'react';

const AdaptiveFlowVisualization = ({ questionHistory = [] }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    svg.innerHTML = '';

    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Create SVG elements for flow lines
    const svgNS = 'http://www.w3.org/2000/svg';

    // Draw connecting lines
    const line1 = document.createElementNS(svgNS, 'line');
    line1.setAttribute('x1', '50%');
    line1.setAttribute('y1', '20%');
    line1.setAttribute('x2', '30%');
    line1.setAttribute('y2', '50%');
    line1.setAttribute('class', 'flow-line');
    svg.appendChild(line1);

    const line2 = document.createElementNS(svgNS, 'line');
    line2.setAttribute('x1', '50%');
    line2.setAttribute('y1', '20%');
    line2.setAttribute('x2', '70%');
    line2.setAttribute('y2', '50%');
    line2.setAttribute('class', 'flow-line');
    svg.appendChild(line2);

    const line3 = document.createElementNS(svgNS, 'line');
    line3.setAttribute('x1', '30%');
    line3.setAttribute('y1', '50%');
    line3.setAttribute('x2', '20%');
    line3.setAttribute('y2', '80%');
    line3.setAttribute('class', 'flow-line');
    svg.appendChild(line3);

    const line4 = document.createElementNS(svgNS, 'line');
    line4.setAttribute('x1', '30%');
    line4.setAttribute('y1', '50%');
    line4.setAttribute('x2', '40%');
    line4.setAttribute('y2', '80%');
    line4.setAttribute('class', 'flow-line');
    svg.appendChild(line4);

    const line5 = document.createElementNS(svgNS, 'line');
    line5.setAttribute('x1', '70%');
    line5.setAttribute('y1', '50%');
    line5.setAttribute('x2', '60%');
    line5.setAttribute('y2', '80%');
    line5.setAttribute('class', 'flow-line');
    svg.appendChild(line5);

    const line6 = document.createElementNS(svgNS, 'line');
    line6.setAttribute('x1', '70%');
    line6.setAttribute('y1', '50%');
    line6.setAttribute('x2', '80%');
    line6.setAttribute('y2', '80%');
    line6.setAttribute('class', 'flow-line');
    svg.appendChild(line6);
  }, []);

  const nodes = [
    { id: 'current', label: 'Q', x: '50%', y: '20%', type: 'current' },
    { id: 'prev1', label: 'Q-1', x: '30%', y: '50%', type: 'previous' },
    { id: 'prev2', label: 'Q-2', x: '70%', y: '50%', type: 'previous' },
    { id: 'next1', label: 'Q+1', x: '20%', y: '80%', type: 'next' },
    { id: 'next2', label: 'Q+1', x: '40%', y: '80%', type: 'next' },
    { id: 'next3', label: 'Q+1', x: '60%', y: '80%', type: 'next' },
    { id: 'next4', label: 'Q+1', x: '80%', y: '80%', type: 'next' },
  ];

  return (
    <div className="flow-visualization">
      <div className="flow-title">Adaptive Deduction Flow</div>
      <div className="flow-tree">
        <svg
          ref={svgRef}
          className="flow-connection"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        ></svg>
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`flow-node ${node.type}`}
            style={{
              left: `calc(${node.x} - 25px)`,
              top: `calc(${node.y} - 25px)`,
            }}
            title={`${node.type} question`}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptiveFlowVisualization;
