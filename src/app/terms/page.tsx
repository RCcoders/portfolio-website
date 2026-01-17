'use client';
import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import GlowCard from '@/components/ui/GlowCard';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlowCard className="p-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-green-600 bg-clip-text text-transparent mb-8">
                Terms & Conditions
              </h1>

              <div className="prose prose-invert max-w-none space-y-8">
                <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-300 leading-relaxed">
                    By accessing and using this website, you accept and agree to be bound by the terms
                    and provision of this agreement. If you do not agree to abide by the above, please
                    do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials on this website
                    for personal, non-commercial transitory viewing only. This is the grant of a license,
                    not a transfer of title, and under this license you may not modify or copy the materials.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
                  <p className="text-gray-300 leading-relaxed">
                    The materials on this website are provided on an &#39;as is&rsquo; basis. We make no warranties,
                    expressed or implied, and hereby disclaim and negate all other warranties including
                    without limitation, implied warranties or conditions of merchantability, fitness for
                    a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
                  <p className="text-gray-300 leading-relaxed">
                    In no event shall Raghav Chawla or its suppliers be liable for any damages (including,
                    without limitation, damages for loss of data or profit, or due to business interruption)
                    arising out of the use or inability to use the materials on this website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Accuracy of Materials</h2>
                  <p className="text-gray-300 leading-relaxed">
                    The materials appearing on this website could include technical, typographical, or
                    photographic errors. We do not warrant that any of the materials on its website are
                    accurate, complete, or current.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Links</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We have not reviewed all of the sites linked to our website and are not responsible
                    for the contents of any such linked site. The inclusion of any link does not imply
                    endorsement by us of the site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Modifications</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We may revise these terms of service for its website at any time without notice.
                    By using this website, you are agreeing to be bound by the then current version
                    of these terms of service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
                  <p className="text-gray-300 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with applicable
                    laws and you irrevocably submit to the exclusive jurisdiction of the courts in that
                    state or location.
                  </p>
                </section>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}