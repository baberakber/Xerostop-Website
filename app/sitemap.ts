import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { services } from '@/lib/data/services';
import { solutions } from '@/lib/data/solutions';
import { products } from '@/lib/data/products';
import { articles } from '@/lib/data/articles';

export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

const latestArticleDate = articles
  .map((a) => a.updatedAt || a.publishedAt)
  .sort()
  .at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: Entry[] = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/services/'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/solutions/'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/products/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/industries/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/about/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contact/'), changeFrequency: 'yearly', priority: 0.8 },
    { url: absoluteUrl('/insights/'), changeFrequency: 'weekly', priority: 0.8, lastModified: latestArticleDate },
    { url: absoluteUrl('/careers/'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/faq/'), changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/privacy/'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms/'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/cookies/'), changeFrequency: 'yearly', priority: 0.2 },
  ];
  const staticPages: Entry[] = pages.map((entry) => ({ ...entry, lastModified: entry.lastModified ?? now }));

  return [
    ...staticPages,
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...solutions.map((s) => ({
      url: absoluteUrl(`/solutions/${s.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}/`),
      lastModified: a.updatedAt || a.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
