import { useEffect, useState } from 'react';

/**
 * useLocalStorage — persists a JSON value in the browser.
 * Used for drafts, visitor progress, and unlocked notes. Never leaves the device.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage may be full or blocked — the site still works without it */
    }
  }, [key, value]);

  return [value, setValue];
}
