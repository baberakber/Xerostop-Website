import { ArticleCard } from './article-card';
import { getRelatedArticles, toArticleCard } from '@/lib/data/articles';

interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
  tags: string[];
  limit?: number;
}

export function RelatedArticles({
  currentArticleId,
  category,
  tags,
  limit = 3,
}: RelatedArticlesProps) {
  const related = getRelatedArticles(currentArticleId, category, tags, limit);

  if (related.length === 0) return null;

  return (
    <section className="py-20 lg:py-28" aria-labelledby="related-articles-heading">
      <div className="container mx-auto px-4">
        <h2 id="related-articles-heading" className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">
          Related Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((article) => (
            <ArticleCard key={article.id} article={toArticleCard(article)} />
          ))}
        </div>
      </div>
    </section>
  );
}
