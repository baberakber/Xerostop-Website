import { CheckCircle2, PackageCheck, TrendingUp } from 'lucide-react';
import type { Solution } from '@/types/solutions';

interface SolutionDeliverablesProps {
  deliverables: Solution['deliverables'];
  benefits: Solution['benefits'];
}

export function SolutionDeliverables({ deliverables, benefits }: SolutionDeliverablesProps) {
  return (
    <section id="included" className="section-padding scroll-mt-24 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            data-reveal
            className="relative overflow-hidden rounded-2xl border border-border bg-background-card p-7 shadow-sm md:p-8"
          >
            <div className="flex items-center gap-4">
              <span className="icon-tile h-11 w-11">
                <PackageCheck className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-text-primary">What You Get</h3>
            </div>
            <ul className="mt-6 divide-y divide-border">
              {deliverables.map((item) => (
                <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
                  <span>
                    <span className="block text-sm font-semibold text-text-primary md:text-base">{item.title}</span>
                    <span className="block text-sm text-text-secondary">{item.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="navy-band relative overflow-hidden rounded-2xl p-7 text-white shadow-[0_24px_50px_-30px_rgba(11,31,58,0.7)] md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" aria-hidden />
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sky-300 ring-1 ring-white/20">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold text-white">Business Outcomes</h3>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                    <span className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-300" />
                      <span className="text-sm font-semibold text-white md:text-base">{benefit.title}</span>
                    </span>
                    {benefit.metric && (
                      <span className="rounded-full border border-sky-300/30 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
                        {benefit.metric}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
