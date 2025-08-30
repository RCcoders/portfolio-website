import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Raghav Chawla - Full Stack Developer',
    template: '%s | Raghav Chawla'
  },
  description: 'Full Stack Developer crafting digital experiences with modern technologies and creative solutions. Specializing in React, Next.js, TypeScript, and cloud technologies.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Web Development', 'Software Engineer', 'Raghav Chawla'],
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
    title: 'Raghav Chawla - Full Stack Developer',
    description: 'Full Stack Developer crafting digital experiences with modern technologies and creative solutions.',
    siteName: 'Raghav Chawla Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghav Chawla - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghav Chawla - Python Developer',
    description: 'Python Developer and machine learning entusiast, crafting digital experiences with modern technologies and creative solutions.',
    images: ['/og-image.jpg'],
    creator: '@raghavchawla',
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
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          {/* Background gradient effects */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <Navbar />
          
          <main className="flex-1 relative z-10">
            {children}
          </main>
          
          <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Left side - Brand and description */}
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-white mb-2">Raghav Chawla</h3>
                  <p className="text-gray-400 text-sm max-w-md">
                    Full Stack Developer crafting digital experiences with modern technologies.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    © {new Date().getFullYear()} Raghav Chawla. All rights reserved.
                  </p>
                </div>
                
                {/* Center - Quick Links */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-6 text-sm">
                    <a 
                      href="/about" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      About
                    </a>
                    <a 
                      href="/projects" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Projects
                    </a>
                    <a 
                      href="/certifications" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Certifications
                    </a>
                    <a 
                      href="/contact" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/RCcoders" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200 group"
                      aria-label="GitHub"
                    >
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/raghav-chawla-29255b275/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200 group"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com/raghavchawla" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200 group"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Right side - Legal links */}
                <div className="flex flex-col items-center md:items-end gap-4">
                  <div className="flex gap-4 text-sm">
                    <a 
                      href="/privacy" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Privacy
                    </a>
                    <a 
                      href="/terms" 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Terms
                    </a>
                    <a 
                      href="mailto:chawlaraghav78@gmail.com" 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      Email
                    </a>
                  </div>
                  
                  {/* Contact info */}
                  <div className="text-center md:text-right">
                    <p className="text-gray-500 text-xs">Based in Chandigarh, India</p>
                    <p className="text-gray-500 text-xs">Available for freelance work</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom section */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-500 text-xs">
                  Built with Next.js, TypeScript, and Tailwind CSS. Hosted on Vercel.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}