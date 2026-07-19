'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import { motion, useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '@/hooks/useInViewOnce';

/* ─── Social links (same source as footer / contact page) ─── */
const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/RCcoders',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raghav-chawla-29255b275/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
        <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-8.5 7H9v7h1.5v-7zm.25-2.25a.875.875 0 1 0-1.75 0 .875.875 0 0 0 1.75 0zM18 17v-4c0-1.657-1.343-3-3-3-.826 0-1.573.336-2 1V10h-1.5v7H13v-3.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5V17H18z" />
      </svg>
    ),
  },
  {
    label: 'Gmail',
    href: 'mailto:chawlaraghav78@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.236-8 5.334-8-5.334V6l8 5.333L20 6v2.236z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/_nx.raghav._',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/raghavchawla',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

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

  // Letter animations for headings
  const splitLetters = (text: string) => {
    return [...text].map((char, index) => (
      <span
        key={index}
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <PageTransition>
      {/* ══════════════════════════════════════════════════
          Hero — two-column split layout
      ══════════════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-inner">

          {/* ── LEFT column ── */}
          <div className="hero-left">
            <motion.span
              className="hero-role"
              initial={reducedMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Hi, I&apos;m Raghav Chawla
            </motion.span>

            <h1 className="hero-title" aria-label="Full Stack Developer">
              <motion.span
                style={{ display: 'block' }}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {reducedMotion ? (
                  splitLetters("Full Stack")
                ) : (
                  [... "Full Stack"].map((char, i) => (
                    <motion.span
                      key={i}
                      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.2 + i * 0.03, ease: 'easeOut' }}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
              </motion.span>

              <motion.span
                style={{ display: 'block' }}
                className="hero-title-accent"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + "Full Stack".length * 0.03 + 0.2 }}
              >
                {reducedMotion ? (
                  splitLetters("Developer")
                ) : (
                  [... "Developer"].map((char, i) => (
                    <motion.span
                      key={i}
                      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.2 + "Full Stack".length * 0.03 + 0.2 + i * 0.03,
                        ease: 'easeOut'
                      }}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
              </motion.span>
            </h1>

            {/* Social icon buttons */}
            <div className="hero-socials" role="list" aria-label="Social links">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="hero-social-btn"
                  aria-label={social.label}
                  role="listitem"
                  initial={reducedMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={
                    reducedMotion
                      ? {}
                      : { type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + index * 0.06 }
                  }
                  whileHover={reducedMotion ? {} : { scale: 1.12 }}
                  whileTap={reducedMotion ? {} : { scale: 0.92 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── RIGHT column ── */}
          <div className="hero-right">
            <motion.p
              className="hero-description"
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
            >
              Chandigarh, India — Crafting high-performance digital products,
              predictive models, and clean{' '}
              <span className="hero-description-accent">APIs &amp; full-stack systems</span>
              {' '}with precise, deliberate engineering.
            </motion.p>

            <div className="hero-cta">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
              >
                <Link
                  href="/projects"
                  className="cta-primary"
                >
                  [view projects]
                </Link>
              </motion.div>
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
              >
                <Link
                  href="/contact"
                  className="cta-secondary"
                >
                  [contact me]
                </Link>
              </motion.div>
            </div>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  width={32}
                  height={32}
                  loading="lazy"
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
