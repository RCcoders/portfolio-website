'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Github, Linkedin, Mail, ArrowDown, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Raghav Chawla'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150) // Adjust speed here (milliseconds per character)
    
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Hero section */}
        <div className="max-w-4xl mx-auto">          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-slideInLeft">Hi, I am</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-slideInRight">
              {displayText}
              <span className="animate-blink">|</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fadeInUp">
            I am a Python developer passionate about data science and AI. I work on data-driven projects and am growing my skills in machine learning, analytics, and web tech like React and HTML/CSS.
          </p>

          {/* Call to action */}
          {/* Tech stack tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp delay-200">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((tech, index) => (
              <span
                key={tech}
                className={`px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-purple-300 border border-white/10 hover:border-purple-400 transition-colors duration-300 ${
                  index === 0 ? '' :
                  index === 1 ? 'delay-100' :
                  index === 2 ? 'delay-200' :
                  index === 3 ? 'delay-300' :
                  index === 4 ? 'delay-400' :
                  index === 5 ? 'delay-500' : ''
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp delay-300">
            <Link href="/projects" className="group">
              <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 transform">
                View My Work
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/certifications" className="group">
              <button className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 transform">
                Certifications
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-6 mb-8 animate-fadeInUp delay-400">
          <a href="https://github.com/RCcoders" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
            <Github className="w-6 h-6" />
          </a>
          <a href="linkedin.com/in/raghav-chawla-29255b275/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 transform">
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:cec23554.aiml.cec@cgc.edu.in"
            title="Send email"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Featured work preview section */}
      <div className="relative z-10 px-4 py-20 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Featured Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              title: "Grocery Management GUI",
              description: "A comprehensive desktop application for grocery store management with inventory tracking, sales processing, and customer management features.",
              tags: ["Python", "Tkinter", "SQLite"],
              image: "/images/grocery-management.png", // Add your actual image path here
              icon: <ShoppingCart className="w-8 h-8 text-purple-400" />
            },
            {
              id: 2,
              title: "Flask Expense Tracker",
              description: "A web-based expense tracking application built with Flask, featuring user authentication, category management, and expense analytics.",
              tags: ["Flask", "Python", "SQLAlchemy"],
              image: "/images/expense-tracker.webp", // Add your actual image path here
              icon: <DollarSign className="w-8 h-8 text-green-400" />
            },
            {
              id: 3,
              title: "Customer Churn Prediction",
              description: "Machine learning model to predict customer churn using advanced algorithms and data analysis techniques for business intelligence.",
              tags: ["Python", "Scikit-learn", "Pandas"],
              image: "/images/churn-prediction.jpeg", // Add your actual image path here
              icon: <TrendingUp className="w-8 h-8 text-blue-400" />
            }
          ].map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 transform"
            >
              <div className="p-6">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={320}
                      height={192}
                      className="w-full h-full object-cover"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                          {project.icon}
                        </div>
                        <span className="text-white/60 text-sm">{project.title}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
          <div className="text-center mt-12">
            <Link href="/projects">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 transform">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out 0.2s both;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}
