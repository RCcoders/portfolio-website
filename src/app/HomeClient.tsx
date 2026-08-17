'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageTransition from '@/components/ui/PageTransition';
import { motion, useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '@/hooks/useInViewOnce';

/* ─── Tech stack (devicon CDN icons) ─── */
const TECH_STACK = [
  { name: 'Vue',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Prisma',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
  { name: 'Supabase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Bash',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  { name: 'Astro',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg' },
];

export default function HomeClient() {
  const reducedMotion = useReducedMotion();
  const tickerRef = useRef<HTMLDivElement>(null);
  const isTickerInView = useInViewOnce(tickerRef, "-80px");

  const techDouble = [...TECH_STACK, ...TECH_STACK];


  return (
    <PageTransition>
      {/* ══════════════════════════════════════════════════
          Hero — two-column split layout
      ══════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════
          Hero — new three-column layout with image
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-[#1a1a1a] pt-20 md:pt-0 pb-16 md:pb-0">
        {/* Background PORTFOLIO text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <motion.h1 
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[18vw] leading-none text-accent/[0.07] whitespace-nowrap select-none font-bold"
            style={{ fontFamily: 'var(--font-anton)' }}
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,1.2fr)_1fr] gap-8 lg:gap-12 items-center min-h-[70vh]">
          
          {/* Left Column */}
          <div className="flex flex-col items-start z-20 order-2 lg:order-1 mt-8 lg:mt-0">
            <motion.span 
              initial={reducedMotion ? false : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 font-mono uppercase mb-8 lg:mb-12"
            >
              AI Developer / Full-Stack Builder
            </motion.span>
            
            <motion.h2 
              initial={reducedMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl text-white/90 italic mb-2 md:mb-4" 
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Hello, I&apos;m
            </motion.h2>
            
            <div className="flex flex-col leading-[0.85] mb-8 uppercase select-none" style={{ fontFamily: 'var(--font-anton)' }}>
              <motion.span 
                initial={reducedMotion ? false : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
                className="text-white text-[16vw] lg:text-[7.5rem] xl:text-[9rem] tracking-tight"
              >
                RAGHAV
              </motion.span>
              <motion.span 
                initial={reducedMotion ? false : { opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                className="text-accent text-[16vw] lg:text-[7.5rem] xl:text-[9rem] tracking-tight"
              >
                CHAWLA
              </motion.span>
            </div>

            <motion.div 
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-10 lg:mb-16"
            >
              <p className="text-xs md:text-sm text-neutral-400 font-sans max-w-sm leading-relaxed">
                <span className="text-accent font-semibold tracking-wider text-[11px] mb-2 block uppercase">AI BUILDER & FULL-STACK DEVELOPER</span>
                I design and build intelligent, user-focused digital experiences that combine robust backends, creative frontends, and machine learning.
              </p>
            </motion.div>

            <motion.div 
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#222] bg-[#111]/80 backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]"></span>
                <span className="text-[10px] md:text-xs font-bold text-white tracking-wider uppercase">AVAILABLE WORLDWIDE</span>
              </div>
              <Link href="/projects" className="text-sm font-bold text-white hover:text-accent transition-colors flex items-center gap-2 group uppercase tracking-wider">
                See My Work <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Center Image */}
          <div className="relative h-[50vh] md:h-[65vh] lg:h-[80vh] flex items-center justify-center z-10 order-1 lg:order-2 w-full max-w-lg mx-auto">
            {/* Blending gradients for smooth integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-10 h-1/4 bottom-0 top-auto w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-transparent z-10 h-1/4 top-0 w-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent z-10 w-1/4 right-0 left-auto h-full"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-[#0d0d0d] via-transparent to-transparent z-10 w-1/4 left-0 h-full"></div>
            
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Subtle accent glow behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
              
              <Image 
                src="/images/raghav.jpg" 
                alt="Raghav Chawla"
                width={500}
                height={700}
                priority
                className="h-full w-auto max-w-full object-contain mix-blend-lighten filter contrast-[1.1] brightness-[0.9] saturate-[0.85] grayscale-[0.2]"
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right z-20 gap-12 lg:gap-16 order-3 w-full">
            <motion.div 
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-start lg:items-end gap-3 lg:gap-4 max-w-[280px]"
            >
              <div className="flex items-center gap-2 text-accent text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
                AVAILABLE FOR FREELANCE <span className="animate-pulse">✦</span>
              </div>
              <p className="text-xs md:text-sm text-neutral-400 leading-relaxed relative pl-6 lg:pl-0">
                 <span className="absolute left-0 top-1 text-accent text-lg leading-none lg:hidden">✦</span>
                 Turning complex data and automation ideas into high-fidelity, high-performance web products.
                 <span className="absolute -left-6 top-1 text-accent text-lg leading-none hidden lg:block">✦</span>
              </p>
            </motion.div>

            <motion.div 
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-6 w-full mt-auto"
            >
              {/* Stats */}
              <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6 w-full group">
                <span className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-widest uppercase group-hover:text-neutral-300 transition-colors">Years Experience</span>
                <div className="h-[1px] bg-neutral-800 flex-1 lg:min-w-[4rem] group-hover:bg-neutral-600 transition-colors"></div>
                <span className="text-accent text-4xl lg:text-5xl font-bold min-w-[3rem] text-right" style={{ fontFamily: 'var(--font-anton)' }}>1+</span>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6 w-full group">
                <span className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-widest uppercase group-hover:text-neutral-300 transition-colors">Projects Completed</span>
                <div className="h-[1px] bg-neutral-800 flex-1 lg:min-w-[4rem] group-hover:bg-neutral-600 transition-colors"></div>
                <span className="text-accent text-4xl lg:text-5xl font-bold min-w-[3rem] text-right" style={{ fontFamily: 'var(--font-anton)' }}>25+</span>
              </div>
              
              <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6 w-full group">
                <span className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-widest uppercase group-hover:text-neutral-300 transition-colors">Happy Clients</span>
                <div className="h-[1px] bg-neutral-800 flex-1 lg:min-w-[4rem] group-hover:bg-neutral-600 transition-colors"></div>
                <span className="text-accent text-4xl lg:text-5xl font-bold min-w-[3rem] text-right" style={{ fontFamily: 'var(--font-anton)' }}>10+</span>
              </div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Tech Stack Ticker
      ══════════════════════════════════════════════════ */}
      <motion.section
        ref={tickerRef}
        className="ticker-section"
        aria-label="Tech stack"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={isTickerInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="ticker-label-wrap">
          <span className="ticker-label">TECH STACK</span>
        </div>

        <div className="ticker-wrapper">
          <div className="ticker-track">
            {techDouble.map((tech, i) => (
              <motion.span
                key={`tech-${i}`}
                className="ticker-badge"
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="ticker-badge-icon"
                />
                <span className="ticker-badge-name">{tech.name}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        /* ── Styling stays exactly as it was ── */
        .hero-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 24px 80px;
          border-bottom: 1px solid #1a1a1a;
        }

        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: end;
        }

        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .hero-section {
            padding: 56px 24px 56px;
          }
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .hero-role {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.06em;
          color: #666;
          margin-bottom: 16px;
          display: block;
        }

        .hero-title {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 36px 0;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .hero-title {
            white-space: normal;
          }
        }

        .hero-title-accent {
          color: var(--accent);
        }

        .hero-socials {
          display: flex;
          flex-direction: row;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hero-social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          background: #111;
          border: 1px solid #222;
          border-radius: 8px;
          color: #888;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .hero-social-btn:hover {
          background: #1e1e1e;
          color: var(--accent);
          border-color: var(--accent);
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
          padding-bottom: 4px;
        }

        .hero-description {
          font-size: clamp(1rem, 1.4vw, 1.25rem);
          font-weight: 300;
          line-height: 1.7;
          color: #888;
          margin: 0;
          max-width: 520px;
        }

        .hero-description-accent {
          color: var(--accent);
          font-weight: 400;
        }

        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cta-primary {
          display: inline-block;
          padding: 12px 24px;
          background: var(--accent);
          color: var(--accent-text, #000);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid transparent;
          transition: opacity 0.15s ease;
        }

        .cta-primary:hover {
          opacity: 0.88;
        }

        .cta-secondary {
          display: inline-block;
          padding: 12px 24px;
          background: transparent;
          color: #fff;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid #2a2a2a;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .cta-secondary:hover {
          border-color: #fff;
        }

        .ticker-section {
          padding: 60px 0 60px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ticker-label-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .ticker-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #444;
        }

        .ticker-wrapper {
          overflow: hidden;
          width: 100%;
          height: 56px;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }

        .ticker-wrapper:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: ticker-left 25s linear infinite;
        }

        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-track :global(.ticker-badge) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          padding: 0 32px;
          cursor: default;
          background: transparent;
          border: none;
          white-space: nowrap;
        }

        .ticker-track :global(.ticker-badge):hover :global(.ticker-badge-name) {
          color: var(--accent);
        }

        .ticker-track :global(.ticker-badge):hover :global(.ticker-badge-icon) {
          filter: drop-shadow(0 0 6px var(--accent));
        }

        .ticker-track :global(.ticker-badge-icon) {
          width: 32px;
          height: 32px;
          object-fit: contain;
          flex-shrink: 0;
          transition: filter 150ms ease;
        }

        .ticker-track :global(.ticker-badge-name) {
          font-size: 16px;
          font-weight: 500;
          color: #cccccc;
          white-space: nowrap;
          transition: color 0.15s ease;
        }

        @media (max-width: 768px) {
          .ticker-track {
            touch-action: none;
          }
        }
      `}</style>
    </PageTransition>
  );
}
