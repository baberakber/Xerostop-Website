import type { SolutionFeature } from '@/types/solutions';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/shared/section-header';

interface SolutionFeaturesProps {
  solutionTitle: string;
  features: SolutionFeature[];
}

export function SolutionFeatures({ solutionTitle, features }: SolutionFeaturesProps) {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Key Features"
          title={
            <>
              What&apos;s Inside <span className="text-gradient">{solutionTitle}</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <div data-reveal
                key={feature.id}
                className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-border bg-background-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:shadow-[0_16px_36px_-20px_rgba(30,136,229,0.45)]"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-primary to-accent-secondary transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/15 transition-colors duration-300 group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
