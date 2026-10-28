import { Wrench, ShieldCheck, Brain, Target, Eye } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const statements = [
  {
    icon: Target,
    label: 'Our Mission',
    text: 'To engineer secure, resilient, and intelligent infrastructure that lets organizations operate with confidence and serve their people and customers without interruption.',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    text: "To be the region's most trusted engineering partner for mission-critical IT, recognized for technical depth, accountability, and lasting client outcomes.",
  },
];

const pillars = [
  {
    icon: Wrench,
    title: 'Engineering Mindset',
    description:
      'Precision-driven, architecture-first approach to IT challenges. We engineer solutions, not quick fixes.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description:
      'Built-in security culture, regulatory awareness, and zero-trust principles at the core of everything we design.',
  },
  {
    icon: Brain,
    title: 'AI-Driven Future',
    description:
      'Leveraging AI/ML to automate, optimize, and future-proof infrastructure for the challenges ahead.',
  },
];

export function MissionVision() {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Mission & Vision"
          title={
            <>
              Purpose that drives <span className="text-gradient">every engagement</span>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {statements.map((item, index) => (
            <div data-reveal
              key={item.label}
              className="navy-band relative overflow-hidden rounded-2xl p-8 text-white shadow-[0_24px_50px_-28px_rgba(11,31,58,0.6)] md:p-10"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.35),transparent_70%)]" aria-hidden />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <item.icon className="h-6 w-6 text-sky-300" />
              </span>
              <h3 className="relative mt-6 text-sm font-bold uppercase tracking-[0.2em] text-sky-300">{item.label}</h3>
              <p className="relative mt-3 text-lg font-medium leading-relaxed text-white/90 md:text-xl">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div data-reveal
              key={pillar.title}
              className="brand-card group"
            >
              <span className="icon-tile mb-5">
                <pillar.icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
