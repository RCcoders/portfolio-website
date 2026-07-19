'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.4, ease: 'easeOut' }
            }
        >
            {children}
        </motion.div>
    );
}
