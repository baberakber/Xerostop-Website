import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data/products';
import { PageHero } from '@/components/shared/page-hero';
import { SectionHeader } from '@/components/shared/section-header';
import { CTASection } from '@/components/shared/cta-section';
import { ProductTile } from '@/components/products/product-tile';
import { JsonLd } from '@/components/seo/json-ld';
import { buttonVariants } from '@/components/ui/button';
import { itemListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Xero Software Suite for Cisco Collaboration',
  description:
    'Xero software for Cisco collaboration: meeting scheduling, call recording, call billing, forwarding, UC management, load testing, phone lock, and devices.',
  path: '/products/',
  keywords: ['Xero products', 'Cisco collaboration software', 'call recording', 'call accounting', 'UC management'],
});

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd
        data={itemListSchema(
          'XeroStop products',
          products.map((p) => ({ name: p.name, path: `/products/${p.slug}/` }))
        )}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        eyebrow="Our Products"
        title={
          <>
            The Xero <span className="text-gradient">Product Suite</span>
          </>
        }
        description="Purpose-built software for Cisco collaboration environments - from meetings and recording to billing, automation, testing, and device management."
        actions={
          <>
            <a href="#products" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link href="/contact/" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'rounded-full px-8')}>
              Contact Sales
            </Link>
          </>
        }
      />

      <section id="products" className="section-padding scroll-mt-24 bg-background-primary">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Products"
            title={
              <>
                Software That <span className="text-gradient">Works With Cisco</span>
              </>
            }
            subtitle="Eight products, one goal: simpler, more secure, and better-managed communications."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductTile key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={
          <>
            Want to See a Product <span className="text-gradient-light">in Action?</span>
          </>
        }
        description="Talk to our team for a walkthrough of any Xero product in your environment."
        buttons={[
          { text: 'Contact Us', href: '/contact/', variant: 'primary' },
          { text: 'Explore Solutions', href: '/solutions/', variant: 'secondary' },
        ]}
      />
    </main>
  );
}
