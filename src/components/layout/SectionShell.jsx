import { useEffect, useRef } from 'react';
import { useVisit } from '../../context/VisitContext';

/**
 * SectionShell — wraps every chapter of the site.
 * Sets the visual mood (palette), tracks scroll for navigation + unlocks,
 * and gives each section a clean anchor id for the nav links.
 */
export default function SectionShell({
  id,
  variant = 'cream',
  children,
  className = '',
  navThreshold = 0.25,
}) {
  const ref = useRef(null);
  const { visit, setActive } = useVisit();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    /* mark as visited when she reaches it */
    const visitObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visit(id);
      },
      { threshold: navThreshold }
    );

    /* mark as the active nav item when it crosses the middle band */
    const activeObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(id);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );

    visitObs.observe(el);
    activeObs.observe(el);
    return () => {
      visitObs.disconnect();
      activeObs.disconnect();
    };
  }, [id, visit, setActive, navThreshold]);

  const variants = {
    cream: 'bg-cream text-ink',
    paper: 'paper text-ink',
    parchment: 'bg-parchment text-ink',
    blush:
      'bg-gradient-to-b from-cream via-blush-soft to-cream text-ink',
    dark: 'paper-dark text-cream',
    wine: 'bg-burgundy-deep text-cream',
    dusk:
      'bg-gradient-to-b from-night via-night-soft to-burgundy-deep text-cream',
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolate w-full overflow-hidden ${variants[variant] || variants.cream} ${className}`}
    >
      {children}
    </section>
  );
}
