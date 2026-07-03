'use client';

import React, { useEffect } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error silently in production or to logging service, console in dev
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unhandled system exception:', error);
    }
  }, [error]);

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col justify-center items-start max-w-7xl mx-auto px-6 py-16 md:py-24 gap-8">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            [error: 500 / system exception]
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter leading-none text-white select-none">
            FAULT DETECTED
          </h1>
        </div>
        <p className="text-lg text-neutral-400 font-light max-w-md leading-relaxed">
          An unexpected server-side execution fault occurred. The state has been preserved.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            [retry operation]
          </button>
          <Link
            href="/"
            className="px-6 py-3.5 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            [return to index]
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
