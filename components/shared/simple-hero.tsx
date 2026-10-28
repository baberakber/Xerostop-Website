import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import type { Breadcrumb } from './page-hero';

interface SimpleHeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs: Breadcrumb[];
  children?: React.ReactNode;
}

/** Compact centered hero for content and legal pages. */
export function SimpleHero({ title, description, breadcrumbs, children }: SimpleHeroProps) {
  return (
    <section className="page-hero-simple">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <BreadcrumbJsonLd items={breadcrumbs} />
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-text-secondary">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="py-1 transition-colors hover:text-accent-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-text-primary">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mb-5 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]">{title}</h1>
          {description && <p className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
