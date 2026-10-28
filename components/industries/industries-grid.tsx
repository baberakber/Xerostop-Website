import Link from 'next/link';
import { Landmark, Banknote, Building2, Radio, HeartPulse, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { industries } from '@/lib/data/industries';

const iconMap = {
  Landmark,
  Banknote,
  Building2,
  Radio,
  HeartPulse,
  GraduationCap,
} as const;

export function IndustriesGrid() {
  return (
    <section id="industries" className="scroll-mt-24 bg-background-secondary py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Sectors"
          title={
            <>
              Industries <span className="text-gradient">We Serve</span>
            </>
          }
          subtitle="Sector-specific expertise and solutions tailored to the regulatory and operational realities of each industry in Saudi Arabia."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon as keyof typeof iconMap] ?? Building2;
            return (
              <article
                key={industry.id}
                id={industry.slug}
                data-reveal
                className="group relative flex scroll-mt-28 flex-col rounded-xl border border-border bg-background-card p-6 transition-all duration-300 hover:border-accent-primary/30 hover:shadow-glow-sm md:p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary transition-colors group-hover:bg-accent-primary/20">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-primary">
                  {industry.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">{industry.description}</p>

                <div className="mb-5 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Key Challenges</h4>
                  <ul className="space-y-1.5">
                    {industry.challenges.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-accent-primary" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Key Solutions</h4>
                  <ul className="flex flex-wrap gap-2">
                    {industry.keySolutions.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-medium text-accent-primary"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <Link
                    href={`/contact/?subject=${encodeURIComponent(`${industry.title} IT consultation`)}`}
                    className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-accent-primary transition-colors hover:text-accent-primary-hover"
                  >
                    Discuss your {industry.title.toLowerCase()} needs
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
