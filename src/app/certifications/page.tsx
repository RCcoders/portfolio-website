import CertificationsClient from './CertificationsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'View the professional credentials, courses, and technical achievements earned by Raghav Chawla.',
  alternates: {
    canonical: 'https://raghavchawla.dev/certifications',
  },
  openGraph: {
    type: 'website',
    url: 'https://raghavchawla.dev/certifications',
    title: 'Certifications | Raghav Chawla',
    description: 'View the professional credentials, courses, and technical achievements earned by Raghav Chawla.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghav Chawla - Certifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications | Raghav Chawla',
    description: 'View the professional credentials, courses, and technical achievements earned by Raghav Chawla.',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return <CertificationsClient />;
}
