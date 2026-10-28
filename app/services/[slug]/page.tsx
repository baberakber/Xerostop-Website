import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/data/services';
import {
  ServiceHero,
  KeyOfferings,
  ServiceLists,
  CapabilitiesGrid,
  ConsultingPhases,
  TechPartners,
  RelatedServices,
  ServiceCTA,
} from '@/components/services';
import { JsonLd } from '@/components/seo/json-ld';
import { serviceSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return { title: 'Service Not Found', robots: { index: false } };
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
    keywords: service.keywords,
    image: { url: service.heroImage, width: 1200, height: 900, alt: service.title },
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <JsonLd data={serviceSchema(service)} />
      <ServiceHero service={service} />
      <KeyOfferings title={service.title} offerings={service.keyOfferings} />
      <ServiceLists lists={service.serviceLists} />
      <CapabilitiesGrid title={service.capabilitiesTitle} capabilities={service.capabilities} />
      <ConsultingPhases
        serviceTitle={service.title}
        consult={service.consult}
        design={service.design}
        deliver={service.deliver}
        useCases={service.useCases}
      />
      <TechPartners technologies={service.technologies} />
      <RelatedServices currentSlug={service.slug} relatedSlugs={service.relatedServices} />
      <ServiceCTA service={service} />
    </main>
  );
}
