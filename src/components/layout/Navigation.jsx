import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, Music2, Pause, X } from 'lucide-react';
import { useVisit } from '../../context/VisitContext';
import { useAudio } from '../../context/AudioContext';
import { site } from '../../config/content';

/** Every chapter of the story, in order. */
export const SECTIONS = [
  { id: 'letter', label: 'The Letter', short: 'Letter' },
  { id: 'memories', label: 'Our Story', short: 'Story' },
  { id: 'gallery', label: 'Photographs', short: 'Photos' },
  { id: 'promises', label: 'Promises', short: 'Promises' },
  { id: 'cake', label: 'The Cake', short: 'Cake' },
  { id: 'notes', label: 'Little Notes', short: 'Notes' },
  { id: 'tomorrow', label: 'Tomorrow', short: 'Tomorrow' },
  { id: 'music', label: 'Our Song', short: 'Song' },
  { id: 'forever', label: 'Always', short: 'Always' },
];

export default function Navigation({ visible = true }) {
  const { active, visited } = useVisit();
  const { isPlaying, toggle, error, isReady } = useAudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  /* close the mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* lock scroll while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Gold reading-progress line */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[2.5px] origin-left bg-gradient-to-r from-gold-soft via-dusty-rose to-gold"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed left-0 right-0 top-0 z-[65]"
          >
            <nav
              aria-label="Chapters of this story"
              className="mx-auto mt-2 flex w-[min(96%,1120px)] items-center justify-between gap-3 rounded-full border border-cream-deep/60 bg-cream-soft/85 px-4 py-2 shadow-[0_10px_30px_-18px_rgba(59,43,46,0.45)] backdrop-blur-xl sm:px-5"
            >
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex shrink-0 items-center gap-2 rounded-full px-1 py-1"
                aria-label="Back to the beginning"
              >
                <HeartGlyph />
                <span className="font-hand text-lg leading-none text-burgundy">
                  For {site.herName}
                </span>
              </button>

              {/* Desktop links */}
              <ul className="hidden items-center gap-1 lg:flex">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  const seen = visited.includes(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => goTo(s.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative rounded-full px-2.5 py-1.5 font-body text-[11px] tracking-[0.12em] transition-colors ${
                          isActive
                            ? 'text-burgundy'
                            : seen
                              ? 'text-cocoa hover:text-burgundy'
                              : 'text-cocoa-soft/70 hover:text-cocoa'
                        }`}
                      >
                        {s.short}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className="absolute inset-x-2.5 -bottom-0.5 h-[1.5px] rounded-full bg-dusty-rose"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-1.5">
                {/* Song quick-toggle */}
                {!error && (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-label={isPlaying ? 'Pause our song' : 'Play our song'}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                      isPlaying
                        ? 'border-dusty-rose bg-dusty-rose text-cream shadow-[0_0_18px_-4px_rgba(183,110,121,0.7)]'
                        : 'border-cocoa/25 text-cocoa hover:border-dusty-rose hover:text-burgundy'
                    }`}
                  >
                    {isPlaying ? <Pause size={15} /> : <Music2 size={15} />}
                  </button>
                )}

                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label={menuOpen ? 'Close menu' : 'Open chapter menu'}
                  aria-expanded={menuOpen}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa/25 text-cocoa transition hover:border-dusty-rose hover:text-burgundy lg:hidden"
                >
                  {menuOpen ? <X size={17} /> : <Menu size={17} />}
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[68] flex items-center justify-center bg-wine/70 p-6 backdrop-blur-md lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex w-full max-w-xs flex-col items-stretch gap-1.5 rounded-3xl border border-cream-deep/40 bg-cream-soft/95 p-5 shadow-[var(--shadow-lift)]"
              onClick={(e) => e.stopPropagation()}
            >
              <li className="mb-2 text-center">
                <p className="font-hand text-2xl text-burgundy">Our little universe</p>
              </li>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    className={`w-full rounded-2xl px-4 py-2.5 text-left font-display text-xl transition ${
                      active === s.id
                        ? 'bg-blush-soft text-burgundy'
                        : 'text-ink hover:bg-cream-deep/60'
                    }`}
                  >
                    <span className="mr-2 font-body text-[10px] tracking-[0.2em] text-cocoa-soft">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeartGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5c-3.6-2.9-8-6-8-10.3C4 6.6 6.6 4.5 9.2 4.5c1.5 0 2.5.7 2.8 1.5.3-.8 1.3-1.5 2.8-1.5 2.6 0 5.2 2.1 5.2 5.7 0 4.3-4.4 7.4-8 10.3z"
        fill="#b76e79"
      />
    </svg>
  );
}
