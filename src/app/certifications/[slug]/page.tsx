'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, Award, ArrowLeft, Building2, CheckCircle } from 'lucide-react';
import { api, Certificate } from '@/lib/api';
import { motion } from 'framer-motion';
import PageTransition from '@/components/ui/PageTransition';
import GlowCard from '@/components/ui/GlowCard';

export default function CertificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [certification, setCertification] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCert = async () => {
      try {
        const data = await api.getCertificateBySlug(slug);
        setCertification(data);
      } catch (err) {
        console.error('Failed to fetch certificate:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCert();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If certification not found, show 404
  if (error || !certification) {
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
    <PageTransition>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Certifications
            </button>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 mb-8 group"
          >
            <div className="relative h-64 w-full">
              <Image
                src={certification.image}
                alt={`${certification.title} certificate`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Credential Link */}
              {certification.credentialUrl && (
                <div className="absolute top-4 right-4">
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all hover:scale-105"
                    title="View Certificate"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Certificate
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlowCard className="p-6">
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
                </GlowCard>
              </motion.div>

              {/* Course Modules */}
              {certification.modules && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <GlowCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-sky-400" />
                      Course Modules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {certification.modules.map((module, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-sky-600/20">
                            {index + 1}
                          </div>
                          <span className="text-gray-300">{module}</span>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              )}

              {/* Skills Learned */}
              {certification.skills && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <GlowCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {certification.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Certificate Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlowCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-400" />
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
                </GlowCard>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlowCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Actions</h3>
                  <div className="space-y-3">
                    {certification.credentialUrl && (
                      <a
                        href={certification.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </a>
                    )}
                    <Link
                      href="/certifications"
                      className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      All Certifications
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-sky-600/20 to-green-600/20 rounded-xl p-6 border border-sky-500/30"
              >
                <div className="text-center">
                  <Award className="w-12 h-12 text-sky-400 mx-auto mb-3 animate-pulse" />
                  <h4 className="text-white font-bold mb-2">Verified Achievement</h4>
                  <p className="text-gray-300 text-sm">This certification has been verified and is part of my professional development journey.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
