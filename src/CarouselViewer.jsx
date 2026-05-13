import React, { useState, useCallback, useEffect } from 'react';
import { allCards } from './CarouselCards';

const ORANGE = '#DF4601';

export default function CarouselViewer() {
  const [index, setIndex] = useState(0);
  const total = allCards.length;
  const CurrentCard = allCards[index].component;

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(total - 1, i + 1)), [total]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Card container — scaled to fit viewport while keeping 1080x1080 */}
      <div
        style={{
          width: 1080,
          height: 1080,
          transform: `scale(${Math.min(
            (window.innerHeight - 120) / 1080,
            (window.innerWidth - 80) / 1080,
            1
          )})`,
          transformOrigin: 'center center',
          boxShadow: '0 0 80px rgba(0,0,0,0.6)',
          borderRadius: 4,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <CurrentCard />
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: '16px 0 20px',
          background: 'linear-gradient(transparent, #0A0A0A 40%)',
        }}
      >
        {/* Prev button */}
        <button
          onClick={prev}
          disabled={index === 0}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: `1px solid ${index === 0 ? '#333' : ORANGE}`,
            backgroundColor: 'transparent',
            color: index === 0 ? '#333' : ORANGE,
            fontSize: 20,
            cursor: index === 0 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          aria-label="Previous card"
        >
          &#8592;
        </button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {allCards.map((card, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                backgroundColor: i === index ? ORANGE : '#444',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                padding: 0,
              }}
              aria-label={`Go to card ${i + 1}: ${card.label}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={index === total - 1}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: `1px solid ${index === total - 1 ? '#333' : ORANGE}`,
            backgroundColor: 'transparent',
            color: index === total - 1 ? '#333' : ORANGE,
            fontSize: 20,
            cursor: index === total - 1 ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          aria-label="Next card"
        >
          &#8594;
        </button>
      </div>

      {/* Card label */}
      <div
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#666',
        }}
      >
        {index + 1} / {total} &mdash; {allCards[index].label}
      </div>
    </div>
  );
}
