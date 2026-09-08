// src/components/FloatingHearts.jsx
import React, { useMemo } from 'react';

export default function FloatingHearts({ count = 20, isExploding = false }) {
  const particles = useMemo(() => {
    const symbols = ['❤️', '💕', '💗', '✨', '♡', '💖', '🌸'];
    return Array.from({ length: isExploding ? count * 2 : count }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${Math.random() * 96 + 2}%`,
      size: `${Math.random() * 1.5 + 0.8}rem`,
      duration: `${Math.random() * 6 + 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.4 + 0.4,
    }));
  }, [count, isExploding]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute animate-float-up select-none"
          style={{
            left: p.left,
            bottom: '-50px',
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
            filter: 'drop-shadow(0 2px 8px rgba(255,46,99,0.3))'
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
