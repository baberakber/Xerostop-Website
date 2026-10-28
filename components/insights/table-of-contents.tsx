'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <div className="rounded-lg border border-border bg-card/80 p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">On this page</h3>
        <ul className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'border-l-2 py-1.5 pl-4 text-sm transition-colors',
                heading.level === 3 && 'pl-8 text-xs',
                activeId === heading.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:border-primary/50 hover:text-foreground'
              )}
            >
              <a href={`#${heading.id}`} className="block" aria-current={activeId === heading.id ? 'location' : undefined}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
