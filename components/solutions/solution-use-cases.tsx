'use client';

import { Target, TrendingUp } from 'lucide-react';
import type { SolutionUseCase } from '@/types/solutions';
import { SectionHeader } from '@/components/shared/section-header';
import { useTabs } from '@/hooks/use-tabs';
import { cn } from '@/lib/utils';

interface SolutionUseCasesProps {
  useCases: SolutionUseCase[];
}

const ID = 'solution-use-cases';

export function SolutionUseCases({ useCases }: SolutionUseCasesProps) {
  if (useCases.length === 0) return null;
  return <UseCases useCases={useCases} />;
}

function UseCases({ useCases }: SolutionUseCasesProps) {
  const { active, select, getTabProps, getPanelProps } = useTabs(useCases.length);
  const activeUseCase = useCases[active];

  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Industry Use Cases"
          title={
            <>
              Built for <span className="text-gradient">Real-World Scenarios</span>
            </>
          }
          subtitle="How organizations in different industries apply this solution."
        />

        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-3xl border border-border bg-background-card p-1.5 shadow-sm sm:rounded-full"
            role="tablist"
            aria-label="Industries"
          >
            {useCases.map((uc, index) => (
              <button
                key={uc.id}
                {...getTabProps(index, ID)}
                onClick={() => select(index)}
                className={cn(
                  'min-h-[44px] rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-6',
                  active === index
                    ? 'bg-gradient-to-r from-accent-primary-hover to-accent-primary text-white shadow-glow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {uc.industry}
              </button>
            ))}
          </div>
        </div>
          <div
            key={activeUseCase.id}
            {...getPanelProps(ID)}
            className="mx-auto grid max-w-5xl gap-5 motion-safe:animate-panel-in md:grid-cols-2"
          >
            <div className="brand-card flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/15">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">The Challenge</h3>
                <p className="mt-2 text-base leading-relaxed text-text-primary">{activeUseCase.scenario}</p>
              </div>
            </div>
            <div className="brand-card-tinted flex gap-4 p-6 hover:translate-y-0">
              <span className="icon-tile h-11 w-11">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-primary">The Outcome</h3>
                <p className="mt-2 text-base font-medium leading-relaxed text-text-primary">{activeUseCase.outcome}</p>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
