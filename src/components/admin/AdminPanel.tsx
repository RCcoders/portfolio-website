'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { api, Project, Certificate } from '@/lib/api';
import AdminProjectRow from './AdminProjectRow';
import AdminCertRow from './AdminCertRow';
import dynamic from 'next/dynamic';

const AddProjectModal = dynamic(() => import('@/components/AddProjectModal'), { ssr: false });
const EditProjectModal = dynamic(() => import('@/components/EditProjectModal'), { ssr: false });
const AddCertificateModal = dynamic(() => import('@/components/AddCertificateModal'), { ssr: false });
const EditCertificateModal = dynamic(() => import('@/components/EditCertificateModal'), { ssr: false });

const SESSION_DURATION_MS = 60 * 60 * 1000;

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function AdminPanel() {
  const { isAdminPanelOpen, closeAdminPanel, revokeAdmin } = useAdmin();

  const [activeTab, setActiveTab] = useState<'projects' | 'certs'>('projects');

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [projLoading, setProjLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddProjOpen, setIsAddProjOpen] = useState(false);
  const [isEditProjOpen, setIsEditProjOpen] = useState(false);

  // Certs state
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [certsLoading, setCertsLoading] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [isEditCertOpen, setIsEditCertOpen] = useState(false);

  // Session countdown
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION_MS);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isAdminPanelOpen) return;

    const expiry = (() => {
      try {
        const v = sessionStorage.getItem('adminExpiry');
        return v ? Number(v) : Date.now() + SESSION_DURATION_MS;
      } catch {
        return Date.now() + SESSION_DURATION_MS;
      }
    })();

    setTimeLeft(expiry - Date.now());

    countdownRef.current = setInterval(() => {
      const remaining = expiry - Date.now();
      if (remaining <= 0) {
        clearInterval(countdownRef.current!);
        revokeAdmin();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    loadProjects();
    loadCerts();

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminPanelOpen]);

  const loadProjects = useCallback(async () => {
    setProjLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch {
      // silently fail
    } finally {
      setProjLoading(false);
    }
  }, []);

  const loadCerts = useCallback(async () => {
    setCertsLoading(true);
    try {
      const data = await api.getCertificates();
      setCerts(data);
    } catch {
      // silently fail
    } finally {
      setCertsLoading(false);
    }
  }, []);

  const handleProjectAdded = useCallback((p: Project) => {
    setProjects((prev) => [...prev, p]);
    setIsAddProjOpen(false);
  }, []);

  const handleProjectUpdated = useCallback((p: Project) => {
    setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    setIsEditProjOpen(false);
    setEditingProject(null);
  }, []);

  const handleProjectDeleted = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleCertAdded = useCallback((c: Certificate) => {
    setCerts((prev) => [...prev, c]);
    setIsAddCertOpen(false);
  }, []);

  const handleCertUpdated = useCallback((c: Certificate) => {
    setCerts((prev) => prev.map((x) => (x.id === c.id ? c : x)));
    setIsEditCertOpen(false);
    setEditingCert(null);
  }, []);

  const handleCertDeleted = useCallback((id: string) => {
    setCerts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleLockSession = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    revokeAdmin();
  };

  return (
    <AnimatePresence>
      {isAdminPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="admin-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAdminPanel}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* Panel */}
          <motion.div
            key="admin-panel"
            initial={{ x: 480 }}
            animate={{ x: 0 }}
            exit={{ x: 480 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              width: 'min(480px, 100vw)',
              background: '#0a0a0a',
              borderLeft: '1px solid #1e1e1e',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px 0', flexShrink: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderLeft: '3px solid var(--accent)',
                    paddingLeft: 10,
                    lineHeight: 1,
                  }}
                >
                  [ADMIN PANEL]
                </div>
                <button
                  onClick={closeAdminPanel}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#555',
                    fontSize: 20,
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1,
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#444',
                  letterSpacing: '0.08em',
                  marginBottom: 16,
                  paddingLeft: 13,
                }}
              >
                // authenticated · session expires in {formatCountdown(timeLeft)}
              </div>

              <div style={{ height: 1, background: '#1a1a1a', marginLeft: -24, marginRight: -24 }} />

              {/* Tabs */}
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  paddingTop: 16,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {(['projects', 'certs'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0 0 12px',
                      color: activeTab === tab ? '#fff' : '#444',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      position: 'relative',
                      transition: 'color 0.15s',
                    }}
                  >
                    [{tab === 'projects' ? 'PROJECTS' : 'CERTIFICATIONS'}]
                    {activeTab === tab && (
                      <motion.span
                        layoutId="admin-tab-underline"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: 'var(--accent)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div style={{ height: 1, background: '#1a1a1a', marginLeft: -24, marginRight: -24 }} />
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {activeTab === 'projects' && (
                <>
                  <button
                    onClick={() => setIsAddProjOpen(true)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--accent)',
                      background: 'none',
                      border: '1px solid var(--accent)',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      marginBottom: 16,
                      width: '100%',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                      (e.currentTarget as HTMLElement).style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'none';
                      (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    }}
                  >
                    [+ ADD NEW PROJECT]
                  </button>

                  {projLoading ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', textTransform: 'uppercase' }}>
                      [loading...]
                    </div>
                  ) : projects.length === 0 ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', textTransform: 'uppercase' }}>
                      [no projects found]
                    </div>
                  ) : (
                    projects.map((project, i) => (
                      <AdminProjectRow
                        key={project.id || i}
                        project={project}
                        index={i}
                        onEdit={(p) => { setEditingProject(p); setIsEditProjOpen(true); }}
                        onDeleted={handleProjectDeleted}
                      />
                    ))
                  )}
                </>
              )}

              {activeTab === 'certs' && (
                <>
                  <button
                    onClick={() => setIsAddCertOpen(true)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--accent)',
                      background: 'none',
                      border: '1px solid var(--accent)',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      marginBottom: 16,
                      width: '100%',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                      (e.currentTarget as HTMLElement).style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'none';
                      (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    }}
                  >
                    [+ ADD NEW CERTIFICATE]
                  </button>

                  {certsLoading ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', textTransform: 'uppercase' }}>
                      [loading...]
                    </div>
                  ) : certs.length === 0 ? (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', textTransform: 'uppercase' }}>
                      [no certificates found]
                    </div>
                  ) : (
                    certs.map((cert, i) => (
                      <AdminCertRow
                        key={cert.id || cert.slug}
                        cert={cert}
                        index={i}
                        onEdit={(c) => { setEditingCert(c); setIsEditCertOpen(true); }}
                        onDeleted={handleCertDeleted}
                      />
                    ))
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                flexShrink: 0,
                borderTop: '1px solid #1a1a1a',
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                onClick={handleLockSession}
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
                [lock session]
              </button>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#2a2a2a',
                  letterSpacing: '0.08em',
                }}
              >
                v1.0 · admin
              </span>
            </div>
          </motion.div>

          {/* Modals */}
          <AddProjectModal
            isOpen={isAddProjOpen}
            onClose={() => setIsAddProjOpen(false)}
            onProjectAdded={handleProjectAdded}
          />
          {editingProject && (
            <EditProjectModal
              isOpen={isEditProjOpen}
              onClose={() => { setIsEditProjOpen(false); setEditingProject(null); }}
              onProjectUpdated={handleProjectUpdated}
              project={editingProject}
            />
          )}
          <AddCertificateModal
            isOpen={isAddCertOpen}
            onClose={() => setIsAddCertOpen(false)}
            onCertificateAdded={handleCertAdded}
          />
          {editingCert && (
            <EditCertificateModal
              isOpen={isEditCertOpen}
              onClose={() => { setIsEditCertOpen(false); setEditingCert(null); }}
              onCertificateUpdated={handleCertUpdated}
              certificate={editingCert}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
