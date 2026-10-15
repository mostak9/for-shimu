import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { finalScreen as finalConfig, site } from '../../config/content';
import { atmosphericFor } from '../../lib/placeholders';
import SectionShell from '../layout/SectionShell';
import Photo from '../ui/Photo';
import GoldenMotes from '../ui/GoldenMotes';

/**
 * FinalScreen — the emotional centerpiece. One birthday, a thousand memories,
 * and all the chapters still unwritten.
 */
export default function FinalScreen({ onReplay }) {
  return (
    <SectionShell id="forever" variant="dark" className="min-h-[100dvh] py-28 sm:py-36">
      {/* ---------- cinematic background ---------- */}
      <div className="absolute inset-0" aria-hidden="true">
        <Photo
          src={finalConfig.background}
          fallbackSrc={atmosphericFor(6)}
          alt=""
          replaceLabel="Add our photo as the background"
          eager
          className="h-full w-full"
          imgClassName="opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-wine/80 via-wine/60 to-night/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,transparent_30%,rgba(36,24,35,0.8)_100%)]" />
      </div>

      <GoldenMotes count={16} />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        {/* headline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mx-auto font-body text-[10px] font-medium uppercase tracking-[0.4em] text-gold-pale/75"
        >
          the last page — for now
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="mx-auto mt-7 text-balance font-display text-[1.9rem] italic leading-[1.3] text-cream sm:text-[2.6rem] md:text-[3.1rem]"
        >
          {finalConfig.headline}
        </motion.h2>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-gold-soft/70 to-transparent"
          aria-hidden="true"
        />

        {/* letter */}
        <div className="mx-auto mt-12 max-w-2xl space-y-6">
          {finalConfig.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 18, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.95, delay: i * 0.12 }}
              className={`text-pretty leading-[1.9] ${
                i === 0 || i === finalConfig.paragraphs.length - 1
                  ? 'font-hand text-[1.75rem] text-blush sm:text-[2.15rem]'
                  : 'font-body text-[1rem] font-light text-cream/85 sm:text-[1.12rem]'
              }`}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12"
        >
          <p className="font-display text-lg italic text-cream/70">{finalConfig.closing}</p>
          <p className="mt-2 -rotate-2 font-hand text-[2.6rem] leading-none text-gold-pale sm:text-[3.2rem]">
            {finalConfig.signature}
          </p>
          <p className="mt-3 font-body text-[10px] uppercase tracking-[0.32em] text-cream/45">
            {site.yourName} — {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* replay */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-14 flex flex-col items-center gap-5"
        >
          <button
            type="button"
            onClick={onReplay}
            className="group inline-flex items-center gap-3 rounded-full border border-gold-soft/45 bg-gold-soft/10 px-8 py-4 font-body text-[11px] tracking-[0.26em] text-gold-pale transition-all duration-500 hover:scale-[1.03] hover:border-gold-soft hover:bg-gold-soft/20"
          >
            <RotateCcw size={14} className="transition-transform duration-700 group-hover:-rotate-180" />
            {finalConfig.replayButton}
          </button>
          <p className="font-hand text-lg text-cream/55">{finalConfig.footerNote}</p>
        </motion.div>
      </div>
    </SectionShell>
  );
}
