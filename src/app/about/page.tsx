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

export default function AboutPage() {
  const router = useRouter();  
  const [activeTab, setActiveTab] = useState('overview');

  const skills = [
    { name: 'Python', level: 70, color: 'bg-blue-500' },
    { name: 'Data Science', level: 60, color: 'bg-green-500' },
    { name: 'Machine Learning', level: 45, color: 'bg-purple-500' },
    { name: 'AI/ML', level: 65, color: 'bg-pink-500' },
    { name: 'React', level: 55, color: 'bg-cyan-500' },
    { name: 'SQL', level: 45, color: 'bg-orange-500' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Welcome to my world</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Hi, I am{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Raghav Chawla
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A passionate Python developer specializing in Data Science and AI. 
                I transform complex data into actionable insights and build intelligent 
                solutions that make a difference.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="/pdfs/resume.pdf" download>
                  <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    <Download className="w-5 h-5 mr-2" />
                     Download Resume
                  </button>
                </a>
                <a
                  href="mailto:chawlaraghav78@gmail.com"
                  className="flex items-center px-6 py-3 border border-gray-600 hover:border-blue-500 text-white rounded-lg transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </a>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Panipat, India</span>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/RCcoders"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  </a> 
                  <a
                    href="https://www.linkedin.com/in/raghav-chawla-29255b275/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Content - Profile Image */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <Image
                  src="/images/MyImage.jpg"
                  alt="Raghav Chawla"
                  width={320}
                  height={320}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/20"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-3 rounded-full">
                  <Code className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 border-b border-gray-700">
          {[
            { id: 'overview', label: 'Overview', icon: Globe },
            { id: 'skills', label: 'Skills', icon: Zap },
            { id: 'experience', label: 'Experience', icon: Award },
            { id: 'interests', label: 'Interests', icon: Heart }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 mx-2 mb-4 rounded-t-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Professional Overview</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                   I am a passionate and results-driven B.Tech student specializing in Artificial Intelligence and Machine Learning, with hands-on experience in building innovative, real-world applications. From developing intelligent systems like a Virtual Keyboard using OpenCV and MediaPipe to leading impactful platforms such as The Contribution Hub, I enjoy solving complex problems with clean code and creative solutions.
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
                <h2 className="text-3xl font-bold text-white mb-6">What I Do</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: 'Machine Learning',
                      desc: 'Building intelligent systems that learn and adapt'
                    },
                    {
                      icon: Database,
                      title: 'Data Analysis',
                      desc: 'Extracting insights from complex datasets'
                    },
                    {
                      icon: Code,
                      title: 'Python Development',
                      desc: 'Creating robust and scalable applications'
                    },
                    {
                      icon: Globe,
                      title: 'AI Solutions',
                      desc: 'Implementing cutting-edge AI technologies'
                    }
                  ].map((service, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-600/20 p-3 rounded-lg">
                        <service.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{service.title}</h3>
                        <p className="text-gray-400 text-sm">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: undefined }}
                        data-width={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Technologies I Work With</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'].map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Journey</h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-blue-500">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-6"></div>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 ml-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <span className="text-blue-400 font-medium">{exp.period}</span>
                      </div>
                      <p className="text-gray-400 mb-3 font-medium">{exp.company}</p>
                      <p className="text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests Tab */}
          {activeTab === 'interests' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">What Drives Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {interests.map((interest, index) => (
                  <div key={index} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                        <interest.icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{interest.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{interest.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-xl border border-gray-700">
                <Coffee className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Let us Connect!</h3>
                <p className="text-gray-300 mb-6">
                  I am always excited to discuss new opportunities, collaborate on interesting projects, 
                  or simply chat about the latest trends in AI and data science.
                </p>
                <button
                  onClick={() => router.push('/contact')}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mx-auto"
                >
                  Start a Conversation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}