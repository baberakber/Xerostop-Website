import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has moved.',
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: 'Services', href: '/services/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Products', href: '/products/' },
  { label: 'Insights', href: '/insights/' },
];

export default function NotFound() {
  return (
    <main className="page-hero-simple flex min-h-[70vh] items-center">
      <div className="container relative mx-auto px-4 text-center">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg">
          The link may be broken or the page may have moved. Try one of these instead, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <Link href="/contact/" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
            Contact Us
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border bg-background-card px-5 text-sm font-semibold text-text-secondary transition-colors hover:border-accent-primary/50 hover:text-accent-primary"
              >
                {item.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
