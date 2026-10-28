import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

interface LogoProps {
  /** `onDark` renders the icon inside a white badge so the navy letters stay legible on navy backgrounds. */
  tone?: 'auto' | 'onDark';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

/** Brand wordmark; size and outline come from the parent's font size and text-stroke. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-brand font-extrabold uppercase leading-none tracking-wide [paint-order:stroke_fill]', className)}>
      <span className="text-[#1C2B45]">X</span>
      <span className="text-[0.74em] text-[#006CC5]">ero</span>
      <span className="text-[#1C2B45]">S</span>
      <span className="text-[0.74em] text-[#006CC5]">top</span>
    </span>
  );
}

export function Logo({ tone = 'auto', showTagline = true, className, onClick }: LogoProps) {
  const onDark = tone === 'onDark';

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn('flex items-center gap-2 sm:gap-3', className)}
    >
      <span className="sr-only">XeroStop home</span>
      <span
        className={cn(
          'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md ring-1 sm:h-11 sm:w-11',
          onDark ? 'bg-white ring-white/30' : 'bg-white ring-border dark:ring-accent-primary/40'
        )}
      >
        {/* Plain <img>: the 68px asset is already sized for a 34px slot at 2x. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.logo.iconSmall}
          alt=""
          width={34}
          height={31}
          decoding="async"
          className="h-[27px] w-[30px] object-contain sm:h-[31px] sm:w-[34px]"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none" aria-hidden>
        <Wordmark
          className={cn(
            'whitespace-nowrap text-[19px] font-black min-[360px]:text-[22px] sm:text-2xl',
            onDark ? '[-webkit-text-stroke:1.5px_#ffffff]' : 'dark:[-webkit-text-stroke:1.5px_#ffffff]'
          )}
        />
        {showTagline && (
          <span
            className={cn(
              'mt-1 hidden text-[11px] font-medium tracking-wide sm:block',
              onDark ? 'text-sky-200/80' : 'text-text-muted'
            )}
          >
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
