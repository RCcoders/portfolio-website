import { useEffect, useState } from 'react';
import { useInView, UseInViewOptions } from 'framer-motion';

export function useInViewOnce(ref: React.RefObject<Element | null>, margin?: UseInViewOptions['margin']) {
  const isInView = useInView(ref, { once: true, margin });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasEntered(true);
    }
  }, [isInView]);

  return hasEntered;
}
