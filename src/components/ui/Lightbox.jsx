import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Photo from './Photo';

/**
 * Lightbox — full-screen photo viewer.
 * Keyboard: ← → to move, Esc to close. Touch-friendly large controls.
 * Images are shown with object-contain so nothing is ever awkwardly cropped.
 */
export default function Lightbox({ items, index, onClose, onNavigate, fallbackFrom = 0 }) {
  const open = index !== null && index !== undefined && items[index];

  const next = useCallback(() => {
    if (!open) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate, open]);

  const prev = useCallback(() => {
    if (!open) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/80 p-3 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft/90 text-burgundy shadow-lg transition hover:scale-105 hover:bg-cream"
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream-soft/85 text-burgundy shadow-lg transition hover:scale-105 hover:bg-cream sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cream-soft/85 text-burgundy shadow-lg transition hover:scale-105 hover:bg-cream sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.figure
            key={item.id || index}
            className="flex max-h-full w-full max-w-3xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex max-h-[70vh] w-full items-center justify-center rounded-sm bg-ink/30 p-2 shadow-[var(--shadow-lift)] sm:max-h-[72vh]">
              <Photo
                src={item.image}
                fallbackSrc={item.fallbackSrc}
                alt={item.caption || 'Photograph'}
                fit="contain"
                eager
                replaceLabel="Add your photo"
                className="max-h-[68vh] w-full"
                imgClassName="rounded-[2px] object-contain"
              />
            </div>
            <figcaption className="mt-4 max-w-xl px-4 text-center">
              {item.caption && (
                <p className="font-hand text-2xl leading-snug text-cream">{item.caption}</p>
              )}
              {item.date && (
                <p className="mt-1 font-body text-[10px] uppercase tracking-[0.22em] text-gold-pale/80">
                  {item.date}
                </p>
              )}
              {item.note && (
                <p className="mt-2 font-display text-sm italic text-cream/70">{item.note}</p>
              )}
            </figcaption>
          </motion.figure>

          <p className="absolute bottom-4 font-body text-[10px] tracking-[0.2em] text-cream/50">
            {index + 1} / {items.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
