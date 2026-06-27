/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageTransition from '@/components/ui/PageTransition';

export default function AboutPage() {
  const [profileImage, setProfileImage] = useState('/images/MyImage.jpeg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const experiences = [
    {
      role: 'Python Developer Intern',
      company: 'Smart India Hackathon 2024 (Govt Project)',
      period: '2024 - Present',
      description:
        'Contributed to a national-level problem statement using Python and data science libraries to build scalable, efficient solutions with a team of cross-functional developers.'
    },
    {
      role: 'Data Science Intern',
      company: 'MY-Service-hub (Freelance Project)',
      period: '2024',
      description:
        'Developed a customer churn prediction system using Streamlit, Pandas, and Scikit-learn; deployed an interactive dashboard for visual insights and predictions.'
    },
    {
      role: 'Backend Developer (Trainee)',
      company: 'Contribution Hub (Open Source)',
      period: '2025',
      description:
        'Built API integrations and GitHub OAuth using Python and Django; synced contributor data and enabled project matching through GraphQL and REST endpoints.'
    },
    {
      role: 'Grocery Store Management Developer',
      company: 'Personal Project',
      period: '2023 - 2024',
      description:
        'Designed a Python-based billing system with GST calculation, inventory tracking, and GUI using Tkinter; used real datasets to simulate real-world operations.'
    },
    {
      role: 'Flask Developer',
      company: 'Expense Tracker Web App',
      period: '2023',
      description:
        'Created a full-stack expense tracking application using Flask and SQLite; implemented category-wise analytics and responsive UI for personal finance monitoring.'
    }
  ];

  const coreSkills = [
    'Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 
    'NumPy', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 
    'MongoDB', 'Docker', 'AWS', 'API Design', 'Git / GitHub'
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-20">
        
        {/* Typographic Title */}
        <div className="border-b border-neutral-900 pb-8">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
            [profile / background]
          </span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0">
            RAGHAV CHAWLA
          </h1>
        </div>

        {/* Magazine-Style Profile Section (Two columns) */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-start">
          
          {/* Left Column: Biography */}
          <div className="space-y-8 text-neutral-400 font-light text-lg leading-relaxed">
            <p className="text-white text-xl md:text-2xl font-normal leading-snug">
              I am a software developer and machine learning specialist focused on building clean backend architectures, reliable data systems, and scalable web APIs.
            </p>
            <p>
              Currently pursuing a B.Tech degree with a core focus on Artificial Intelligence and Machine Learning, I spend my time exploring the intersection between predictive systems and modern web interfaces. My focus is on writing robust code that handles complex tasks under the hood while providing simple integration pathways.
            </p>
            <p>
              Over the past few years, I have worked on national-level problems like the Smart India Hackathon, built user analytical models, and contributed to open-source developer portals. I am comfortable handling datasets, deploying algorithms, and structuring web APIs using Python, React, and Node.js.
            </p>
            <p>
              I believe in deliberate design, well-documented codebases, and performance optimization. I focus on developing modular code that can scale in production rather than quick, fragile integrations.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href="/pdfs/resume.pdf" download className="px-5 py-3 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150">
                [download resume]
              </a>
              <a href="mailto:chawlaraghav78@gmail.com" className="px-5 py-3 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150">
                [email me]
              </a>
            </div>
          </div>

          {/* Right Column: Flat B&W Image Block */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full bg-neutral-900 border border-neutral-800 group overflow-hidden">
              <img
                src={profileImage}
                alt="Raghav Chawla Profile"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/MyImage.jpeg'; // fallback to initial profile photo on error
                }}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-white border border-neutral-700 px-4 py-2 hover:bg-white hover:text-black transition-all">
                  [upload new photo]
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
            
            <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest flex justify-between">
              <span>[loc: chandigarh, india]</span>
              <span>[status: open to roles]</span>
            </div>
          </div>
        </section>

        {/* Technical Stack Section */}
        <section className="border-t border-neutral-900 pt-16 flex flex-col gap-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase m-0">
            TECHNICAL FOCUS
          </h2>
          
          {/* Text-only inline grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4 border-t border-b border-neutral-900 py-10 font-mono text-xs uppercase tracking-widest">
            {coreSkills.map((skill) => (
              <div key={skill} className="flex items-center gap-3 text-neutral-300">
                <span className="text-accent text-[10px] select-none">■</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="border-t border-neutral-900 pt-16 flex flex-col gap-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase m-0">
            EXPERIENCE TIMELINE
          </h2>

          <div className="flex flex-col gap-12 pl-2 border-l border-neutral-900 ml-1">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Custom grid marker */}
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-neutral-900 border border-neutral-700 group-hover:bg-accent group-hover:border-accent transition-colors"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-white m-0 group-hover:text-accent transition-colors duration-150">
                    {exp.role.toUpperCase()}
                  </h3>
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                
                <div className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-wide">
                  {exp.company}
                </div>
                
                <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed max-w-3xl">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}