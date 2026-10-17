import { useCallback, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { site } from './config/content';
import { VisitProvider } from './context/VisitContext';
import { AudioProvider } from './context/AudioContext';
import GrainOverlay from './components/layout/GrainOverlay';
import Petals from './components/layout/Petals';
import Navigation from './components/layout/Navigation';
import OpeningScreen from './components/sections/OpeningScreen';
import BirthdayLetter from './components/sections/BirthdayLetter';
import MemoryLane from './components/sections/MemoryLane';
import PhotoGallery from './components/sections/PhotoGallery';
import PromisesSection from './components/sections/PromisesSection';
import CakeSection from './components/sections/CakeSection';
import HiddenNotes from './components/sections/HiddenNotes';
import TimeCapsule from './components/sections/TimeCapsule';
import MusicSection, { FloatingPlayer } from './components/sections/MusicSection';
import FinalScreen from './components/sections/FinalScreen';

/**
 * App — the whole little universe.
 *
 * Emotional arc:
 * Curiosity → Surprise → Nostalgia → Affection → Promises →
 * Celebration → Hope for the future
 */
function Experience() {
  const [phase, setPhase] = useState('intro'); /* intro → main */
  const [replayToken, setReplayToken] = useState(0);

  const enterMain = useCallback(() => {
    setPhase('main');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const replay = useCallback(() => {
    setPhase('intro');
    window.scrollTo({ top: 0, behavior: 'auto' });
    setReplayToken((t) => t + 1);
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-cream">
      <GrainOverlay />
      <Petals />

      <AnimatePresence mode="wait">
        {phase === 'intro' ? (
          <motion.div
            key={`intro-${replayToken}`}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: 'blur(8px)',
              transition: { duration: 1.05, ease: [0.65, 0, 0.35, 1] },
            }}
            className="relative z-30"
          >
            <OpeningScreen onComplete={enterMain} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navigation visible />
            <main className="relative">
              <BirthdayLetter />
              <MemoryLane />
              <PhotoGallery />
              <PromisesSection />
              <CakeSection />
              <HiddenNotes />
              <TimeCapsule />
              <MusicSection />
              <FinalScreen onReplay={replay} />
            </main>
            <FloatingPlayer />

            <footer className="relative bg-wine px-5 py-10 text-center">
              <p className="font-hand text-2xl text-blush">
                made for {site.herFullName} — with a great deal of love
              </p>
              <p className="mt-2 font-body text-[10px] tracking-[0.24em] text-cream/40">
                THIS LITTLE UNIVERSE WILL ALWAYS BELONG TO YOU
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <VisitProvider>
        <AudioProvider>
          <Experience />
        </AudioProvider>
      </VisitProvider>
    </MotionConfig>
  );
}
