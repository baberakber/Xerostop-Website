import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getAllArticleSlugs,
  extractHeadingsFromMarkdown,
} from '@/lib/data/articles';
import { ArticleHero } from '@/components/insights/article-hero';
import { ArticleContent } from '@/components/insights/article-content';
import { TableOfContents } from '@/components/insights/table-of-contents';
import { ShareButtons } from '@/components/insights/share-buttons';
import { AuthorBio } from '@/components/insights/author-bio';
import { RelatedArticles } from '@/components/insights/related-articles';
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld';
import { articleSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return { title: 'Article Not Found', robots: { index: false } };
  }

  return buildMetadata({
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    path: `/insights/${article.slug}/`,
    type: 'article',
    keywords: article.tags,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: [article.author.name],
    section: article.category.name,
    tags: article.tags,
    image: {
      url: article.seo?.ogImage || article.featuredImage.url,
      width: article.featuredImage.width,
      height: article.featuredImage.height,
      alt: article.featuredImage.alt,
    },
  });
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadingsFromMarkdown(article.content);

  return (
    <main>
      <JsonLd data={articleSchema(article)} />
      <BreadcrumbJsonLd
        items={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: '/insights/' },
          { label: article.title },
        ]}
      />
      <ArticleHero article={article} />

      <section className="container mx-auto px-4" aria-label="Featured image">
        <div className="mx-auto my-8 max-w-6xl md:my-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-background-elevated shadow-2xl shadow-black/20 md:aspect-[21/9]">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <ArticleContent article={article} />

          <aside className="space-y-8 lg:order-2" aria-label="Article tools">
            <div className="space-y-8 lg:sticky lg:top-24">
              {headings.length > 0 && <TableOfContents headings={headings} />}
              <ShareButtons url={`/insights/${article.slug}/`} title={article.title} />
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <AuthorBio author={article.author} />
        </div>

        <RelatedArticles
          currentArticleId={article.id}
          category={article.category.slug}
          tags={article.tags}
        />
      </section>
    </main>
  );
}
