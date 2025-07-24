'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ExternalLink, Award, Building2 } from 'lucide-react';

// Mock certification data
const certifications = [
  {
    slug: "Deloitte Australia - Tehnology Job Simulation",
    title: "Deloitte Australia - Technology Job Simulation",
    issuer: "Forage",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&crop=center",
    description: "Successfully completed a technology-focused virtual job simulation designed to mirror real-world tasks and expectations in the tech industry. Gained practical experience in areas such as software development, data analysis, debugging, product design, and agile workflows.",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_mt5PFGpLjWdcYZC4S_1751976789361_completion_certificate.pdf"
  },
  {
    slug: "Advanced Python: Object-Oriented Programming",
    title: "Advanced Python: Object-Oriented Programming",
    issuer: "Linkedin Learning",
    date: "2025-04-21",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&crop=center",
    description: "Successfully completed IBM's introductory course on Python for Data Science. Gained foundational skills in Python programming, including data types, control structures, functions, and working with libraries such as NumPy and Pandas.",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/d4f57248668c4a8e99fd462a324256aa"
  },
  {
    slug: "Pyhton 101 for data Science",
    title: "Python 101 for Data Science",
    issuer: "IBM",
    date: "2025-03-21",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center",
    description: "Comprehensive understanding of Google Analytics including setup, configuration, data analysis, and reporting for digital marketing insights.",
    credentialUrl: "https://skillshop.exceedlms.com/student/path/508845"
  },
  {
    slug: "Pyhton Object-Oriented Programming",
    title: "Python Object-Oriented Programming",
    issuer: "Linkedin Learning",
    date: "2023-07-12",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop&crop=center",
    description: "Completed an introductory course on Object-Oriented Programming in Python. Gained a solid understanding of fundamental OOP concepts such as classes, objects, constructors, methods, and inheritance. Developed basic Python applications using object-oriented principles to improve code structure, readability, and reusability.",
    credentialUrl: "https://university.mongodb.com/certification"
  },
  {
    slug: "Uisng Chatgpt and Generative AI in FinTech",
    title: "Generative AI in FinTech",
    issuer: "Linkedin Learning",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop&crop=center",
    description: "Completed a specialized course focused on the application of ChatGPT and generative AI technologies in the financial technology (FinTech) sector. Explored use cases such as automated customer support, fraud detection, personalized financial advising, and natural language data analysis.",
    credentialUrl: "https://www.comptia.org/certifications/security"
  }
];
interface CertificateData {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}
// Certificate Card Component
const CertCard = ({ 
  slug, 
  title, 
  issuer, 
  date, 
  imageUrl, 
  description, 
  credentialUrl 
}) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 relative">
      {/* Certificate Image */}
      <div className="relative h-48 w-full">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <div className="bg-blue-600 text-white p-2 rounded-full">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Issuer */}
        <div className="flex items-center text-blue-400 mb-3">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">{issuer}</span>
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-400 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => window.open(credentialUrl, '_blank')}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            View Credential
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
          
          <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
            #{slug}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Certifications Page Component
export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Professional Certifications
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of professional certifications demonstrating expertise across various technologies and domains
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
              {certifications.length} Certifications Earned
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertCard
              key={cert.slug}
              slug={cert.slug}
              title={cert.title}
              issuer={cert.issuer}
              date={cert.date}
              imageUrl={cert.image}
              description={cert.description}
              credentialUrl={cert.credentialUrl}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
            <div className="text-gray-400">Total Certifications</div>
          </div>
          <div className="text-center bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">4</div>
            <div className="text-gray-400">Different Providers</div>
          </div>
          <div className="text-center bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">2024</div>
            <div className="text-gray-400">Latest Achievement</div>
          </div>
        </div>
      </div>
    </div>
  );
}
