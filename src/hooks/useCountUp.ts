import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Starts when `trigger` becomes true. Respects reduced-motion callers
 * by accepting an optional `instant` flag — when true, returns target immediately.
 */
export function useCountUp(
  target: number,
  duration: number = 1000,
  trigger: boolean = true,
  instant: boolean = false
): number {
  const [value, setValue] = useState(instant ? target : 0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    if (instant) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const startValue = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, trigger, instant]);

  return value;
}
