/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageTransition from '@/components/ui/PageTransition'

export default function Home() {
  const featuredProjects = [
    {
      id: 1,
      title: "Grocery Management GUI",
      description: "A comprehensive desktop application for grocery store management with inventory tracking, sales processing, and customer management features.",
      tags: ["Python", "Tkinter", "SQLite"],
      image: "/images/grocery-management.png",
      github: "https://github.com/RCcoders",
    },
    {
      id: 2,
      title: "Flask Expense Tracker",
      description: "A web-based expense tracking application built with Flask, featuring user authentication, category management, and expense analytics.",
      tags: ["Flask", "Python", "SQLAlchemy"],
      image: "/images/expense-tracker.webp",
      github: "https://github.com/RCcoders",
    },
    {
      id: 3,
      title: "Customer Churn Prediction",
      description: "Machine learning model to predict customer churn using advanced algorithms and data analysis techniques for business intelligence.",
      tags: ["Python", "Scikit-learn", "Pandas"],
      image: "/images/churn-prediction.jpeg",
      github: "https://github.com/RCcoders",
    }
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-24 md:gap-36">
        
        {/* Editorial Hero Section */}
        <section className="flex flex-col items-start border-b border-neutral-900 pb-16 md:pb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6 block"
          >
            [role: full stack developer / ai engineer]
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter leading-none text-white select-none text-left"
          >
            RAGHAV<br />
            <span className="text-accent">CHAWLA</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed text-left"
          >
            Chandigarh, India — Crafting high-performance digital products, predictive models, and clean APIs. Committing precise engineering to solve complex problems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link 
              href="/projects" 
              className="px-6 py-3.5 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 border border-transparent"
            >
              [view projects]
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3.5 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150"
            >
              [contact me]
            </Link>
          </motion.div>
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
                      className="font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-accent transition-colors duration-150"
                    >
                      [codebase]
                    </a>
                  </div>
                </div>

                {/* Right Column: Flat Image Block */}
                <div className="w-full aspect-[16/10] bg-neutral-900 border border-neutral-800 relative overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Preview';
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
              className="inline-block font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors duration-150"
            >
              [explore all archive projects →]
            </Link>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}
