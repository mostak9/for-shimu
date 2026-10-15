import Photo from './Photo';

/**
 * Polaroid — a softly rotated photo frame with a handwritten caption,
 * the way a real scrapbook photo would sit on a page.
 */
export default function Polaroid({
  src,
  fallbackSrc,
  alt = '',
  caption,
  date,
  annotation,
  rotation = 0,
  className = '',
  frameClassName = '',
  onClick,
  replaceLabel,
  priority = false,
}) {
  const interactive = typeof onClick === 'function';

  return (
    <figure
      className={`group relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={caption ? `Open photo: ${caption}` : 'Open photo'}
          className={`block w-full cursor-zoom-in rounded-[3px] bg-cream-soft p-2 pb-0 text-left shadow-[var(--shadow-polaroid)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] sm:p-3 sm:pb-0 ${frameClassName}`}
        >
          <PolaroidBody
            src={src}
            fallbackSrc={fallbackSrc}
            alt={alt}
            caption={caption}
            date={date}
            annotation={annotation}
            replaceLabel={replaceLabel}
            priority={priority}
          />
        </button>
      ) : (
        <div
          className={`rounded-[3px] bg-cream-soft p-2 pb-0 shadow-[var(--shadow-polaroid)] sm:p-3 sm:pb-0 ${frameClassName}`}
        >
          <PolaroidBody
            src={src}
            fallbackSrc={fallbackSrc}
            alt={alt}
            caption={caption}
            date={date}
            annotation={annotation}
            replaceLabel={replaceLabel}
            priority={priority}
          />
        </div>
      )}
    </figure>
  );
}

function PolaroidBody({
  src,
  fallbackSrc,
  alt,
  caption,
  date,
  annotation,
  replaceLabel,
  priority,
}) {
  return (
    <>
      <Photo
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt || caption || 'A memory'}
        replaceLabel={replaceLabel}
        eager={priority}
        className="aspect-[4/5] w-full bg-cream-deep"
        imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <figcaption className="min-h-[4.5rem] px-1.5 pb-3 pt-3 sm:min-h-[5rem]">
        {caption && (
          <p className="font-hand text-[1.05rem] leading-snug text-ink sm:text-[1.15rem]">
            {caption}
          </p>
        )}
        {date && (
          <p className="mt-1 font-body text-[10px] uppercase tracking-[0.18em] text-cocoa-soft">
            {date}
          </p>
        )}
        {annotation && (
          <p className="mt-1.5 -rotate-1 font-hand text-sm text-dusty-rose">{annotation}</p>
        )}
      </figcaption>
    </>
  );
}
