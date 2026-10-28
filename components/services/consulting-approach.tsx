import { Search, PenTool, Rocket, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const phases = [
  {
    id: 'consult',
    title: 'Consult',
    subtitle: 'What we consult on',
    points: ['Assessments & audits', 'Strategy & roadmaps', 'Vendor selection'],
    icon: Search,
  },
  {
    id: 'design',
    title: 'Design',
    subtitle: 'What we design',
    points: ['High & low-level design', 'HA / DR architecture', 'Security by design'],
    icon: PenTool,
  },
  {
    id: 'deliver',
    title: 'Deliver',
    subtitle: 'What we deliver',
    points: ['Implementation & migration', 'Integration & testing', 'Managed support'],
    icon: Rocket,
  },
];

export function ConsultingApproach() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Approach"
          title={
            <>
              Our Consulting <span className="text-gradient">Model</span>
            </>
          }
          subtitle="A structured approach that keeps your business goals and technology investments aligned at every step."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {phases.map((phase, index) => (
            <div data-reveal
              key={phase.id}
              className="relative"
            >
              <div className="brand-card-tinted h-full">
                <span className="absolute right-6 top-5 text-4xl font-black text-accent-primary/10">0{index + 1}</span>
                <span className="icon-tile h-12 w-12 rounded-xl">
                  <phase.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-text-primary">{phase.title}</h3>
                <p className="text-sm font-semibold text-accent-primary">{phase.subtitle}</p>
                <ul className="mt-5 space-y-2">
                  {phase.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {index < phases.length - 1 && (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background-card text-accent-primary shadow md:flex">
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
