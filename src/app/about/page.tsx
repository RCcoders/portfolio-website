'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Code,
  Brain,
  Database,
  Globe,
  Award,
  BookOpen,
  Coffee,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Download,
  ChevronRight,
  Sparkles,
  Heart,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import GlowCard from '@/components/ui/GlowCard';
import SkillsSphere from '@/components/canvas/SkillsSphere';

export default function AboutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState('/images/MyImage.jpeg');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
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

  const triggerFileInput = () => {
    console.log("Triggering file input");
    fileInputRef.current?.click();
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


  const interests = [
    { icon: Brain, title: 'Artificial Intelligence', desc: 'Exploring the frontiers of AI and deep learning' },
    { icon: Database, title: 'Big Data Analytics', desc: 'Processing and analyzing large-scale datasets' },
    { icon: Code, title: 'Open Source', desc: 'Contributing to open source projects and communities' },
    { icon: BookOpen, title: 'Continuous Learning', desc: 'Always learning new technologies and methodologies' }
  ];

  const achievements = [
    { number: '5+', label: 'Projects Completed' },
    { number: '2+', label: 'Years Experience' },
    { number: '10+', label: 'Certifications' },
    { number: '10', label: 'GitHub Commits' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className="relative max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg mr-3 border border-blue-500/20">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-blue-400 font-medium tracking-wide uppercase text-sm">Welcome to my world</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Hi, I am{' '}
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                    Raghav Chawla
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light border-l-4 border-green-500/50 pl-6">
                  A passionate Python developer specializing in <span className="text-white font-medium">Data Science</span> and <span className="text-white font-medium">AI</span>.
                  I transform complex data into actionable insights and build intelligent
                  solutions that make a difference.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <a href="/pdfs/resume.pdf" download>
                    <button className="flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-green-600 hover:from-sky-700 hover:to-green-700 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-105 transform font-medium">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </button>
                  </a>
                  <a
                    href="mailto:chawlaraghav78@gmail.com"
                    className="flex items-center px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 hover:border-green-500/50 hover:scale-105 transform backdrop-blur-sm font-medium"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get In Touch
                  </a>
                </div>

                <div className="flex items-center space-x-8 pt-8 border-t border-white/10">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-5 h-5 mr-2 text-green-400" />
                    <span>Panipat, India</span>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/RCcoders"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                    >
                      <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raghav-chawla-29255b275/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
                    >
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-green-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full p-2 border-2 border-dashed border-white/20 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 z-30 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-green-500/50 transition-colors duration-500 shadow-2xl">
                    <Image
                      src={profileImage}
                      alt="Raghav Chawla"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                      priority
                    />

                    {/* Edit Overlay */}
                    <div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                      onClick={() => {
                        console.log("Overlay clicked");
                        triggerFileInput();
                      }}
                    >
                      <div className="text-white flex flex-col items-center">
                        <div className="p-3 bg-white/10 rounded-full mb-2 backdrop-blur-sm">
                          <Code className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium">Change Photo</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg animate-bounce border border-white/20 z-40 pointer-events-none">
                    <Code className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard className="text-center py-8 bg-white/5 backdrop-blur-sm border-white/5">
                  <div className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-green-400 bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 font-medium text-sm uppercase tracking-wider">{achievement.label}</div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-24">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-16">
            <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-wrap justify-center gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'skills', label: 'Skills', icon: Zap },
                { id: 'experience', label: 'Experience', icon: Award },
                { id: 'interests', label: 'Interests', icon: Heart }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 font-medium text-sm md:text-base ${activeTab === tab.id
                    ? 'text-white bg-gradient-to-r from-sky-600 to-green-600 shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <tab.icon className="w-4 h-4 mr-1.5 md:mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                >
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-white flex items-center">
                      <span className="w-1 h-8 bg-blue-500 rounded-full mr-4"></span>
                      Professional Overview
                    </h2>
                    <div className="space-y-6 text-gray-300 leading-relaxed text-lg font-light">
                      <p>
                        I am a passionate and results-driven B.Tech student specializing in <span className="text-white font-medium">Artificial Intelligence and Machine Learning</span>, with hands-on experience in building innovative, real-world applications. From developing intelligent systems like a Virtual Keyboard using OpenCV and MediaPipe to leading impactful platforms such as The Contribution Hub, I enjoy solving complex problems with clean code and creative solutions.
                      </p>
                      <p>
                        Proficient in Python, React, and data-driven technologies, I have worked on projects spanning machine learning, computer vision, web development, and automation. I have a strong grasp of tools like Pandas, NumPy, and Scikit-learn for data science, and I am comfortable integrating backend logic with intuitive, responsive frontends.
                      </p>
                      <p>
                        With a growing portfolio of practical projects, internships, and contributions to open-source ecosystems, I aim to bring innovation and impact wherever I go—whether it is in product development, data science, or AI-powered solutions.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                      <span className="w-1 h-8 bg-green-500 rounded-full mr-4"></span>
                      What I Do
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          icon: Brain,
                          title: 'Machine Learning',
                          desc: 'Building intelligent systems that learn and adapt',
                          color: 'text-sky-400',
                          bg: 'bg-sky-500/10'
                        },
                        {
                          icon: Database,
                          title: 'Data Analysis',
                          desc: 'Extracting insights from complex datasets',
                          color: 'text-blue-400',
                          bg: 'bg-blue-500/10'
                        },
                        {
                          icon: Code,
                          title: 'Python Development',
                          desc: 'Creating robust and scalable applications',
                          color: 'text-green-400',
                          bg: 'bg-green-500/10'
                        },
                        {
                          icon: Globe,
                          title: 'AI Solutions',
                          desc: 'Implementing cutting-edge AI technologies',
                          color: 'text-sky-400',
                          bg: 'bg-sky-500/10'
                        }
                      ].map((service, index) => (
                        <GlowCard key={index} className="flex items-center space-x-6 p-6 hover:bg-white/5 transition-colors">
                          <div className={`${service.bg} p-4 rounded-xl`}>
                            <service.icon className={`w-8 h-8 ${service.color}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                            <p className="text-gray-400">{service.desc}</p>
                          </div>
                        </GlowCard>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Skills Universe</h2>
                  <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                    Drag and rotate the sphere to explore my technical skill set.
                  </p>

                  <div className="relative h-[600px] w-full bg-gradient-to-b from-black/20 to-green-900/10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                    <SkillsSphere />
                  </div>

                  <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-white mb-8">Core Technologies</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      {['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'].map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                          className="px-6 py-3 bg-white/5 text-blue-300 rounded-full text-sm font-medium border border-white/10 hover:border-blue-500/50 transition-all cursor-default shadow-lg"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-12 text-center">Professional Journey</h2>
                  <div className="space-y-12 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-green-500 to-transparent hidden md:block"></div>

                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-0 md:pl-20"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-[27px] top-8 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-black hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                        <GlowCard className="p-8 group hover:bg-white/5 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                              <p className="text-gray-400 font-medium flex items-center text-lg">
                                <Award className="w-5 h-5 mr-2 text-green-400" />
                                {exp.company}
                              </p>
                            </div>
                            <span className="mt-2 md:mt-0 text-blue-300 font-medium bg-blue-500/10 px-4 py-2 rounded-full text-sm border border-blue-500/20">{exp.period}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed text-lg font-light">{exp.description}</p>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Interests Tab */}
              {activeTab === 'interests' && (
                <motion.div
                  key="interests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-white mb-12 text-center">What Drives Me</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlowCard className="p-8 h-full hover:bg-white/5 transition-all duration-300 group">
                          <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-br from-sky-600/20 to-green-600/20 p-4 rounded-2xl mr-5 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                              <interest.icon className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{interest.title}</h3>
                          </div>
                          <p className="text-gray-300 leading-relaxed text-lg">{interest.desc}</p>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-gradient-to-r from-sky-900/20 to-green-900/20 p-12 rounded-3xl border border-white/10 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-green-500"></div>
                    <Coffee className="w-16 h-16 text-blue-400 mx-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-bold text-white mb-4">Let us Connect!</h3>
                    <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                      I am always excited to discuss new opportunities, collaborate on interesting projects,
                      or simply chat about the latest trends in AI and data science.
                    </p>
                    <button
                      onClick={() => router.push('/contact')}
                      className="inline-flex items-center px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full transition-all duration-300 shadow-lg hover:scale-105 transform font-bold"
                    >
                      Start a Conversation
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}