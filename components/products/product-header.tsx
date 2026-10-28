import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/products';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProductHeroVisual } from './product-hero-visual';

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  return (
    <PageHero
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: product.name },
      ]}
      icon={product.icon}
      title={product.name}
      description={product.shortDescription}
      media={<ProductHeroVisual product={product} />}
      actions={
        <>
          <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {product.screenshots.length > 0 && (
            <a href="#gallery" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
              View Screenshots
            </a>
          )}
        </>
      }
    >
      <p className="mt-6 text-base font-semibold text-accent-primary">{product.tagline}</p>
    </PageHero>
  );
}
