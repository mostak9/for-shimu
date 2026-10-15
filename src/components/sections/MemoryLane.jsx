import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { memories } from '../../config/content';
import { atmosphericFor } from '../../lib/placeholders';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import Polaroid from '../ui/Polaroid';
import Lightbox from '../ui/Lightbox';

/**
 * MemoryLane — a scrollable scrapbook timeline.
 * Every entry is editable sample content until she replaces it with the real story.
 */
export default function MemoryLane() {
  const [category, setCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const entries = useMemo(() => {
    const list = category === 'all' ? memories.entries : memories.entries.filter((e) => e.category === category);
    return list;
  }, [category]);

  const lightboxItems = useMemo(
    () =>
      entries.map((e, i) => ({
        id: e.id,
        image: e.image,
        fallbackSrc: atmosphericFor(i + 1),
        caption: e.caption,
        date: e.dateLabel,
        note: e.note,
      })),
    [entries]
  );

  return (
    <SectionShell id="memories" variant="cream" className="py-24 sm:py-32">
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-blush-soft/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-gold-pale/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Two"
          title={memories.title}
          subtitle={memories.subtitle}
          annotation={memories.annotation}
        />

        {/* category chips */}
        <div className="mx-auto mt-9 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {memories.categories.map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={isActive}
                className={`rounded-full border px-3.5 py-1.5 font-body text-[11px] tracking-[0.08em] transition-all duration-300 ${
                  isActive
                    ? 'border-burgundy bg-burgundy text-cream shadow-[0_8px_20px_-10px_rgba(74,28,40,0.6)]'
                    : 'border-cocoa/20 bg-cream-soft/70 text-cocoa hover:border-dusty-rose hover:text-burgundy'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* timeline */}
        <div className="relative mt-14">
          {/* spine */}
          <div
            className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-dusty-rose/35 to-transparent md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-14">
            {entries.map((entry, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={`${entry.id}-${category}`}
                  initial={{ opacity: 0, y: 42 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                  className={`relative flex flex-col gap-5 pl-11 md:flex-row md:items-center md:gap-10 md:pl-0 ${
                    flip ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* node */}
                  <div
                    className="absolute left-[11px] top-1 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="absolute h-3 w-3 rounded-full bg-dusty-rose/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </div>

                  {/* polaroid side */}
                  <div className={`md:w-[44%] ${flip ? 'md:pl-8' : 'md:pr-8'} ${flip ? 'md:justify-end' : 'md:justify-start'} flex`}>
                    <Polaroid
                      src={entry.image}
                      fallbackSrc={atmosphericFor(i)}
                      alt={entry.title}
                      caption={entry.caption}
                      date={entry.dateLabel}
                      annotation={entry.note}
                      rotation={entry.rotation}
                      replaceLabel="Add this memory"
                      onClick={() => setLightboxIndex(i)}
                      className="w-full max-w-[280px]"
                    />
                  </div>

                  {/* text side */}
                  <div className={`md:w-[56%] ${flip ? 'md:text-right' : 'md:text-left'}`}>
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.28em] text-dusty-rose">
                      {entry.dateLabel}
                    </p>
                    <h3 className="mt-2 text-balance font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-pretty font-body text-[0.93rem] font-light leading-relaxed text-cocoa">
                      {entry.caption}
                    </p>
                    <p className={`mt-3 font-hand text-lg text-burgundy ${flip ? 'md:pl-4' : ''}`}>“{entry.note}”</p>
                    <span className="mt-2 inline-block rounded-full bg-blush-soft/70 px-2.5 py-0.5 font-body text-[9px] uppercase tracking-[0.2em] text-cocoa-soft">
                      {memories.categories.find((c) => c.id === entry.category)?.label || entry.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {entries.length === 0 && (
          <p className="mt-14 text-center font-hand text-2xl text-cocoa-soft">
            nothing here yet — add your first memory in the config file
          </p>
        )}

        <p className="mx-auto mt-16 max-w-lg text-center font-display text-base italic text-cocoa-soft">
          And the best part? We are still writing the next entry.
        </p>
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </SectionShell>
  );
}
