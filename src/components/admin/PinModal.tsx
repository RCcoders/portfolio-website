'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAdmin } from '@/context/AdminContext';

const PIN_LENGTH = 4;

export default function PinModal() {
  const { isPinModalOpen, closePinModal, grantAdmin } = useAdmin();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [locked, setLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [checking, setChecking] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isPinModalOpen) {
      setDigits(['', '', '', '']);
      setError('');
      if (!locked) {
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
      }
    }
  }, [isPinModalOpen, locked]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            setLocked(false);
            setError('');
            setDigits(['', '', '', '']);
            setTimeout(() => inputRefs.current[0]?.focus(), 50);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [countdown]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPinModalOpen) closePinModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPinModalOpen, closePinModal]);

  const submitPin = useCallback(
    async (pin: string) => {
      if (checking || locked) return;
      setChecking(true);
      try {
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin }),
        });
        const data = await res.json();

        if (data.success) {
          grantAdmin();
          setDigits(['', '', '', '']);
          setError('');
        } else if (data.locked) {
          setLocked(true);
          setCountdown(data.retryAfter ?? 60);
          setDigits(['', '', '', '']);
          setError('locked');
        } else {
          setError('denied');
          setDigits(['', '', '', '']);
          setTimeout(() => inputRefs.current[0]?.focus(), 50);
        }
      } catch {
        setError('denied');
        setDigits(['', '', '', '']);
        setTimeout(() => inputRefs.current[0]?.focus(), 50);
      } finally {
        setChecking(false);
      }
    },
    [checking, locked, grantAdmin]
  );

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError('');

    if (char && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (char && index === PIN_LENGTH - 1) {
      const pin = [...newDigits.slice(0, index), char].join('');
      if (pin.length === PIN_LENGTH) {
        submitPin(pin);
      }
    }

    if (newDigits.filter(Boolean).length === PIN_LENGTH && char) {
      const pin = newDigits.join('');
      if (pin.length === PIN_LENGTH) {
        submitPin(pin);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index] === '' && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
    if (pasted.length === PIN_LENGTH) {
      const newDigits = pasted.split('');
      setDigits(newDigits);
      inputRefs.current[PIN_LENGTH - 1]?.focus();
      submitPin(pasted);
    }
  };

  if (!isPinModalOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) closePinModal(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          background: '#0d0d0d',
          border: '1px solid #1e1e1e',
          borderRadius: 12,
          padding: 40,
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          animation: 'pinPanelIn 0.2s ease-out both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes pinPanelIn {
            from { opacity: 0; transform: scale(0.95); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes pinErrIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>

        {/* Label */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            color: '#333',
            textTransform: 'uppercase' as const,
          }}
        >
          {`// ACCESS REQUIRED`}
        </span>

        {/* PIN boxes */}
        <div style={{ display: 'flex', gap: 12 }} onPaste={handlePaste}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digits[i]}
              disabled={locked || checking}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 56,
                height: 64,
                background: '#111',
                border: `1px solid ${error === 'denied' ? '#ef4444' : '#1e1e1e'}`,
                borderRadius: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 24,
                textAlign: 'center' as const,
                color: '#fff',
                outline: 'none',
                caretColor: 'transparent',
                transition: 'border-color 0.15s ease',
                opacity: locked ? 0.4 : 1,
              }}
              onFocus={(e) => {
                if (!locked) {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--accent)';
                  (e.target as HTMLInputElement).style.boxShadow =
                    '0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent)';
                }
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor =
                  error === 'denied' ? '#ef4444' : '#1e1e1e';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }}
            />
          ))}
        </div>

        {/* Error / Locked area */}
        <div
          style={{
            height: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            animation: error ? 'pinErrIn 0.2s ease-out both' : undefined,
          }}
        >
          {error === 'denied' && (
            <span style={{ color: '#ef4444' }}>{`// ACCESS DENIED`}</span>
          )}
          {error === 'locked' && locked && (
            <span style={{ color: '#ef4444' }}>
              {`// LOCKED. RETRY IN ${countdown}s`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
