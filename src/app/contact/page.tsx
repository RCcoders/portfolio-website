'use client';

import React from 'react';
import PageTransition from '@/components/ui/PageTransition';

export default function ContactPage() {
  const socialLinks = [
    { name: 'github', username: '@RCcoders', link: 'https://github.com/RCcoders' },
    { name: 'linkedin', username: 'Raghav Chawla', link: 'https://www.linkedin.com/in/raghav-chawla-29255b275/' },
    { name: 'instagram', username: '_nx.raghav._', link: 'https://instagram.com/_nx.raghav._' }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-16 md:gap-24 justify-center min-h-[70vh]">
        
        {/* Typographic Label */}
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            [inquiries / collaborations]
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0">
            CONNECT
          </h1>
        </div>

        {/* Large Email CTA */}
        <div className="border-t border-b border-neutral-900 py-12 md:py-20">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-6">
            [direct contact]
          </span>
          <a
            href="mailto:chawlaraghav78@gmail.com"
            className="text-4xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tighter uppercase text-white hover:text-accent transition-colors duration-150 leading-none break-all"
          >
            chawlaraghav78<br className="sm:hidden" />@gmail.com
          </a>
        </div>

        {/* Social Matrix */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            [networks & logs]
          </span>
          
          <div className="flex flex-col sm:flex-row gap-x-12 gap-y-4 font-mono text-sm uppercase tracking-wider">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-accent transition-colors duration-150 flex flex-col sm:flex-row sm:items-baseline gap-1"
              >
                <span className="text-white font-bold">{social.name}</span>
                <span className="text-neutral-600 text-xs">({social.username})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Status Line */}
        <div className="font-mono text-xs text-neutral-600 uppercase tracking-widest mt-8">
          [availability: open for freelance & software positions • based in india]
        </div>

      </div>
    </PageTransition>
  );
}