'use client';

import React, { useState } from 'react';
import { Project, api } from '@/lib/api';

interface AdminProjectRowProps {
  project: Project;
  index: number;
  onEdit: (p: Project) => void;
  onDeleted: (id: string) => void;
}

export default function AdminProjectRow({
  project,
  index,
  onEdit,
  onDeleted,
}: AdminProjectRowProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!project.id) return;
    setDeleting(true);
    try {
      await api.deleteProject(project.id);
      onDeleted(project.id);
    } catch {
      // silently fail
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 0',
        borderBottom: '1px solid #111',
        background: confirming ? 'rgba(239,68,68,0.06)' : 'transparent',
        transition: 'background 0.2s ease',
        animation: `adminRowIn 0.25s ease-out ${index * 40}ms both`,
      }}
    >
      <style>{`
        @keyframes adminRowIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <span
        style={{
          flex: 1,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: '#e0e0e0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {project.title}
      </span>

      {confirming ? (
        <>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              opacity: deleting ? 0.5 : 1,
            }}
          >
            {deleting ? 'deleting...' : '[confirm delete]'}
          </button>
          <button
            onClick={() => setConfirming(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#555',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            [cancel]
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => onEdit(project)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#555',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >
            [edit]
          </button>
          <button
            onClick={() => setConfirming(true)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#555',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ef4444')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
          >
            [delete]
          </button>
        </>
      )}
    </div>
  );
}
