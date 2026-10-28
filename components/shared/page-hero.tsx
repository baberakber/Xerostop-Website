import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroBaseProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: string;
  /** Icon name from `lib/icons` (a string so server components can pass it). */
  icon?: string;
  /** Custom right-column visual; takes precedence over `image`. */
  media?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

type PageHeroProps = PageHeroBaseProps &
  ({ image: string; imageAlt: string } | { image?: undefined; imageAlt?: undefined });

export function PageHero({
  title,
  description,
  eyebrow,
  icon,
  image,
  imageAlt,
  media,
  breadcrumbs,
  actions,
  children,
  className,
}: PageHeroProps) {
  const Icon = icon ? getIcon(icon) : null;
  const split = Boolean(image || media);

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border bg-gradient-to-br from-sky-50 via-white to-blue-100/70 pb-14 pt-28 dark:from-navy-900 dark:via-navy dark:to-navy-800 sm:pt-32 md:pb-16 md:pt-36',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-dots-brand opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.18),transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(66,165,245,0.14),transparent_70%)]" aria-hidden />

      <div className="container relative mx-auto px-4">
        <div className={cn('grid items-center gap-12', split && 'lg:grid-cols-2 lg:gap-16')}>
          <div className={cn('min-w-0', !split && 'mx-auto max-w-4xl text-center')}>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <>
                <BreadcrumbJsonLd items={breadcrumbs} />
                <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm text-text-secondary', !split && 'justify-center')}>
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
              </>
            )}

            {eyebrow && (
              <span className="eyebrow mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                {eyebrow}
              </span>
            )}

            <div className={cn('flex items-center gap-4', !split && 'justify-center')}>
              {Icon && (
                <span className="icon-tile hidden h-12 w-12 rounded-xl min-[400px]:flex">
                  <Icon className="h-6 w-6" />
                </span>
              )}
              <h1 className="min-w-0 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h1>
            </div>

            {description && (
              <p className={cn('mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg', !split && 'mx-auto')}>
                {description}
              </p>
            )}

            {actions && <div className={cn('mt-8 flex flex-wrap gap-4', !split && 'justify-center')}>{actions}</div>}

            {children && <div>{children}</div>}
          </div>

          {media ? (
            <div className="relative">{media}</div>
          ) : (
            image && (
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(30,136,229,0.16),transparent_70%)]" aria-hidden />
                <div className="relative rounded-[1.75rem] border border-border bg-white p-2 shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)] dark:border-white/10 dark:bg-navy-800">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-sky-50">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      priority
                      sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy/10 to-transparent" />
                  </div>
                </div>
                {Icon && (
                  <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-border bg-background-card p-4 shadow-xl md:flex">
                    <span className="icon-tile h-11 w-11">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="pr-2">
                      <span className="block text-xs font-medium text-text-secondary">XeroStop</span>
                      <span className="block text-sm font-bold text-text-primary">Consult · Design · Deliver</span>
                    </span>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
