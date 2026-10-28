import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ServiceCategory } from '@/lib/data/services';
import { getIcon } from '@/lib/icons';

interface ServiceTileProps {
  service: ServiceCategory;
}

export function ServiceTile({ service }: ServiceTileProps) {
  const Icon = getIcon(service.icon);

  return (
    <div data-reveal>
      <Link href={`/services/${service.slug}/`} className="brand-card group flex h-full flex-col overflow-hidden p-0">
        <div className="relative h-48 overflow-hidden border-b border-border bg-sky-50">
          <Image
            src={service.heroImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background-card/70 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-white shadow-sm">
            {service.shortTitle}
          </span>
        </div>
        <div className="relative flex flex-1 flex-col px-6 pb-6">
          <span className="icon-tile -mt-7 mb-4 h-14 w-14 ring-4 ring-background-card">
            <Icon className="h-7 w-7" />
          </span>
          <h3 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent-primary">{service.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{service.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.keyOfferings.map((o) => (
              <span key={o.title} className="rounded-md bg-background-elevated px-2 py-1 text-[11px] font-medium text-text-secondary">
                {o.title}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary">
            Explore <span className="sr-only">{service.title}</span> services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}
