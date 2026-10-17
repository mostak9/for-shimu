import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { opening, site } from '../../config/content';
import Typewriter from '../ui/Typewriter';
import GoldenMotes from '../ui/GoldenMotes';

/**
 * OpeningScreen — the sealed letter under a quiet night sky.
 *
 * Directed as one continuous timeline:
 *   sky → stars → words → the envelope drifts in → the seal settles →
 *   she opens it → the letter rises → she steps inside.
 *
 * Everything animates transform/opacity only, so it stays smooth on phones.
 */

/* Soft luxury ease for arrivals, slower ease for the big reveal. */
const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_FLAP = [0.5, 0.02, 0.15, 1];

export default function OpeningScreen({ onComplete }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState('sealed'); /* sealed → opened → leaving */

  const stars = useMemo(() => {
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      x: ((i * 157) % 100) + ((i * 31) % 7) * 0.3,
      y: ((i * 83) % 72) + ((i * 17) % 5) * 0.4,
      size: 1 + ((i * 13) % 3) * 0.7,
      delay: (0.2 + (i % 17) * 0.09).toFixed(2),
      duration: (2.8 + ((i * 0.29) % 2.6)).toFixed(2),
    }));
  }, []);

  const words = useMemo(() => opening.headline.split(' '), []);

  const openEnvelope = () => {
    if (phase !== 'sealed') return;
    setPhase('opened');
  };

  const enterSite = (skipped = false) => {
    if (phase === 'leaving') return;
    setPhase('leaving');
    /* the app layer plays the zoom-through-the-sky exit */
    onComplete?.({ skipped });
  };

  const onSkyClick = () => {
    if (phase === 'opened') enterSite(false);
  };

  const isOpen = phase !== 'sealed';

  return (
    <div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-night px-5 py-10"
      onClick={onSkyClick}
    >
      {/* ================= Night sky ================= */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.01 : 1.6, ease: 'easeOut' }}
      >
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
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,162,39,0.18),transparent_55%)]"
          animate={reduce ? {} : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* warm glow that blooms when the letter opens */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(232,201,138,0.22),transparent_60%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* ================= Stars ================= */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              reduce
                ? { opacity: 0.55, scale: 1 }
                : { opacity: [0, 0.75, 0.45, 0.75, 0], scale: [0.6, 1.15, 1, 1.15, 0.6] }
            }
            transition={
              reduce
                ? { duration: 0.01, delay: 0.2 }
                : {
                    duration: Number(s.duration) + 1.2,
                    delay: Number(s.delay),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        ))}
        {!reduce && (
          <>
            <span className="shooting-star" style={{ top: '16%', left: '12%', animationDelay: '5s' }} />
            <span
              className="shooting-star"
              style={{ top: '28%', left: '58%', animationDelay: '12.5s', width: '84px', opacity: 0.7 }}
            />
          </>
        )}
      </div>

      <GoldenMotes count={10} />

      {/* ================= Skip ================= */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          enterSite(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'leaving' ? 0 : 1 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 1.2 }}
        className="absolute right-5 top-5 z-20 rounded-full border border-cream/15 px-4 py-2 font-body text-[11px] tracking-[0.22em] text-cream/60 transition-colors hover:border-gold-soft/50 hover:text-gold-pale"
      >
        {opening.skipLabel}
      </motion.button>

      {/* ================= Content ================= */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        {/* — eyebrow — */}
        <motion.p
          initial={{ opacity: 0, y: 14, filter: reduce ? 'none' : 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: reduce ? 0 : 0.8, ease: EASE_OUT }}
          className="font-body text-[10px] font-medium uppercase tracking-[0.42em] text-gold-pale/70 sm:text-[11px]"
        >
          {opening.eyebrow}
        </motion.p>

        {/* — headline, word by word — */}
        <h1
          aria-label={opening.headline}
          className="mt-5 text-balance font-display text-[2.15rem] font-normal italic leading-[1.22] text-cream sm:text-[2.9rem] md:text-[3.6rem]"
        >
          <span aria-hidden="true" className="inline">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: reduce ? 0.01 : 1.05,
                    delay: reduce ? 0 : 1.1 + i * 0.055,
                    ease: EASE_OUT,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* — birthday line — */}
        <motion.p
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: reduce ? 0 : 2.05, ease: EASE_OUT }}
          className="mt-6 font-hand text-[1.65rem] text-blush sm:text-[2.1rem]"
        >
          {opening.birthdayLine}
        </motion.p>

        {/* ================= Envelope ================= */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduce ? 0.01 : 1.5, delay: reduce ? 0 : 1.55, ease: EASE_OUT }}
          className="relative mt-10 sm:mt-12"
          style={{ perspective: 1200 }}
        >
          {/* gentle drift — the envelope floats like it's resting on water */}
          <motion.div
            animate={reduce ? {} : { y: [0, -7, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Letter emerging from inside */}
              <motion.div
                className="paper absolute left-1/2 top-3 z-0 w-[86%] rounded-[3px] px-5 py-6 text-left shadow-[var(--shadow-lift)]"
                initial={{ y: 26, opacity: 0, rotate: -1.6, x: '-50%' }}
                animate={
                  isOpen
                    ? { y: -58, opacity: 1, rotate: -0.5, x: '-50%' }
                    : { y: 26, opacity: 0, rotate: -1.6, x: '-50%' }
                }
                transition={{
                  duration: reduce ? 0.01 : 1.35,
                  delay: reduce ? 0 : 0.32,
                  ease: EASE_OUT,
                }}
              >
                <motion.p
                  className="font-hand text-xl text-burgundy"
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: isOpen ? 0.75 : 0 }}
                >
                  {opening.envelopeNote.greeting}
                </motion.p>
                <motion.p
                  className="mt-2 font-hand text-[1.05rem] leading-snug text-ink"
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: isOpen ? 0.95 : 0 }}
                >
                  {opening.envelopeNote.body}
                </motion.p>
                <motion.p
                  className="mt-3 text-right font-hand text-lg text-dusty-rose"
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: isOpen ? 1.15 : 0 }}
                >
                  {opening.envelopeNote.signOff}
                </motion.p>
              </motion.div>

              {/* Envelope body */}
              <div className="envelope-body relative z-10 h-[128px] w-[min(78vw,340px)] rounded-[6px] sm:h-[150px]">
                <div className="absolute inset-x-0 bottom-0 h-full rounded-[6px] bg-gradient-to-t from-cocoa/12 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cocoa/8 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cocoa/8 to-transparent" />

                {/* Flap — hinges open slowly, like real paper */}
                <motion.div
                  className="absolute left-0 right-0 top-0 z-20 h-[58%]"
                  style={{
                    transformOrigin: 'top',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background:
                      'linear-gradient(180deg, var(--color-parchment) 0%, var(--color-cream-deep) 100%)',
                    boxShadow: '0 2px 8px rgba(59,43,46,0.12)',
                  }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpen ? -172 : 0 }}
                  transition={{
                    duration: reduce ? 0.01 : 1.25,
                    delay: reduce ? 0 : 0.12,
                    ease: EASE_FLAP,
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
                      initial={{ opacity: 0, scale: 1.6, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.55,
                        rotate: 22,
                        transition: { duration: 0.45, ease: 'easeIn' },
                      }}
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 210, damping: 15, delay: reduce ? 0 : 2.35 }}
                      className="wax-seal group absolute left-1/2 top-[42%] z-30 flex h-[52px] w-[52px] -translate-x-1/2 items-center justify-center rounded-full sm:h-[58px] sm:w-[58px]"
                      aria-label="Open the sealed letter"
                    >
                      {/* soft invitation ring */}
                      <span className="seal-glow" aria-hidden="true" />
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
          </motion.div>

          {/* ============ CTA ============ */}
          <AnimatePresence mode="wait">
            {phase === 'sealed' ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                transition={{ duration: 0.9, delay: reduce ? 0 : 2.75, ease: EASE_OUT }}
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
            ) : phase === 'opened' ? (
              <motion.div
                key="entering"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: reduce ? 0 : 1.15, ease: EASE_OUT }}
                className="mt-8"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    enterSite(false);
                  }}
                  className="group relative rounded-full border border-gold-soft/40 px-7 py-2.5 font-body text-[11px] tracking-[0.24em] text-gold-pale/90 transition-colors hover:border-gold-soft hover:text-gold-pale"
                >
                  <span className="absolute inset-0 rounded-full bg-gold-soft/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative">Come inside ✦</span>
                </button>
              </motion.div>
            ) : (
              <motion.div key="gone" initial={{ opacity: 0 }} animate={{ opacity: 0 }} className="h-2" />
            )}
          </AnimatePresence>
        </motion.div>

        {/* — handwritten whisper — */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 1.2, delay: isOpen ? 1.35 : 0 }}
          className="mt-7 max-w-md font-hand text-lg text-cream/60"
        >
          {isOpen && (
            <Typewriter
              key={phase}
              text={`happy birthday, ${site.herName.toLowerCase()} — I made this just for you`}
              speed={55}
              startDelay={1200}
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
