'use client';

import React from 'react';
import PageTransition from '@/components/ui/PageTransition';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="border-b border-neutral-900 pb-6">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-2">
              [legal / agreements]
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase m-0">
              TERMS & CONDITIONS
            </h1>
            <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider mt-4">
              [last updated: {new Date().toLocaleDateString()}]
            </p>
          </div>

          <div className="space-y-8 text-neutral-400 font-light text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[1. Acceptance of Terms]</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[2. Use License]</h2>
              <p>
                Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only. Under this license, you may not modify or copy the materials.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[3. Disclaimer]</h2>
              <p>
                The materials on this website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[4. Limitations]</h2>
              <p>
                In no event shall Raghav Chawla or his suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[5. Accuracy of Materials]</h2>
              <p>
                The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on this website are accurate, complete, or current.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[6. Links]</h2>
              <p>
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[7. Modifications]</h2>
              <p>
                We may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[8. Governing Law]</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}