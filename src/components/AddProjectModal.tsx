'use client';

import React, { useState } from 'react';
import { Project, api } from '@/lib/api';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectAdded: (project: Project) => void;
}

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: '',
        description: '',
        image: '',
        category: 'web-development',
        status: 'planned',
        tags: [],
        githubUrl: '',
        liveUrl: '',
        technologies: {},
        metrics: {},
        features: []
    });

    const [tagsInput, setTagsInput] = useState('');

    React.useEffect(() => {
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
            const newProject: Project = {
                title: formData.title || 'Untitled',
                description: formData.description || '',
                image: formData.image || 'https://via.placeholder.com/600x400',
                category: formData.category || 'web-development',
                status: (formData.status as Project['status']) || 'planned',
                tags: tagsInput.split(',').map(t => t.trim()).filter(t => t),
                githubUrl: formData.githubUrl,
                liveUrl: formData.liveUrl,
                longDescription: formData.longDescription,
                technologies: formData.technologies || {},
                metrics: formData.metrics || {},
                features: formData.features || []
            };

            const created = await api.createProject(newProject);
            onProjectAdded(created);
            onClose();
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to create project. See console for details.');
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
                        [Add New Project]
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
                                placeholder="e.g., Portfolio Redesign"
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
                            placeholder="Brief project description..."
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
                                placeholder="https://..."
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
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="theme-modal-label">Live URL</label>
                            <input
                                type="text"
                                className="theme-modal-input"
                                value={formData.liveUrl || ''}
                                onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                                placeholder="https://..."
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
                            placeholder="React, TypeScript, Tailwind..."
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Long Description (Optional)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            value={formData.longDescription || ''}
                            onChange={e => setFormData({ ...formData, longDescription: e.target.value })}
                            placeholder="Detailed explanation, architecture patterns, and design details..."
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Features (One per line)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            placeholder="User Authentication&#10;Real-time Updates&#10;Responsive Design"
                            onChange={e => setFormData({ ...formData, features: e.target.value.split('\n').filter(line => line.trim()) })}
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Technologies (Category: Tech1, Tech2... one per line)</label>
                        <textarea
                            rows={3}
                            className="theme-modal-input resize-none"
                            placeholder="Frontend: React, Tailwind&#10;Backend: Python, FastAPI&#10;Database: PostgreSQL"
                            onChange={e => {
                                const techs: Record<string, string[]> = {};
                                e.target.value.split('\n').forEach(line => {
                                    const [category, items] = line.split(':');
                                    if (category && items) {
                                        techs[category.trim()] = items.split(',').map(i => i.trim()).filter(i => i);
                                    }
                                });
                                setFormData({ ...formData, technologies: techs });
                            }}
                        />
                    </div>

                    <div>
                        <label className="theme-modal-label">Metrics (Label: Value one per line)</label>
                        <textarea
                            rows={2}
                            className="theme-modal-input resize-none"
                            placeholder="Performance: 98/100&#10;Users: 10k+"
                            onChange={e => {
                                const metrics: Record<string, string> = {};
                                e.target.value.split('\n').forEach(line => {
                                    const [key, value] = line.split(':');
                                    if (key && value) {
                                        metrics[key.trim()] = value.trim();
                                    }
                                });
                                setFormData({ ...formData, metrics: metrics });
                            }}
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
                            {loading ? 'Adding...' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
