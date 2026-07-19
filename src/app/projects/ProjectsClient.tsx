'use client';

import React, { useState, useEffect, useRef } from 'react';
import { api, Project } from '@/lib/api';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import Carousel from '@/components/ui/Carousel';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AddProjectModal = dynamic(() => import('@/components/AddProjectModal'), { ssr: false });
const EditProjectModal = dynamic(() => import('@/components/EditProjectModal'), { ssr: false });

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

function fadeUpProps(isActive: boolean, delay: number, reducedMotion: boolean = false) {
  if (!isActive) return {};
  if (reducedMotion) return { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 12 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.35, delay, ease: EASE },
  };
}

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}

function ProjectCard({ project, index, isActive, onEdit, onDelete }: ProjectCardProps) {
  const [projectImage, setProjectImage] = useState(project.image);
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (project.id) {
      const saved = localStorage.getItem(`project-image-${project.id}`);
      if (saved) { setProjectImage(saved); setImgError(false); }
    }
  }, [project.id]);

  useEffect(() => { setImgError(false); }, [projectImage]);

  useEffect(() => {
    if (!isActive) setIsExpanded(false);
  }, [isActive]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 800;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setProjectImage(compressed);
        if (project.id) {
          try {
            localStorage.setItem(`project-image-${project.id}`, compressed);
          } catch {
            console.warn('localStorage quota exceeded; project image will not persist.');
          }
        }
      };
      img.src = b64;
    };
    reader.readAsDataURL(file);
  };

  const isBase64 = projectImage?.startsWith('data:');
  const padded = String(index + 1).padStart(2, '0');
  const hasRealImage = !!projectImage && !imgError;

  return (
    <motion.div
      style={{
        width: 'clamp(300px, 560px, 88vw)',
        background: '#111111',
        border: '1px solid',
        borderColor: isActive ? 'var(--accent)' : '#1a1a1a',
        boxShadow: isActive
          ? '0 0 0 1px var(--accent), 0 32px 80px rgba(0,0,0,0.6)'
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      initial={reducedMotion ? false : { scale: 0.95, opacity: 0.6 }}
      animate={isActive ? { scale: 1.0, opacity: 1 } : { scale: 0.95, opacity: 0.6 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 260, damping: 28 }
      }
    >
      {/* Image area */}
      <div
        style={{
          height: 200,
          position: 'relative',
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
        className="group/img"
      >
        {hasRealImage ? (
          <Image
            src={projectImage!}
            alt={`${project.title} project image`}
            fill
            sizes="560px"
            loading="lazy"
            unoptimized={!isBase64}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700"
            onError={() => setImgError(true)}
          />
        ) : null}

        {!hasRealImage && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '5rem',
              fontWeight: 800,
              color: '#222',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            {padded}
          </div>
        )}

        {isActive && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.82)' }}
          >
            <span
              className="font-mono text-xs uppercase tracking-widest text-white px-4 py-2 hover:text-black transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = '#000';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#fff';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
              }}
            >
              [upload photo]
            </span>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* Content area */}
      <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {/* Top row */}
        <motion.div
          key={isActive ? 'active-meta' : 'idle-meta'}
          {...fadeUpProps(isActive, 0, reducedMotion ?? false)}
          className="flex items-center gap-3 flex-wrap"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#666' }}
        >
          <span>{project.category.replace(/-/g, ' ')}</span>
          <span>•</span>
          <span style={{ color: 'var(--accent)' }}>{project.status}</span>
          {project.date && (
            <>
              <span>•</span>
              <span>{new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
            </>
          )}
        </motion.div>

        {/* Title */}
        <motion.h3
          key={isActive ? 'active-title' : 'idle-title'}
          {...fadeUpProps(isActive, 0.08, reducedMotion ?? false)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          key={isActive ? 'active-desc' : 'idle-desc'}
          {...fadeUpProps(isActive, 0.16, reducedMotion ?? false)}
          style={{
            color: '#888',
            fontSize: '0.8rem',
            fontWeight: 300,
            lineHeight: 1.65,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          key={isActive ? 'active-tags' : 'idle-tags'}
          {...fadeUpProps(isActive, 0.24, reducedMotion ?? false)}
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap', overflowX: 'auto' }}
        >
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#555',
                border: '1px solid #222',
                padding: '2px 8px',
                whiteSpace: 'nowrap',
                background: '#0d0d0d',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', fontSize: '0.75rem' }}
            >
              {project.features && project.features.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>[features]</span>
                  <ul style={{ color: '#777', listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.7 }}>
                    {project.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: 8 }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▪</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.metrics && Object.keys(project.metrics).length > 0 && (
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '10px 12px' }}>
                      <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700 }}>{v as string}</div>
                      <div style={{ color: '#444', fontFamily: 'var(--font-mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{k}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.div
          key={isActive ? 'active-actions' : 'idle-actions'}
          {...fadeUpProps(isActive, 0.32, reducedMotion ?? false)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0 20px',
            marginTop: 4,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            pointerEvents: isActive ? 'auto' : 'none',
            opacity: isActive ? 1 : 0,
          }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#aaa' }}
              className="hover:text-white transition-colors"
            >
              [codebase]
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#aaa' }}
              className="hover:text-white transition-colors"
            >
              [live demo]
            </a>
          )}
          <button
            onClick={() => setIsExpanded((v) => !v)}
            style={{ color: '#aaa' }}
            className="hover:text-white transition-colors"
          >
            {isExpanded ? '[show less]' : '[show details]'}
          </button>

          <span style={{ height: 14, borderLeft: '1px solid #222', display: 'inline-block' }} />
          <button
            onClick={() => onEdit(project)}
            style={{ color: '#555' }}
            className="hover:text-accent transition-colors"
          >
            [edit]
          </button>
          <button
            onClick={() => { if (project.id) onDelete(project.id); }}
            style={{ color: '#555' }}
            className="hover:text-red-500 transition-colors"
          >
            [delete]
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to fetch projects:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = (p: Project) => setProjects((prev) => [...prev, p]);
  const handleUpdateProject = (p: Project) =>
    setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  const handleEditClick = (p: Project) => { setEditingProject(p); setIsEditModalOpen(true); };
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const categories: Category[] = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'machine-learning', name: 'Machine Learning', count: projects.filter((p) => p.category === 'machine-learning').length },
    { id: 'python-development', name: 'Python Model', count: projects.filter((p) => p.category === 'python-development').length },
    { id: 'web-development', name: 'Development', count: projects.filter((p) => p.category === 'web-development').length },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">

        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              [project catalog]
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0" aria-label="ARCHIVE">
              {reducedMotion ? (
                "ARCHIVE"
              ) : (
                [... "ARCHIVE"].map((char, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                  >
                    {char}
                  </motion.span>
                ))
              )}
            </h1>
          </div>
          <motion.button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={reducedMotion ? {} : { scale: 1.03 }}
            whileTap={reducedMotion ? {} : { scale: 0.96 }}
          >
            [add project]
          </motion.button>
        </div>

        {/* Modals */}
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProjectAdded={handleAddProject}
        />
        {editingProject && (
          <EditProjectModal
            isOpen={isEditModalOpen}
            onClose={() => { setIsEditModalOpen(false); setEditingProject(null); }}
            onProjectUpdated={handleUpdateProject}
            project={editingProject}
          />
        )}

        {/* Filters and Search */}
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="SEARCH PROJECT / TECH / TAG..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-neutral-800 text-white font-mono text-xs uppercase py-3 outline-none focus:border-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-6">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`relative transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${activeFilter === cat.id ? 'text-accent font-bold' : 'hover:text-white'}`}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                whileHover={{ color: 'var(--accent)' }}
              >
                {cat.name.toLowerCase()} ({cat.count})
                {activeFilter === cat.id && (
                  <motion.span
                    layoutId="active-tab"
                    style={{
                      position: 'absolute',
                      bottom: -6,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--accent)',
                    }}
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="text-left py-20 font-mono text-xs uppercase tracking-widest text-neutral-500">
            [fetching project logs...]
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-left py-16 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900">
            [no project entries match: &quot;{searchTerm}&quot;]
          </div>
        ) : (
          <div className="py-8">
            <Carousel
              items={filteredProjects}
              renderCard={(project, index, isActive) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  isActive={isActive}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteProject}
                />
              )}
            />
          </div>
        )}

      </div>
    </PageTransition>
  );
}
