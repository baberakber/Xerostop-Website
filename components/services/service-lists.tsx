import { CheckCircle2 } from 'lucide-react';
import type { ServiceList } from '@/lib/data/services';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

interface ServiceListsProps {
  lists: ServiceList[];
}

export function ServiceLists({ lists }: ServiceListsProps) {
  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {lists.map((list, index) => {
            const Icon = getIcon(list.icon);
            const featured = index === 1;
            return (
              <div
                data-reveal
                key={list.title}
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-7 md:p-8',
                  featured
                    ? 'navy-band border-transparent text-white shadow-[0_24px_50px_-30px_rgba(11,31,58,0.7)]'
                    : 'border-border bg-background-card shadow-sm'
                )}
              >
                {featured && <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" aria-hidden />}
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl',
                        featured ? 'bg-white/10 text-sky-300 ring-1 ring-white/20' : 'icon-tile'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className={cn('text-xl font-semibold', featured ? 'text-white' : 'text-text-primary')}>{list.title}</h3>
                  </div>
                  <ul className={cn('mt-6 divide-y', featured ? 'divide-white/10' : 'divide-border')}>
                    {list.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                        <CheckCircle2 className={cn('mt-0.5 h-5 w-5 shrink-0', featured ? 'text-sky-300' : 'text-accent-primary')} />
                        <span className={cn('text-sm md:text-base', featured ? 'text-white/85' : 'text-text-secondary')}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
