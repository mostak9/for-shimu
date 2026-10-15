import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Disc3, FileMusic, Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { song as songConfig } from '../../config/content';
import { useAudio } from '../../context/AudioContext';
import SectionShell from '../layout/SectionShell';
import SectionHeading from '../ui/SectionHeading';

const fmt = (s) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

/**
 * MusicSection — the optional song, and a quiet visualizer.
 * Audio never autoplays: it only ever starts when she presses play.
 */
export default function MusicSection() {
  return (
    <SectionShell id="music" variant="cream" className="py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,201,138,0.16),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Chapter Eight"
          title={songConfig.title}
          subtitle={songConfig.subtitle}
          annotation={songConfig.note}
        />
        <div className="mt-10">
          <PlayerCard />
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------- shared player ---------------- */
export function PlayerCard({ compact = false }) {
  const { isPlaying, isReady, error, progress, duration, volume, muted, toggle, seek, setVolume, toggleMute } =
    useAudio();
  const reduce = useReducedMotion();
  const trackRef = useRef(null);

  const ratio = duration > 0 ? progress / duration : 0;

  const onTrackClick = (e) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    seek((e.clientX - rect.left) / rect.width);
  };

  if (error) {
    return (
      <div className="rounded-[1.2rem] border border-dashed border-cocoa/25 bg-cream-soft/80 px-6 py-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush-soft text-dusty-rose">
          <FileMusic size={20} />
        </div>
        <p className="mt-4 font-display text-xl text-ink">{songConfig.missingTitle}</p>
        <p className="mx-auto mt-2 max-w-sm text-pretty font-body text-[12px] leading-relaxed text-cocoa">
          {songConfig.missingText}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] border border-dusty-rose/15 bg-cream-soft/90 shadow-[var(--shadow-lift)] ${
        compact ? 'px-4 py-3' : 'px-6 py-8 sm:px-10 sm:py-10'
      }`}
    >
      {!compact && (
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blush-soft/50 blur-2xl" aria-hidden="true" />
      )}

      {/* song name + disc */}
      <div className="relative z-10 flex items-center gap-4">
        <div className={`relative flex shrink-0 items-center justify-center ${compact ? 'h-11 w-11' : 'h-16 w-16'}`}>
          <motion.div
            animate={isPlaying && !reduce ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 12, repeat: isPlaying && !reduce ? Infinity : 0, ease: 'linear' }}
            className={`flex items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-dusty-rose text-cream shadow-lg ${
              compact ? 'h-11 w-11' : 'h-16 w-16'
            }`}
          >
            <Disc3 size={compact ? 18 : 26} />
          </motion.div>
        </div>

        <div className="min-w-0 flex-1">
          <p className={`truncate font-display ${compact ? 'text-base' : 'text-xl'} text-ink`}>
            {songConfig.songName}
          </p>
          {!compact && (
            <p className="mt-0.5 truncate font-body text-[11px] tracking-[0.14em] text-cocoa-soft">
              {songConfig.note}
            </p>
          )}
        </div>

        {/* play/pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause the song' : 'Play the song'}
          disabled={!isReady}
          className={`flex shrink-0 items-center justify-center rounded-full transition hover:scale-105 disabled:opacity-50 ${
            compact ? 'h-9 w-9' : 'h-14 w-14'
          } ${
            isPlaying
              ? 'bg-burgundy text-cream shadow-[0_0_24px_-6px_rgba(110,42,58,0.7)]'
              : 'bg-gradient-to-br from-dusty-rose to-burgundy text-cream shadow-[var(--shadow-glow-gold)]'
          }`}
        >
          {isPlaying ? <Pause size={compact ? 15 : 22} /> : <Play size={compact ? 15 : 22} className="ml-0.5" />}
        </button>
      </div>

      {/* progress */}
      <div className={`relative z-10 ${compact ? 'mt-2.5' : 'mt-6'}`}>
        <button
          ref={trackRef}
          type="button"
          onClick={onTrackClick}
          aria-label="Seek within the song"
          className={`group relative w-full cursor-pointer rounded-full bg-cream-deep/80 ${compact ? 'h-1.5' : 'h-2'}`}
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-dusty-rose to-gold transition-[width] duration-150"
            style={{ width: `${Math.min(100, ratio * 100)}%` }}
          />
          <span
            className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-burgundy shadow transition-opacity ${
              compact ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
            style={{ left: `calc(${Math.min(100, ratio * 100)}% - 6px)` }}
          />
        </button>
        <div className={`flex items-center justify-between ${compact ? 'mt-1' : 'mt-2'}`}>
          <span className="font-body text-[10px] tabular-nums tracking-[0.12em] text-cocoa-soft">
            {fmt(progress)}
          </span>

          {/* visualizer */}
          {!compact && <Visualizer active={isPlaying} />}
          {compact && isPlaying && !reduce && (
            <div className="flex h-3 items-end gap-[2px]" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-dusty-rose"
                  animate={{ height: [4, 11, 6, 12, 5] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            {!compact && (
              <span className="font-body text-[10px] tabular-nums tracking-[0.12em] text-cocoa-soft">
                {fmt(duration)}
              </span>
            )}
            {/* mute */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className={`flex items-center justify-center rounded-full text-cocoa transition hover:text-burgundy ${
                compact ? 'h-6 w-6' : 'h-8 w-8'
              }`}
            >
              {muted || volume === 0 ? <VolumeX size={compact ? 13 : 15} /> : <Volume2 size={compact ? 13 : 15} />}
            </button>
          </div>
        </div>

        {/* volume — desktop only */}
        {!compact && (
          <div className="mt-3 hidden items-center gap-2 sm:flex">
            <Music2 size={12} className="text-cocoa-soft" aria-hidden="true" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-40 cursor-pointer appearance-none rounded-full bg-cream-deep accent-dusty-rose"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- visualizer (decorative, restrained) ---------------- */
function Visualizer({ active }) {
  const reduce = useReducedMotion();
  const bars = 22;
  return (
    <div className="flex h-6 items-end gap-[3px] px-2" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-dusty-rose/70"
          initial={{ height: 3 }}
          animate={
            active && !reduce
              ? {
                  height: [3, 5 + ((i * 7) % 16), 4 + ((i * 5) % 10), 3],
                }
              : { height: 3 }
          }
          transition={{
            duration: 1 + ((i * 0.13) % 0.9),
            repeat: active && !reduce ? Infinity : 0,
            ease: 'easeInOut',
            delay: (i * 0.05) % 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- floating mini player ---------------- */
export function FloatingPlayer() {
  const { isPlaying, error, toggle } = useAudio();
  const reduce = useReducedMotion();

  if (error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="fixed bottom-5 right-4 z-[62] sm:bottom-7 sm:right-7"
    >
      <div className="flex items-center gap-2 rounded-full border border-cream-deep/60 bg-cream-soft/90 py-2 pl-2 pr-3 shadow-[var(--shadow-lift)] backdrop-blur-xl">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause our song' : 'Play our song'}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-cream transition hover:scale-105 ${
            isPlaying ? 'bg-burgundy' : 'bg-gradient-to-br from-dusty-rose to-burgundy'
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 pr-1 text-left"
          aria-label="Go to our song section"
        >
          <span className="hidden max-w-[110px] truncate font-hand text-base text-burgundy sm:block">
            {songConfig.songName}
          </span>
          {isPlaying && !reduce && (
            <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-dusty-rose"
                  animate={{ height: [3, 12, 5, 10, 4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}
