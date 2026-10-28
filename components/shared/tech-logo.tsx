import Image from 'next/image';
import { Plug } from 'lucide-react';
import { getTechLogo } from '@/lib/data/tech-logos';
import { cn } from '@/lib/utils';

export interface TechLogoProps {
  name: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  /** `low` keeps eager logos from being preloaded ahead of above-the-fold content. */
  fetchPriority?: 'low' | 'auto';
}

export function TechLogo({ name, className, loading = 'lazy', fetchPriority }: TechLogoProps) {
  const src = getTechLogo(name);

  return (
    <span
      className={cn(
        'relative flex h-12 w-32 shrink-0 items-center justify-center rounded-xl bg-white px-3 py-2 dark:ring-1 dark:ring-white/10',
        className
      )}
    >
      {src ? (
        <span className="relative h-full w-full">
          <Image
            src={src}
            alt={`${name} logo`}
            fill
            sizes="160px"
            loading={loading}
            fetchPriority={fetchPriority}
            className="object-contain"
          />
        </span>
      ) : (
        <Plug className="h-6 w-6 text-navy-700" aria-hidden="true" />
      )}
    </span>
  );
}
