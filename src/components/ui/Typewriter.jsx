import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Typewriter — reveals text one character at a time, quietly.
 * Respects prefers-reduced-motion by showing the full text immediately.
 */
export default function Typewriter({
  text,
  speed = 46,
  startDelay = 400,
  className = '',
  cursorClassName = 'text-dusty-rose',
  as: Tag = 'span',
  onDone,
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      doneRef.current?.();
      return undefined;
    }
    setCount(0);
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          doneRef.current?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, reduce]);

  const done = count >= text.length;

  return (
    <Tag className={className} aria-label={text}>
      {text.slice(0, count)}
      {!done && (
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] animate-pulse bg-current ${cursorClassName}`}
        />
      )}
    </Tag>
  );
}
