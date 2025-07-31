import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Raghav Chawla - Python Developer & Data Scientist',
    template: '%s | Raghav Chawla'
  },
  description: 'Python Developer specializing in Data Science, AI, and Machine Learning. Building intelligent solutions with modern technologies and creative problem-solving approaches.',
  keywords: ['Python Developer', 'Data Science', 'Machine Learning', 'AI', 'React', 'Next.js', 'Data Analysis', 'Software Engineer'],
  authors: [{ name: 'Raghav Chawla' }],
  creator: 'Raghav Chawla',
  publisher: 'Raghav Chawla',
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
    url: 'https://raghavchawla.dev',
    title: 'Raghav Chawla - Python Developer & Data Scientist',
    description: 'Python Developer specializing in Data Science, AI, and Machine Learning. Building intelligent solutions with modern technologies.',
    siteName: 'Raghav Chawla Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghav Chawla - Python Developer & Data Scientist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghav Chawla - Python Developer & Data Scientist',
    description: 'Python Developer specializing in Data Science, AI, and Machine Learning. Building intelligent solutions with modern technologies.',
    images: ['/og-image.jpg'],
    creator: '@raghav_dev',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://raghavchawla.dev'),
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
                    © {new Date().getFullYear()} Raghav Chawla. All rights reserved.
                  </p>
                </div>
                <div className="flex gap-4 text-sm text-gray-400">
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                  <a href="mailto:chawlaraghav78@gmail.com" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}