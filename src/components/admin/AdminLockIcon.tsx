'use client';

import React, { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminLockIcon() {
  const { isAdmin, openPinModal, openAdminPanel } = useAdmin();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (isAdmin) {
      openAdminPanel();
    } else {
      openPinModal();
    }
  };

  const iconColor = isAdmin
    ? 'var(--accent)'
    : hovered
    ? '#888'
    : '#555';

  return (
    <button
      aria-hidden="true"
      tabIndex={-1}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'transparent',
        border: `1px solid ${hovered ? '#444' : '#2a2a2a'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        flexShrink: 0,
        transition: 'border-color 0.2s ease',
      }}
    >
      {isAdmin ? (
        <LockOpen size={14} color={iconColor} strokeWidth={1.5} />
      ) : (
        <Lock size={14} color={iconColor} strokeWidth={1.5} />
      )}
    </button>
  );
}
