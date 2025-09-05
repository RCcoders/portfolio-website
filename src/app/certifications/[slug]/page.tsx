'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, Award, ArrowLeft, Building2, CheckCircle } from 'lucide-react';

// Certification data - keep this in sync with your main certifications page
const certifications = [
  {
    slug: "deloitte-australia-technology-job-simulation",
    title: "Deloitte Australia - Technology Job Simulation",
    issuer: "Forage",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&crop=center",
    description: "Successfully completed a technology-focused virtual job simulation designed to mirror real-world tasks and expectations in the tech industry. Gained practical experience in areas such as software development, data analysis, debugging, product design, and agile workflows.",
    longDescription: "This comprehensive virtual job simulation provided hands-on experience with real-world technology challenges faced by consultants at Deloitte Australia. The program included multiple modules covering software development methodologies, data analytics pipelines, debugging complex systems, user-centered product design, and implementation of agile project management frameworks. Participants worked on realistic client scenarios, developed technical solutions, and presented findings to stakeholders, mirroring the actual work environment of technology consultants.",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_mt5PFGpLjWdcYZC4S_1751976789361_completion_certificate.pdf",
    skills: ["Software Development", "Data Analysis", "Debugging", "Product Design", "Agile Workflows", "Client Consultation", "Technical Presentations"],
    duration: "4 weeks",
    level: "Intermediate",
    modules: [
      "Introduction to Technology Consulting",
      "Software Development Best Practices",
      "Data Analytics and Visualization",
      "System Debugging and Optimization",
      "Product Design and User Experience",
      "Agile Project Management"
    ]
  },
  {
    slug: "advanced-python-object-oriented-programming",
    title: "Advanced Python: Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    date: "2025-04-21",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center",
    description: "Mastered advanced object-oriented programming concepts in Python, including inheritance, polymorphism, encapsulation, and design patterns.",
    longDescription: "This advanced course dived deep into sophisticated object-oriented programming techniques in Python. Covered advanced topics including multiple inheritance, abstract base classes, metaclasses, design patterns (Singleton, Factory, Observer), context managers, descriptors, and advanced Python features like decorators and magic methods. Built several complex applications demonstrating proper OOP architecture, SOLID principles, and maintainable code design.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/advanced-python-oop",
    skills: ["Python", "Object-Oriented Programming", "Design Patterns", "Code Architecture", "SOLID Principles", "Metaclasses", "Abstract Base Classes"],
    duration: "6 hours",
    level: "Advanced",
    modules: [
      "Advanced Class Design",
      "Inheritance and Polymorphism",
      "Design Patterns Implementation",
      "Metaclasses and Descriptors",
      "Context Managers and Decorators",
      "Testing OOP Applications"
    ]
  },
  {
    slug: "python-101-for-data-science",
    title: "Python 101 for Data Science",
    issuer: "IBM",
    date: "2025-03-21",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center",
    description: "Successfully completed IBM's introductory course on Python for Data Science. Gained foundational skills in Python programming for data manipulation and analysis.",
    longDescription: "This comprehensive foundational course provided a solid introduction to Python programming specifically tailored for data science applications. Covered Python fundamentals including data types, control structures, functions, and error handling. Extensive hands-on practice with essential data science libraries including NumPy for numerical computing, Pandas for data manipulation, Matplotlib and Seaborn for data visualization, and introduction to machine learning concepts with scikit-learn.",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/d4f57248668c4a8e99fd462a324256aa",
    skills: ["Python", "NumPy", "Pandas", "Data Analysis", "Data Visualization", "Matplotlib", "Jupyter Notebooks"],
    duration: "8 hours",
    level: "Beginner",
    modules: [
      "Python Fundamentals",
      "Data Types and Structures",
      "NumPy for Numerical Computing",
      "Pandas for Data Manipulation",
      "Data Visualization with Matplotlib",
      "Introduction to Data Analysis"
    ]
  },
  {
    slug: "python-object-oriented-programming",
    title: "Python Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    date: "2023-07-12",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&crop=center",
    description: "Completed an introductory course on Object-Oriented Programming in Python. Gained solid understanding of fundamental OOP concepts.",
    longDescription: "This introductory course provided a thorough foundation in object-oriented programming using Python. Covered essential OOP concepts including class definition, object instantiation, instance and class attributes, method types (instance, class, static), inheritance hierarchies, and method overriding. Built practical applications demonstrating proper encapsulation, code organization, and reusable design patterns. Learned to write clean, maintainable Python code following OOP best practices.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/python-oop-basics",
    skills: ["Python", "OOP Concepts", "Classes & Objects", "Inheritance", "Code Structure", "Encapsulation", "Method Design"],
    duration: "4 hours",
    level: "Intermediate",
    modules: [
      "Introduction to OOP",
      "Classes and Objects",
      "Instance and Class Attributes",
      "Methods and Functions",
      "Inheritance and Polymorphism",
      "Practical OOP Applications"
    ]
  },
  {
    slug: "generative-ai-in-fintech",
    title: "Generative AI in FinTech",
    issuer: "LinkedIn Learning",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&crop=center",
    description: "Completed a specialized course focused on the application of ChatGPT and generative AI technologies in the financial technology sector.",
    longDescription: "This cutting-edge course explored the transformative applications of generative artificial intelligence in the financial technology industry. Covered practical implementations of ChatGPT and other LLMs for automated customer support, intelligent fraud detection systems, personalized financial advisory services, and natural language processing for financial data analysis. Examined real-world case studies, ethical considerations, regulatory compliance, and future trends in AI-driven financial services.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/generative-ai-fintech",
    skills: ["Generative AI", "ChatGPT", "FinTech", "Fraud Detection", "Financial AI", "NLP", "Customer Support Automation"],
    duration: "5 hours",
    level: "Intermediate",
    modules: [
      "Introduction to Generative AI in Finance",
      "ChatGPT Applications in FinTech",
      "Automated Customer Support Systems",
      "AI-Powered Fraud Detection",
      "Personalized Financial Advisory",
      "Regulatory and Ethical Considerations"
    ]
  },
  {
    slug: "tata-data-visualisation-simulation",
    title: "Tata Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage (Tata Consultancy Services)",
    date: "2025-09-01",
    image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=800&h=400&fit=crop&crop=center",
    description: "Completed a job simulation focused on building impactful data visualizations and preparing business insights for Tata Consultancy Services.",
    longDescription: "This simulation program developed practical skills in transforming complex datasets into clear and compelling visuals that support executive decision-making. Activities included preparing strategic questions for senior client leadership meetings, designing insightful dashboards, and applying visualization best practices to communicate findings effectively. The program emphasized aligning analytical outputs with business objectives to empower leaders with actionable insights.",
    credentialUrl: "https://www.theforage.com/virtual-internships/prototype/tata/data-visualisation-simulation",
    skills: ["Data Visualization", "Business Insights", "Executive Communication", "Dashboard Design", "Decision-Making Support", "Analytics Storytelling"],
    duration: "6 hours",
    level: "Intermediate",
    modules: [
      "Introduction to Data Visualization in Business",
      "Preparing Questions for Senior Leadership",
      "Designing Effective Dashboards",
      "Transforming Data into Insights",
      "Storytelling with Analytics",
      "Communicating Recommendations to Executives"
    ]
  }
];

export default function CertificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Find the certification by slug
  const certification = certifications.find(cert => cert.slug === slug);

  // If certification not found, show 404
  if (!certification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-600 mb-4">404</div>
          <h1 className="text-2xl font-bold text-white mb-4">Certification Not Found</h1>
          <p className="text-gray-400 mb-8">The certification you are looking for does not exist.</p>
          <Link 
            href="/certifications"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certifications
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certifications
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 mb-8">
          <div className="relative h-64 w-full">
            <Image
              src={certification.image}
              alt={`${certification.title} certificate`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Credential Link */}
            {certification.credentialUrl && (
              <div className="absolute top-4 right-4">
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all"
                  title="View Certificate"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Certificate
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Description */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h1 className="text-3xl font-bold text-white mb-2">{certification.title}</h1>
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{certification.issuer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(certification.date)}</span>
                </div>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-300 leading-relaxed mb-4">{certification.description}</p>
                {certification.longDescription && (
                  <p className="text-gray-300 leading-relaxed">{certification.longDescription}</p>
                )}
              </div>
            </div>

            {/* Course Modules */}
            {certification.modules && (
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Course Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certification.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Learned */}
            {certification.skills && (
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certificate Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                Certificate Details
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Issuing Organization</div>
                  <div className="text-white font-medium">{certification.issuer}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Issue Date</div>
                  <div className="text-white font-medium">{formatDate(certification.date)}</div>
                </div>
                {certification.duration && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Duration</div>
                    <div className="text-white font-medium">{certification.duration}</div>
                  </div>
                )}
                {certification.level && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Level</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(certification.level)}`}>
                      {certification.level}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                {certification.credentialUrl && (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Certificate
                  </a>
                )}
                <Link
                  href="/certifications"
                  className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Certifications
                </Link>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
              <div className="text-center">
                <Award className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-bold mb-2">Verified Achievement</h4>
                <p className="text-gray-300 text-sm">This certification has been verified and is part of my professional development journey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
