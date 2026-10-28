import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AboutHero() {
  return (
    <PageHero
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      eyebrow="About XeroStop | Riyadh, Saudi Arabia"
      title={
        <>
          Transform technology into <span className="text-gradient">Business value</span>
        </>
      }
      description="XeroStop helps enterprises and government organizations across Saudi Arabia and the GCC design, secure, and automate modern IT infrastructure with AI-driven solutions."
      image="/images/about/team-conference.webp"
      imageAlt="XeroStop consultants meeting with clients in a Riyadh conference room"
      actions={
        <>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Work With Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/services" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            Our Services
          </Link>
        </>
      }
    />
  );
}
