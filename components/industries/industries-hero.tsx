import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function IndustriesHero() {
  return (
    <PageHero
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
      eyebrow="Industries We Serve"
      title={
        <>
          Built for <span className="text-gradient">Your Industry</span>
        </>
      }
      description="Sector-specific solutions for government, banking, enterprise, telecom, healthcare, and education. We understand your compliance, scale, and operational needs."
      image="/images/industries/industries-overview.webp"
      imageAlt="Industries served by XeroStop: government, banking, enterprise, telecom, healthcare, and education"
      actions={
        <>
          <a href="#industries" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Explore Industries
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            Discuss Your Industry
          </Link>
        </>
      }
    />
  );
}
