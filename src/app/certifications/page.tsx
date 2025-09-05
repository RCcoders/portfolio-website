'use client';

import React from 'react';
import CertCard from '@/components/CertCard';

// Mock certification data
const certifications = [
  {
    slug: "deloitte-australia-technology-job-simulation",
    title: "Deloitte Australia - Technology Job Simulation",
    issuer: "Forage",
    date: "2025-07-15",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop&crop=center",
    description: "Successfully completed a technology-focused virtual job simulation designed to mirror real-world tasks and expectations in the tech industry. Gained practical experience in areas such as software development, data analysis, debugging, product design, and agile workflows.",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_mt5PFGpLjWdcYZC4S_1751976789361_completion_certificate.pdf"
  },
  {
    slug: "advanced-python-object-oriented-programming",
    title: "Advanced Python: Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    date: "2025-04-21",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&crop=center",
    description: "Mastered advanced object-oriented programming concepts in Python, including inheritance, polymorphism, encapsulation, and design patterns. Built complex applications using OOP principles to create maintainable and scalable code.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/advanced-python-oop"
  },
  {
    slug: "python-101-for-data-science",
    title: "Python 101 for Data Science",
    issuer: "IBM",
    date: "2025-03-21",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center",
    description: "Successfully completed IBM's introductory course on Python for Data Science. Gained foundational skills in Python programming, including data types, control structures, functions, and working with libraries such as NumPy and Pandas for data manipulation and analysis.",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/d4f57248668c4a8e99fd462a324256aa"
  },
  {
    slug: "python-object-oriented-programming",
    title: "Python Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    date: "2023-07-12",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop&crop=center",
    description: "Completed an introductory course on Object-Oriented Programming in Python. Gained a solid understanding of fundamental OOP concepts such as classes, objects, constructors, methods, and inheritance. Developed basic Python applications using object-oriented principles to improve code structure, readability, and reusability.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/python-oop-basics"
  },
  {
    slug: "generative-ai-in-fintech",
    title: "Generative AI in FinTech",
    issuer: "LinkedIn Learning",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop&crop=center",
    description: "Completed a specialized course focused on the application of ChatGPT and generative AI technologies in the financial technology (FinTech) sector. Explored use cases such as automated customer support, fraud detection, personalized financial advising, and natural language data analysis.",
    credentialUrl: "https://www.linkedin.com/learning/certificates/generative-ai-fintech"
  },
  {
    slug: "tata-data-visualisation-simulation",
    title: "Tata Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage (Tata Consultancy Services)",
    date: "2025-09-01",
    image: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=300&h=200&fit=crop&crop=center",
    description: "Completed a job simulation focused on creating data visualizations to support business decision-making at Tata Consultancy Services. The program involved preparing executive-level questions for client meetings, designing visuals for data analysis, and presenting insights that enable senior leadership to make informed and strategic business decisions.",
    credentialUrl: "https://www.theforage.com/virtual-internships/prototype/tata/data-visualisation-simulation"

  }
];

// Main Certifications Page Component
export default function CertificationsPage() {
  // 🔹 Dynamic Stats
  const totalCerts = certifications.length;
  const uniqueProviders = new Set(certifications.map(cert => cert.issuer)).size;
  const latestYear = Math.max(...certifications.map(cert => new Date(cert.date).getFullYear()));

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
              {totalCerts} Certifications Earned
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
            <div className="text-3xl font-bold text-blue-400 mb-2">{totalCerts}</div>
            <div className="text-gray-400">Total Certifications</div>
          </div>
          <div className="text-center bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">{uniqueProviders}</div>
            <div className="text-gray-400">Different Providers</div>
          </div>
          <div className="text-center bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">{latestYear}</div>
            <div className="text-gray-400">Latest Achievement</div>
          </div>
        </div>
      </div>
    </div>
  );
}
