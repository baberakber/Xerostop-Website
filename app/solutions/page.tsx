import type { Metadata } from 'next';
import { SolutionsHero } from '@/components/solutions/solutions-hero';
import { SolutionsContent } from '@/components/solutions/solutions-content';
import { CTASection } from '@/components/shared/cta-section';
import { JsonLd } from '@/components/seo/json-ld';
import { solutions } from '@/lib/data/solutions';
import { itemListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Enterprise IT Solutions & Frameworks',
  description:
    'Packaged enterprise IT solutions: AI-augmented UC monitoring, high-availability VoIP, secure datacenter, and intelligent network automation for Saudi enterprises.',
  path: '/solutions/',
  keywords: ['enterprise IT solutions', 'UC monitoring', 'HA VoIP', 'datacenter security', 'network automation'],
});

export default function SolutionsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd
        data={itemListSchema(
          'XeroStop solutions',
          solutions.map((s) => ({ name: s.title, path: `/solutions/${s.slug}/` }))
        )}
      />
      <SolutionsHero />
      <SolutionsContent />
      <CTASection
        heading={
          <>
            Not Sure Which Solution <span className="text-gradient-light">Fits Best?</span>
          </>
        }
        description="Talk to our architects. We'll assess your environment and recommend the right combination of solutions and services."
        buttons={[
          { text: 'Schedule a Consultation', href: '/contact/', variant: 'primary' },
          { text: 'Explore Services', href: '/services/', variant: 'secondary' },
        ]}
      />
    </main>
  );
}
