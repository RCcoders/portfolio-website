/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Certificate } from '@/lib/api';
import PageTransition from '@/components/ui/PageTransition';

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
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-neutral-500">
        [fetching credential data...]
      </div>
    );
  }

  if (error || !certification) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-left font-mono">
          <div className="text-5xl font-extrabold text-accent mb-4">404</div>
          <h1 className="text-xl font-bold text-white mb-2 uppercase">[credential not found]</h1>
          <p className="text-neutral-500 mb-8 max-w-sm">The certification you are looking for does not exist in our registry.</p>
          <Link
            href="/certifications"
            className="text-white hover:text-accent underline uppercase tracking-widest text-xs"
          >
            [back to index]
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

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">
        
        {/* Back Button */}
        <div className="border-b border-neutral-900 pb-4">
          <button
            onClick={() => router.back()}
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            [← back to index]
          </button>
        </div>

        {/* Dynamic Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">
            {certification.issuer}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase leading-none m-0">
            {certification.title}
          </h1>
          <span className="font-mono text-xs text-neutral-500 uppercase mt-2">
            [issued: {formatDate(certification.date)}]
          </span>
        </div>

        {/* Flat Image Block */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 border border-neutral-800 overflow-hidden">
          <img
            src={certification.image}
            alt={`${certification.title} certificate`}
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.01]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Preview';
            }}
          />
          
          {certification.credentialUrl && (
            <div className="absolute top-4 right-4">
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-neutral-800 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent hover:text-accent-text hover:border-accent transition-colors"
              >
                [verify link]
              </a>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start mt-6">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8 text-neutral-400 font-light text-base leading-relaxed">
            <div className="space-y-4">
              <p className="text-white text-lg font-normal">{certification.description}</p>
              {certification.longDescription && (
                <p>{certification.longDescription}</p>
              )}
            </div>

            {/* Modules list */}
            {certification.modules && certification.modules.length > 0 && (
              <div className="border-t border-neutral-900 pt-8">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-4">[syllabus modules]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs text-neutral-300">
                  {certification.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-neutral-600">0{index + 1}.</span>
                      <span>{module.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 border-t lg:border-t-0 lg:border-l border-neutral-900 pt-8 lg:pt-0 lg:pl-12 font-mono text-xs uppercase tracking-widest">
            
            {/* Info Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-neutral-500 block mb-1">[provider]</span>
                <span className="text-white font-bold">{certification.issuer}</span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-1">[issue date]</span>
                <span className="text-white font-bold">{formatDate(certification.date)}</span>
              </div>
              {certification.duration && (
                <div>
                  <span className="text-neutral-500 block mb-1">[duration]</span>
                  <span className="text-white font-bold">{certification.duration}</span>
                </div>
              )}
              {certification.level && (
                <div>
                  <span className="text-neutral-500 block mb-1">[difficulty]</span>
                  <span className="text-accent font-bold">{certification.level}</span>
                </div>
              )}
            </div>

            {/* Skills & Technologies */}
            {certification.skills && certification.skills.length > 0 && (
              <div className="border-t border-neutral-900 pt-6">
                <span className="text-neutral-500 block mb-3">[tags & domains]</span>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-neutral-950 border border-neutral-900 text-neutral-300 px-2 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back action */}
            <div className="border-t border-neutral-900 pt-6 flex flex-col gap-3">
              {certification.credentialUrl && (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-accent hover:opacity-90 text-accent-text py-3 font-bold transition-colors"
                >
                  [verify credential]
                </a>
              )}
              <Link
                href="/certifications"
                className="w-full text-center border border-neutral-800 hover:border-white text-white py-3 transition-colors"
              >
                [back to registry]
              </Link>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
