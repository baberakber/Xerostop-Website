'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Duration in seconds. */
  duration?: number;
  label?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

function formatNumber(value: number, decimals: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * The final value is rendered on the server so it is visible without JavaScript and to crawlers.
 * After hydration, counters that are still off-screen reset and count up when scrolled into view.
 */
export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  label,
  className,
  valueClassName,
  labelClassName,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(end);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(end * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <div className={cn('flex flex-col', className)}>
      <span ref={ref} className={cn('text-4xl font-bold tabular-nums text-text-primary md:text-5xl', valueClassName)}>
        {prefix}
        {formatNumber(value, decimals)}
        {suffix}
      </span>
      {label && <span className={cn('mt-1 text-sm text-text-secondary', labelClassName)}>{label}</span>}
    </div>
  );
}
