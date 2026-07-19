'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInterval } from '@/hooks/useInterval';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CarouselProps<T> {
  items: T[];
  renderCard: (item: T, index: number, isActive: boolean) => React.ReactNode;
  className?: string;
  /** Auto-advance every `autoPlayInterval` ms. Default 4000. Pass 0 to disable. */
  autoPlayInterval?: number;
}

// ─── Offset transform table ────────────────────────────────────────────────────

function getTransform(offset: number) {
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

  if (abs === 0) {
    return { scale: 1.0, translateX: 0, translateZ: 0, opacity: 1, zIndex: 10, pointerEvents: 'auto' as const };
  }
  if (abs === 1) {
    return { scale: 0.82, translateX: sign * 320, translateZ: -120, opacity: 0.65, zIndex: 8, pointerEvents: 'none' as const };
  }
  if (abs === 2) {
    return { scale: 0.65, translateX: sign * 560, translateZ: -220, opacity: 0.35, zIndex: 6, pointerEvents: 'none' as const };
  }
  return { scale: 0.5, translateX: sign * 740, translateZ: -300, opacity: 0, zIndex: 4, pointerEvents: 'none' as const };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Carousel<T>({
  items,
  renderCard,
  className = '',
  autoPlayInterval = 4000,
}: CarouselProps<T>) {
  const reducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);

  // Arrow nudge state
  const [leftNudge, setLeftNudge] = useState(false);
  const [rightNudge, setRightNudge] = useState(false);

  // Auto-play control
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dragStartX = useRef<number>(0);
  const isDragging = useRef(false);

  const count = items.length;

  const goTo = useCallback(
    (index: number) => {
      setPrevActive(activeIndex);
      setActiveIndex(((index % count) + count) % count);
    },
    [activeIndex, count]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Pause auto-play manually, resume after 6 s
  const pauseManually = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 6000);
  }, []);

  // Cleanup resume timer on unmount
  useEffect(() => () => { if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current); }, []);

  // Auto-play via interval hook
  const autoPlayActive =
    autoPlayInterval > 0 && !isHovered && !isPaused && !reducedMotion && count > 1;
  useInterval(next, autoPlayInterval, autoPlayActive);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { next(); pauseManually(); }
      if (e.key === 'ArrowLeft') { prev(); pauseManually(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, pauseManually]);

  const pad = (n: number) => String(n + 1).padStart(2, '0');

  if (count === 0) return null;

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 80) { delta < 0 ? next() : prev(); pauseManually(); }
  };
  const handleTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(delta) > 80) { delta < 0 ? next() : prev(); pauseManually(); }
  };

  // ── Arrow nudge helpers ───────────────────────────────────────────────────
  const handlePrevClick = () => {
    prev();
    pauseManually();
    if (!reducedMotion) {
      setLeftNudge(true);
      setTimeout(() => setLeftNudge(false), 200);
    }
  };
  const handleNextClick = () => {
    next();
    pauseManually();
    if (!reducedMotion) {
      setRightNudge(true);
      setTimeout(() => setRightNudge(false), 200);
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-8 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Counter */}
      <motion.div
        className="w-full flex justify-end pr-2"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {pad(activeIndex)} / {pad(count - 1)}
        </span>
      </motion.div>

      {/* Stage */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          height: 'clamp(380px, 50vw, 500px)',
          overflow: 'visible',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards */}
        <div style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}>
          {items.map((item, i) => {
            let offset = i - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const t = getTransform(offset);
            const isActive = offset === 0;
            const isClickableSide = Math.abs(offset) === 1;

            return (
              <motion.div
                key={i}
                animate={{ scale: t.scale, x: t.translateX, z: t.translateZ, opacity: t.opacity }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : isActive && prevActive !== null
                    ? { type: 'spring', stiffness: 260, damping: 28 }
                    : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                }
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  translateY: '-50%',
                  translateX: '-50%',
                  zIndex: t.zIndex,
                  pointerEvents: t.pointerEvents,
                  cursor: isClickableSide ? 'pointer' : 'default',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  if (isClickableSide && !isDragging.current) {
                    goTo(i);
                    pauseManually();
                  }
                }}
                whileTap={isClickableSide && !reducedMotion ? { scale: t.scale * 0.97 } : undefined}
              >
                {renderCard(item, i, isActive)}
              </motion.div>
            );
          })}
        </div>

        {/* Left Arrow */}
        {count > 1 && (
          <motion.button
            onClick={handlePrevClick}
            whileHover={reducedMotion ? {} : { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={reducedMotion ? {} : { scale: 0.92 }}
            animate={reducedMotion ? {} : { x: leftNudge ? -4 : 0 }}
            transition={{ duration: 0.15 }}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: 'clamp(4px, 2vw, 24px)',
              top: '50%',
              translateY: '-50%',
              zIndex: 20,
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ChevronLeft />
          </motion.button>
        )}

        {/* Right Arrow */}
        {count > 1 && (
          <motion.button
            onClick={handleNextClick}
            whileHover={reducedMotion ? {} : { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={reducedMotion ? {} : { scale: 0.92 }}
            animate={reducedMotion ? {} : { x: rightNudge ? 4 : 0 }}
            transition={{ duration: 0.15 }}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: 'clamp(4px, 2vw, 24px)',
              top: '50%',
              translateY: '-50%',
              zIndex: 20,
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <ChevronRight />
          </motion.button>
        )}
      </div>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="flex items-center gap-2" style={{ height: 12 }}>
          {items.map((_, i) => {
            const isAct = i === activeIndex;
            return (
              <motion.button
                key={i}
                onClick={() => { goTo(i); pauseManually(); }}
                aria-label={`Go to card ${i + 1}`}
                layout
                animate={{
                  width: isAct ? 24 : 8,
                  background: isAct ? 'var(--accent)' : '#333333',
                }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
                style={{ height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
