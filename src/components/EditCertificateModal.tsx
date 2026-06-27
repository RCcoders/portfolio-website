'use client';

import React, { useState, useEffect } from 'react';
import { Certificate, api } from '@/lib/api';

interface EditCertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCertificateUpdated: (certificate: Certificate) => void;
    certificate: Certificate;
}

export default function EditCertificateModal({ isOpen, onClose, onCertificateUpdated, certificate }: EditCertificateModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Certificate>>({});

    useEffect(() => {
        if (isOpen && certificate) {
            setFormData(certificate);
        }
    }, [isOpen, certificate]);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (isOpen && footer) {
            footer.style.display = 'none';
        }
        return () => {
            if (footer) {
                footer.style.display = '';
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedCertificate: Certificate = {
                ...certificate,
                title: formData.title || 'Untitled',
                issuer: formData.issuer || '',
                date: formData.date || new Date().toISOString().split('T')[0],
                image: formData.image || 'https://via.placeholder.com/300x200',
                description: formData.description || '',
                credentialUrl: formData.credentialUrl || '#',
                slug: formData.slug || (formData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
                longDescription: formData.longDescription,
                skills: formData.skills || [],
                duration: formData.duration,
                level: formData.level,
                modules: formData.modules || []
            };

            if (certificate.id) {
                const updated = await api.updateCertificate(certificate.id, updatedCertificate);
                onCertificateUpdated(updated);
                onClose();
            }
        } catch (error) {
            console.error('Failed to update certificate:', error);
            alert('Failed to update certificate. See console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="my-8 theme-modal-card w-full max-w-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#222]">
                    <h2 className="text-lg font-bold font-mono uppercase pl-3 border-l-[3px] border-accent text-white">
                        [Edit Certificate]
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-[#555] hover:text-accent font-mono text-2xl transition-colors duration-150 cursor-pointer outline-none"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">Title</label>
                            <input
                                type="text"
                                required
                                className="theme-modal-input"
                                value={formData.title || ''}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Issuer</label>
                            <input
                                type="text"
                                required
                                className="theme-modal-input"
                                value={formData.issuer || ''}
                                onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">Date</label>
                            <input
                                type="date"
                                required
                                className="theme-modal-input"
                                value={formData.date || ''}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Slug (optional)</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.slug || ''}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="auto-generated-if-empty"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="theme-modal-label">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="theme-modal-input resize-none"
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">Image URL</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.image || ''}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Credential URL</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.credentialUrl || ''}
                                onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="theme-modal-label">Long Description (Optional)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            value={formData.longDescription || ''}
                            onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">Duration (e.g., &quot;4 weeks&quot;)</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.duration || ''}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Level (e.g., &quot;Intermediate&quot;)</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.level || ''}
                                onChange={e => setFormData({ ...formData, level: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="theme-modal-label">Skills (comma separated)</label>
                        <input
                            type="text"
                            className="theme-modal-input"
                            value={formData.skills ? formData.skills.join(', ') : ''}
                            onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Modules (comma separated)</label>
                        <textarea
                            rows={2}
                            className="theme-modal-input resize-none"
                            value={formData.modules ? formData.modules.join(', ') : ''}
                            onChange={e => setFormData({ ...formData, modules: e.target.value.split(',').map(s => s.trim()) })}
                        />
                    </div>

                    <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t border-[#222]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-transparent text-[#555] hover:text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150 cursor-pointer outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-accent hover:opacity-85 text-accent-text rounded-[6px] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                        >
                            {loading ? 'Updating...' : 'Update Certificate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
