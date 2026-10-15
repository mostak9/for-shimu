import { useEffect, useRef, useState } from 'react';
import { ImageOff, Camera } from 'lucide-react';
import { expectedPathLabel } from '../../lib/placeholders';

/**
 * Photo — one place that handles every image on the site.
 *
 * - lazy-loads and fades in when ready
 * - if the file is missing, falls back to `fallbackSrc` (an atmospheric image)
 *   with a quiet "add your photo" tag, or an elegant paper frame with the
 *   expected path so you always know where to drop your picture in.
 */
export default function Photo({
  src,
  alt = '',
  fallbackSrc,
  className = '',
  imgClassName = '',
  style,
  /* shown on the fallback tag */
  replaceLabel = 'Add your photo',
  /* object-fit: cover for framed slots, contain when the full photo matters */
  fit = 'cover',
  eager = false,
}) {
  const [mode, setMode] = useState(src ? 'loading' : 'missing');
  const imgRef = useRef(null);

  useEffect(() => {
    setMode(src ? 'loading' : 'missing');
  }, [src]);

  /* If the browser cached the image before React mounted */
  useEffect(() => {
    const el = imgRef.current;
    if (!src || !el) return;
    if (el.complete) {
      if (el.naturalWidth === 0) setMode(fallbackSrc ? 'fallback' : 'missing');
      else setMode((m) => (m === 'fallback' ? m : 'ok'));
    }
  }, [src, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {mode !== 'missing' && (
        <img
          ref={imgRef}
          src={mode === 'fallback' ? fallbackSrc : src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
          onLoad={() => setMode((m) => (m === 'fallback' ? m : 'ok'))}
          onError={() => setMode(fallbackSrc ? 'fallback' : 'missing')}
          className={`h-full w-full transition-opacity duration-700 ${
            mode === 'loading' ? 'opacity-0' : 'opacity-100'
          } ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
        />
      )}

      {mode === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blush-soft via-cream-deep to-parchment" />
      )}

      {mode === 'fallback' && (
        <div className="absolute bottom-2 left-2 z-10 rounded-full bg-ink/70 px-2.5 py-1 font-body text-[10px] font-medium tracking-wide text-cream-soft backdrop-blur-sm">
          {replaceLabel}
        </div>
      )}

      {mode === 'missing' && (
        <div className="paper absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-dusty-rose/40 bg-cream-soft/80 text-dusty-rose">
            <Camera size={18} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <p className="font-hand text-lg leading-tight text-cocoa">{replaceLabel}</p>
          <p className="max-w-[92%] font-body text-[10px] leading-relaxed tracking-wide text-cocoa-soft/80">
            <span className="inline-flex items-center gap-1">
              <ImageOff size={10} aria-hidden="true" />
              drop it in
            </span>{' '}
            <code className="rounded bg-cream-deep/80 px-1 py-0.5 text-[9px] text-burgundy">
              {expectedPathLabel(src)}
            </code>
          </p>
        </div>
      )}
    </div>
  );
}
