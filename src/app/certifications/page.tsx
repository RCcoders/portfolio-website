'use client';

import React, { useState, useEffect } from 'react';
import { api, Certificate } from '@/lib/api';
import AddCertificateModal from '@/components/AddCertificateModal';
import EditCertificateModal from '@/components/EditCertificateModal';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import Link from 'next/link';

interface CertificationRowProps {
  cert: Certificate;
  onEdit: (cert: Certificate) => void;
  onDelete: (id: string) => void;
}

function CertificationRow({ cert, onEdit, onDelete }: CertificationRowProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-neutral-900 gap-6 group relative">
      {/* Title & Issuer */}
      <div className="flex flex-col items-start max-w-2xl">
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1.5 block">
          {cert.issuer}
        </span>
        <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-150 m-0">
          {cert.title}
        </h3>
        {cert.description && (
          <p className="text-sm text-neutral-400 font-light mt-2.5 leading-relaxed">
            {cert.description}
          </p>
        )}
      </div>

      {/* Actions / Metadata */}
      <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest shrink-0">
        <span className="text-neutral-500">{cert.date}</span>

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-accent transition-colors duration-150"
          >
            [verify]
          </a>
        )}
        
        <Link 
          href={`/certifications/${cert.slug}`}
          className="text-accent hover:text-white transition-colors duration-150 font-bold"
        >
          [details]
        </Link>

        {/* Admin Controls */}
        <div className="flex gap-4 border-l border-neutral-900 pl-6">
          <button
            onClick={() => onEdit(cert)}
            className="text-neutral-500 hover:text-accent transition-colors"
          >
            [edit]
          </button>
          <button
            onClick={() => { if (cert.id) onDelete(cert.id); }}
            className="text-neutral-500 hover:text-red-500 transition-colors"
          >
            [delete]
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await api.getCertificates();
      setCertifications(data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertificate = (newCert: Certificate) => {
    setCertifications([...certifications, newCert]);
  };

  const handleUpdateCertificate = (updatedCert: Certificate) => {
    setCertifications(certifications.map(c => c.id === updatedCert.id ? updatedCert : c));
  };

  const handleEditClick = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsEditModalOpen(true);
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.deleteCertificate(id);
      setCertifications(certifications.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
      alert('Failed to delete certificate');
    }
  };

  const totalCerts = certifications.length;
  const uniqueProviders = new Set(certifications.map(cert => cert.issuer)).size;
  const validYears = certifications
    .map(cert => new Date(cert.date).getFullYear())
    .filter(year => !isNaN(year));
  const latestYear = validYears.length > 0 ? Math.max(...validYears) : new Date().getFullYear();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">
        
        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
              [credentials index]
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0">
              CERTIFICATIONS
            </h1>
          </div>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            [add certificate]
          </button>
        </div>

        <AddCertificateModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCertificateAdded={handleAddCertificate}
        />

        {editingCertificate && (
          <EditCertificateModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingCertificate(null);
            }}
            onCertificateUpdated={handleUpdateCertificate}
            certificate={editingCertificate}
          />
        )}

        {/* Certifications Row Stack */}
        {loading ? (
          <div className="text-left py-20 font-mono text-xs uppercase tracking-widest text-neutral-500">
            [fetching credential logs...]
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id || cert.slug || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CertificationRow
                    cert={cert}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteCertificate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Flat Monospace Stats footer */}
        <div className="border-t border-neutral-900 pt-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <div>
            [total certifications: {totalCerts}]
          </div>
          <div>
            [providers: {uniqueProviders}]
          </div>
          <div>
            [latest achievement: {latestYear}]
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
