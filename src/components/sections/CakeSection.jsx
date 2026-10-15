import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Flame, PartyPopper, RotateCcw } from 'lucide-react';
import { cake as cakeConfig } from '../../config/content';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import GoldenMotes from '../ui/GoldenMotes';

/**
 * CakeSection — a hand-drawn birthday cake with candles she can blow out.
 * Tap any candle (or use "blow out all"). Works with finger, mouse, and keyboard.
 */
export default function CakeSection() {
  const reduce = useReducedMotion();
  const candleCount = Math.max(1, Math.min(9, cakeConfig.candleCount));
  const [outIds, setOutIds] = useState([]);
  const [smoking, setSmoking] = useState([]);
  const [celebrated, setCelebrated] = useState(false);

  const candles = useMemo(
    () =>
      Array.from({ length: candleCount }, (_, i) => ({
        id: i,
        x: 200 + (i - (candleCount - 1) / 2) * 42,
      })),
    [candleCount]
  );

  const allOut = outIds.length === candleCount;

  const blowOut = (id) => {
    setOutIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setSmoking((prev) => (prev.includes(id) ? prev : [...prev, id]));
    window.setTimeout(() => setSmoking((s) => s.filter((x) => x !== id)), 1600);
  };

  const blowAll = () => {
    candles.forEach((c, i) => {
      window.setTimeout(() => blowOut(c.id), reduce ? 0 : i * 220);
    });
  };

  /* celebrate the moment the last flame goes quiet */
  useEffect(() => {
    if (allOut && outIds.length > 0) setCelebrated(true);
  }, [allOut, outIds.length]);

  const relight = () => {
    setOutIds([]);
    setCelebrated(false);
  };

  return (
    <SectionShell id="cake" variant="dusk" className="py-24 sm:py-32">
      {/* warm ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Five"
          title={cakeConfig.title}
          subtitle={cakeConfig.subtitle}
          annotation="close your eyes first — that is the whole point"
          dark
        />

        {/* ---------- The cake ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mx-auto mt-12 w-full max-w-[480px]"
        >
          {allOut && <GoldenMotes count={18} />}

          <svg
            viewBox="0 0 400 340"
            className="w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
            role="group"
            aria-label="A birthday cake with candles you can blow out"
          >
            <defs>
              <linearGradient id="frosting" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6ead6" />
                <stop offset="100%" stopColor="#e8cfc0" />
              </linearGradient>
              <linearGradient id="frosting2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f2ded0" />
                <stop offset="100%" stopColor="#dcb3a8" />
              </linearGradient>
              <linearGradient id="tier" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b76e79" />
                <stop offset="100%" stopColor="#8e4653" />
              </linearGradient>
              <linearGradient id="tier2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c98b8b" />
                <stop offset="100%" stopColor="#a15c66" />
              </linearGradient>
              <radialGradient id="flameGlow" cx="50%" cy="60%" r="55%">
                <stop offset="0%" stopColor="#fff3c4" />
                <stop offset="45%" stopColor="#f5b942" />
                <stop offset="100%" stopColor="#e07b2d" />
              </radialGradient>
              <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e9d9c2" />
                <stop offset="100%" stopColor="#b99e7e" />
              </linearGradient>
            </defs>

            {/* plate */}
            <ellipse cx="200" cy="303" rx="152" ry="16" fill="url(#plate)" />
            <ellipse cx="200" cy="299" rx="152" ry="14" fill="#f0e2cc" opacity="0.9" />

            {/* bottom tier */}
            <rect x="68" y="212" width="264" height="86" rx="10" fill="url(#tier)" />
            {/* bottom frosting with drips */}
            <path
              d="M68 212 h264 v22 c-10 0 -10 14 -20 14 s-10 -12 -20 -12 -10 16 -22 16 -10 -14 -22 -14 -10 12 -22 12 -10 -16 -22 -16 -10 14 -22 14 -10 -12 -22 -12 -10 12 -20 12 -10 -12 -20 -12 v-24 z"
              fill="url(#frosting)"
            />
            {/* piped dots */}
            {[88, 128, 168, 208, 248, 288, 328].map((x) => (
              <circle key={`d1-${x}`} cx={x} cy={252} r="5" fill="#f6e6d2" opacity="0.85" />
            ))}

            {/* top tier */}
            <rect x="112" y="146" width="176" height="72" rx="9" fill="url(#tier2)" />
            <path
              d="M112 146 h176 v18 c-9 0 -9 12 -18 12 s-9 -10 -18 -10 -9 13 -19 13 -9 -12 -19 -12 -9 11 -19 11 -9 -13 -19 -13 -9 12 -18 12 -9 -11 -18 -11 -9 11 -18 11 v-19 z"
              fill="url(#frosting2)"
            />
            {[138, 172, 206, 240, 274].map((x) => (
              <circle key={`d2-${x}`} cx={x} cy="188" r="4.2" fill="#f8e8d6" opacity="0.9" />
            ))}

            {/* little roses */}
            {[
              [132, 236],
              [200, 240],
              [268, 236],
              [168, 176],
              [232, 176],
            ].map(([x, y], i) => (
              <g key={`rose-${i}`} transform={`translate(${x} ${y})`}>
                <circle r="9" fill="#8e3b4b" />
                <circle r="6" fill="#b76e79" />
                <circle r="3" fill="#e2a9a4" />
              </g>
            ))}

            {/* ---------- Candles ---------- */}
            {candles.map((c) => {
              const isOut = outIds.includes(c.id);
              return (
                <g key={c.id}>
                  {/* candle stick */}
                  <rect x={c.x - 5} y="112" width="10" height="36" rx="3" fill="#f3e6d2" />
                  {[120, 128, 136].map((y) => (
                    <rect key={y} x={c.x - 5} y={y} width="10" height="3.2" fill="#c98b8b" opacity="0.8" />
                  ))}
                  {/* wick */}
                  <rect x={c.x - 1} y="104" width="2" height="9" rx="1" fill="#4a3230" />

                  {/* flame */}
                  {!isOut && (
                    <g className="flame" style={{ transformOrigin: `${c.x}px 104px` }}>
                      <ellipse cx={c.x} cy="88" rx="14" ry="20" fill="#f5b942" opacity="0.22" />
                      <path
                        d={`M${c.x} 72 c7 8 10 13 10 19 a10 10 0 0 1 -20 0 c0 -6 3 -11 10 -19 z`}
                        fill="url(#flameGlow)"
                      />
                      <path
                        d={`M${c.x} 82 c3.4 4 4.6 6.4 4.6 9 a4.6 4.6 0 0 1 -9.2 0 c0 -2.6 1.2 -5 4.6 -9 z`}
                        fill="#fff6d8"
                        opacity="0.9"
                      />
                    </g>
                  )}

                  {/* smoke */}
                  {smoking.includes(c.id) && (
                    <g className="smoke-wisp" style={{ transformOrigin: `${c.x}px 100px` }}>
                      <path
                        d={`M${c.x} 100 c-4 -6 4 -10 0 -16 s3 -10 0 -14`}
                        stroke="#d8c8c4"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                    </g>
                  )}

                  {/* hit area — generous for fingers */}
                  <rect
                    x={c.x - 20}
                    y="62"
                    width="40"
                    height="92"
                    fill="transparent"
                    role="button"
                    tabIndex={0}
                    aria-label={isOut ? `Candle ${c.id + 1} is out` : `Blow out candle ${c.id + 1}`}
                    className="cursor-pointer outline-none focus-visible:opacity-100"
                    onClick={() => blowOut(c.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        blowOut(c.id);
                      }
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* status line */}
          <p className="mt-2 text-center font-body text-[10px] tracking-[0.26em] text-gold-pale/70">
            {allOut
              ? 'ALL CANDLES OUT ✦ MAKE IT COUNT'
              : `${candleCount - outIds.length} CANDLE${candleCount - outIds.length === 1 ? '' : 'S'} STILL GLOWING`}
          </p>

          {/* controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {!allOut ? (
              <button
                type="button"
                onClick={blowAll}
                className="inline-flex items-center gap-2 rounded-full border border-gold-soft/40 bg-gold-soft/10 px-6 py-3 font-body text-[11px] tracking-[0.2em] text-gold-pale transition hover:border-gold-soft hover:bg-gold-soft/20"
              >
                <Flame size={14} />
                {cakeConfig.blowAllLabel}
              </button>
            ) : (
              <button
                type="button"
                onClick={relight}
                className="inline-flex items-center gap-2 rounded-full border border-blush/40 bg-blush/10 px-6 py-3 font-body text-[11px] tracking-[0.2em] text-blush transition hover:border-blush hover:bg-blush/20"
              >
                <RotateCcw size={14} />
                {cakeConfig.relightLabel}
              </button>
            )}
          </div>
        </motion.div>

        {/* ---------- Wish message ---------- */}
        <AnimatePresence>
          {celebrated && allOut && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative mx-auto mt-12 max-w-xl rounded-[1.2rem] border border-gold-soft/25 bg-cream-soft/8 px-8 py-10 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/20 text-gold-pale"
              >
                <PartyPopper size={20} />
              </motion.div>
              <p className="mt-5 text-pretty font-display text-[1.25rem] italic leading-[1.85] text-cream sm:text-[1.45rem]">
                {cakeConfig.wishMessage}
              </p>
              <p className="mt-6 font-hand text-2xl text-blush">
                happy birthday, birthday girl
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
