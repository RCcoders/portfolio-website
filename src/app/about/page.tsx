import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Raghav Chawla - software developer and machine learning specialist focusing on Python development, data science, and backend APIs.',
  alternates: {
    canonical: 'https://raghavchawla.dev/about',
  },
  openGraph: {
    type: 'profile',
    url: 'https://raghavchawla.dev/about',
    title: 'About Raghav Chawla | Software Developer & AI Specialist',
    description: 'Learn more about Raghav Chawla - software developer and machine learning specialist focusing on Python development, data science, and backend APIs.',
    images: [
      {
        url: '/images/MyImage.jpeg',
        width: 800,
        height: 800,
        alt: 'Raghav Chawla - Profile Photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Raghav Chawla | Software Developer & AI Specialist',
    description: 'Learn more about Raghav Chawla - software developer and machine learning specialist focusing on Python development, data science, and backend APIs.',
    images: ['/images/MyImage.jpeg'],
  },
};

export default function Page() {
  return <AboutClient />;
}