'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

const SESSION_KEY = 'adminAuthenticated';
const EXPIRY_KEY = 'adminExpiry';
const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

interface AdminContextValue {
  isAdmin: boolean;
  isPinModalOpen: boolean;
  isAdminPanelOpen: boolean;
  openPinModal: () => void;
  closePinModal: () => void;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  grantAdmin: () => void;
  revokeAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const authenticated = sessionStorage.getItem(SESSION_KEY);
      const expiry = sessionStorage.getItem(EXPIRY_KEY);
      if (authenticated === 'true' && expiry && Date.now() < Number(expiry)) {
        setIsAdmin(true);
      } else {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(EXPIRY_KEY);
      }
    } catch {
      // sessionStorage may be unavailable in some environments
    }
  }, []);

  const grantAdmin = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
      sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + SESSION_DURATION_MS));
    } catch {
      // ignore
    }
    setIsAdmin(true);
    setIsPinModalOpen(false);
    setIsAdminPanelOpen(true);
  }, []);

  const revokeAdmin = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(EXPIRY_KEY);
    } catch {
      // ignore
    }
    setIsAdmin(false);
    setIsAdminPanelOpen(false);
  }, []);

  const openPinModal = useCallback(() => setIsPinModalOpen(true), []);
  const closePinModal = useCallback(() => setIsPinModalOpen(false), []);
  const openAdminPanel = useCallback(() => setIsAdminPanelOpen(true), []);
  const closeAdminPanel = useCallback(() => setIsAdminPanelOpen(false), []);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isPinModalOpen,
        isAdminPanelOpen,
        openPinModal,
        closePinModal,
        openAdminPanel,
        closeAdminPanel,
        grantAdmin,
        revokeAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside <AdminProvider>');
  return ctx;
}
