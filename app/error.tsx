'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-hero-simple flex min-h-[70vh] items-center">
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Something went wrong</h1>
        <p className="mx-auto mt-4 max-w-xl text-text-secondary">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="lg" className="rounded-full" onClick={reset}>
            Try again
          </Button>
          <Link href="/" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full')}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
