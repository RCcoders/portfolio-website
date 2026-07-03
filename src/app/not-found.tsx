import React from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col justify-center items-start max-w-7xl mx-auto px-6 py-16 md:py-24 gap-8">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            [error: 404 / registry exception]
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter leading-none text-white select-none">
            NOT FOUND
          </h1>
        </div>
        <p className="text-lg text-neutral-400 font-light max-w-md leading-relaxed">
          The resources you are attempting to fetch or access do not exist in this archive log.
        </p>
        <div>
          <Link
            href="/"
            className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            [return to index]
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
