'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { ProductModule } from '@/types/products';
import { SectionHeader } from '@/components/shared/section-header';
import { useTabs } from '@/hooks/use-tabs';
import { cn } from '@/lib/utils';

interface ProductModulesProps {
  modules: ProductModule[];
}

const ID = 'product-modules';

export function ProductModules({ modules }: ProductModulesProps) {
  if (modules.length === 0) return null;
  return <Modules modules={modules} />;
}

function Modules({ modules }: ProductModulesProps) {
  const { active: activeIndex, select, getTabProps, getPanelProps } = useTabs(modules.length);
  const active = modules[activeIndex];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Functionality"
          title={
            <>
              Built-In <span className="text-gradient">Modules</span>
            </>
          }
          subtitle="Everything you need, organized into focused modules."
        />

        <div className="mx-auto max-w-5xl">
          <div role="tablist" aria-label="Product modules" className="mb-8 flex flex-wrap justify-center gap-2">
            {modules.map((module, index) => (
              <button
                key={module.id}
                {...getTabProps(index, ID)}
                onClick={() => select(index)}
                className={cn(
                  'min-h-[44px] rounded-full border px-5 py-2.5 text-sm font-semibold transition-all',
                  index === activeIndex
                    ? 'border-accent-primary bg-accent-primary text-white shadow-glow-sm'
                    : 'border-border bg-background-card text-text-secondary hover:border-accent-primary/50 hover:text-text-primary'
                )}
              >
                {module.title}
              </button>
            ))}
          </div>
            <div
              key={active.id}
              {...getPanelProps(ID)}
              className={cn(
                'grid gap-8 rounded-3xl border border-border bg-background-card p-6 shadow-sm motion-safe:animate-panel-in md:p-10',
                active.image && 'lg:grid-cols-2 lg:items-center'
              )}
            >
              <div>
                <h3 className="text-2xl font-bold text-text-primary">{active.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">{active.description}</p>
                <ul className={cn('mt-6 grid gap-3', !active.image && 'sm:grid-cols-2')}>
                  {active.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-text-primary">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {active.image && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background-elevated">
                  <Image
                    src={active.image}
                    alt={`${active.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
