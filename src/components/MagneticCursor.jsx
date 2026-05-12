import React, { useEffect, useRef } from 'react';
import '../styles/cricketmind-ai-3d.css';

export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Create trailing dots
      const dot = document.createElement('div');
      dot.className = 'cursor-trail';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      document.body.appendChild(dot);
      trailRef.current.push(dot);

      if (trailRef.current.length > 8) {
        const old = trailRef.current.shift();
        old.remove();
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      trailRef.current.forEach((d) => d.remove());
      trailRef.current = [];
    };
  }, []);

  // Touch fallback: hide cursor on touch devices
  useEffect(() => {
    const handleTouchStart = () => {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
    };
    window.addEventListener('touchstart', handleTouchStart);
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <>
      <div className="magnetic-cursor" ref={cursorRef} aria-hidden="true">
        <div className="cursor-core" />
      </div>
    </>
  );
}
