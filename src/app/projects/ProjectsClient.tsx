'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { api, Project } from '@/lib/api';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import Carousel from '@/components/ui/Carousel';
import Image from 'next/image';

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

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
}

function ProjectCard({ project, index, isActive }: ProjectCardProps) {
  const [projectImage, setProjectImage] = useState(project.image);
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (project.id) {
      const saved = localStorage.getItem(`project-image-${project.id}`);
      if (saved) { setProjectImage(saved); setImgError(false); }
    }
  }, [project.id]);

  useEffect(() => { setImgError(false); }, [projectImage]);

  useEffect(() => {
    if (!isActive) setIsExpanded(false);
  }, [isActive]);

  // Escape key handler
  useEffect(() => {
    if (!isExpanded) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isExpanded]);

  // Body scroll lock when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 800;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setProjectImage(compressed);
        if (project.id) {
          try {
            localStorage.setItem(`project-image-${project.id}`, compressed);
          } catch {
            console.warn('localStorage quota exceeded; project image will not persist.');
          }
        }
      };
      img.src = b64;
    };
    reader.readAsDataURL(file);
  };

  const isBase64 = projectImage?.startsWith('data:');
  const padded = String(index + 1).padStart(2, '0');
  const hasRealImage = !!projectImage && !imgError;

  return (
    <>
      <motion.div
        style={{
          width: 'clamp(300px, 560px, 88vw)',
          background: '#111111',
          border: '1px solid',
          borderColor: isActive ? 'var(--accent)' : '#1a1a1a',
          boxShadow: isActive
            ? '0 0 0 1px var(--accent), 0 32px 80px rgba(0,0,0,0.6)'
            : '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.3s ease, filter 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          opacity: isExpanded ? 0.3 : (isActive ? 1 : 0.6),
          pointerEvents: isExpanded ? 'none' : 'auto',
          filter: isExpanded ? 'blur(2px)' : 'none',
        }}
        initial={reducedMotion ? false : { scale: 0.95, opacity: 0.6 }}
        animate={isActive ? { scale: 1.0, opacity: isExpanded ? 0.3 : 1 } : { scale: 0.95, opacity: 0.6 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 260, damping: 28 }
        }
      >
        {/* Image area */}
        <div
          style={{
            height: 200,
            position: 'relative',
            background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
          className="group/img"
        >
          {hasRealImage ? (
            <Image
              src={projectImage!}
              alt={`${project.title} project image`}
              fill
              sizes="560px"
              loading="lazy"
              unoptimized={!isBase64}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              onError={() => setImgError(true)}
            />
          ) : null}

          {!hasRealImage && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '5rem',
                fontWeight: 800,
                color: '#222',
                letterSpacing: '-0.04em',
                userSelect: 'none',
              }}
            >
              {padded}
            </div>
          )}

          {isActive && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.82)' }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest text-white px-4 py-2 hover:text-black transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = '#000';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                }}
              >
                [upload photo]
              </span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Content area */}
        <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {/* Top row */}
          <motion.div
            key={isActive ? 'active-meta' : 'idle-meta'}
            {...fadeUpProps(isActive, 0, reducedMotion ?? false)}
            className="flex items-center gap-3 flex-wrap"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666' }}
          >
            <span>{project.category.replace(/-/g, ' ')}</span>
            <span>•</span>
            <span style={{ color: 'var(--accent)' }}>{project.status}</span>
            {project.date && (
              <>
                <span>•</span>
                <span>{new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            key={isActive ? 'active-title' : 'idle-title'}
            {...fadeUpProps(isActive, 0.08, reducedMotion ?? false)}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#fff',
              margin: 0,
              lineHeight: 1,
            }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            key={isActive ? 'active-desc' : 'idle-desc'}
            {...fadeUpProps(isActive, 0.16, reducedMotion ?? false)}
            style={{
              color: '#888',
              fontSize: '0.8rem',
              fontWeight: 300,
              lineHeight: 1.65,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            key={isActive ? 'active-tags' : 'idle-tags'}
            {...fadeUpProps(isActive, 0.24, reducedMotion ?? false)}
            style={{ display: 'flex', gap: 6, flexWrap: 'wrap', overflowX: 'auto' }}
          >
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#555',
                  border: '1px solid #222',
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                  background: '#0d0d0d',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            key={isActive ? 'active-actions' : 'idle-actions'}
            {...fadeUpProps(isActive, 0.32, reducedMotion ?? false)}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0 20px',
              marginTop: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              pointerEvents: isActive ? 'auto' : 'none',
              opacity: isActive ? 1 : 0,
            }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#aaa' }}
                className="hover:text-white transition-colors"
              >
                [codebase]
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#aaa' }}
                className="hover:text-white transition-colors"
              >
                [live demo]
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((v) => !v);
              }}
              style={{ color: 'var(--accent)', fontWeight: 700 }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isExpanded ? '[show less ▲]' : '[show details ▼]'}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Full-screen Portal Overlay */}
      {isExpanded && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div key="project-portal">
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
                onClick={() => setIsExpanded(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 999,
                  background: 'rgba(0, 0, 0, 0.92)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              />

              {/* Expanded Card Panel */}
              <motion.div
                key="panel"
                initial={reducedMotion ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
                transition={
                  reducedMotion
                    ? { duration: 0.2 }
                    : { type: 'spring', stiffness: 280, damping: 28 }
                }
                style={{
                  position: 'fixed',
                  top: 'clamp(16px, 40px, 5vh)',
                  left: 'clamp(16px, 40px, 5vw)',
                  right: 'clamp(16px, 40px, 5vw)',
                  bottom: 'clamp(16px, 40px, 5vh)',
                  zIndex: 1000,
                  background: '#111111',
                  border: '1px solid var(--accent)',
                  boxShadow: '0 0 0 2px var(--accent), 0 40px 120px rgba(0,0,0,0.95)',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Close Button (×) */}
                <button
                  onClick={() => setIsExpanded(false)}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    zIndex: 20,
                    color: '#555',
                    fontSize: 24,
                    lineHeight: 1,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555555')}
                  aria-label="Close project modal"
                >
                  ×
                </button>

                {/* Top Section — Image (260px fixed height) */}
                <div
                  style={{
                    height: 260,
                    position: 'relative',
                    background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {hasRealImage ? (
                    <Image
                      src={projectImage!}
                      alt={`${project.title} project image`}
                      fill
                      sizes="100vw"
                      loading="eager"
                      priority
                      unoptimized={!isBase64}
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center font-mono text-7xl font-extrabold text-[#222] select-none"
                    >
                      {padded}
                    </div>
                  )}

                  {/* Gradient blend overlay at bottom of image */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background: 'linear-gradient(to bottom, transparent 60%, #111111 100%)',
                    }}
                  />

                  {/* Top action links on image */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 20,
                      zIndex: 10,
                      display: 'flex',
                      gap: 8,
                    }}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'rgba(0,0,0,0.8)',
                          border: '1px solid #333',
                          padding: '6px 14px',
                          borderRadius: 4,
                          color: '#fff',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#333';
                          (e.currentTarget as HTMLElement).style.color = '#fff';
                        }}
                      >
                        [codebase]
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'rgba(0,0,0,0.8)',
                          border: '1px solid #333',
                          padding: '6px 14px',
                          borderRadius: 4,
                          color: '#fff',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#333';
                          (e.currentTarget as HTMLElement).style.color = '#fff';
                        }}
                      >
                        [live demo]
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Section — Scrollable Content */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '28px 32px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                  className="project-modal-scroll"
                >
                  {/* Meta row */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#666',
                      display: 'flex',
                      gap: 12,
                      alignItems: 'center',
                    }}
                  >
                    <span>{project.category.replace(/-/g, ' ')}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--accent)' }}>{project.status}</span>
                    {project.date && (
                      <>
                        <span>•</span>
                        <span>{new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                      </>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.21, duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      margin: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title}
                  </motion.h2>

                  {/* Description & Long Description */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.27, duration: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                  >
                    <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                      {project.description}
                    </p>
                    {project.longDescription && (
                      <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                        {project.longDescription}
                      </p>
                    )}
                  </motion.div>

                  {/* Tags (uncapped full list) */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.33, duration: 0.3 }}
                    style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#aaa',
                          border: '1px solid #222',
                          padding: '4px 10px',
                          background: '#0d0d0d',
                          borderRadius: 4,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Features Block */}
                  {project.features && project.features.length > 0 && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.39, duration: 0.3 }}
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid #1a1a1a',
                        padding: '20px',
                        borderRadius: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          display: 'block',
                          marginBottom: 10,
                          fontWeight: 700,
                        }}
                      >
                        [features]
                      </span>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {project.features.map((f, i) => (
                          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ccc' }}>
                            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>▪</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Tech Stack Block */}
                  {project.technologies && Object.keys(project.technologies).length > 0 && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                      style={{
                        background: '#0a0a0a',
                        border: '1px solid #1a1a1a',
                        padding: '20px',
                        borderRadius: 6,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 9,
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          display: 'block',
                          marginBottom: 12,
                          fontWeight: 700,
                        }}
                      >
                        [tech stack]
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {Object.entries(project.technologies).map(([group, items]) => (
                          <div key={group}>
                            <span style={{ color: '#555', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                              {group}
                            </span>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                              {items.map((item) => (
                                <span key={item} style={{ background: '#111', border: '1px solid #222', color: '#ccc', fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', borderRadius: 3 }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Metrics Grid */}
                  {project.metrics && Object.keys(project.metrics).length > 0 && (
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.51, duration: 0.3 }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: 12,
                      }}
                    >
                      {Object.entries(project.metrics).map(([k, v]) => (
                        <div key={k} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '14px', borderRadius: 6 }}>
                          <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 800 }}>{v as string}</div>
                          <div style={{ color: '#555', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{k}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Bottom Action Row */}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.57, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 20,
                      paddingTop: 16,
                      borderTop: '1px solid #1a1a1a',
                      marginTop: 8,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#aaa' }}
                        className="hover:text-white transition-colors"
                      >
                        [codebase]
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#aaa' }}
                        className="hover:text-white transition-colors"
                      >
                        [live demo]
                      </a>
                    )}
                    <button
                      onClick={() => setIsExpanded(false)}
                      style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: 'auto' }}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      [show less ▲]
                    </button>
                  </motion.div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch projects:', error);
      }
    } finally {
      setLoading(false);
    }
  };



  const categories: Category[] = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'machine-learning', name: 'Machine Learning', count: projects.filter((p) => p.category === 'machine-learning').length },
    { id: 'python-development', name: 'Python Model', count: projects.filter((p) => p.category === 'python-development').length },
    { id: 'web-development', name: 'Development', count: projects.filter((p) => p.category === 'web-development').length },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col gap-6">

        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              [project catalog]
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0" aria-label="PROJECTS">
              {reducedMotion ? (
                "PROJECTS"
              ) : (
                [... "PROJECTS"].map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                  >
                    {char}
                  </motion.span>
                ))
              )}
            </h1>
          </div>
        </div>

        {/* Modals — handled by Admin Panel, not here */}

        {/* Filters and Search */}
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="SEARCH PROJECT / TECH / TAG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 text-white font-mono text-xs uppercase py-3 outline-none focus:border-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${activeFilter === cat.id ? 'text-accent font-bold' : 'hover:text-white'}`}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                whileHover={{ color: 'var(--accent)' }}
              >
                {cat.name.toLowerCase()} ({cat.count})
                {activeFilter === cat.id && (
                  <motion.span
                    layoutId="active-tab"
                    style={{
                      position: 'absolute',
                      bottom: -6,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--accent)',
                    }}
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="text-left py-20 font-mono text-xs uppercase tracking-widest text-neutral-500">
            [fetching project logs...]
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-left py-16 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900">
            [no project entries match: &quot;{searchTerm}&quot;]
          </div>
        ) : (
          <div className="py-2">
            <Carousel
              items={filteredProjects}
              renderCard={(project, index, isActive) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  isActive={isActive}
                />
              )}
            />
          </div>
        )}

      </div>
    </PageTransition>
  );
}
