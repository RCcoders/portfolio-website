'use client';

import React, { useState, useEffect, useRef } from 'react';
import { api, Certificate } from '@/lib/api';
import { motion, useReducedMotion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import Carousel from '@/components/ui/Carousel';
import Link from 'next/link';
import { useCountUp } from '@/hooks/useCountUp';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function fadeUpProps(isActive: boolean, delay: number, reducedMotion: boolean = false) {
  if (!isActive) return {};
  if (reducedMotion) return { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 12 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.35, delay, ease: EASE },
  };
}

// ─── Certificate Card ─────────────────────────────────────────────────────────

interface CertCardProps {
  cert: Certificate;
  isActive: boolean;
}

function CertCard({ cert, isActive }: CertCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      style={{
        width: 'clamp(280px, 480px, 88vw)',
        background: '#111111',
        border: '1px solid',
        borderColor: isActive ? 'var(--accent)' : '#1a1a1a',
        boxShadow: isActive
          ? '0 0 0 1px var(--accent), 0 32px 80px rgba(0,0,0,0.6)'
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={reducedMotion ? false : { scale: 0.95, opacity: 0.6 }}
      animate={isActive ? { scale: 1.0, opacity: 1 } : { scale: 0.95, opacity: 0.6 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 28 }
      }
    >
      {/* Header strip */}
      <div
        style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid #1a1a1a',
          background: isActive
            ? 'linear-gradient(135deg, #141414 0%, #111 100%)'
            : 'transparent',
          transition: 'background 0.4s ease',
        }}
      >
        <motion.span
          key={isActive ? 'issuer-active' : 'issuer-idle'}
          {...fadeUpProps(isActive, 0, reducedMotion ?? false)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.2em',
            color: '#555',
            display: 'block',
            marginBottom: 8,
          }}
        >
          {cert.issuer}
        </motion.span>
        <motion.h3
          key={isActive ? 'title-active' : 'title-idle'}
          {...fadeUpProps(isActive, 0.08, reducedMotion ?? false)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase' as const,
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {cert.title}
        </motion.h3>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 28px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Date + level */}
        <motion.div
          key={isActive ? 'meta-active' : 'meta-idle'}
          {...fadeUpProps(isActive, 0.16, reducedMotion ?? false)}
          style={{
            display: 'flex',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.15em',
            color: '#444',
          }}
        >
          <span>{cert.date}</span>
          {cert.level && (
            <>
              <span>·</span>
              <span style={{ color: 'var(--accent)' }}>{cert.level}</span>
            </>
          )}
          {cert.duration && (
            <>
              <span>·</span>
              <span>{cert.duration}</span>
            </>
          )}
        </motion.div>

        {/* Description */}
        {cert.description && (
          <motion.p
            key={isActive ? 'desc-active' : 'desc-idle'}
            {...fadeUpProps(isActive, 0.24, reducedMotion ?? false)}
            style={{
              color: '#888',
              fontSize: '0.8rem',
              fontWeight: 300,
              lineHeight: 1.65,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {cert.description}
          </motion.p>
        )}

        {/* Skills pills */}
        {cert.skills && cert.skills.length > 0 && (
          <motion.div
            key={isActive ? 'skills-active' : 'skills-idle'}
            {...fadeUpProps(isActive, 0.32, reducedMotion ?? false)}
            style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}
          >
            {cert.skills.slice(0, 5).map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#555',
                  border: '1px solid #222',
                  padding: '2px 8px',
                  background: '#0d0d0d',
                }}
              >
                {s}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer — actions */}
      <motion.div
        key={isActive ? 'actions-active' : 'actions-idle'}
        {...fadeUpProps(isActive, 0.4, reducedMotion ?? false)}
        style={{
          padding: '16px 28px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0 18px',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          pointerEvents: isActive ? 'auto' : 'none',
          opacity: isActive ? 1 : 0,
          borderTop: '1px solid #1a1a1a',
          marginTop: 16,
        }}
      >
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#aaa' }}
            className="hover:text-white transition-colors"
          >
            [verify]
          </a>
        )}
        <Link
          href={`/certifications/${cert.slug}`}
          style={{ color: 'var(--accent)', fontWeight: 700 }}
          className="hover:text-white transition-colors"
        >
          [details]
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertificationsClient() {
  const [certifications, setCertifications] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInViewOnce(statsRef, "-80px");

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await api.getCertificates();
      setCertifications(data);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch certificates:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertificate = (c: Certificate) => setCertifications((prev) => [...prev, c]);
  const handleUpdateCertificate = (c: Certificate) =>
    setCertifications((prev) => prev.map((x) => (x.id === c.id ? c : x)));

  const totalCerts = certifications.length;
  const uniqueProviders = new Set(certifications.map((c) => c.issuer)).size;
  const validYears = certifications
    .map((c) => new Date(c.date).getFullYear())
    .filter((y) => !isNaN(y));
  const latestYear = validYears.length > 0 ? Math.max(...validYears) : new Date().getFullYear();

  // Count up animation triggers
  const animatedTotalCerts = useCountUp(totalCerts, 1000, statsInView, reducedMotion ?? false);
  const animatedUniqueProviders = useCountUp(uniqueProviders, 1000, statsInView, reducedMotion ?? false);
  const animatedLatestYear = useCountUp(latestYear, 1000, statsInView, reducedMotion ?? false);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">

        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              [credentials index]
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0" aria-label="CERTIFICATIONS">
              {reducedMotion ? (
                "CERTIFICATIONS"
              ) : (
                [... "CERTIFICATIONS"].map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.03, ease: 'easeOut' }}
                  >
                    {char}
                  </motion.span>
                ))
              )}
            </h1>
          </div>
        </div>

        {/* Modals — handled by Admin Panel, not here */}

        {/* Carousel */}
        {loading ? (
          <div className="text-left py-20 font-mono text-xs uppercase tracking-widest text-neutral-500">
            [fetching credential logs...]
          </div>
        ) : certifications.length === 0 ? (
          <div className="text-left py-16 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900">
            [no certificates found]
          </div>
        ) : (
          <div className="py-8">
            <Carousel
              items={certifications}
              renderCard={(cert, _index, isActive) => (
                <CertCard
                  key={cert.id || cert.slug}
                  cert={cert}
                  isActive={isActive}
                />
              )}
            />
          </div>
        )}

        {/* Stats footer */}
        <div
          ref={statsRef}
          className="border-t border-neutral-900 pt-8 mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest text-neutral-500"
        >
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="stats-block relative pl-4 py-1"
          >
            [total certifications: {animatedTotalCerts}]
            <span className="stats-border" />
          </motion.div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="stats-block relative pl-4 py-1"
          >
            [providers: {animatedUniqueProviders}]
            <span className="stats-border" />
          </motion.div>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="stats-block relative pl-4 py-1"
          >
            [latest achievement: {animatedLatestYear}]
            <span className="stats-border" />
          </motion.div>
        </div>

      </div>

      <style jsx>{`
        .stats-block {
          overflow: hidden;
        }
        .stats-border {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: translateY(-100%);
          transition: transform 0.2s ease;
        }
        .stats-block:hover .stats-border {
          transform: translateY(0);
        }
      `}</style>
    </PageTransition>
  );
}
