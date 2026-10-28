import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '@/types/solutions';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SolutionHeroProps {
  solution: Solution;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  return (
    <PageHero
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: solution.title },
      ]}
      icon={solution.icon}
      title={solution.title}
      description={solution.description}
      image={solution.heroImage}
      imageAlt={`${solution.title} solution architecture by XeroStop`}
      actions={
        <>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Request Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a href="#included" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            What&apos;s Included
          </a>
        </>
      }
    >
      <p className="mt-6 text-base font-semibold text-accent-primary">{solution.tagline}</p>
    </PageHero>
  );
}
