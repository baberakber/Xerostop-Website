import { Users, Building2, Cpu } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const focusAreas = [
  {
    icon: Users,
    title: 'Consultancy & Expertise',
    description:
      'Senior engineers and architects delivering hands-on guidance across UC, Datacenter, Network, Security, and Software domains.',
  },
  {
    icon: Building2,
    title: 'Enterprise-Grade Solutions',
    description:
      'Scalable, resilient infrastructure designed for large enterprise and government requirements - built to perform, built to last.',
  },
  {
    icon: Cpu,
    title: 'AI as Enabler',
    description:
      'Integrating AI/ML capabilities to automate operations, enhance security posture, and accelerate digital transformation.',
  },
];

export function FocusAreas() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="What We Do"
          title={
            <>
              Enterprise-grade solutions powered by <span className="text-gradient">deep technical expertise</span>
            </>
          }
          subtitle="We combine consultancy expertise with cutting-edge AI innovation to deliver transformative results."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <div data-reveal
              key={area.title}
              className="brand-card-tinted group"
            >
              <span className="icon-tile mb-5 h-14 w-14">
                <area.icon className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent-primary">
                {area.title}
              </h3>
              <p className="mt-3 leading-relaxed text-text-secondary">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
