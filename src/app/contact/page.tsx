'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import { motion, useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function ContactPage() {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  // Scroll visibility markers
  const dividerRef = useRef<HTMLDivElement>(null);
  const isDividerInView = useInViewOnce(dividerRef, "-80px");

  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInViewOnce(contactRef, "-80px");

  const networksRef = useRef<HTMLDivElement>(null);
  const isNetworksInView = useInViewOnce(networksRef, "-80px");

  const availabilityRef = useRef<HTMLDivElement>(null);
  const isAvailabilityInView = useInViewOnce(availabilityRef, "-80px");

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInViewOnce(cardsContainerRef, "-80px");

  // Typewriter effect state
  const availabilityText = "AVAILABILITY: OPEN FOR FREELANCE & SOFTWARE POSITIONS > BASED IN INDIA";
  const [typedChars, setTypedChars] = useState(reducedMotion ? availabilityText.length : 0);
  const [typingComplete, setTypingComplete] = useState(!!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setTypedChars(availabilityText.length);
      setTypingComplete(true);
      return;
    }
    if (!isAvailabilityInView) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedChars(index);
      if (index >= availabilityText.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [isAvailabilityInView, reducedMotion]);

  const socialLinks = [
    { name: 'github', username: '@RCcoders', link: 'https://github.com/RCcoders' },
    { name: 'linkedin', username: 'Raghav Chawla', link: 'https://www.linkedin.com/in/raghav-chawla-29255b275/' },
    { name: 'instagram', username: '_nx.raghav._', link: 'https://instagram.com/_nx.raghav._' }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chawlaraghav78@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative min-h-[70vh]">
        
        {/* Large ambient drift background glow behind Left Column */}
        <div className="ambient-glow" aria-hidden="true" />

        {/* Two-column layout grid */}
        <div className="contact-grid">
          
          {/* LEFT COLUMN */}
          <div className="left-column">
            
            {/* Typographic Label */}
            <div>
              <motion.span
                className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4"
                initial={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                [inquiries / collaborations]
              </motion.span>
              <h1 className="text-connect font-extrabold tracking-tighter text-white m-0" aria-label="CONNECT">
                {reducedMotion ? (
                  "CONNECT"
                ) : (
                  [... "CONNECT"].map((char, i) => (
                    <motion.span
                      key={i}
                      style={{ display: 'inline-block' }}
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                    >
                      {char}
                    </motion.span>
                  ))
                )}
              </h1>
            </div>

            {/* Divider Line */}
            <div ref={dividerRef} className="relative py-6">
              <motion.div
                style={{
                  height: 1,
                  background: '#1a1a1a',
                  width: '100%',
                  originX: 0
                }}
                initial={reducedMotion ? undefined : { scaleX: 0 }}
                animate={isDividerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + 7 * 0.04 }}
              />
            </div>

            {/* Direct Contact Block */}
            <div ref={contactRef} className="contact-block">
              <motion.span
                className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4"
                initial={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                [direct contact]
              </motion.span>
              
              <div className="email-wrapper inline-block group/email">
                <motion.a
                  href="mailto:chawlaraghav78@gmail.com"
                  className="email-link text-white transition-colors duration-150 leading-none break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  initial={reducedMotion ? undefined : { opacity: 0, y: 40 }}
                  animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                  transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 25 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                >
                  chawlaraghav78@gmail.com
                  <span className="email-arrow"> →</span>
                </motion.a>
                {!reducedMotion && <span className="cursor-blink">|</span>}
              </div>

              {/* Email actions row */}
              <motion.div
                className="email-actions"
                initial={reducedMotion ? undefined : { opacity: 0 }}
                animate={isContactInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <button onClick={handleCopyEmail} className="action-btn">
                  {copied ? '[copied ✓]' : '[copy email]'}
                </button>
                <a href="mailto:chawlaraghav78@gmail.com" className="action-btn">
                  [open gmail]
                </a>
              </motion.div>
            </div>

            {/* Networks & Logs Block */}
            <div ref={networksRef} className="social-section">
              <motion.span
                className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-4"
                initial={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                animate={isNetworksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
              >
                [networks & logs]
              </motion.span>
              
              <div className="social-list">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-row group/row"
                    initial={reducedMotion ? undefined : { opacity: 0, x: -20 }}
                    animate={isNetworksInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  >
                    <span className="social-name">{social.name}</span>
                    <span className="social-username">({social.username})</span>
                    <span className="social-arrow-icon">→</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability typewriter line */}
            <div ref={availabilityRef} className="font-mono text-xs text-neutral-600 uppercase tracking-widest mt-10 min-h-[1.5em] relative z-10">
              <span style={{ visibility: typingComplete ? 'visible' : 'hidden', position: 'absolute' }}>
                {availabilityText}
              </span>
              <span>
                {availabilityText.slice(0, typedChars).split('').map((char, i) => {
                  const isArrow = char === '>';
                  return (
                    <span key={i} className={isArrow ? 'arrow-symbol' : ''}>
                      {char}
                    </span>
                  );
                })}
              </span>
              {!typingComplete && <span className="cursor-blink">|</span>}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div ref={cardsContainerRef} className="right-column">
            
            {/* Card 1 — Availability Status */}
            <motion.div
              className="info-card"
              initial={reducedMotion ? undefined : { opacity: 0, x: 40 }}
              animate={isCardsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0 }}
              whileHover={reducedMotion ? undefined : { y: -3, borderColor: '#2a2a2a' }}
            >
              <div className="card-header">
                <div className="status-indicator">
                  <span className="pulse-dot" />
                  <span className="status-label">AVAILABLE</span>
                </div>
                <span className="status-badge">[status: active]</span>
              </div>
              <div className="card-divider" />
              <p className="card-body">
                Open for freelance projects and full-time software roles
              </p>
              <div className="card-meta">
                <div>📍 Chandigarh, India</div>
                <div>🕐 GMT+5:30</div>
              </div>
            </motion.div>

            {/* Card 2 — Response Time */}
            <motion.div
              className="info-card"
              initial={reducedMotion ? undefined : { opacity: 0, x: 40 }}
              animate={isCardsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.12 }}
              whileHover={reducedMotion ? undefined : { y: -3, borderColor: '#2a2a2a' }}
            >
              <div className="card-header">
                <span className="status-label text-accent">⚡ RESPONSE TIME</span>
              </div>
              <div className="card-divider" />
              <p className="card-body">
                Usually within 24 hours for email inquiries
              </p>
              <p className="card-body mt-2">
                Faster via LinkedIn for quick questions
              </p>
            </motion.div>

            {/* Card 3 — Preferred Contact */}
            <motion.div
              className="info-card"
              initial={reducedMotion ? undefined : { opacity: 0, x: 40 }}
              animate={isCardsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.24 }}
              whileHover={reducedMotion ? undefined : { y: -3, borderColor: '#2a2a2a' }}
            >
              <div className="card-header">
                <span className="status-label text-accent">✉ PREFERRED CONTACT</span>
              </div>
              <div className="card-divider" />
              <p className="card-body">
                Email first for project inquiries and proposals
              </p>
              <p className="card-body mt-2">
                LinkedIn for professional networking and intros
              </p>
            </motion.div>

          </div>

        </div>

      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 55fr 45fr;
            gap: 80px;
          }
        }

        .left-column {
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .text-connect {
          font-size: clamp(4rem, 10vw, 8rem);
          line-height: 1.0;
          letter-spacing: -0.04em;
        }

        .contact-block {
          margin-bottom: 24px;
        }

        .email-wrapper {
          position: relative;
        }

        .email-link {
          font-size: clamp(1.8rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .email-link:hover {
          color: var(--accent);
        }

        .email-arrow {
          display: inline-block;
          transition: transform 0.2s ease, color 0.2s ease;
          color: #333;
        }

        .email-link:hover .email-arrow {
          transform: translateX(6px);
          color: var(--accent);
        }

        .email-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .action-btn {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          background: transparent;
          border: 1px solid #222;
          color: #888;
          padding: 6px 14px;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .action-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .social-section {
          margin-top: 32px;
        }

        .social-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid #111;
        }

        .social-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 8px;
          border-bottom: 1px solid #111;
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .social-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        .social-name {
          color: #fff;
          font-family: var(--font-mono, monospace);
          font-weight: bold;
          font-size: 13px;
          text-transform: uppercase;
          transition: color 0.15s ease;
        }

        .social-row:hover .social-name {
          color: var(--accent);
        }

        .social-username {
          color: #555;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          margin-left: auto;
          margin-right: 16px;
        }

        .social-arrow-icon {
          color: #333;
          font-family: var(--font-mono, monospace);
          font-size: 14px;
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .social-row:hover .social-arrow-icon {
          transform: translateX(4px);
          color: var(--accent);
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Ambient Glow Effect */
        .ambient-glow {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ambientDrift 8s ease-in-out infinite alternate;
        }

        @keyframes ambientDrift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -20px) scale(1.1); }
        }

        /* Info Card Styles */
        .info-card {
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          padding: 24px;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .info-card:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent);
          animation: statusPulse 2s infinite ease-in-out;
        }

        @keyframes statusPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }

        .status-label {
          color: var(--accent);
          font-family: var(--font-mono, monospace);
          font-weight: bold;
          font-size: 11px;
          text-transform: uppercase;
        }

        .status-badge {
          color: #333;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
        }

        .card-divider {
          height: 1px;
          background-color: #1a1a1a;
          margin: 16px 0;
        }

        .card-body {
          color: #888;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .card-meta {
          color: #555;
          font-size: 12px;
          font-family: var(--font-mono, monospace);
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }

        .cursor-blink {
          animation: blink 0.8s infinite;
          color: var(--accent);
          font-weight: 300;
          margin-left: 4px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .arrow-symbol {
          animation: flash 1s infinite alternate;
        }

        @keyframes flash {
          0% { color: inherit; }
          100% { color: var(--accent); }
        }
      `}</style>
    </PageTransition>
  );
}