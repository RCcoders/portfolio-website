'use client';

import { AdminProvider } from '@/context/AdminContext';
import PinModal from '@/components/admin/PinModal';
import AdminPanel from '@/components/admin/AdminPanel';
import { ReactNode } from 'react';

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      {children}
      <PinModal />
      <AdminPanel />
    </AdminProvider>
  );
}
