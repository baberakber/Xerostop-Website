'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h2 className="mb-4 text-2xl font-semibold text-text-primary">
        Something went wrong
      </h2>
      <p className="mb-6 text-center text-text-secondary">
        We couldn&apos;t load the products. Please try again.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: 'primary' }))}
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
