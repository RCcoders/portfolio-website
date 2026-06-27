import type { Metadata } from 'next'
import { Inter, Syne, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import ColorSwitcher from '@/components/ColorSwitcher'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '700', '800'] })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono' })

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const accent = localStorage.getItem('portfolio-accent');
                const text = localStorage.getItem('portfolio-accent-text');
                if (accent) document.documentElement.style.setProperty('--accent', accent);
                if (text) document.documentElement.style.setProperty('--accent-text', text);
              } catch (e) {}
            `
          }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} ${spaceMono.variable} font-sans bg-[#0d0d0d] text-white antialiased`}>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          <AnimatedBackground />

          <Navbar />

          <main className="flex-1 relative z-10">
            {children}
          </main>

          <ColorSwitcher />

          <footer className="relative z-10 border-t border-neutral-900 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                {/* Left side - Brand and description */}
                <div className="max-w-md">
                  <h3 className="text-lg font-bold tracking-tight text-white mb-3">RAGHAV CHAWLA</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Full Stack Developer / AI Engineer crafting deliberate, high-performance digital experiences.
                  </p>
                  <p className="text-neutral-600 text-xs font-mono mt-4">
                    © {new Date().getFullYear()} Raghav Chawla. All rights reserved.
                  </p>
                </div>

                {/* Center - Quick Links */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Navigation</span>
                  <div className="flex flex-col gap-2.5 text-sm font-mono text-neutral-400">
                    <Link href="/about" className="hover:text-accent transition-colors duration-200">
                      [about]
                    </Link>
                    <Link href="/projects" className="hover:text-accent transition-colors duration-200">
                      [projects]
                    </Link>
                    <Link href="/certifications" className="hover:text-accent transition-colors duration-200">
                      [certifications]
                    </Link>
                    <Link href="/contact" className="hover:text-accent transition-colors duration-200">
                      [contact]
                    </Link>
                  </div>
                </div>

                {/* Right side - Connect & Location */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Connect</span>
                  <div className="flex gap-4 mb-2">
                    <a
                      href="https://github.com/RCcoders"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-accent transition-colors duration-200 text-sm font-mono"
                    >
                      github
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raghav-chawla-29255b275/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-accent transition-colors duration-200 text-sm font-mono"
                    >
                      linkedin
                    </a>
                    <a
                      href="mailto:chawlaraghav78@gmail.com"
                      className="text-neutral-400 hover:text-accent transition-colors duration-200 text-sm font-mono"
                    >
                      email
                    </a>
                  </div>
                  <div className="text-xs font-mono text-neutral-600">
                    <p>Chandigarh, India • GMT+5:30</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}