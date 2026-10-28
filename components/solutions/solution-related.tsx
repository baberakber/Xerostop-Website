import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { solutions } from '@/lib/data/solutions';
import { services } from '@/lib/data/services';
import type { Solution } from '@/types/solutions';
import { SectionHeader } from '@/components/shared/section-header';
import { getIcon } from '@/lib/icons';

interface SolutionRelatedProps {
  solution: Solution;
}

interface RelatedItem {
  kind: 'Solution' | 'Service';
  href: string;
  title: string;
  tagline: string;
  icon: string;
  image: string;
}

export function SolutionRelated({ solution }: SolutionRelatedProps) {
  const items: RelatedItem[] = [
    ...solutions
      .filter((s) => solution.relatedSolutions.includes(s.slug))
      .map((s) => ({
        kind: 'Solution' as const,
        href: `/solutions/${s.slug}/`,
        title: s.title,
        tagline: s.tagline,
        icon: s.icon,
        image: s.heroImage,
      })),
    ...services
      .filter((s) => solution.relatedServices.includes(s.slug))
      .map((s) => ({
        kind: 'Service' as const,
        href: `/services/${s.slug}/`,
        title: s.title,
        tagline: s.tagline,
        icon: s.icon,
        image: s.heroImage,
      })),
  ];

  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Explore More"
          title={
            <>
              Related Solutions <span className="text-gradient">&amp; Services</span>
            </>
          }
          subtitle="Complementary offerings that work together with this solution."
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <div data-reveal
                key={item.href}
              >
                <Link href={item.href} className="brand-card group flex h-full flex-col items-stretch gap-0 overflow-hidden p-0 min-[480px]:flex-row">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden border-b border-border bg-sky-50 min-[480px]:h-auto min-[480px]:w-36 min-[480px]:border-b-0 min-[480px]:border-r sm:w-44">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 480px) 176px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 dark:opacity-90"
                    />
                    <span className="icon-tile absolute bottom-3 left-3 h-10 w-10 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6">
                    <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">{item.kind}</span>
                    <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent-primary">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">{item.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary">
                      Explore <span className="sr-only">{item.title}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
