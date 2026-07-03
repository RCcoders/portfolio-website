'use client';

import React from 'react';
import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
}

interface HomeClientProps {
  featuredProjects: Project[];
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-24 md:gap-36">
        
        {/* Editorial Hero Section */}
        <section className="flex flex-col items-start border-b border-neutral-900 pb-16 md:pb-24">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 block">
            [role: full stack developer / ai engineer]
          </span>
          
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter leading-none text-white select-none text-left">
            RAGHAV<br />
            <span className="text-accent">CHAWLA</span>
          </h1>
          
          <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed text-left">
            Chandigarh, India — Crafting high-performance digital products, predictive models, and clean APIs. Committing precise engineering to solve complex problems.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-4">
            <Link 
              href="/projects" 
              className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 border border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              [view projects]
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3.5 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              [contact me]
            </Link>
          </div>
        </section>

        {/* Featured Work Editorial List */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-6">
            <h2 className="text-4xl font-extrabold tracking-tight text-white m-0">FEATURED WORK</h2>
            <span className="font-mono text-xs text-neutral-500 mt-2 md:mt-0 uppercase tracking-widest">
              [curated projects — 03]
            </span>
          </div>

          <div className="flex flex-col">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-12 border-b border-neutral-900 items-center group"
              >
                {/* Left Column: Text Content */}
                <div className="flex flex-col items-start">
                  <span className="font-mono text-xs text-neutral-500 mb-2">
                    0{index + 1} / FEATURED
                  </span>
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase group-hover:text-accent transition-colors duration-150">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2.5 mt-6 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-accent transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      [codebase]
                    </a>
                  </div>
                </div>

                {/* Right Column: Flat Image Block */}
                <div className="w-full aspect-[16/10] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                  {project.image ? (
                    <Image 
                      src={project.image}
                      alt={`${project.title} project showcase image`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'><rect width='100%' height='100%' fill='%23171717'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%23666666'>[NO PREVIEW]</text></svg>";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-600">
                      [no image block]
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-left mt-4">
            <Link 
              href="/projects" 
              className="inline-block font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              [explore all archive projects →]
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
