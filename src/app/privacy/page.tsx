'use client';

import React from 'react';
import AcceptPrivacyButton from '@/components/AcceptPrivacyButton';
import PageTransition from '@/components/ui/PageTransition';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              [legal / regulatory]
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase m-0">
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider mt-4">
              [last updated: {new Date().toLocaleDateString()}]
            </p>
          </div>

          <div className="space-y-8 text-neutral-400 font-light text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[1. Information We Collect]</h2>
              <p>
                We collect information you provide directly to us, such as when you contact us for support or request information. This may include your name, email address, phone number, and any other details you choose to share.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[2. How We Use Your Information]</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, communicate with you, send you technical notices and support messages, and comply with legal obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[3. Information Sharing and Disclosure]</h2>
              <p>
                We do not sell, trade, or transfer your personal information to third parties without your consent, except as described in this privacy policy or as required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[4. Data Security]</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[5. Your Rights and Choices]</h2>
              <p>
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications. To exercise these rights, please contact us at the email provided below.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[6. Cookies and Tracking]</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your experience and analyze usage patterns.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[7. Changes to Policy]</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the last updated date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">[8. Contact Us]</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a
                  href="mailto:chawlaraghav78@gmail.com"
                  className="text-accent hover:underline font-mono"
                >
                  chawlaraghav78@gmail.com
                </a>
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-neutral-900 text-left">
            <AcceptPrivacyButton />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
