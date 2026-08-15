'use client';

import React, { useState, useEffect, useRef } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function AboutClient() {
  const [profileImage, setProfileImage] = useState('/images/MyImage.jpeg');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  const skillsRef = useRef<HTMLDivElement>(null);
  const isSkillsInView = useInViewOnce(skillsRef, "-80px");

  const achievementsRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInViewOnce(timelineRef, "-80px");

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

  const achievements = [
    {
      title: 'Co-Founder — A.E.G.I.S',
      tag: 'Community Leadership · 2024 – Present',
      description:
        'Co-founded the Association of Engineering Growth, Innovation and Science — a 50+ member student community focused on guiding peers in choosing the right tech stack, participating in hackathons, building real-world projects, developing leadership skills, and staying aware of emerging technologies.',
    },
    {
      title: 'IEEE YESIST12 2026 — 2nd Place (College) → Indonesia Finals',
      tag: 'Global Innovation Challenge · 2026',
      description:
        'Secured 2nd position among college finalists in the globally recognized IEEE YESIST12 Innovation Challenge 2026. Now representing the college at the international finals in Indonesia.',
    },
    {
      title: 'Smart India Hackathon — Participant (2024 & 2025)',
      tag: 'National Hackathon · 2024, 2025',
      description:
        'Participated in India\'s largest national-level hackathon twice, working on government problem statements across domains including data science and backend development in cross-functional teams.',
    },
    {
      title: 'National Science Day 2026 — 2nd Prize',
      tag: 'Research Presentation · Feb 2026',
      description:
        'Represented and presented research work at National Science Day 2026 under the "Research for Pioneer" theme, earning 2nd place recognition for innovative technical contributions.',
    },
    {
      title: '400+ DSA Problems Solved',
      tag: 'Competitive Programming · Ongoing',
      description:
        'Solved 400+ Data Structures & Algorithms problems across platforms including LeetCode, Codeforces, CodeChef, and HackerEarth — strengthening problem-solving depth across arrays, graphs, DP, and system design topics.',
    },
  ];

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

  const isBase64 = profileImage.startsWith('data:');

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-20">
        
        {/* Typographic Title */}
        <div className="border-b border-neutral-900 pb-8">
          <motion.span
            className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            [profile / background]
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white m-0" aria-label="RAGHAV CHAWLA">
            {reducedMotion ? (
              "RAGHAV CHAWLA"
            ) : (
              [... "RAGHAV CHAWLA"].map((char, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
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

        {/* Profile Section */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-start">
          
          {/* Left Column: Biography */}
          <motion.div
            className="space-y-8 text-neutral-400 font-light text-lg leading-relaxed"
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
              <motion.a
                href="/pdfs/resume.pdf"
                download
                className="relative overflow-hidden px-5 py-3 bg-accent hover:opacity-90 text-accent-text font-mono text-xs uppercase tracking-widest font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                [download resume]
                {/* Diagonal shimmer sweep */}
                {!reducedMotion && <span className="shimmer-sweep" />}
              </motion.a>
              <motion.a
                href="mailto:chawlaraghav78@gmail.com"
                className="px-5 py-3 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                [email me]
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <motion.div
              className="relative aspect-square w-full bg-neutral-900 border border-neutral-800 group overflow-hidden"
              initial={reducedMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={reducedMotion ? {} : { scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}
            >
              <Image
                src={profileImage}
                alt="Raghav Chawla Profile Photo"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={true}
                unoptimized={isBase64}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/MyImage.jpeg';
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
            </motion.div>
            
            <div className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest flex justify-between">
              <motion.span
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                [loc: chandigarh, india]
              </motion.span>
              <motion.span
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                [status: open to roles]
              </motion.span>
            </div>
          </div>
        </section>

        {/* Technical Stack Section */}
        <section ref={skillsRef} className="border-t border-neutral-900 pt-16 flex flex-col gap-8">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight text-white uppercase m-0"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            TECHNICAL FOCUS
          </motion.h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-4 border-t border-b border-neutral-900 py-10 font-mono text-xs uppercase tracking-widest">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill}
                className="skill-item flex items-center gap-3 text-neutral-300"
                initial={reducedMotion ? false : { opacity: 0, x: -15 }}
                animate={isSkillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <span className="bullet text-accent text-[10px] select-none transition-colors duration-150">■</span>
                <span className="skill-name transition-colors duration-150">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section ref={timelineRef} className="border-t border-neutral-900 pt-16 flex flex-col gap-12">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight text-white uppercase m-0"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            EXPERIENCE TIMELINE
          </motion.h2>

          <div className="relative flex flex-col gap-12 pl-2 ml-1">
            {/* Animated vertical timeline line */}
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: '#1a1a1a',
                originY: 0
              }}
              initial={reducedMotion ? false : { scaleY: 0 }}
              animate={isTimelineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8 }}
            />
            
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Custom dot marker */}
                <motion.div
                  className="absolute left-[-5px] top-1.5 w-2 h-2 bg-neutral-900 border border-neutral-700 group-hover:bg-accent group-hover:border-accent transition-colors"
                  initial={reducedMotion ? false : { scale: 0 }}
                  animate={isTimelineInView ? { scale: 1 } : {}}
                  transition={reducedMotion ? {} : { type: 'spring', stiffness: 300, damping: 20, delay: idx * 0.12 }}
                />
                
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, x: -40 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-white m-0 group-hover:text-accent transition-colors duration-150">
                      {exp.role.toUpperCase()}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="font-mono text-xs text-neutral-400 mt-1 uppercase tracking-wide group-hover:text-accent transition-colors duration-150">
                    {exp.company}
                  </div>
                  
                  <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section ref={achievementsRef} className="border-t border-neutral-900 pt-16 flex flex-col gap-12">
          <motion.h2
            className="text-3xl font-extrabold tracking-tight text-white uppercase m-0"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ACHIEVEMENTS
          </motion.h2>

          <div className="relative flex flex-col gap-12 pl-2 ml-1">
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: '#1a1a1a',
                originY: 0,
              }}
              initial={reducedMotion ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {achievements.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                <motion.div
                  className="absolute left-[-5px] top-1.5 w-2 h-2 bg-neutral-900 border border-neutral-700 group-hover:bg-accent group-hover:border-accent transition-colors"
                  initial={reducedMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={reducedMotion ? {} : { type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + idx * 0.1 }}
                />

                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-white m-0 group-hover:text-accent transition-colors duration-150">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-neutral-400 font-light text-base leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <style jsx>{`
        /* CSS Shimmer Effect for Download button */
        .shimmer-sweep {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 45%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 55%
          );
          transform: rotate(45deg);
          animation: shimmer 3s infinite;
          pointer-events: none;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
            top: -100%;
          }
          100% {
            left: 100%;
            top: 100%;
          }
        }

        .skill-item:hover .bullet {
          color: var(--accent);
        }
        .skill-item:hover .skill-name {
          color: #fff;
        }
      `}</style>
    </PageTransition>
  );
}
