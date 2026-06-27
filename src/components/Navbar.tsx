'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'github', href: 'https://github.com/RCcoders' },
    { name: 'linkedin', href: 'https://www.linkedin.com/in/raghav-chawla-29255b275' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') { return true }
    if (path !== '/' && pathname.startsWith(path)) { return true }
    return false
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${scrolled
          ? 'bg-[#0d0d0d] border-neutral-900 py-3'
          : 'bg-transparent border-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-xl tracking-tighter text-white select-none">
                RAGHAV <span className="text-accent">CHAWLA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-150 ${isActive(item.href)
                    ? 'text-accent font-bold'
                    : 'text-neutral-400 hover:text-white'
                    }`}
                >
                  [{item.name.toLowerCase()}]
                </Link>
              ))}
            </div>

            {/* Desktop Socials */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors duration-150"
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-x-0 top-[57px] bg-[#0d0d0d] border-b border-neutral-900 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 pointer-events-none'
            }`}
        >
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block font-mono text-sm uppercase tracking-widest transition-colors ${isActive(item.href)
                  ? 'text-accent font-bold'
                  : 'text-neutral-400 hover:text-white'
                  }`}
              >
                [{item.name.toLowerCase()}]
              </Link>
            ))}

            <div className="pt-6 border-t border-neutral-900 flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
