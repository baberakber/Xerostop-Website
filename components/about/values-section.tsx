import { Lock, Lightbulb, Users, Award, GraduationCap, Target } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const values = [
  {
    icon: Lock,
    title: 'Security-First',
    description: "Security is not an afterthought - it's foundational to every solution we architect.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation-Driven',
    description: 'Continuously exploring emerging technologies to deliver competitive advantages.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Long-term relationships built on transparency, accountability, and shared success.',
  },
  {
    icon: Award,
    title: 'Technical Excellence',
    description: 'Uncompromising standards for engineering quality, documentation, and delivery.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description: 'Staying ahead through certifications, research, and hands-on experimentation.',
  },
  {
    icon: Target,
    title: 'Results-Oriented',
    description: 'Measurable outcomes over vanity metrics - ROI and operational impact matter.',
  },
];

export function ValuesSection() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Values"
          title={
            <>
              Principles that guide <span className="text-gradient">everything we do</span>
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div data-reveal
              key={value.title}
              className="brand-card group flex items-start gap-4"
            >
              <span className="icon-tile h-11 w-11">
                <value.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent-primary">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
