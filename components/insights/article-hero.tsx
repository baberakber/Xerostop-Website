import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { Article } from '@/types/insights';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { categoryStyleMap, defaultCategoryStyle } from './category-styles';

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const categoryStyle = categoryStyleMap[article.category.slug] || defaultCategoryStyle;

  return (
    <header className="page-hero-simple">
      <div className="container relative mx-auto px-4">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-y-1 text-sm text-text-secondary">
            <li className="flex items-center">
              <Link href="/" className="py-1 transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="mx-2 h-4 w-4" aria-hidden />
            </li>
            <li className="flex items-center">
              <Link href="/insights/" className="py-1 transition-colors hover:text-foreground">
                Insights
              </Link>
              <ChevronRight className="mx-2 h-4 w-4" aria-hidden />
            </li>
            <li className="flex items-center">
              <Link
                href={`/insights/?category=${article.category.slug}`}
                className="py-1 transition-colors hover:text-foreground"
              >
                {article.category.name}
              </Link>
              <ChevronRight className="mx-2 h-4 w-4" aria-hidden />
            </li>
            <li className="min-w-0">
              <span aria-current="page" className="line-clamp-1 text-foreground">
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-4xl">
          <span className={cn('inline-block rounded-full border px-2.5 py-1 text-xs font-medium', categoryStyle)}>
            {article.category.name}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-text-secondary">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
              <Image
                src={article.author.avatar.url}
                alt=""
                width={32}
                height={29}
                className="h-auto w-8 object-contain"
              />
            </div>
            <span className="font-medium text-foreground">{article.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <>
                <span aria-hidden>·</span>
                <span>
                  Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}
