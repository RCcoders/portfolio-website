'use client';

import React, { useState, useEffect } from 'react';
import { Project, api } from '@/lib/api';

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectUpdated: (project: Project) => void;
    project: Project;
}

export default function EditProjectModal({ isOpen, onClose, onProjectUpdated, project }: EditProjectModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [tagsInput, setTagsInput] = useState('');
    const [featuresInput, setFeaturesInput] = useState('');
    const [technologiesInput, setTechnologiesInput] = useState('');
    const [metricsInput, setMetricsInput] = useState('');

    useEffect(() => {
        if (isOpen && project) {
            setFormData(project);
            setTagsInput(project.tags?.join(', ') || '');
            setFeaturesInput(project.features?.join('\n') || '');

            // Convert technologies object to string
            const techStr = Object.entries(project.technologies || {})
                .map(([category, techs]) => `${category}: ${Array.isArray(techs) ? techs.join(', ') : techs}`)
                .join('\n');
            setTechnologiesInput(techStr);

            // Convert metrics object to string
            const metricsStr = Object.entries(project.metrics || {})
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            setMetricsInput(metricsStr);
        }
    }, [isOpen, project]);

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
            const updatedProject: Project = {
                ...project,
                title: formData.title || 'Untitled',
                description: formData.description || '',
                image: formData.image || 'https://via.placeholder.com/600x400',
                category: formData.category || 'web-development',
                status: (formData.status as Project['status']) || 'planned',
                tags: tagsInput.split(',').map(t => t.trim()).filter(t => t),
                githubUrl: formData.githubUrl,
                liveUrl: formData.liveUrl,
                longDescription: formData.longDescription,
                duration: formData.duration,
                client: formData.client,
                features: featuresInput.split('\n').filter(line => line.trim()),
                technologies: (() => {
                    const techs: Record<string, string[]> = {};
                    technologiesInput.split('\n').forEach(line => {
                        const [category, items] = line.split(':');
                        if (category && items) {
                            techs[category.trim()] = items.split(',').map(i => i.trim()).filter(i => i);
                        }
                    });
                    return techs;
                })(),
                metrics: (() => {
                    const metrics: Record<string, string> = {};
                    metricsInput.split('\n').forEach(line => {
                        const [key, value] = line.split(':');
                        if (key && value) {
                            metrics[key.trim()] = value.trim();
                        }
                    });
                    return metrics;
                })()
            };

            if (project.id) {
                const updated = await api.updateProject(project.id, updatedProject);
                onProjectUpdated(updated);
                onClose();
            }
        } catch (error) {
            console.error('Failed to update project:', error);
            alert('Failed to update project. See console for details.');
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
                        [Edit Project]
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
                            <label className="theme-modal-label">Category</label>
                            <select
                                className="theme-modal-input theme-modal-select"
                                value={formData.category || 'web-development'}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="web-development">Web Development</option>
                                <option value="python-development">Python Development</option>
                                <option value="machine-learning">Machine Learning</option>
                            </select>
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
                            <label className="theme-modal-label">Status</label>
                            <select
                                className="theme-modal-input theme-modal-select"
                                value={formData.status || 'planned'}
                                onChange={e => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                            >
                                <option value="planned">Planned</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">GitHub URL</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.githubUrl || ''}
                                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Live URL</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.liveUrl || ''}
                                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="theme-modal-label">Duration</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.duration || ''}
                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                placeholder="e.g., 3 months"
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Client</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.client || ''}
                                onChange={e => setFormData({ ...formData, client: e.target.value })}
                                placeholder="e.g., Company Name"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="theme-modal-label">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="theme-modal-input"
                            value={tagsInput}
                            onChange={e => setTagsInput(e.target.value)}
                        />
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

                    <div>
                        <label className="theme-modal-label">Features (One per line)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            value={featuresInput}
                            onChange={e => setFeaturesInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Technologies (Category: Tech1, Tech2... one per line)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            value={technologiesInput}
                            onChange={e => setTechnologiesInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Metrics (Label: Value one per line)</label>
                        <textarea
                            rows={2}
                            className="theme-modal-input resize-none"
                            value={metricsInput}
                            onChange={e => setMetricsInput(e.target.value)}
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
                            {loading ? 'Updating...' : 'Update Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
