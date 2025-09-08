'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  Code,  
  Brain, 
  Globe, 
  Search,
  ChevronRight,
  Play,
  Award,
  Users
} from 'lucide-react';

// Define the Project type
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  duration: string;
  client: string;
  features: string[];
  technologies: {
    [key: string]: string[];
  };
  metrics: {
    [key: string]: string;
  };
}

// Define the Category type
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects: Project[] = [
    {
      id: 1,
      title: "Grocery Store Management GUI",
      description: "A comprehensive desktop application for managing grocery store operations including inventory management, sales tracking, customer management, and automated billing with an intuitive graphical user interface.",
      longDescription: "This desktop application provides a complete solution for grocery store management with features for inventory tracking, sales management, customer database, supplier management, and automated billing. Built with Python's Tkinter for the GUI and SQLite for data storage, it offers a user-friendly interface for daily store operations.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&crop=center",
      category: "python-development",
      tags: ["Python", "Tkinter", "SQLite", "GUI", "Database Management", "OOP"],
      githubUrl: "https://github.com/RCcoders/Grocery_Management_System_GUI",
      liveUrl: "#",
      status: "completed",
      date: "2025-04-15",
      duration: "1 months",
      client: "Personal Project",
      features: [
        "Inventory management with stock alerts",
        "Customer database and purchase history",
        "Automated billing and receipt generation",
        "Supplier management system",
        "Sales reporting and analytics",
        "User authentication and role management"
      ],
      technologies: {
        backend: ["Python", "SQLite", "Tkinter"],
        gui: ["Tkinter", "Custom Widgets", "Event Handling"],
        database: ["SQLite", "SQL Queries", "Database Design"],
        features: ["OOP Design", "File Handling", "Data Validation"]
      },
      metrics: {
        modules: "8+",
        features: "15+",
        databaseTables: "6",
        codeLines: "2000+"
      }
    },
    {
      id: 2,
      title: "Flask Expense Tracker",
      description: "A responsive web app built with Flask that helps users track expenses, set budgets, categorize spending, and visualize financial patterns with interactive charts.",
      longDescription: "This full-stack expense tracking application is designed to help users manage their personal finances effectively. It allows users to register, log in, and securely track daily expenses by adding, editing, and categorizing transactions. Users can set monthly budgets, monitor overspending, and gain insights into their financial habits through interactive charts and detailed reports. Built using Flask for the backend, SQLAlchemy for database management, and Chart.js for visualizations, the app offers a seamless and intuitive user experience.",
      image: "https://images.unsplash.com/photo-1707157284454-553ef0a4ed0d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "web-development",
      tags: ["Python", "Flask", "SQLAlchemy", "HTML/CSS", "JavaScript", "Chart.js"],
      githubUrl: "https://github.com/RCcoders/Flask_Expense_tracker",
      liveUrl: "#",
      status: "completed",
      date: "2025-05-20",
      duration: "15 days",
      client: "Personal Project",
      features: [
        "User registration and authentication",
        "Add, edit, and delete expense transactions",
        "Expense categorization and tagging",
        "Budget setting and tracking",
        "Interactive charts and visualizations",
        "Monthly and yearly expense reports"
      ],
      technologies: {
        backend: ["Python", "Flask", "SQLAlchemy", "WTForms"],
        frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
        visualization: ["Chart.js", "D3.js", "Responsive Design"],
        database: ["SQLite", "Database Migrations", "ORM"]
      },
      metrics: {
        routes: "12+",
        templates: "8",
        jsLibraries: "3",
        responsiveDesign: "100%"
      }
    },
    {
      id: 3,
      title: "Customer Churn Prediction",
      description: "A Streamlit-based machine learning app that predicts customer churn using Python, offering an interactive interface for data upload, visualization, and churn prediction.",
      longDescription: "This machine learning project predicts customer churn using a fully Python-based workflow with a user-friendly interface built in Streamlit. Users can upload datasets, explore customer behavior through visualizations, and see churn predictions based on trained models like Logistic Regression, Random Forest, and XGBoost. The app includes data preprocessing, feature engineering, model evaluation, and live predictions. It is designed to help businesses identify at-risk customers and take proactive retention actions through an intuitive and interactive web interface.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
      category: "machine-learning",
      tags: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Seaborn", "XGBoost"],
      githubUrl: "https://github.com/RCcoders/Customer_churn_prediction",
      liveUrl: "#",
      status: "completed",
      date: "2025-05-10",
      duration: "3 weeks",
      client: "Academic Project",
      features: [
        "Comprehensive data preprocessing and cleaning",
        "Exploratory data analysis with visualizations",
        "Feature engineering and selection",
        "Multiple ML algorithms comparison",
        "Model evaluation and performance metrics",
        "Customer segmentation analysis"
      ],
      technologies: {
        dataAnalysis: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
        machineLearning: ["Scikit-learn", "XGBoost", "Random Forest"],
        visualization: ["Plotly", "Matplotlib", "Statistical Plots"],
        evaluation: ["Cross-validation", "ROC-AUC", "Confusion Matrix"]
      },
      metrics: {
        accuracy: "87%",
        precision: "85%",
        recall: "82%",
        f1Score: "83%"
      }
    },
    {
      id: 4,
      title: "Catching the Falling Star",
      description: "An interactive Python game built with Pygame where players control a character to catch falling stars while avoiding obstacles. Features scoring system, multiple levels, and smooth animations.",
      longDescription: "This engaging arcade-style game demonstrates game development skills using Python and Pygame. Players navigate a character to catch falling stars while avoiding obstacles, with increasing difficulty levels. The game includes sprite animations, collision detection, sound effects, power-ups, and a high-score system. It showcases object-oriented programming principles and game physics implementation.",
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop&crop=center",
      category: "python-development",
      tags: ["Python", "Pygame", "Game Development", "OOP", "Sprites", "Animation"],
      githubUrl: "https://github.com/RCcoders/catching_the_falling_star",
      liveUrl: "#",
      status: "completed",
      date: "2023-06-30",
      duration: "3 weeks",
      client: "Personal Project",
      features: [
        "Player character movement and controls",
        "Falling star mechanics with physics",
        "Collision detection system",
        "Scoring and level progression",
        "Sound effects and background music",
        "High score tracking and persistence"
      ],
      technologies: {
        gameEngine: ["Pygame", "Game Loop", "Event Handling"],
        graphics: ["Sprite Management", "Animation", "Rendering"],
        audio: ["Sound Effects", "Background Music", "Audio Mixing"],
        physics: ["Collision Detection", "Movement Physics", "Gravity"]
      },
      metrics: {
        gameObjects: "20+",
        levels: "5",
        frameRate: "60 FPS",
        soundEffects: "8"
      }
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description: "A modern and responsive personal portfolio website built with Next.js, showcasing my skills, projects, and experience. Features include a blog section, contact form, and interactive UI elements.",
      longDescription: "This personal portfolio website is designed to showcase my skills, projects, and experience in a modern and responsive layout. Built with Next.js, it includes a blog section for sharing insights, a contact form for inquiries, and interactive UI elements for an engaging user experience. The site is optimized for performance and SEO, ensuring fast loading times and visibility in search engines.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGZvbGlvfGVufDB8fDB8fHww",
      category: "web-development",
      tags: ["Next.js", "React", "Tailwind CSS", "SEO", "Responsive Design", "JavaScript"],
      githubUrl: "https://github.com/RCcoders/portfolio-website",
      liveUrl: "https://portfolio-website-raghav.vercel.app/",
      status: "completed",
      date: "2023-06-30",
      duration: "3 weeks",
      client: "Personal Project",
      features: [
        "Responsive design for all devices",
        "Dynamic blog section with Markdown support",
        "Contact form with email integration",
        "Interactive project showcase",
        "SEO optimization for better visibility",
        "Dark mode toggle and animations"
      ],
      technologies: {
        frontend: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
        backend: ["Node.js", "Express", "EmailJS"],
        seo: ["Meta Tags", "Open Graph", "Sitemap"],
        deployment: ["Vercel", "GitHub Actions", "CI/CD"]
      },
      metrics: {
        pages: "8+",
        blogPosts: "5",
        projects: "8",
        responsiveBreakpoints: "3"
      }
    },
    {
      id: 6,
      title: "ML Learning Platform",
      description: "A modern and responsive ML Learning website built with Next.js, python, and PostgresSQL showcasing my skills, projects, and experience. Features include a Dashboard section, Registration form, and interactive UI elements.",
      longDescription: "This personal portfolio website is designed to showcase my skills, projects, and experience in a modern and responsive layout. Built with Next.js, it includes a blog section for sharing insights, a contact form for inquiries, and interactive UI elements for an engaging user experience. The site is optimized for performance and SEO, ensuring fast loading times and visibility in search engines.",
      image: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1621&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: ["web-development", "machine-learning", "python-development"],
      tags: ["Next.js", "React", "Tailwind CSS", "SEO", "Responsive Design", "JavaScript", "Python", "MySQL"],
      githubUrl: "https://github.com/RCcoders/ml-notebook-web",
      liveUrl: "#",
      status: "in-progress",
      date: "2025-07-30",
      duration: "Still going",
      client: "Personal Project",
      features: [
        "Interactive Jupyter-like notebook interface",
        "Real-time code execution with Python and ML libraries",
        "Support for data visualization (Matplotlib, Seaborn, Plotly)",
        "Dataset upload and management",
        "Integrated model training and evaluation dashboards",
        "Export notebooks to PDF/HTML",
        "User authentication and notebook versioning",
        "Dark mode toggle and responsive design"
      ],
      technologies: {
        frontend: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
        backend: ["Node.js", "Express", "FastAPI", "pydantic", "uuid"],
        deployment: ["Vercel", "GitHub Actions", "CI/CD"],
        database: ["My SQL", "sqlalchemy"]
      },
      metrics: {
        pages: "10+",
        blogPosts: "5",
        projects: "8",
        responsiveBreakpoints: "3"
      }
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All Projects', icon: Globe, count: projects.length },
    { id: 'machine-learning', name: 'Machine Learning', icon: Brain, count: projects.filter(p => p.category === 'machine-learning').length },
    { id: 'python-development', name: 'Python Model', icon: Play, count: projects.filter(p => p.category === 'python-development').length },
    { id: 'web-development', name: 'Development', icon: Code, count: projects.filter(p => p.category === 'web-development').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ProjectCard = ({ project }: { project: Project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return 'bg-green-600 text-green-100';
        case 'in-progress': return 'bg-blue-600 text-blue-100';
        case 'planned': return 'bg-orange-600 text-orange-100';
        default: return 'bg-gray-600 text-gray-100';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed': return <Award className="w-4 h-4" />;
        case 'in-progress': return <Play className="w-4 h-4" />;
        case 'planned': return <Calendar className="w-4 h-4" />;
        default: return <Code className="w-4 h-4" />;
      }
    };

    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 600px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {getStatusIcon(project.status)}
              <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-medium">
              {project.category.replace('-', ' ').toUpperCase()}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {project.title}
            </h3>
            
            <div className="flex items-center text-gray-400 text-sm mb-3">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(project.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{project.duration}</span>
              <span className="mx-2">•</span>
              <span>{project.client}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {isExpanded ? project.longDescription : project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, isExpanded ? project.tags.length : 4).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                {tag}
              </span>
            ))}
            {!isExpanded && project.tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="space-y-4 mb-4">
              {/* Features */}
              <div>
                <h4 className="text-white font-semibold mb-2 text-sm">Key Features:</h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-3 h-3 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-white font-semibold mb-2 text-sm">Technology Stack:</h4>
                <div className="space-y-2">
                  {Object.entries(project.technologies).map(([category, techs]) => (
                    <div key={category} className="text-xs">
                      <span className="text-blue-400 font-medium capitalize">{category}: </span>
                      <span className="text-gray-300">{techs.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="text-white font-semibold mb-2 text-sm">Project Metrics:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-700/30 p-2 rounded text-center">
                      <div className="text-blue-400 font-bold text-sm">{value}</div>
                      <div className="text-gray-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
              
              {project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              My{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              A showcase of my Python development projects including GUI applications, 
              web development, machine learning, and game development. Each project 
              demonstrates different aspects of software development and problem-solving.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">{projects.length}</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-gray-400 text-sm">Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">
                  {projects.filter(p => p.status === 'in-progress').length}
                </div>
                <div className="text-gray-400 text-sm">In Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Filters and Search */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{category.name}</span>
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-12 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Working Together?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I am always excited to take on new challenges and bring innovative ideas to life. 
            Let us discuss how we can create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://codesandbox.io', '_blank')}
              className="flex items-center px-8 py-4 border border-gray-600 bg-blue-600 hover:border-blue-500 text-white rounded-lg transition-colors duration-200 font-medium">
              <Users className="w-5 h-5 mr-2" />
              Start a Project
            </button>
            <button
              onClick={() => window.open('https://github.com/RCCoders', '_blank')}
              className="flex items-center px-8 py-4 border border-gray-600 bg-blue-600 hover:border-blue-500 text-white rounded-lg transition-colors duration-200 font-medium">
              <Github className="w-5 h-5 mr-2" />
              View All on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
