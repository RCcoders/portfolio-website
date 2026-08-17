'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Project } from '@/lib/api';
import PageTransition from '@/components/ui/PageTransition';
import Image from 'next/image';

export default function ProjectDetailClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projectImage, setProjectImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getProjectById(id)
      .then((data: Project) => {
        setProject(data);
        // check localStorage for uploaded image
        try {
          const saved = localStorage.getItem(`project-image-${id}`);
          setProjectImage(saved || data.image || null);
        } catch {
          setProjectImage(data.image || null);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-neutral-500">
        [fetching project data...]
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-left font-mono">
          <div className="text-5xl font-extrabold text-accent mb-4">404</div>
          <h1 className="text-xl font-bold text-white mb-2 uppercase">[project not found]</h1>
          <p className="text-neutral-500 mb-8 max-w-sm">The project you are looking for does not exist in the archive.</p>
          <Link
            href="/projects"
            className="text-white hover:text-accent underline uppercase tracking-widest text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            [back to projects]
          </Link>
        </div>
      </div>
    );
  }

  const isBase64 = projectImage?.startsWith('data:');
  const hasImage = !!projectImage;

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : null;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">

        {/* Back */}
        <div className="border-b border-neutral-900 pb-4">
          <button
            onClick={() => router.back()}
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            [← back to projects]
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
            {project.category.replace(/-/g, ' ')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase leading-none m-0">
            {project.title}
          </h1>
          {project.date && (
            <span className="font-mono text-xs text-neutral-500 uppercase mt-2">
              [{formatDate(project.date)}]
            </span>
          )}
        </div>

        {/* Image */}
        {hasImage && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 border border-neutral-800 overflow-hidden">
            <Image
              src={projectImage!}
              alt={`${project.title} project image`}
              fill
              sizes="100vw"
              loading="eager"
              priority
              unoptimized={!isBase64}
              className="absolute inset-0 w-full h-full object-cover hover:scale-[1.01] transition-transform duration-700"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='%23171717'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23666666'>[NO PREVIEW]</text></svg>";
              }}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black border border-neutral-800 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent hover:text-accent-text hover:border-accent transition-colors"
                >
                  [codebase]
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black border border-neutral-800 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent hover:text-accent-text hover:border-accent transition-colors"
                >
                  [live demo]
                </a>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start mt-6">

          {/* Main */}
          <div className="lg:col-span-2 space-y-8 text-neutral-400 font-light text-base leading-relaxed">
            <div className="space-y-4">
              <p className="text-white text-lg font-normal">{project.description}</p>
              {project.longDescription && <p>{project.longDescription}</p>}
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-neutral-900 pt-8">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">[features]</span>
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 font-mono text-xs text-neutral-300">
                      <span className="text-accent flex-shrink-0 mt-0.5">▪</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies grouped */}
            {project.technologies && Object.keys(project.technologies).length > 0 && (
              <div className="border-t border-neutral-900 pt-8">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">[tech stack]</span>
                <div className="space-y-4">
                  {Object.entries(project.technologies).map(([group, items]) => (
                    <div key={group}>
                      <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block mb-2">{group}</span>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span key={item} className="bg-neutral-950 border border-neutral-900 text-neutral-300 font-mono text-xs px-2 py-0.5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics */}
            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div className="border-t border-neutral-900 pt-8">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">[metrics]</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} className="bg-neutral-950 border border-neutral-900 p-4">
                      <div className="text-accent font-mono text-xl font-bold">{v}</div>
                      <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-1">{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 border-t lg:border-t-0 lg:border-l border-neutral-900 pt-8 lg:pt-0 lg:pl-12 font-mono text-xs uppercase tracking-widest">

            <div className="space-y-4">
              <div>
                <span className="text-neutral-500 block mb-1">[status]</span>
                <span className="text-accent font-bold">{project.status}</span>
              </div>
              {project.date && (
                <div>
                  <span className="text-neutral-500 block mb-1">[date]</span>
                  <span className="text-white font-bold">{formatDate(project.date)}</span>
                </div>
              )}
              {project.duration && (
                <div>
                  <span className="text-neutral-500 block mb-1">[duration]</span>
                  <span className="text-white font-bold">{project.duration}</span>
                </div>
              )}
              {project.client && (
                <div>
                  <span className="text-neutral-500 block mb-1">[client]</span>
                  <span className="text-white font-bold">{project.client}</span>
                </div>
              )}
              <div>
                <span className="text-neutral-500 block mb-1">[category]</span>
                <span className="text-white font-bold">{project.category.replace(/-/g, ' ')}</span>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="border-t border-neutral-900 pt-6">
                <span className="text-neutral-500 block mb-3">[tags]</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-neutral-950 border border-neutral-900 text-neutral-300 px-2 py-0.5 normal-case">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-neutral-900 pt-6 flex flex-col gap-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-accent hover:opacity-90 text-accent-text py-3 font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  [live demo]
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center border border-neutral-800 hover:border-white text-white py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  [view codebase]
                </a>
              )}
              <Link
                href="/projects"
                className="w-full text-center border border-neutral-800 hover:border-white text-white py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                [back to projects]
              </Link>
            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}
