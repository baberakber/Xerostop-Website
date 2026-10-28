'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGridItem {
  id: string;
  category: string;
  content: React.ReactNode;
}

interface FilterGridProps {
  filters: FilterOption[];
  items: FilterGridItem[];
  label: string;
  gridClassName?: string;
  className?: string;
}

/** Category pill filter over server-rendered items; `all` shows everything. */
export function FilterGrid({ filters, items, label, gridClassName, className }: FilterGridProps) {
  const [active, setActive] = React.useState('all');
  const visible = active === 'all' ? items : items.filter((item) => item.category === active);

  return (
    <div className={className}>
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label={label}>
        {filters.map((filter) => {
          const isActive = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter.id)}
              className={cn(
                'flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-all',
                isActive
                  ? 'border-accent-primary bg-accent-primary text-white shadow-glow-sm'
                  : 'border-border bg-background-card text-text-secondary hover:border-accent-primary/50 hover:text-accent-primary'
              )}
            >
              <span>{filter.label}</span>
              {filter.count !== undefined && (
                <span className={cn('rounded-full px-2 py-0.5 text-xs', isActive ? 'bg-white/20' : 'bg-background-elevated')}>
                  {filter.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={gridClassName} aria-live="polite">
        {visible.map((item) => (
          <React.Fragment key={item.id}>{item.content}</React.Fragment>
        ))}
      </div>
    </div>
  );
}
