import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { NetworkBackground } from './network-background';

interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface CTASectionProps {
  heading: string | React.ReactNode;
  description?: string;
  buttons: CTAButton[];
  /** `full` spans edge to edge; `gradient` and `card` render a contained rounded band. */
  variant?: 'default' | 'gradient' | 'card' | 'full';
  align?: 'left' | 'center';
  backgroundPattern?: boolean;
  headingClassName?: string;
  className?: string;
}

const alignmentClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
};

export function CTASection({
  heading,
  description,
  buttons,
  variant = 'default',
  align = 'center',
  backgroundPattern = true,
  headingClassName,
  className,
}: CTASectionProps) {
  const content = (
    <div data-reveal className={cn('relative flex flex-col gap-6', alignmentClasses[align])}>
      <h2
        className={cn(
          'max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl',
          headingClassName
        )}
      >
        {heading}
      </h2>

      {description && <p className="max-w-2xl text-base text-white/85 md:text-lg">{description}</p>}

      <div className={cn('mt-2 flex flex-wrap gap-4', align === 'center' ? 'justify-center' : 'justify-start')}>
        {buttons.map((button) => (
          <Link
            key={button.href + button.text}
            href={button.href}
            className={cn(
              buttonVariants({ variant: 'primary', size: 'lg' }),
              'rounded-full px-8',
              button.variant !== 'primary' &&
                'border border-white/30 bg-none bg-white/5 text-white hover:border-white/60 hover:bg-white/10'
            )}
          >
            {button.text}
            {button.variant === 'primary' && <ArrowRight className="ml-2 h-5 w-5" />}
          </Link>
        ))}
      </div>
    </div>
  );

  if (variant === 'full') {
    return (
      <section className={cn('relative overflow-hidden py-20 md:py-28', className)}>
        {backgroundPattern ? <NetworkBackground density="subtle" /> : <div className="navy-band absolute inset-0" />}
        <div className="container relative mx-auto px-4">{content}</div>
      </section>
    );
  }

  return (
    <section className={cn('bg-background-primary py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-14 shadow-[0_40px_80px_-40px_rgba(11,31,58,0.7)] sm:px-12 md:py-20">
          {backgroundPattern ? <NetworkBackground density="subtle" /> : <div className="navy-band absolute inset-0" />}
          <div className="relative">{content}</div>
        </div>
      </div>
    </section>
  );
}
