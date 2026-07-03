import PrivacyClient from './PrivacyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy of Raghav Chawla\'s portfolio website detailing data handling practices.',
  alternates: {
    canonical: 'https://raghavchawla.dev/privacy',
  },
  openGraph: {
    type: 'website',
    url: 'https://raghavchawla.dev/privacy',
    title: 'Privacy Policy | Raghav Chawla',
    description: 'Read the privacy policy of Raghav Chawla\'s portfolio website detailing data handling practices.',
  },
};

export default function Page() {
  return <PrivacyClient />;
}
