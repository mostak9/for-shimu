import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { song as songConfig } from '../config/content';

/**
 * AudioContext — one shared audio element for the whole site.
 * The song NEVER autoplays. It only plays when she presses play.
 * If the file is missing, `error` is set and the UI explains where to add it.
 */
const AudioContext = createContext({
  isPlaying: false,
  isReady: false,
  error: false,
  progress: 0,
  duration: 0,
  volume: 0.8,
  muted: false,
  toggle: () => {},
  seek: () => {},
  setVolume: () => {},
  toggleMute: () => {},
});

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.8;
    audio.src = songConfig.src;
    audioRef.current = audio;

    const onReady = () => {
      setIsReady(true);
      setError(false);
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setProgress(audio.currentTime || 0);
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };
    const onErr = () => {
      setError(true);
      setIsReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onErr);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onErr);
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      /* browsers may block until a gesture — the button IS the gesture, so this is rare */
      setError(true);
    }
  }, [error]);

  const seek = useCallback((ratio) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = Math.max(0, Math.min(1, ratio)) * audio.duration;
  }, []);

  const setVolume = useCallback((v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0) setMuted(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      isReady,
      error,
      progress,
      duration,
      volume,
      muted,
      toggle,
      seek,
      setVolume,
      toggleMute,
    }),
    [isPlaying, isReady, error, progress, duration, volume, muted, toggle, seek, setVolume, toggleMute]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  return useContext(AudioContext);
}
