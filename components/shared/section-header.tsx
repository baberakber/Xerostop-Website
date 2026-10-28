import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  animated?: boolean;
  tone?: 'default' | 'onDark';
  /** Heading level; defaults to h2. */
  as?: 'h2' | 'h3';
  className?: string;
}

const alignmentClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = 'center',
  animated = true,
  tone = 'default',
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  const onDark = tone === 'onDark';

  return (
    <div
      data-reveal={animated ? '' : undefined}
      className={cn('mb-10 flex flex-col gap-3 md:mb-12', alignmentClasses[align], className)}
    >
      {badge && (
        <span className={cn('eyebrow', onDark && 'border-sky-300/30 bg-white/10 text-sky-200')}>
          <span className={cn('h-1.5 w-1.5 rounded-full', onDark ? 'bg-sky-300' : 'bg-accent-primary')} />
          {badge}
        </span>
      )}
      <Heading
        className={cn(
          'max-w-3xl text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl',
          onDark ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </Heading>
      <span className="h-1 w-16 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" aria-hidden />
      {subtitle && (
        <p className={cn('max-w-2xl text-base leading-relaxed md:text-lg', onDark ? 'text-white/80' : 'text-text-secondary')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
