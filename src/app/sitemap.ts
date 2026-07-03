import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://raghavchawla.dev';
  
  // Static paths
  const staticPaths = [
    '',
    '/about',
    '/contact',
    '/projects',
    '/certifications',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  let certificatePaths: MetadataRoute.Sitemap = [];
  try {
    const certificates = await api.getCertificates();
    certificatePaths = certificates.map(cert => ({
      url: `${baseUrl}/certifications/${cert.slug}`,
      lastModified: new Date(cert.date || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }));
  } catch (err) {
    // Silent fail in build to ensure deployment robustness
    if (process.env.NODE_ENV !== 'production') {
      console.error('Sitemap generation failed to fetch certificates:', err);
    }
  }

  return [...staticPaths, ...certificatePaths];
}
