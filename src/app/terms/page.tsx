import TermsClient from './TermsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the terms of service and usage conditions of Raghav Chawla\'s portfolio website.',
  alternates: {
    canonical: 'https://raghavchawla.dev/terms',
  },
  openGraph: {
    type: 'website',
    url: 'https://raghavchawla.dev/terms',
    title: 'Terms & Conditions | Raghav Chawla',
    description: 'Read the terms of service and usage conditions of Raghav Chawla\'s portfolio website.',
  },
};

export default function Page() {
  return <TermsClient />;
}