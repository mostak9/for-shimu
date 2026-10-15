import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { opening, site } from '../../config/content';
import Typewriter from '../ui/Typewriter';
import GoldenMotes from '../ui/GoldenMotes';

/**
 * OpeningScreen — the sealed letter under a quiet night sky.
 * Clicking the envelope opens it, reveals a handwritten note,
 * and gently walks her into the rest of the site.
 */
export default function OpeningScreen({ onComplete }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState('sealed'); /* sealed → opened → entering */

  const stars = useMemo(() => {
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      x: ((i * 157) % 100) + ((i * 31) % 7) * 0.3,
      y: ((i * 83) % 72) + ((i * 17) % 5) * 0.4,
      size: 1 + ((i * 13) % 3) * 0.7,
      delay: ((i * 0.37) % 4).toFixed(2),
      duration: (2.6 + ((i * 0.29) % 2.4)).toFixed(2),
    }));
  }, []);

  const openEnvelope = () => {
    if (phase !== 'sealed') return;
    setPhase('opened');
  };

  const enterSite = (skipped = false) => {
    if (phase === 'entering') return;
    setPhase('entering');
    window.setTimeout(() => onComplete?.({ skipped }), skipped ? 250 : 900);
  };

  /* clicking the sky (not buttons) after opening continues too */
  const onSkyClick = () => {
    if (phase === 'opened') enterSite(false);
  };

  return (
    <div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-night px-5 py-10"
      onClick={onSkyClick}
    >
      {/* --- Night sky --- */}
      <div className="absolute inset-0">
        <img
          src="images/night-sky.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-70"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/40 to-night" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,162,39,0.18),transparent_55%)]" />
      </div>

      {/* --- Stars --- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: 0.55,
              animation: reduce
                ? 'none'
                : `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <GoldenMotes count={10} />

      {/* --- Skip --- */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          enterSite(true);
        }}
        className="absolute right-5 top-5 z-20 rounded-full border border-cream/15 px-4 py-2 font-body text-[11px] tracking-[0.22em] text-cream/60 transition hover:border-gold-soft/50 hover:text-gold-pale"
      >
        {opening.skipLabel}
      </button>

      {/* --- Content --- */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-body text-[10px] font-medium uppercase tracking-[0.42em] text-gold-pale/70 sm:text-[11px]"
        >
          {opening.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.5 }}
          className="mt-5 text-balance font-display text-[2.15rem] font-normal italic leading-[1.22] text-cream sm:text-[2.9rem] md:text-[3.6rem]"
        >
          {opening.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-6 font-hand text-[1.65rem] text-blush sm:text-[2.1rem]"
        >
          {opening.birthdayLine}
        </motion.p>

        {/* --- Envelope --- */}
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.85, ease: 'easeOut' }}
          className="relative mt-10 sm:mt-12"
          style={{ perspective: 1100 }}
        >
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* Letter peeking out */}
            <AnimatePresence>
              {phase !== 'sealed' && (
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: -54, opacity: 1 }}
                  transition={{ duration: reduce ? 0.2 : 1.1, ease: 'easeOut' }}
                  className="paper absolute left-1/2 top-3 z-0 w-[86%] -translate-x-1/2 rounded-[3px] px-5 py-6 text-left shadow-[var(--shadow-lift)]"
                >
                  <p className="font-hand text-xl text-burgundy">{opening.envelopeNote.greeting}</p>
                  <p className="mt-2 font-hand text-[1.05rem] leading-snug text-ink">
                    {opening.envelopeNote.body}
                  </p>
                  <p className="mt-3 text-right font-hand text-lg text-dusty-rose">
                    {opening.envelopeNote.signOff}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Envelope body */}
            <div className="envelope-body relative z-10 h-[128px] w-[min(78vw,340px)] rounded-[6px] sm:h-[150px]">
              {/* bottom fold shading */}
              <div className="absolute inset-x-0 bottom-0 h-full rounded-[6px] bg-gradient-to-t from-cocoa/12 to-transparent" />
              {/* side seams */}
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cocoa/8 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cocoa/8 to-transparent" />

              {/* Flap */}
              <div
                className="absolute left-0 right-0 top-0 z-20 h-[58%] origin-top transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background:
                    'linear-gradient(180deg, var(--color-parchment) 0%, var(--color-cream-deep) 100%)',
                  transform: phase === 'sealed' ? 'rotateX(0deg)' : 'rotateX(-172deg)',
                  boxShadow: '0 2px 8px rgba(59,43,46,0.12)',
                }}
              />

              {/* Wax seal */}
              <AnimatePresence>
                {phase === 'sealed' && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEnvelope();
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.35 } }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    className="wax-seal absolute left-1/2 top-[42%] z-30 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full sm:h-[58px] sm:w-[58px]"
                    aria-label="Open the sealed letter"
                  >
                    <svg viewBox="0 0 48 48" width="26" height="26" fill="none" aria-hidden="true">
                      <path
                        d="M24 38c-6.2-5-14.5-10.2-14.5-18.2C9.5 13.6 13.7 10 18.3 10c2.8 0 5 1.3 5.7 3 .7-1.7 2.9-3 5.7-3 4.6 0 8.8 3.6 8.8 9.8 0 8-8.3 13.2-14.5 18.2z"
                        fill="rgba(255,225,225,0.3)"
                        stroke="rgba(255,235,235,0.5)"
                        strokeWidth="1.1"
                      />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <AnimatePresence mode="wait">
            {phase === 'sealed' ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, delay: 1.15 }}
                className="mt-9 flex flex-col items-center gap-3"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEnvelope();
                  }}
                  className="group relative overflow-hidden rounded-full border border-gold-soft/50 bg-gradient-to-r from-burgundy to-burgundy-deep px-8 py-3.5 font-body text-[12px] font-medium tracking-[0.24em] text-cream shadow-[var(--shadow-glow-gold)] transition-transform duration-500 hover:scale-[1.03]"
                >
                  <span className="relative z-10">{opening.buttonLabel}</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                <p className="font-body text-[10px] tracking-[0.18em] text-cream/35">
                  for {site.herFullName}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="entering"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    enterSite(false);
                  }}
                  className="rounded-full border border-gold-soft/40 px-7 py-2.5 font-body text-[11px] tracking-[0.24em] text-gold-pale/90 transition hover:border-gold-soft hover:text-gold-pale"
                >
                  {phase === 'opened' ? 'Come inside ✦' : '…'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Handwritten whisper — begins only once the envelope is open */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'sealed' ? 0 : 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-7 max-w-md font-hand text-lg text-cream/60"
        >
          {phase !== 'sealed' && (
            <Typewriter
              key={phase}
              text={`happy birthday, ${site.herName.toLowerCase()} — I made this just for you`}
              speed={55}
              startDelay={900}
              cursorClassName="text-gold-soft"
            />
          )}
        </motion.p>
      </div>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(36,24,35,0.75)_100%)]"
        aria-hidden="true"
      />
    </div>
  );
}
