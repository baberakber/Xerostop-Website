import * as React from 'react';
import { SectionHeader } from '@/components/shared/section-header';
import { ServiceTile } from '@/components/services/service-tile';
import { services } from '@/lib/data/services';

export function Pillars() {
  return (
    <section className="section-padding cv-auto bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Expertise"
          title={
            <>
              Enterprise <span className="text-gradient">IT Services</span>
            </>
          }
          subtitle="Nine integrated practices, one accountable partner. We consult, design, deliver, and operate infrastructure that powers mission-critical operations."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceTile key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
