import type { Metadata } from 'next';
import { AboutHero, CompanyStory, MissionVision, FocusAreas, WhySaudi, ValuesSection } from '@/components/about';
import { Stats } from '@/components/sections/stats';
import { CTASection } from '@/components/shared/cta-section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Us: Riyadh IT Consultancy',
  description:
    'XeroStop is a Riyadh-based enterprise IT consultancy helping organizations across Saudi Arabia and the GCC design, secure, and automate infrastructure.',
  path: '/about/',
  keywords: ['IT consultancy Riyadh', 'enterprise IT Saudi Arabia', 'Vision 2030 digital transformation', 'security consultancy'],
});

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutHero />
      <Stats className="mt-0 pb-0 pt-12 md:mt-0" />
      <CompanyStory />
      <MissionVision />
      <FocusAreas />
      <WhySaudi />
      <ValuesSection />
      <CTASection
        heading={
          <>
            Let&apos;s Build Your <span className="text-gradient-light">Next Platform</span>
          </>
        }
        description="Let's discuss how XeroStop can help you design, secure, and automate your IT environment."
        buttons={[
          { text: 'Schedule a Consultation', href: '/contact/', variant: 'primary' },
          { text: 'Explore Our Services', href: '/services/', variant: 'secondary' },
        ]}
        variant="gradient"
        align="center"
      />
    </main>
  );
}
