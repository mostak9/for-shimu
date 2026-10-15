import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, PenLine, Unlock } from 'lucide-react';
import { timeCapsule as capsuleConfig, site } from '../../config/content';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import WaxSeal from '../ui/WaxSeal';

/**
 * TimeCapsule — an editable letter to your future selves.
 * Saved only in this browser (localStorage). Nothing is sent anywhere —
 * no pretend delivery, no fake re-open dates. Just a quiet, real keepsake.
 */
export default function TimeCapsule() {
  const [draft, setDraft] = useLocalStorage('shimu:time-capsule-draft', capsuleConfig.draft);
  const [sealed, setSealed] = useLocalStorage('shimu:time-capsule-sealed', false);
  const [sealing, setSealing] = useState(false);
  const [justSealed, setJustSealed] = useState(false);

  const handleSeal = () => {
    setSealing(true);
    window.setTimeout(
      () => {
        setSealing(false);
        setSealed(true);
        setJustSealed(true);
        window.setTimeout(() => setJustSealed(false), 6000);
      },
      1100
    );
  };

  return (
    <SectionShell id="tomorrow" variant="blush" className="py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-gold-pale/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Seven"
          title={capsuleConfig.title}
          subtitle={capsuleConfig.subtitle}
          annotation="for the two of us, a few years from now"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* ---------- The letter ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative rounded-[4px] bg-cream-soft px-5 py-7 shadow-[var(--shadow-lift)] sm:px-8 sm:py-9">
              <div className="washi left-1/2 top-0 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-blush" aria-hidden="true" />

              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="capsule-letter"
                  className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.26em] text-dusty-rose"
                >
                  <PenLine size={12} aria-hidden="true" />
                  {capsuleConfig.letterLabel}
                </label>
                {sealed && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-3 py-1 font-body text-[9px] tracking-[0.18em] text-cream">
                    <Lock size={9} /> SEALED
                  </span>
                )}
              </div>

              <textarea
                id="capsule-letter"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                readOnly={sealed}
                rows={14}
                placeholder="Dear future us…"
                className={`mt-4 w-full resize-y rounded-[2px] border border-dusty-rose/15 bg-cream/60 p-4 font-hand text-[1.35rem] leading-[1.7] text-ink outline-none transition ${
                  sealed
                    ? 'cursor-default bg-cream-deep/40 text-cocoa'
                    : 'focus:border-dusty-rose/50 focus:bg-cream'
                }`}
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 34px, rgba(183,110,121,0.1) 35px)',
                }}
              />

              <p className="mt-3 font-body text-[10px] leading-relaxed tracking-[0.05em] text-cocoa-soft">
                {sealed ? capsuleConfig.sealedNote : capsuleConfig.draftNote}
              </p>

              {/* seal actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {!sealed ? (
                  <button
                    type="button"
                    onClick={handleSeal}
                    disabled={sealing}
                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-burgundy to-burgundy-deep px-7 py-3.5 font-body text-[11px] tracking-[0.22em] text-cream shadow-[var(--shadow-glow-gold)] transition-transform duration-500 hover:scale-[1.02] disabled:opacity-80"
                  >
                    <motion.span
                      animate={sealing ? { rotate: [0, -18, 14, -8, 0], scale: [1, 1.25, 1] } : {}}
                      transition={{ duration: 1 }}
                    >
                      <WaxSeal size={26} />
                    </motion.span>
                    {sealing ? 'sealing…' : capsuleConfig.sealButton}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSealed(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-cocoa/25 px-6 py-3 font-body text-[11px] tracking-[0.2em] text-cocoa transition hover:border-dusty-rose hover:text-burgundy"
                  >
                    <Unlock size={13} />
                    {capsuleConfig.unsealButton}
                  </button>
                )}
              </div>

              {/* sealing animation overlay */}
              <AnimatePresence>
                {sealing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-[4px] bg-cream/85 backdrop-blur-[2px]"
                  >
                    <motion.div
                      initial={{ scale: 2.2, opacity: 0, rotate: -24 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 160, damping: 13 }}
                    >
                      <WaxSeal size={96} label={`for ${site.herName}`} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* post-seal confirmation */}
            <AnimatePresence>
              {justSealed && !sealing && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 rounded-2xl border border-gold-soft/40 bg-cream-soft/85 px-5 py-4 text-center"
                >
                  <p className="font-hand text-xl text-burgundy">Sealed — and safe on this device.</p>
                  <p className="mt-1.5 font-body text-[11px] leading-relaxed text-cocoa">
                    {capsuleConfig.privacyNote}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ---------- Prompt cards ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="font-body text-[10px] uppercase tracking-[0.26em] text-dusty-rose">
              a few prompts, if you would like them
            </p>
            {capsuleConfig.prompts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-[8px] border border-dusty-rose/15 bg-cream-soft/75 px-5 py-4 shadow-[0_10px_28px_-18px_rgba(59,43,46,0.35)]"
              >
                <p className="font-display text-[1.06rem] font-medium leading-snug text-ink">
                  {p.title}
                </p>
                <p className="mt-1.5 font-body text-[11px] leading-relaxed text-cocoa-soft">{p.example}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
