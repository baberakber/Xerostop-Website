'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ArticleCardData, ArticleCategory } from '@/types/insights';
import { formatDate, parsePageParam } from '@/lib/format';
import { CategoryFilter } from './category-filter';
import { ArticleCard } from './article-card';
import { Pagination } from './pagination';
import { categoryStyleMap, defaultCategoryStyle } from './category-styles';

const PAGE_SIZE = 9;
const BASE_PATH = '/insights/';

interface InsightsContentProps {
  articles: ArticleCardData[];
  categories: ArticleCategory[];
}

interface ListState {
  category: string | null;
  page: number;
}

function readStateFromUrl(categories: ArticleCategory[]): ListState {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  return {
    category: category && categories.some((c) => c.slug === category) ? category : null,
    page: parsePageParam(params.get('page')),
  };
}

function buildUrl({ category, page }: ListState) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (page > 1) params.set('page', String(page));
  const q = params.toString();
  return q ? `${BASE_PATH}?${q}` : BASE_PATH;
}

/**
 * The static HTML always contains the unfiltered first page so crawlers see every article;
 * category and page filters from the URL are applied after hydration.
 */
export function InsightsContent({ articles, categories }: InsightsContentProps) {
  const [state, setState] = React.useState<ListState>({ category: null, page: 1 });

  React.useEffect(() => {
    const sync = () => setState(readStateFromUrl(categories));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [categories]);

  const navigate = React.useCallback((next: ListState) => {
    setState(next);
    window.history.pushState(null, '', buildUrl(next));
  }, []);

  const filtered = state.category ? articles.filter((a) => a.category.slug === state.category) : articles;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(state.page, pageCount);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featuredArticle = !state.category && page === 1 ? articles.find((a) => a.featured) : undefined;

  return (
    <div className="space-y-12">
      <div className="container mx-auto px-4">
        <CategoryFilter
          categories={categories}
          activeCategory={state.category}
          onCategoryChange={(slug) => navigate({ category: slug, page: 1 })}
        />
      </div>

      {featuredArticle && (
        <section className="container mx-auto px-4" aria-label="Featured article">
          <Link href={`/insights/${featuredArticle.slug}/`} className="group block">
            <div className="overflow-hidden rounded-xl border border-border bg-background-card transition-all duration-300 hover:border-accent-primary/50 hover:shadow-glow-sm md:grid md:grid-cols-2 md:gap-8">
              <div className="relative aspect-[16/9] overflow-hidden bg-background-elevated md:aspect-auto md:min-h-[320px]">
                <Image
                  src={featuredArticle.featuredImage.url}
                  alt={featuredArticle.featuredImage.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <span
                  className={`inline-block w-fit rounded-full border px-2.5 py-1 text-xs font-medium ${
                    categoryStyleMap[featuredArticle.category.slug] || defaultCategoryStyle
                  }`}
                >
                  {featuredArticle.category.name}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-text-primary transition-colors group-hover:text-accent-primary md:text-3xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-text-secondary">{featuredArticle.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-text-secondary">
                  <span>{featuredArticle.authorName}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={featuredArticle.publishedAt}>{formatDate(featuredArticle.publishedAt)}</time>
                </div>
                <div className="mt-4 flex items-center text-accent-primary">
                  <span className="font-medium">Read the featured article</span>
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="container mx-auto px-4" aria-label="All articles">
        {visible.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-text-secondary">No articles in this category yet.</p>
        )}

        {pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={pageCount}
              buildHref={(p) => buildUrl({ category: state.category, page: p })}
              onNavigate={(p) => {
                navigate({ category: state.category, page: p });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
