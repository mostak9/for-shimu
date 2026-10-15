import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { letter, site } from '../../config/content';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import Typewriter from '../ui/Typewriter';

/**
 * BirthdayLetter — the love letter, on quiet paper, written to her.
 * The greeting types itself; the paragraphs arrive like ink drying.
 */
export default function BirthdayLetter() {
  const reduce = useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const [showBody, setShowBody] = useState(reduce ? true : false);

  const replay = () => {
    setShowBody(reduce ? true : false);
    setRunKey((k) => k + 1);
    /* scroll the letter into a calm position */
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <SectionShell id="letter" variant="paper" className="py-24 sm:py-32">
      {/* soft light leak */}
      <div className="light-leak pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-blush/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-16 h-64 w-64 rounded-full bg-gold-soft/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter One"
          title={letter.title}
          annotation={letter.annotation}
        />

        {/* The letter sheet */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mt-12 rounded-[2px] bg-cream-soft/90 px-6 py-10 shadow-[var(--shadow-lift)] sm:px-12 sm:py-14"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 31px, rgba(183,110,121,0.08) 32px)',
            backgroundPosition: '0 12px',
          }}
        >
          {/* pin + tape */}
          <div className="washi left-1/2 top-0 w-24 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] bg-blush" aria-hidden="true" />

          {/* margin red line, like real letter paper */}
          <div className="absolute inset-y-8 left-4 w-px bg-dusty-rose/20 sm:left-7" aria-hidden="true" />

          <p key={`g-${runKey}`} className="font-hand text-[1.75rem] leading-snug text-burgundy sm:text-[2.15rem]">
            <Typewriter
              text={letter.greeting}
              speed={70}
              startDelay={250}
              onDone={() => setShowBody(true)}
            />
          </p>

          <div className="mt-7 space-y-6">
            {letter.paragraphs.map((para, i) => (
              <motion.p
                key={`${runKey}-${i}`}
                initial={{ opacity: 0, y: 14, filter: reduce ? 'none' : 'blur(3px)' }}
                animate={
                  showBody
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 14, filter: reduce ? 'none' : 'blur(3px)' }
                }
                transition={{ duration: reduce ? 0.01 : 0.9, delay: reduce ? 0 : 0.12 * i }}
                className="text-pretty font-body text-[0.98rem] font-light leading-[1.95] text-ink/90 sm:text-[1.06rem]"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showBody ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: reduce ? 0 : 1.1 }}
            className="mt-10"
          >
            <p className="font-display text-[1.15rem] italic leading-relaxed text-cocoa sm:text-[1.3rem]">
              {letter.closing}
            </p>
            <p className="font-display text-[1.15rem] italic leading-relaxed text-cocoa sm:text-[1.3rem]">
              {letter.closingLine2}
            </p>
            <p className="mt-5 -rotate-1 font-hand text-[2.1rem] leading-none text-burgundy">
              {letter.signature}
            </p>
            <p className="mt-2 font-body text-[10px] uppercase tracking-[0.28em] text-cocoa-soft/70">
              {site.yourName} — for {site.herFullName}
            </p>
          </motion.div>

          {/* replay */}
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={replay}
              className="group inline-flex items-center gap-2 rounded-full border border-dusty-rose/35 px-5 py-2.5 font-body text-[11px] tracking-[0.18em] text-burgundy transition hover:border-dusty-rose hover:bg-blush-soft"
            >
              <RotateCcw size={13} className="transition-transform duration-500 group-hover:-rotate-180" />
              {letter.replayLabel}
            </button>
          </div>
        </motion.article>
      </div>
    </SectionShell>
  );
}
