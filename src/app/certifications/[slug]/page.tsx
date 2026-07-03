import CertificationDetailClient from './CertificationDetailClient';
import { Metadata } from 'next';
import { api } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  try {
    const certification = await api.getCertificateBySlug(slug);
    if (!certification) {
      return {
        title: 'Credential Registry',
        description: 'Professional credentials and course validation registry.',
      };
    }
    const title = `${certification.title} - Certificate`;
    const description = `Validation of Raghav Chawla's achievement: ${certification.title} issued by ${certification.issuer}. ${certification.description}`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://raghavchawla.dev/certifications/${slug}`,
      },
      openGraph: {
        type: 'website',
        url: `https://raghavchawla.dev/certifications/${slug}`,
        title: `${title} | Raghav Chawla`,
        description,
        images: [
          {
            url: certification.image || '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | Raghav Chawla`,
        description,
        images: [certification.image || '/og-image.jpg'],
      },
    };
  } catch {
    return {
      title: 'Credential Registry | Raghav Chawla',
      description: 'Professional credentials and course validation registry.',
    };
  }
}

export default function Page() {
  return <CertificationDetailClient />;
}
