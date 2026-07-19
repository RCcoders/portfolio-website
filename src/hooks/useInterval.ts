import { useEffect, useRef } from 'react';

/**
 * Calls `callback` every `delay` ms.
 * Set `enabled` to false to pause without unmounting.
 * Cleaned up automatically on unmount.
 */
export function useInterval(
  callback: () => void,
  delay: number,
  enabled: boolean = true
): void {
  const savedCallback = useRef(callback);

  // Keep ref current so the interval closure always sees the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay, enabled]);
}
