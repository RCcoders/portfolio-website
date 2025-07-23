import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Your Name - Full Stack Developer',
    template: '%s | Your Name'
  },
  description: 'Full Stack Developer crafting digital experiences with modern technologies and creative solutions. Specializing in React, Next.js, TypeScript, and cloud technologies.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Web Development', 'Software Engineer'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Your Name - Full Stack Developer',
    description: 'Full Stack Developer crafting digital experiences with modern technologies and creative solutions.',
    siteName: 'Your Name Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Name - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Full Stack Developer',
    description: 'Full Stack Developer crafting digital experiences with modern technologies and creative solutions.',
    images: ['/og-image.jpg'],
    creator: '@yourusername',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://yourwebsite.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-gray-300 text-sm">
                    © {new Date().getFullYear()} Your Name. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                  <a href="mailto:your.email@example.com" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}