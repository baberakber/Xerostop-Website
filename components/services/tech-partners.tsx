import type { ReactNode } from 'react';
import { SectionHeader } from '@/components/shared/section-header';
import { TechLogo } from '@/components/shared/tech-logo';
import { cn } from '@/lib/utils';

interface TechPartnersProps {
  technologies: string[];
  badge?: string;
  title?: ReactNode;
  subtitle?: string;
  className?: string;
}

export function TechPartners({
  technologies,
  badge = 'Technology Ecosystem',
  title = (
    <>
      Platforms We <span className="text-gradient">Work With</span>
    </>
  ),
  subtitle = 'Vendor-agnostic expertise across leading enterprise platforms.',
  className,
}: TechPartnersProps) {
  if (technologies.length === 0) return null;

  return (
    <section className={cn('section-padding cv-auto bg-background-primary', className)}>
      <div className="container mx-auto px-4">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              data-reveal="scale"
              key={tech}
              className="group flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-background-card px-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/50 hover:shadow-glow-sm"
            >
              <TechLogo name={tech} className="h-14 w-full max-w-[160px]" />
              <span className="text-center text-xs font-semibold text-text-secondary transition-colors group-hover:text-text-primary sm:text-sm">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
