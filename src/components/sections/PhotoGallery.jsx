import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { gallery } from '../../config/content';
import { atmosphericFor } from '../../lib/placeholders';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';
import Polaroid from '../ui/Polaroid';
import Photo from '../ui/Photo';
import Lightbox from '../ui/Lightbox';

/**
 * PhotoGallery — hero photograph, polaroid collage, film strip,
 * scrapbook notes, and "My Favorite View Is You".
 */
export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* one flat list of every photo so the lightbox can walk through all of them */
  const allPhotos = useMemo(() => {
    const items = [];
    items.push({
      id: 'hero',
      image: gallery.hero.image,
      fallbackSrc: atmosphericFor(0),
      caption: gallery.hero.caption,
      note: gallery.hero.note,
    });
    gallery.collage.forEach((p, i) =>
      items.push({
        id: p.id,
        image: p.image,
        fallbackSrc: atmosphericFor(i + 1),
        caption: p.caption,
        date: p.date,
      })
    );
    gallery.filmStrip.forEach((p, i) =>
      items.push({
        id: p.id,
        image: p.image,
        fallbackSrc: atmosphericFor(i + 3),
        caption: p.caption,
      })
    );
    gallery.scrapbook.forEach((p, i) =>
      items.push({
        id: p.id,
        image: p.image,
        fallbackSrc: atmosphericFor(i + 5),
        caption: p.caption,
        date: p.date,
      })
    );
    items.push({
      id: 'favorite',
      image: gallery.favorite.image,
      fallbackSrc: atmosphericFor(1),
      caption: gallery.favorite.caption,
      note: gallery.favorite.note,
    });
    return items;
  }, []);

  const openAt = (id) => {
    const idx = allPhotos.findIndex((p) => p.id === id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <SectionShell id="gallery" variant="blush" className="py-24 sm:py-32">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Chapter Three" title={gallery.title} subtitle={gallery.subtitle} />

        {/* ---------- HERO PHOTOGRAPH ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1 }}
          className="relative mx-auto mt-12 w-full max-w-4xl"
        >
          <button
            type="button"
            onClick={() => openAt('hero')}
            className="group block w-full cursor-zoom-in overflow-hidden rounded-[2px] shadow-[var(--shadow-lift)]"
            aria-label="Open hero photograph"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Photo
                src={gallery.hero.image}
                fallbackSrc={atmosphericFor(0)}
                alt={gallery.hero.caption}
                replaceLabel="Add our hero photo"
                eager
                className="h-full w-full"
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-[1.04]"
              />
              {/* cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/15" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-left sm:p-9">
                <p className="font-hand text-2xl leading-snug text-cream drop-shadow-sm sm:text-3xl">
                  {gallery.hero.caption}
                </p>
                <p className="mt-1.5 font-display text-sm italic text-cream/75">{gallery.hero.note}</p>
              </div>
            </div>
          </button>
          <div className="washi left-10 top-0 w-28 -translate-y-1/2 -rotate-3 bg-gold-soft" aria-hidden="true" />
          <div className="washi right-10 top-0 w-24 -translate-y-1/2 rotate-2 bg-blush" aria-hidden="true" />
        </motion.div>

        {/* ---------- POLAROID COLLAGE ---------- */}
        <h3 className="mt-20 text-center font-hand text-[1.7rem] text-burgundy">
          {gallery.collageTitle}
        </h3>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-7">
          {gallery.collage.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotation }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: (i % 3) * 0.12, ease: 'easeOut' }}
              className={i % 2 === 0 ? 'sm:mt-8' : ''}
            >
              <Polaroid
                src={p.image}
                fallbackSrc={atmosphericFor(i + 1)}
                alt={p.caption}
                caption={p.caption}
                date={p.date}
                rotation={0}
                replaceLabel="Add a photo"
                onClick={() => openAt(p.id)}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* ---------- FILM STRIP ---------- */}
        <h3 className="mt-20 text-center font-hand text-[1.7rem] text-burgundy">
          {gallery.filmStripTitle}
        </h3>
        <div className="film-strip mt-8 overflow-hidden rounded-sm py-3">
          <div className="film-sprockets h-[14px] opacity-80" aria-hidden="true" />
          <div className="flex gap-3 overflow-x-auto px-3 py-3 [scrollbar-width:thin]">
            {gallery.filmStrip.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => openAt(p.id)}
                aria-label={`Open film frame ${i + 1}`}
                className="group relative aspect-[3/2] w-[42vw] shrink-0 cursor-zoom-in overflow-hidden rounded-[1px] bg-ink/50 sm:w-[220px]"
              >
                <Photo
                  src={p.image}
                  fallbackSrc={atmosphericFor(i + 3)}
                  alt={p.caption}
                  replaceLabel="Add photo"
                  className="h-full w-full"
                  imgClassName="opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.05]"
                />
                <span className="absolute bottom-1.5 left-2 font-body text-[8px] uppercase tracking-[0.22em] text-cream/70">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
          <div className="film-sprockets h-[14px] opacity-80" aria-hidden="true" />
        </div>
        <p className="mt-3 text-center font-body text-[10px] tracking-[0.22em] text-cocoa-soft/70">
          drag to scroll the reel
        </p>

        {/* ---------- SCRAPBOOK ---------- */}
        <h3 className="mt-20 text-center font-hand text-[1.7rem] text-burgundy">
          {gallery.scrapbookTitle}
        </h3>
        <div className="mt-9 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
          {gallery.scrapbook.map((p, i) => {
            const tilt = i % 2 === 0 ? -1.2 : 1.4;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className={`relative ${i % 2 === 1 ? 'sm:mt-10' : ''}`}
              >
                <div
                  className="torn-edge relative bg-cream-soft p-4 shadow-[var(--shadow-polaroid)]"
                  style={{ transform: `rotate(${tilt}deg)` }}
                >
                  <div className="washi left-1/2 top-0 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] bg-gold-pale" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => openAt(p.id)}
                    className="block w-full cursor-zoom-in"
                    aria-label="Open scrapbook photo"
                  >
                    <Photo
                      src={p.image}
                      fallbackSrc={atmosphericFor(i + 5)}
                      alt={p.caption}
                      replaceLabel="Add a photo"
                      className="aspect-[4/3] w-full bg-cream-deep"
                      imgClassName="transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </button>
                  <p className="mt-4 font-hand text-[1.25rem] leading-snug text-ink">{p.caption}</p>
                  <p className="mt-1 font-body text-[9px] uppercase tracking-[0.22em] text-cocoa-soft">
                    {p.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---------- MY FAVORITE VIEW IS YOU ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1 }}
          className="relative mt-24"
        >
          <div
            className="absolute inset-x-6 -top-6 bottom-10 rounded-[2rem] bg-gradient-to-b from-cream-soft/70 to-transparent"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.32em] text-dusty-rose">
              the section I almost kept to myself
            </p>
            <h3 className="mt-4 text-balance font-display text-[2.2rem] leading-tight text-ink sm:text-[2.8rem]">
              {gallery.favorite.title}
            </h3>

            <div className="relative mx-auto mt-9 w-[min(84vw,340px)]">
              <Polaroid
                src={gallery.favorite.image}
                fallbackSrc={atmosphericFor(1)}
                alt={gallery.favorite.caption}
                caption={gallery.favorite.caption}
                annotation={gallery.favorite.annotation}
                rotation={-2}
                replaceLabel="Add favorite photo"
                onClick={() => openAt('favorite')}
                priority
                className="w-full"
                frameClassName="shadow-[var(--shadow-lift)]"
              />
            </div>

            <p className="mx-auto mt-8 max-w-md text-pretty font-display text-lg italic leading-relaxed text-cocoa">
              “{gallery.favorite.note}”
            </p>
          </div>
        </motion.div>
      </div>

      <Lightbox
        items={allPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </SectionShell>
  );
}
