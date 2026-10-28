import { MapPin, ShieldCheck, TrendingUp, Scale, Headphones, Landmark } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const reasons = [
  {
    icon: MapPin,
    title: 'Local Presence, Bilingual Teams',
    description: 'Riyadh-based consultants who work on site with your stakeholders in Arabic and English.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory-Aligned Designs',
    description: 'Architectures aligned with NCA ECC, SAMA CSF, and PDPL data-residency requirements.',
  },
  {
    icon: TrendingUp,
    title: 'Vision 2030 Focus',
    description: 'Digital transformation roadmaps that support national and organizational Vision 2030 goals.',
  },
  {
    icon: Scale,
    title: 'Vendor-Agnostic Advice',
    description: 'We recommend the platforms that fit your requirements and budget, not the highest margin.',
  },
  {
    icon: Headphones,
    title: '24/7 Support, Local SLAs',
    description: 'Round-the-clock monitoring and support with clear service levels and in-Kingdom escalation.',
  },
  {
    icon: Landmark,
    title: 'Government & Enterprise Experience',
    description: 'Delivery experience across government entities, banks, healthcare, and large enterprises.',
  },
];

export function WhySaudi() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Why XeroStop"
          title={
            <>
              Why Saudi Enterprises <span className="text-gradient">Trust XeroStop</span>
            </>
          }
          subtitle="Global engineering standards, delivered by a team that understands the Kingdom's regulations, culture, and priorities."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div data-reveal
              key={reason.title}
              className="brand-card group"
            >
              <span className="icon-tile mb-5">
                <reason.icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent-primary">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
