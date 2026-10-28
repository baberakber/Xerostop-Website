import type { Metadata } from 'next';
import { IndustriesHero } from '@/components/industries/industries-hero';
import { IndustriesGrid } from '@/components/industries/industries-grid';
import { CTASection } from '@/components/shared/cta-section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve in Saudi Arabia',
  description:
    'Sector-specific IT solutions for government, banking, enterprise, telecom, healthcare, and education in Saudi Arabia, aligned with NCA, SAMA, and PDPL rules.',
  path: '/industries/',
  keywords: ['government IT Saudi Arabia', 'banking IT SAMA', 'healthcare IT', 'education technology', 'telecom solutions'],
});

export default function IndustriesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <IndustriesHero />
      <IndustriesGrid />
      <CTASection
        heading={
          <>
            Ready to Transform Your <span className="text-gradient-light">Industry?</span>
          </>
        }
        description="Let's discuss how XeroStop can help you meet your sector-specific IT challenges."
        buttons={[
          { text: 'Schedule a Consultation', href: '/contact/', variant: 'primary' },
          { text: 'Explore Our Solutions', href: '/solutions/', variant: 'secondary' },
        ]}
        variant="gradient"
        align="center"
      />
    </main>
  );
}
