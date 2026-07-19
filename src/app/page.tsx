import HomeClient from './HomeClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raghav Chawla | Full Stack Developer & AI Engineer',
  description: 'Portfolio of Raghav Chawla, a Full Stack Developer and AI Engineer based in Chandigarh, India. Specializing in Python, React, Next.js, and Machine Learning models.',
  alternates: {
    canonical: 'https://raghavchawla.dev',
  },
  openGraph: {
    type: 'website',
    url: 'https://raghavchawla.dev',
    title: 'Raghav Chawla | Full Stack Developer & AI Engineer',
    description: 'Portfolio of Raghav Chawla, a Full Stack Developer and AI Engineer based in Chandigarh, India. Specializing in Python, React, Next.js, and Machine Learning models.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghav Chawla Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghav Chawla | Full Stack Developer & AI Engineer',
    description: 'Portfolio of Raghav Chawla, a Full Stack Developer and AI Engineer based in Chandigarh, India. Specializing in Python, React, Next.js, and Machine Learning models.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raghav Chawla",
    "jobTitle": "Full Stack Developer & AI Engineer",
    "url": "https://raghavchawla.dev",
    "sameAs": [
      "https://github.com/RCcoders",
      "https://www.linkedin.com/in/raghav-chawla-29255b275/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chandigarh",
      "addressCountry": "India"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
}
