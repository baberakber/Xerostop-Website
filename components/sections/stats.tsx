import * as React from 'react';
import { Layers, Workflow, Headphones, Gauge } from 'lucide-react';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { cn } from '@/lib/utils';

const stats = [
  { icon: Layers, end: 9, suffix: '', label: 'Practice Areas', detail: 'From UC and datacenter to CX, managed services & ELV' },
  { icon: Workflow, end: 4, suffix: '', label: 'Phase Delivery Model', detail: 'Assess, design, implement, operate' },
  { icon: Headphones, end: 24, suffix: '/7', label: 'Support', detail: 'Round-the-clock technical assistance' },
  { icon: Gauge, end: 99.99, suffix: '%', decimals: 2, label: 'Availability by Design', detail: 'HA and DR built into every architecture' },
];

export function Stats({ className }: { className?: string }) {
  return (
    <section id="stats" aria-label="XeroStop at a glance" className={cn('relative z-10 -mt-16 scroll-mt-28 pb-8 md:-mt-20', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-border bg-background-card p-4 shadow-[0_30px_70px_-30px_rgba(11,31,58,0.45)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-background-elevated lg:p-6 lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:right-0 lg:[&:not(:last-child)]:after:top-6 lg:[&:not(:last-child)]:after:h-[calc(100%-3rem)] lg:[&:not(:last-child)]:after:w-px lg:[&:not(:last-child)]:after:bg-border lg:[&:not(:last-child)]:after:content-['']"
            >
              <span className="icon-tile transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  label={stat.label}
                  valueClassName="text-3xl md:text-4xl font-extrabold text-accent-primary"
                  labelClassName="mt-1 text-sm font-semibold text-text-primary"
                />
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
