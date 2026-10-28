import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SolutionsHero() {
  return (
    <PageHero
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      eyebrow="Our Solutions"
      title={
        <>
          Enterprise Solutions <span className="text-gradient">That Deliver Results</span>
        </>
      }
      description="XeroStop offerings designed to solve your most complex IT challenges with proven methodologies and measurable outcomes."
      image="/images/solutions/solutions-overview.webp"
      imageAlt="XeroStop packaged enterprise solutions"
      actions={
        <>
          <a href="#solutions" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Explore Solutions
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            Contact Sales
          </Link>
        </>
      }
    />
  );
}
