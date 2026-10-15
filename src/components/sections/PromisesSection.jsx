import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { promises as promisesConfig } from '../../config/content';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import WaxSeal from '../ui/WaxSeal';
import GoldenMotes from '../ui/GoldenMotes';

/**
 * PromisesSection — a set of sealed little envelopes.
 * Each one opens like a small personal gift when tapped.
 */
export default function PromisesSection() {
  const [openIds, setOpenIds] = useState([]);
  const [finalOpen, setFinalOpen] = useState(false);

  const toggle = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const openCount = openIds.length + (finalOpen ? 1 : 0);
  const total = promisesConfig.cards.length + 1;

  return (
    <SectionShell id="promises" variant="wine" className="py-24 sm:py-32">
      <GoldenMotes count={14} className="opacity-70" />

      {/* warm vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,162,39,0.14),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Four"
          title={promisesConfig.title}
          subtitle={promisesConfig.subtitle}
          annotation="I wrote these slowly — and I meant every one"
          dark
        />

        {/* progress whisper */}
        <p className="mt-6 text-center font-body text-[10px] tracking-[0.28em] text-gold-pale/70">
          {openCount} OF {total} OPENED
        </p>

        {/* ---------- Promise cards ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promisesConfig.cards.map((card, i) => {
            const isOpen = openIds.includes(card.id);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                style={{ perspective: 1000 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(card.id)}
                  aria-expanded={isOpen}
                  className="group relative flex h-full w-full flex-col items-center justify-between rounded-2xl border border-gold-soft/20 bg-gradient-to-b from-parchment to-cream-deep px-6 pb-6 pt-7 text-center shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-1"
                >
                  {/* envelope flap */}
                  {!isOpen && (
                    <div
                      className="absolute inset-x-0 top-0 h-[42%] origin-top rounded-t-2xl transition-transform duration-700 group-hover:rotate-x-[-8deg]"
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(183,110,121,0.18))',
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative z-10 flex w-full flex-1 flex-col items-center">
                    <AnimatePresence mode="wait">
                      {!isOpen ? (
                        <motion.div
                          key="sealed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35 }}
                          className="flex flex-1 flex-col items-center justify-center gap-3 pt-2"
                        >
                          <WaxSeal size={46} />
                          <p className="mt-1 font-hand text-[1.35rem] text-burgundy">{card.shortTitle}</p>
                          <p className="font-body text-[9px] uppercase tracking-[0.24em] text-cocoa-soft">
                            {promisesConfig.cardLabel}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="opened"
                          initial={{ opacity: 0, y: 14, rotateX: -12 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                          className="flex flex-1 flex-col items-center justify-center"
                        >
                          <p className="font-body text-[9px] uppercase tracking-[0.28em] text-dusty-rose">
                            {card.shortTitle}
                          </p>
                          <p className="mt-3 text-pretty font-display text-[1.12rem] leading-relaxed text-ink">
                            {card.text}
                          </p>
                          <span
                            className="mt-4 text-gold"
                            aria-hidden="true"
                          >
                            ✦
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* ---------- One Last Promise ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto mt-14 max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-[1.4rem] border border-gold-soft/30 bg-gradient-to-b from-burgundy to-wine shadow-[var(--shadow-lift)]">
            <GoldenMotes count={8} />
            <div className="absolute inset-x-0 top-0 h-[110px] bg-gradient-to-b from-gold-soft/12 to-transparent" aria-hidden="true" />

            <div className="relative z-10 px-7 py-10 text-center sm:px-12">
              {!finalOpen ? (
                <button
                  type="button"
                  onClick={() => setFinalOpen(true)}
                  aria-expanded={false}
                  className="group flex w-full flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <WaxSeal size={64} />
                  </motion.div>
                  <h3 className="font-display text-[1.75rem] text-gold-pale sm:text-[2.1rem]">
                    {promisesConfig.finalPromise.title}
                  </h3>
                  <p className="font-body text-[10px] uppercase tracking-[0.28em] text-cream/55 transition group-hover:text-gold-pale/80">
                    {promisesConfig.cardLabel}
                  </p>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.32em] text-gold-pale/80">
                    {promisesConfig.finalPromise.title}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.1, delay: 0.25 }}
                    className="mx-auto mt-6 max-w-xl text-pretty font-display text-[1.22rem] italic leading-[1.85] text-cream sm:text-[1.42rem]"
                  >
                    {promisesConfig.finalPromise.text}
                  </motion.p>
                  <p className="mt-7 font-hand text-2xl text-blush">— from me, to you, always</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
