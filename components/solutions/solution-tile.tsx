import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Solution, SolutionCategory } from '@/types/solutions';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

export const solutionCategoryLabels: Record<SolutionCategory, string> = {
  uc: 'UC & Collaboration',
  infrastructure: 'Infrastructure',
  security: 'Security',
  automation: 'Automation',
};

interface SolutionTileProps {
  solution: Solution;
  /** Smaller image and type for dense grids such as the home page. */
  compact?: boolean;
}

export function SolutionTile({ solution, compact = false }: SolutionTileProps) {
  const Icon = getIcon(solution.icon);

  return (
    <div data-reveal className="h-full">
      <Link href={`/solutions/${solution.slug}/`} className="brand-card group flex h-full flex-col overflow-hidden p-0">
        <div className={cn('relative overflow-hidden border-b border-border bg-sky-50', compact ? 'h-40' : 'h-56')}>
          <Image
            src={solution.heroImage}
            alt=""
            fill
            sizes={compact ? '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-card/70 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white shadow-sm">
            {solutionCategoryLabels[solution.category]}
          </span>
        </div>
        <div className={cn('relative flex flex-1 flex-col', compact ? 'px-5 pb-5' : 'px-6 pb-6')}>
          <span
            className={cn('icon-tile mb-4 ring-4 ring-background-card', compact ? '-mt-6 h-12 w-12' : '-mt-7 h-14 w-14')}
          >
            <Icon className={compact ? 'h-6 w-6' : 'h-7 w-7'} />
          </span>
          <h3
            className={cn(
              'font-bold text-text-primary transition-colors group-hover:text-accent-primary',
              compact ? 'text-lg leading-snug' : 'text-xl'
            )}
          >
            {solution.title}
          </h3>
          <p className={cn('mt-1 font-medium text-accent-primary', compact ? 'text-xs' : 'text-sm')}>{solution.tagline}</p>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">{solution.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {solution.features.slice(0, compact ? 2 : 3).map((feature) => (
              <span key={feature.id} className="rounded-md bg-background-elevated px-2 py-1 text-[11px] font-medium text-text-secondary">
                {feature.title}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary">
            Explore <span className="sr-only">{solution.title}</span> solution
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}
