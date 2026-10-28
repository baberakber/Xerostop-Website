'use client';

import { Search, PenTool, Rocket, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/section-header';
import { useTabs } from '@/hooks/use-tabs';
import type { ServiceOffering } from '@/lib/data/services';

interface ConsultingPhasesProps {
  serviceTitle: string;
  consult: ServiceOffering[];
  design: ServiceOffering[];
  deliver: ServiceOffering[];
  useCases: string[];
}

const phases = [
  { id: 'consult' as const, label: 'Consult', title: 'What We Consult On', icon: Search },
  { id: 'design' as const, label: 'Design', title: 'What We Design', icon: PenTool },
  { id: 'deliver' as const, label: 'Deliver', title: 'What We Deliver', icon: Rocket },
];

const ID = 'consulting-phases';

export function ConsultingPhases(props: ConsultingPhasesProps) {
  return <ConsultingPhasesContent {...props} />;
}

function ConsultingPhasesContent({ serviceTitle, useCases, ...offeringsByPhase }: ConsultingPhasesProps) {
  const { active, select, getTabProps, getPanelProps } = useTabs(phases.length);
  const activePhase = phases[active];
  const currentOfferings = offeringsByPhase[activePhase.id];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Our Consulting Model"
          title={
            <>
              Consult. Design. <span className="text-gradient">Deliver.</span>
            </>
          }
          subtitle={`A structured, accountable approach to delivering ${serviceTitle.toLowerCase()} outcomes.`}
        />

        <div className="mb-10 flex justify-center">
          <div
            className="inline-flex max-w-full rounded-full border border-border bg-background-card p-1 shadow-sm sm:p-1.5"
            role="tablist"
            aria-label="Consulting phases"
          >
            {phases.map((phase, index) => {
              const isActive = active === index;
              return (
                <button
                  key={phase.id}
                  {...getTabProps(index, ID)}
                  onClick={() => select(index)}
                  className={cn(
                    'relative flex min-h-[44px] items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors duration-300 min-[360px]:px-4 sm:px-6',
                    isActive
                      ? 'bg-gradient-to-r from-accent-primary-hover to-accent-primary text-white shadow-glow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <span className="hidden text-xs sm:inline" aria-hidden>0{index + 1}</span>
                  <phase.icon className="hidden h-4 w-4 min-[400px]:block" />
                  {phase.label}
                </button>
              );
            })}
          </div>
        </div>
          <div
            key={activePhase.id}
            {...getPanelProps(ID)}
            className="motion-safe:animate-panel-in"
          >
            <h3 className="sr-only">{activePhase.title}</h3>
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {currentOfferings.map((offering, index) => (
                <div key={offering.title} className="brand-card flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-sm font-bold text-accent-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-text-primary">{offering.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{offering.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        {useCases.length > 0 && (
          <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-dashed border-accent-primary/30 bg-background-card/60 p-6 text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent-primary">
              <Briefcase className="h-4 w-4" />
              Typical Engagements
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {useCases.map((useCase) => (
                <span key={useCase} className="rounded-full border border-border bg-background-primary px-4 py-2 text-sm font-medium text-text-primary">
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
