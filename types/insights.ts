// Article category
export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

// Article author
export interface ArticleAuthor {
  id: string;
  name: string;
  role: string;
  avatar: {
    url: string;
    alt: string;
  };
  bio?: string;
  linkedin?: string;
}

// Article featured image
export interface ArticleFeaturedImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

// Article SEO
export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

// Full article
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: ArticleFeaturedImage;
  category: ArticleCategory;
  author: ArticleAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  seo?: ArticleSEO;
}

// Slim article shape passed to cards (keeps full article content out of client payloads)
export interface ArticleCardData {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featuredImage: { url: string; alt: string };
  category: { slug: string; name: string };
  authorName: string;
  featured: boolean;
}

// Pagination response
export interface ArticleListResponse {
  articles: Article[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
