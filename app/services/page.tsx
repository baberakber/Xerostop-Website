import type { Metadata } from 'next';
import { ServicesHero } from '@/components/services/services-hero';
import { ConsultingApproach } from '@/components/services/consulting-approach';
import { ServicesGrid } from '@/components/services/services-grid';
import { ServicesCTA } from '@/components/services/services-cta';
import { JsonLd } from '@/components/seo/json-ld';
import { services } from '@/lib/data/services';
import { itemListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Enterprise IT Consulting Services',
  description:
    'IT consulting services in Saudi Arabia: unified communications, contact center, datacenter, network, security, software, AI, managed services, and ELV.',
  path: '/services/',
  keywords: ['IT consulting services', 'enterprise IT services Saudi Arabia', 'UC', 'contact center', 'datacenter', 'network', 'security', 'AI', 'managed services'],
});

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd
        data={itemListSchema(
          'XeroStop services',
          services.map((s) => ({ name: s.title, path: `/services/${s.slug}/` }))
        )}
      />
      <ServicesHero />
      <ConsultingApproach />
      <ServicesGrid />
      <ServicesCTA />
    </main>
  );
}
