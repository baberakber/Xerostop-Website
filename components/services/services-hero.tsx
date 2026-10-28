import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ServicesHero() {
  return (
    <PageHero
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      eyebrow="Our Services"
      title={
        <>
          Enterprise IT <span className="text-gradient">Consulting Services</span>
        </>
      }
      description="From strategy to execution, we help enterprises transform their technology infrastructure with expert consulting, thoughtful design, and proven delivery."
      image="/images/services/services-overview.webp"
      imageAlt="XeroStop enterprise IT services"
      actions={
        <>
          <a href="#services" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Explore Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            Contact Us
          </Link>
        </>
      }
    />
  );
}
