/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { api, Project } from '@/lib/api';
import AddProjectModal from '@/components/AddProjectModal';
import EditProjectModal from '@/components/EditProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const categories: Category[] = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'machine-learning', name: 'Machine Learning', count: projects.filter(p => p.category === 'machine-learning').length },
    { id: 'python-development', name: 'Python Model', count: projects.filter(p => p.category === 'python-development').length },
    { id: 'web-development', name: 'Development', count: projects.filter(p => p.category === 'web-development').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Flat Editorial Project Row
  const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [projectImage, setProjectImage] = useState(project.image);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      const savedImage = localStorage.getItem(`project-image-${project.id}`);
      if (savedImage) {
        setProjectImage(savedImage);
      }
    }, [project.id]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setProjectImage(base64String);
          if (project.id) {
            localStorage.setItem(`project-image-${project.id}`, base64String);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-12 border-b border-neutral-900 items-center group relative">
        
        {/* Left Column: Details */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-3">
            <span>0{index + 1} / {project.category.replace('-', ' ')}</span>
            <span>•</span>
            <span className="text-accent">{project.status}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase group-hover:text-accent transition-colors duration-150">
            {project.title}
          </h3>

          {project.date && (
            <span className="font-mono text-xs text-neutral-500 uppercase mt-1">
              [date: {new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}]
            </span>
          )}

          <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
            {isExpanded ? (project.longDescription || project.description) : project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mt-6 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-neutral-950 border border-neutral-900 text-neutral-400">
                {tag}
              </span>
            ))}
          </div>

          {/* Expanded Content (Features, Metrics) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full space-y-6 mt-6 pt-6 border-t border-neutral-900 overflow-hidden text-sm"
              >
                {project.features && project.features.length > 0 && (
                  <div>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">[features]</span>
                    <ul className="text-neutral-400 space-y-1.5 font-light">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-2.5 mt-0.5 select-none">▪</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && Object.keys(project.technologies).length > 0 && (
                  <div>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">[stack distribution]</span>
                    <div className="space-y-2 font-mono text-xs">
                      {Object.entries(project.technologies).map(([category, techs]) => (
                        <div key={category} className="text-neutral-400">
                          <span className="text-white capitalize">{category}:</span> {Array.isArray(techs) ? techs.join(', ') : techs}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.metrics && Object.keys(project.metrics).length > 0 && (
                  <div>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">[metrics]</span>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="bg-neutral-950 p-4 border border-neutral-900">
                          <div className="text-accent font-mono text-lg font-bold">{value as string}</div>
                          <div className="text-neutral-500 font-mono text-[10px] uppercase mt-1 tracking-wider">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Links & Admin Options */}
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-150">
                [codebase]
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors duration-150">
                [live demo]
              </a>
            )}
            
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neutral-400 hover:text-white transition-colors duration-150"
            >
              {isExpanded ? '[show less]' : '[show details]'}
            </button>

            {/* Admin actions */}
            <div className="flex gap-4 border-l border-neutral-900 pl-6">
              <button 
                onClick={() => handleEditClick(project)} 
                className="text-neutral-500 hover:text-accent transition-colors"
              >
                [edit]
              </button>
              <button 
                onClick={() => { if (project.id) handleDeleteProject(project.id); }} 
                className="text-neutral-500 hover:text-red-500 transition-colors"
              >
                [delete]
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Flat Image Block */}
        <div className="w-full aspect-[16/10] bg-neutral-900 border border-neutral-800 relative overflow-hidden group/img">
          <img
            src={projectImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Preview';
            }}
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white border border-neutral-700 px-4 py-2 hover:bg-white hover:text-black transition-all">
              [upload photo]
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>

      </div>
    );
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">
        
        {/* Header */}
        <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
              [project catalog]
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0">
              ARCHIVE
            </h1>
          </div>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors"
          >
            [add project]
          </button>
        </div>

        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProjectAdded={handleAddProject}
        />

        {editingProject && (
          <EditProjectModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingProject(null);
            }}
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
              className="w-full bg-transparent border-b border-neutral-800 text-white font-mono text-xs uppercase py-3 outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Flat text filters */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`transition-colors ${activeFilter === cat.id ? 'text-accent font-bold' : 'hover:text-white'}`}
              >
                {cat.name.toLowerCase()} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Row Stack */}
        {loading ? (
          <div className="text-left py-20 font-mono text-xs uppercase tracking-widest text-neutral-500">
            [fetching project logs...]
          </div>
        ) : (
          <div className="flex flex-col">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectRow project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-left py-16 font-mono text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900">
            [no project entries match: &quot;{searchTerm}&quot;]
          </div>
        )}

      </div>
    </PageTransition>
  );
}
