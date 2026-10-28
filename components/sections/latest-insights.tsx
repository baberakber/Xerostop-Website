import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { ArticleCard } from '@/components/insights/article-card';
import { getArticleCards } from '@/lib/data/articles';

export function LatestInsights() {
  const latest = getArticleCards().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="section-padding cv-auto bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Insights"
          title={
            <>
              Latest <span className="text-gradient">Thought Leadership</span>
            </>
          }
          subtitle="Practical guidance from our engineers on UC security, AI operations, high availability, and network design."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} variant="compact" />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/insights/"
            className="inline-flex items-center gap-2 rounded-full border border-accent-primary/40 px-6 py-3 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-white"
          >
            Read All Insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
