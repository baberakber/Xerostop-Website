import { SectionHeader } from '@/components/shared/section-header';
import { services } from '@/lib/data/services';
import { ServiceTile } from './service-tile';

export function ServicesGrid() {
  return (
    <section id="services" className="section-padding scroll-mt-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Expertise"
          title={
            <>
              Our Service <span className="text-gradient">Areas</span>
            </>
          }
          subtitle="Comprehensive IT solutions across nine core domains, each backed by deep expertise and a proven delivery methodology."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceTile key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
