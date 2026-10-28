import * as React from 'react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/shared/section-header';
import { getTechLogo } from '@/lib/data/tech-logos';
import { technologyVendors, type TechnologyVendor } from '@/lib/data/partners';

function VendorChip({ vendor, hidden }: { vendor: TechnologyVendor; hidden?: boolean }) {
  const logo = getTechLogo(vendor.name);

  return (
    <li
      aria-hidden={hidden || undefined}
      className="group mx-2 flex h-20 min-w-[260px] shrink-0 items-center gap-4 rounded-2xl border border-border bg-background-card px-4 shadow-sm transition-all hover:border-accent-primary/50 hover:shadow-glow-sm"
    >
      {logo && (
        // Marquee chips slide in from clipped overflow, so lazy loading would show them blank;
        // low priority keeps them from competing with above-the-fold content.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={hidden ? '' : `${vendor.name} logo`}
          width={112}
          height={48}
          loading="eager"
          fetchPriority="low"
          decoding="async"
          className="h-12 w-28 shrink-0 rounded-xl bg-white object-contain px-3 py-2 dark:ring-1 dark:ring-white/10"
        />
      )}
      <span className="flex flex-col">
        <span className="whitespace-nowrap text-base font-bold text-text-primary transition-colors group-hover:text-accent-primary">
          {vendor.name}
        </span>
        <span className="whitespace-nowrap text-xs text-text-secondary">{vendor.domain}</span>
      </span>
    </li>
  );
}

function MarqueeRow({ items, label, reverse = false }: { items: TechnologyVendor[]; label: string; reverse?: boolean }) {
  return (
    <div className="mask-fade-x group/row flex overflow-hidden py-2">
      <ul
        aria-label={label}
        className={cn(
          'flex w-max group-hover/row:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        )}
      >
        {items.map((vendor) => (
          <VendorChip key={vendor.name} vendor={vendor} />
        ))}
        {items.map((vendor) => (
          <VendorChip key={`${vendor.name}-loop`} vendor={vendor} hidden />
        ))}
      </ul>
    </div>
  );
}

export function PartnersMarquee() {
  const half = Math.ceil(technologyVendors.length / 2);

  return (
    <section className="section-padding cv-auto overflow-hidden bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Technology Ecosystem"
          title={
            <>
              Platforms We <span className="text-gradient">Work With</span>
            </>
          }
          subtitle="Vendor-agnostic expertise across the leading enterprise platforms, so we can recommend what genuinely fits your environment."
        />
      </div>
      <div className="space-y-3">
        <MarqueeRow items={technologyVendors.slice(0, half)} label="Technology partners, part 1" />
        <MarqueeRow items={technologyVendors.slice(half)} label="Technology partners, part 2" reverse />
      </div>
    </section>
  );
}
