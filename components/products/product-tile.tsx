import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/products';
import { getIcon } from '@/lib/icons';

interface ProductTileProps {
  product: Product;
  index?: number;
}

export function ProductTile({ product, index = 0 }: ProductTileProps) {
  const Icon = getIcon(product.icon);

  return (
    <div data-reveal
    >
      <Link href={`/products/${product.slug}/`} className="brand-card group flex h-full flex-col p-6">
        <span className="icon-tile mb-5 h-14 w-14">
          <Icon className="h-7 w-7" />
        </span>
        <h3 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent-primary">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent-primary">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{product.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary">
          Explore <span className="sr-only">{product.name}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}
