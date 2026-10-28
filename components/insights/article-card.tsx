import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticleCardData } from '@/types/insights';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { categoryStyleMap, defaultCategoryStyle } from './category-styles';

interface ArticleCardProps {
  article: ArticleCardData;
  variant?: 'default' | 'compact';
  showExcerpt?: boolean;
  className?: string;
}

export function ArticleCard({
  article,
  variant = 'default',
  showExcerpt = true,
  className,
}: ArticleCardProps) {
  const categoryStyle = categoryStyleMap[article.category.slug] || defaultCategoryStyle;

  return (
    <article data-reveal className={cn('group', className)}>
      <Link href={`/insights/${article.slug}/`} className="block h-full">
        <div
          className={cn(
            'h-full overflow-hidden rounded-lg border border-border bg-card transition-all duration-300',
            'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
            variant === 'compact' ? 'min-h-[320px]' : 'min-h-[400px] md:min-h-[420px]'
          )}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-background-elevated">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <span
              className={cn(
                'inline-block rounded-full border px-2.5 py-1 text-xs font-medium',
                categoryStyle
              )}
            >
              {article.category.name}
            </span>
            <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary">
              {article.title}
            </h3>
            {showExcerpt && (
              <p className="mt-2 line-clamp-3 text-sm text-text-secondary">{article.excerpt}</p>
            )}
            <div className="mt-4 flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <span>{article.authorName}</span>
                <span aria-hidden>·</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </div>
              <span className="flex items-center text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                Read
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
