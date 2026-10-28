import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '@/lib/data/services';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
  service: ServiceCategory;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <PageHero
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: service.title },
      ]}
      icon={service.icon}
      title={service.title}
      description={service.description}
      image={service.heroImage}
      imageAlt={`${service.title}: enterprise consulting and delivery by XeroStop`}
      actions={
        <>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            {service.cta.button}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a href="#offerings" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            What We Offer
          </a>
        </>
      }
    >
      <p className="mt-6 text-base font-semibold text-accent-primary">{service.tagline}</p>
    </PageHero>
  );
}
