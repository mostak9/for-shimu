import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * GoldenMotes — a handful of slow, floating golden particles.
 * Restrained by design: a few quiet lights, not a snowstorm.
 * Renders nothing when the visitor prefers reduced motion.
 */
export default function GoldenMotes({ count = 12, className = '', maxHeight = 300 }) {
  const reduce = useReducedMotion();

  const motes = useMemo(() => {
    if (reduce) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.round(((i * 97) % 100) + Math.random() * 8),
      size: 3 + ((i * 13) % 5),
      duration: 7 + ((i * 7) % 6),
      delay: (i * 0.9) % 7,
      bottom: Math.round((i * 29) % Math.max(40, maxHeight * 0.5)),
    }));
  }, [count, reduce, maxHeight]);

  if (reduce || motes.length === 0) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {motes.map((m) => (
        <span
          key={m.id}
          className="gold-mote"
          style={{
            left: `${m.left}%`,
            bottom: m.bottom,
            width: m.size,
            height: m.size,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
