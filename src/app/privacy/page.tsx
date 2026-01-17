'use client';
import React from 'react';
import AcceptPrivacyButton from '@/components/AcceptPrivacyButton';
import PageTransition from '@/components/ui/PageTransition';
import GlowCard from '@/components/ui/GlowCard';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>

              <div className="prose prose-invert max-w-none space-y-8">
                <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account,
                    make a purchase, or contact us for support. This may include your name, email address,
                    phone number, and any other information you choose to provide.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services,
                    process transactions, communicate with you, send you technical notices and support messages,
                    and comply with legal obligations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties
                    without your consent, except as described in this privacy policy or as required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We implement appropriate security measures to protect your personal information against
                    unauthorized access, alteration, disclosure, or destruction. However, no method of
                    transmission over the internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights and Choices</h2>
                  <p className="text-gray-300 leading-relaxed">
                    You have the right to access, update, or delete your personal information. You may also
                    opt out of certain communications from us. To exercise these rights, please contact us
                    using the information provided below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking Technologies</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our website and
                    hold certain information to improve your experience and analyze usage patterns.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to This Privacy Policy</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes
                    by posting the new Privacy Policy on this page and updating the &quot;Last updated&ldquo; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
                  <p className="text-gray-300 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a
                      href="mailto:chawlaraghav78@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      chawlaraghav78@gmail.com
                    </a>
                  </p>
                </section>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <AcceptPrivacyButton />
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
