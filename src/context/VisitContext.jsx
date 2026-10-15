import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * VisitContext — quietly remembers which chapters she has wandered through.
 * It powers the locked hidden notes (they unlock as she explores) and the
 * navigation highlight. Stored only on this device.
 */
const VisitContext = createContext({
  visited: [],
  visitedCount: 0,
  active: null,
  visit: () => {},
  setActive: () => {},
  reset: () => {},
});

export function VisitProvider({ children }) {
  const [visited, setVisited] = useLocalStorage('shimu:visited-sections', []);
  const [active, setActive] = useState(null);

  const visit = useCallback(
    (id) => {
      setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setVisited]
  );

  const reset = useCallback(() => setVisited([]), [setVisited]);

  const value = useMemo(
    () => ({
      visited,
      visitedCount: visited.length,
      active,
      visit,
      setActive,
      reset,
    }),
    [visited, active, visit, reset]
  );

  return <VisitContext.Provider value={value}>{children}</VisitContext.Provider>;
}

export function useVisit() {
  return useContext(VisitContext);
}
