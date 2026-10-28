import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProduct } from '@/lib/data/products';
import type { Product } from '@/types/products';
import {
  ProductHeader,
  ProductOverview,
  ProductFeatures,
  ProductModules,
  ProductHowItWorks,
  ProductGallery,
} from '@/components/products';
import { TechPartners } from '@/components/services/tech-partners';
import { CTASection } from '@/components/shared/cta-section';
import { JsonLd } from '@/components/seo/json-ld';
import { productSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface ProductPageProps {
  params: { slug: string };
}

function publicFileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), 'public', src));
}

// Drop hero, screenshot, and module images that haven't been added to /public yet.
function withAvailableImages(product: Product): Product {
  return {
    ...product,
    heroImage: product.heroImage && publicFileExists(product.heroImage.src) ? product.heroImage : undefined,
    screenshots: product.screenshots.filter((shot) => publicFileExists(shot.src)),
    modules: product.modules.map((module) => ({
      ...module,
      image: module.image && publicFileExists(module.image) ? module.image : undefined,
    })),
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const found = getProduct(params.slug);

  if (!found) {
    return { title: 'Product Not Found', robots: { index: false } };
  }

  const product = withAvailableImages(found);

  return buildMetadata({
    title: product.seo.metaTitle,
    description: product.seo.metaDescription,
    path: `/products/${product.slug}/`,
    keywords: product.seo.keywords,
    ...(product.heroImage && {
      image: {
        url: product.heroImage.src,
        width: product.heroImage.width,
        height: product.heroImage.height,
        alt: `${product.name} dashboard`,
      },
    }),
  });
}

export default function ProductPage({ params }: ProductPageProps) {
  const found = getProduct(params.slug);

  if (!found) {
    notFound();
  }

  const product = withAvailableImages(found);

  return (
    <main>
      <JsonLd data={productSchema(product)} />
      <ProductHeader product={product} />
      <ProductOverview productName={product.name} paragraphs={product.overview} />
      <ProductFeatures productName={product.name} features={product.features} />
      <ProductModules modules={product.modules} />
      <ProductHowItWorks steps={product.howItWorks} />
      <ProductGallery productName={product.name} screenshots={product.screenshots} />
      <TechPartners
        technologies={product.integrations}
        badge="Integrations"
        title={
          <>
            Supported <span className="text-gradient">Platforms</span>
          </>
        }
        subtitle={`${product.name} integrates with the platforms you already run.`}
      />
      <CTASection
        heading={
          <>
            Interested in <span className="text-gradient-light">{product.name}?</span>
          </>
        }
        description="Contact our team for a demo, pricing, or a technical walkthrough."
        buttons={[
          { text: 'Contact Us', href: '/contact/', variant: 'primary' },
          { text: 'All Products', href: '/products/', variant: 'secondary' },
        ]}
      />
    </main>
  );
}
