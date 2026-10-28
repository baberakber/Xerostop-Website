import type { Metadata } from 'next';
import { InsightsHero } from '@/components/insights/insights-hero';
import { InsightsContent } from '@/components/insights/insights-content';
import { JsonLd } from '@/components/seo/json-ld';
import { articleCategories, getArticleCards } from '@/lib/data/articles';
import { itemListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Insights: Enterprise IT, UC Security & AIOps',
  description:
    'Expert insights from XeroStop engineers on UC security, AIOps, high-availability voice, SD-WAN, datacenter security, and enterprise IT best practices.',
  path: '/insights/',
  keywords: ['IT insights', 'UC security', 'AIOps', 'SD-WAN', 'datacenter security', 'enterprise IT blog'],
});

export default function InsightsPage() {
  const articles = getArticleCards();

  return (
    <main>
      <JsonLd
        data={itemListSchema(
          'XeroStop insights',
          articles.map((a) => ({ name: a.title, path: `/insights/${a.slug}/` }))
        )}
      />
      <InsightsHero />
      <div className="pb-20 pt-12 lg:pb-28">
        <InsightsContent articles={articles} categories={articleCategories} />
      </div>
    </main>
  );
}
