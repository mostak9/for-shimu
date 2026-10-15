import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Sparkles, Star } from 'lucide-react';
import { notes as notesConfig, site } from '../../config/content';
import { useVisit } from '../../context/VisitContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';

/**
 * HiddenNotes — little notes, stars, and polaroids she can open.
 * A few stay locked until she has wandered through other chapters —
 * they unlock themselves, quietly, never as a chore.
 */
export default function HiddenNotes() {
  const { visitedCount } = useVisit();
  const [openIds, setOpenIds] = useLocalStorage('shimu:open-notes', []);
  const [newlyUnlocked, setNewlyUnlocked] = useState(false);
  const prevCount = useRef(visitedCount);

  const isUnlocked = (item) => !item.locked || visitedCount >= (item.unlockAfter ?? 99);

  const unlockedCount = notesConfig.items.filter(isUnlocked).length;

  /* celebrate a fresh unlock */
  useEffect(() => {
    if (visitedCount > prevCount.current) {
      const appeared = notesConfig.items.some(
        (i) =>
          i.locked &&
          visitedCount >= (i.unlockAfter ?? 99) &&
          visitedCount - 1 < (i.unlockAfter ?? 99)
      );
      if (appeared) {
        setNewlyUnlocked(true);
        const t = window.setTimeout(() => setNewlyUnlocked(false), 5000);
        prevCount.current = visitedCount;
        return () => window.clearTimeout(t);
      }
    }
    prevCount.current = visitedCount;
    return undefined;
  }, [visitedCount]);

  const toggle = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <SectionShell id="notes" variant="paper" className="py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,201,138,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Six"
          title={notesConfig.title}
          subtitle={notesConfig.subtitle}
          annotation={notesConfig.tapHint}
        />

        {/* unlock status */}
        <div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-full border border-gold-soft/35 bg-cream-soft/80 px-4 py-2">
          <Sparkles size={13} className="text-gold" aria-hidden="true" />
          <p className="font-body text-[10px] tracking-[0.22em] text-cocoa">
            {unlockedCount} OF {notesConfig.items.length} NOTES FOUND
          </p>
        </div>

        <AnimatePresence>
          {newlyUnlocked && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center font-hand text-xl text-dusty-rose"
            >
              {notesConfig.unlockToast}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ---------- Notes grid ---------- */}
        <div className="mt-11 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
          {notesConfig.items.map((item, i) => {
            const unlocked = isUnlocked(item);
            const isOpen = openIds.includes(item.id);
            const rotate = [-2.4, 1.6, -1.2, 2.2, -1.8, 1.1, -2.6, 2.0, -1.5][i % 9];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                <button
                  type="button"
                  onClick={() => unlocked && toggle(item.id)}
                  disabled={!unlocked}
                  aria-expanded={isOpen}
                  aria-label={
                    unlocked
                      ? isOpen
                        ? 'Close note'
                        : 'Open hidden note'
                      : 'Locked note — keep exploring to unlock'
                  }
                  className={`relative flex min-h-[168px] w-full flex-col items-center justify-center rounded-[10px] px-4 py-6 text-center transition-all duration-500 sm:min-h-[190px] ${
                    unlocked
                      ? 'cursor-pointer bg-cream-soft shadow-[var(--shadow-polaroid)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]'
                      : 'cursor-default border border-dashed border-cocoa/25 bg-cream-deep/45'
                  }`}
                >
                  {/* decorative header depending on kind */}
                  {!isOpen && unlocked && item.kind === 'star' && (
                    <Star size={20} className="mb-3 text-gold" fill="currentColor" aria-hidden="true" />
                  )}
                  {!isOpen && unlocked && item.kind === 'envelope' && (
                    <div className="mb-3 text-dusty-rose" aria-hidden="true">
                      <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                        <rect x="0.6" y="0.6" width="28.8" height="18.8" rx="2.2" stroke="#b76e79" strokeWidth="1.2" />
                        <path d="M1 2l14 9 14-9" stroke="#b76e79" strokeWidth="1.2" />
                      </svg>
                    </div>
                  )}
                  {!isOpen && unlocked && item.kind === 'polaroid' && (
                    <div className="mb-3 h-10 w-9 rounded-[2px] bg-gradient-to-br from-blush to-dusty-rose/70 p-[3px]" aria-hidden="true">
                      <div className="h-full w-full rounded-[1px] bg-cream" />
                    </div>
                  )}
                  {!isOpen && unlocked && item.kind === 'note' && (
                    <div className="mb-3 h-2 w-10 rounded-full bg-dusty-rose/35" aria-hidden="true" />
                  )}

                  <AnimatePresence mode="wait">
                    {!unlocked ? (
                      <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 bg-cream-soft/70">
                          <Lock size={15} className="text-cocoa-soft" />
                        </div>
                        <p className="mt-3 font-body text-[10px] leading-relaxed tracking-[0.08em] text-cocoa-soft/80">
                          {notesConfig.lockedHint}
                        </p>
                        <p className="mt-2 font-body text-[9px] tracking-[0.22em] text-cocoa-soft/60">
                          OPENS AFTER {(item.unlockAfter ?? 99)} CHAPTERS
                        </p>
                      </motion.div>
                    ) : !isOpen ? (
                      <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}>
                        <p className="font-hand text-xl text-burgundy">a note for you</p>
                        <p className="mt-2 font-body text-[9px] uppercase tracking-[0.24em] text-cocoa-soft">
                          {notesConfig.tapHint}
                        </p>
                        {item.locked && (
                          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-pale/40 px-2 py-0.5 font-body text-[8px] tracking-[0.18em] text-cocoa">
                            <Sparkles size={8} /> NEW
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.p
                        key="open"
                        initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.55 }}
                        className="text-pretty font-hand text-[1.35rem] leading-snug text-ink sm:text-[1.55rem]"
                      >
                        {item.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-md text-center font-display text-base italic text-cocoa-soft">
          You carry so much more than you realise, {site.herName}. These are just a few of the
          things I hope you never forget.
        </p>
      </div>
    </SectionShell>
  );
}
