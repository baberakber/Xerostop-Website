import type { ServiceFeature } from '@/lib/data/services';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/shared/section-header';

interface KeyOfferingsProps {
  title: string;
  offerings: ServiceFeature[];
}

export function KeyOfferings({ title, offerings }: KeyOfferingsProps) {
  return (
    <section id="offerings" className="section-padding scroll-mt-24 bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Core Offerings"
          title={
            <>
              What We Deliver in <span className="text-gradient">{title}</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {offerings.map((offering, index) => {
            const Icon = getIcon(offering.icon);
            return (
              <div data-reveal
                key={offering.title}
                className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-border bg-background-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/40 hover:shadow-[0_16px_36px_-20px_rgba(30,136,229,0.45)] md:p-7"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-primary to-accent-secondary transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/15 transition-colors duration-300 group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary md:text-xl">{offering.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary md:text-base">{offering.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
