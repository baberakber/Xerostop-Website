'use client';

import * as React from 'react';
import { Search, PenTool, Rocket, RefreshCw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/section-header';
import { useTabs } from '@/hooks/use-tabs';

const phases = [
  {
    step: '01',
    icon: Search,
    title: 'Assess & Discover',
    summary: 'Understand where you are today.',
    description:
      'We analyze your current infrastructure, identify gaps and risks, and align with your business objectives to build a clear, prioritized roadmap.',
    outputs: ['Infrastructure & security assessment', 'Risk and gap analysis', 'Prioritized transformation roadmap'],
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Design & Architecture',
    summary: 'Engineer the target state.',
    description:
      'Our architects craft vendor-agnostic, standards-aligned designs with high availability, security, and scalability engineered in from day one.',
    outputs: ['High-level & low-level designs', 'HA / DR and security architecture', 'Bill of materials & migration plan'],
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Implement & Integrate',
    summary: 'Deliver with minimal disruption.',
    description:
      'Expert deployment and migration with rigorous testing, ensuring seamless integration with your existing platforms, processes, and teams.',
    outputs: ['Deployment & configuration', 'Integration and acceptance testing', 'Documentation & knowledge transfer'],
  },
  {
    step: '04',
    icon: RefreshCw,
    title: 'Operate, Optimize & Automate',
    summary: 'Keep improving, continuously.',
    description:
      'Proactive monitoring, optimization, and AI-assisted automation to keep your environment performant, secure, and cost-efficient over time.',
    outputs: ['24/7 monitoring & support', 'Performance and capacity tuning', 'AI-driven automation & reporting'],
  },
];

const ID = 'journey';

export function Journey() {
  return <JourneyContent />;
}

function JourneyContent() {
  const { active, select, getTabProps, getPanelProps } = useTabs(phases.length);
  const canHoverRef = React.useRef(false);
  const current = phases[active];

  React.useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-background-primary">
      <div className="pointer-events-none absolute inset-0 bg-dots-brand opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div className="container relative mx-auto px-4">
        <SectionHeader
          badge="How We Engage"
          title={
            <>
              We don&apos;t just deploy technology, <span className="text-gradient">we design solutions</span>
            </>
          }
          subtitle="A proven four-phase methodology that turns complex challenges into secure, scalable, and automated infrastructure."
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-0 right-0 top-6 hidden h-1 rounded-full bg-border md:block" aria-hidden />
          <div
            className="absolute left-0 top-6 hidden h-1 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-[width] duration-500 ease-in-out md:block"
            style={{ width: `${(active / (phases.length - 1)) * 100}%` }}
            aria-hidden
          />

          <div className="relative grid grid-cols-2 gap-4 md:grid-cols-4" role="tablist" aria-label="Engagement phases">
            {phases.map((phase, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <button
                  key={phase.step}
                  {...getTabProps(index, ID)}
                  onClick={() => select(index)}
                  onMouseEnter={() => canHoverRef.current && select(index)}
                  className="group flex flex-col items-center rounded-2xl py-1 text-center"
                >
                  <span
                    className={cn(
                      'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] transition-all duration-300',
                      isActive
                        ? 'scale-105 border-accent-primary/30 bg-accent-primary text-white shadow-glow-md'
                        : isDone
                          ? 'border-accent-primary/40 bg-background-card text-accent-primary'
                          : 'border-border bg-background-card text-text-muted group-hover:border-accent-primary/40 group-hover:text-accent-primary'
                    )}
                  >
                    <phase.icon className="h-5 w-5" />
                  </span>
                  <span className={cn('mt-3 text-[11px] font-bold tracking-[0.2em] transition-colors', isActive ? 'text-accent-primary' : 'text-text-secondary')}>
                    PHASE {phase.step}
                  </span>
                  <span className={cn('mt-1 text-sm font-semibold transition-colors', isActive ? 'text-text-primary' : 'text-text-secondary')}>
                    {phase.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-12">
              <div
                key={current.step}
                {...getPanelProps(ID)}
                className="brand-card-tinted grid gap-8 hover:translate-y-0 motion-safe:animate-panel-in md:grid-cols-5 md:p-10"
              >
                <div className="md:col-span-3">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black leading-none text-accent-primary/15" aria-hidden>
                      {current.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{current.title}</h3>
                      <p className="text-sm font-medium text-accent-primary">{current.summary}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-text-secondary">{current.description}</p>
                </div>
                <ul className="space-y-3 md:col-span-2">
                  {current.outputs.map((output) => (
                    <li key={output} className="flex items-start gap-3 rounded-xl border border-border bg-background-card p-3 text-sm font-medium text-text-primary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {output}
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
