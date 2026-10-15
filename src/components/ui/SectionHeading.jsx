import { motion } from 'framer-motion';

/**
 * SectionHeading — consistent section titles with a handwritten whisper.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  annotation,
  dark = false,
  align = 'center',
  id,
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`relative z-10 flex flex-col ${alignCls} gap-4`}>
      {eyebrow && (
        <p
          className={`font-body text-[11px] font-medium uppercase tracking-[0.32em] ${
            dark ? 'text-gold-pale/85' : 'text-dusty-rose'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-balance font-display text-[2.1rem] font-medium leading-[1.12] sm:text-[2.75rem] md:text-[3.25rem] ${
          dark ? 'text-cream' : 'text-ink'
        }`}
      >
        <span className="flourish-underline">{title}</span>
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-pretty font-body text-[0.95rem] font-light leading-relaxed sm:text-base ${
            dark ? 'text-cream/75' : 'text-cocoa'
          }`}
        >
          {subtitle}
        </p>
      )}
      {annotation && (
        <motion.p
          initial={{ opacity: 0, rotate: -2 }}
          whileInView={{ opacity: 1, rotate: -1.6 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className={`font-hand text-xl ${dark ? 'text-blush' : 'text-dusty-rose'}`}
        >
          {annotation}
        </motion.p>
      )}
    </div>
  );
}
