import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Petals — a few slow drifting petals across the whole experience.
 * Deliberately sparse and quiet. Hidden entirely for reduced-motion visitors.
 */
export default function Petals() {
  const reduce = useReducedMotion();

  const petals = useMemo(() => {
    if (reduce) return [];
    return Array.from({ length: 9 }, (_, i) => ({
      id: i,
      left: (i * 100) / 9 + ((i * 7) % 11),
      size: 10 + ((i * 5) % 9),
      duration: 22 + ((i * 3) % 14),
      delay: -(i * 2.7),
      drift: 30 + ((i * 17) % 60),
      opacity: 0.16 + ((i % 3) * 0.07),
      hue: i % 2 === 0 ? 'rgba(214, 154, 154, VAR)' : 'rgba(226, 183, 172, VAR)',
    }));
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: '-5%',
            left: `${p.left % 100}%`,
            width: p.size,
            height: p.size * 1.35,
            background: p.hue.replace('VAR', String(p.opacity)),
            borderRadius: '60% 40% 55% 45% / 55% 45% 60% 40%',
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ['--petal-drift']: `${p.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          90% { opacity: 0.9; }
          100% { transform: translate3d(var(--petal-drift), 112vh, 0) rotate(320deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
