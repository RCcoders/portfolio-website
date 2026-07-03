import ProjectsClient from './ProjectsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Archive',
  description: 'Explore a detailed log of full-stack systems, machine learning models, and automation tools built by Raghav Chawla.',
  alternates: {
    canonical: 'https://raghavchawla.dev/projects',
  },
  openGraph: {
    type: 'website',
    url: 'https://raghavchawla.dev/projects',
    title: 'Projects Archive | Raghav Chawla',
    description: 'Explore a detailed log of full-stack systems, machine learning models, and automation tools built by Raghav Chawla.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Raghav Chawla - Projects Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects Archive | Raghav Chawla',
    description: 'Explore a detailed log of full-stack systems, machine learning models, and automation tools built by Raghav Chawla.',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return <ProjectsClient />;
}
