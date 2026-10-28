import type { Metadata } from 'next';
import {
  Hero,
  Stats,
  Journey,
  Pillars,
  WhyXerostop,
  SolutionsShowcase,
  PartnersMarquee,
  LatestInsights,
} from '@/components/sections';
import { CTASection } from '@/components/shared/cta-section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'XeroStop | Enterprise IT Consultancy in Saudi Arabia',
  absoluteTitle: true,
  description:
    'Riyadh-based IT consultancy that designs, secures, and automates enterprise infrastructure: unified communications, datacenter, network, security, and AI.',
  path: '/',
  keywords: [
    'IT consultancy Saudi Arabia',
    'enterprise IT Riyadh',
    'unified communications',
    'contact center',
    'datacenter',
    'network security',
    'AI solutions',
    'managed services',
    'low current systems',
  ],
});

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Stats />
      <Journey />
      <Pillars />
      <WhyXerostop />
      <SolutionsShowcase />
      <PartnersMarquee />
      <LatestInsights />
      <CTASection
        heading={
          <>
            Ready to Transform Your <span className="text-gradient-light">Infrastructure?</span>
          </>
        }
        description="Schedule a free consultation with our enterprise architects and get a clear roadmap for your next initiative."
        buttons={[
          { text: 'Book a Consultation', href: '/contact/', variant: 'primary' },
          { text: 'Explore Services', href: '/services/', variant: 'secondary' },
        ]}
      />
    </main>
  );
}
