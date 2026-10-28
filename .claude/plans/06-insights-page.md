# 06 - Insights/Blog Page

## Overview
The Insights page serves as Xerostop's thought leadership hub, featuring expert articles on enterprise IT topics. This page is critical for SEO, credibility building, and demonstrating deep domain expertise across UC, AI, infrastructure, and security domains.

**Core Message**: "Expert perspectives on enterprise IT, security, AI, and infrastructure from Xerostop's engineering team."

**Routes**:
- `/insights` - Blog listing page
- `/insights/[slug]` - Individual article page

**Files**:
- `app/insights/page.tsx` - Listing page
- `app/insights/[slug]/page.tsx` - Article page

---

## Page Architecture

### Route Structure
```
app/
└── insights/
    ├── page.tsx              # Blog listing page
    ├── loading.tsx           # Loading skeleton
    ├── error.tsx             # Error boundary
    └── [slug]/
        ├── page.tsx          # Individual article page
        ├── loading.tsx       # Article loading skeleton
        └── error.tsx         # Article error boundary
```

### URL Patterns
- `/insights` - Main blog listing with pagination
- `/insights?category=uc-security` - Filtered by category
- `/insights?page=2` - Paginated listing
- `/insights/[slug]` - Individual article (e.g., `/insights/best-practices-uc-security-2024`)

---

## Content Categories

### Category Taxonomy
| Category ID | Display Name | Description | Icon |
|-------------|--------------|-------------|------|
| `uc-security` | UC Security | Best practices for securing unified communications | Shield |
| `ai-infrastructure` | AI in Infrastructure | AI/ML applications in IT operations | Brain |
| `ha-design` | High Availability | HA design patterns and architectures | Layers |
| `network-datacenter` | Network & Datacenter | Network architecture and datacenter insights | Server |

### Category Colors (Accent Variations)
```css
/* Category-specific accent colors */
--category-uc-security: #3b82f6;        /* Primary blue */
--category-ai-infrastructure: #06b6d4;  /* Secondary cyan */
--category-ha-design: #8b5cf6;          /* Purple */
--category-network-datacenter: #22c55e; /* Green */
```

---

## Data Models

### TypeScript Interfaces
```typescript
interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;              // Rich text/MDX content
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;       // For placeholder blur
  };
  category: Category;
  author: Author;
  publishedAt: string;          // ISO date string
  updatedAt?: string;
  readingTime: number;          // Minutes
  tags: string[];
  featured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface Author {
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

interface ArticleListResponse {
  articles: Article[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
```

---

## Blog Listing Page (`/insights`)

### 1. Hero Section
**Purpose**: Page introduction and category filtering

#### Content
- **Headline**: "Insights & Thought Leadership"
- **Subheadline**: "Expert perspectives on enterprise IT, security, AI, and infrastructure"

#### UI/UX Specifications
| Property | Value |
|----------|-------|
| Background | `#0a0a0a` with gradient overlay to `#111111` |
| Min Height | `280px` (desktop), `220px` (mobile) |
| Padding | `py-16` (desktop), `py-12` (mobile) |
| Text Alignment | Center |

#### Typography
- **Headline**: `text-4xl md:text-5xl font-bold tracking-tight text-white`
- **Subheadline**: `text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-4`

#### Category Filter Pills
| Property | Value |
|----------|-------|
| Layout | Horizontal scroll on mobile, flex wrap on desktop |
| Active State | `bg-primary text-white` |
| Inactive State | `bg-card text-muted-foreground border border-border` |
| Hover State | `bg-card-hover border-primary/50` |
| Padding | `px-4 py-2` |
| Border Radius | `rounded-full` |
| Gap | `gap-3` |

---

### 2. Featured Article Section
**Purpose**: Highlight the most important/recent featured article

#### Layout Structure
```
+----------------------------------------------------------+
|                                                          |
|  +------------------------+  +------------------------+  |
|  |                        |  |  [Category Badge]      |  |
|  |    Featured Image      |  |                        |  |
|  |    (aspect-[16/10])    |  |  Article Title (H2)    |  |
|  |                        |  |  2-3 lines max         |  |
|  |                        |  |                        |  |
|  |                        |  |  Excerpt text...       |  |
|  |                        |  |  2-3 lines             |  |
|  |                        |  |                        |  |
|  |                        |  |  [Avatar] Name · Date  |  |
|  |                        |  |  [Read More ->]        |  |
|  +------------------------+  +------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

#### UI/UX Specifications
| Property | Desktop | Mobile |
|----------|---------|--------|
| Grid | `grid grid-cols-2 gap-8` | `flex flex-col` |
| Image Aspect | `aspect-[16/10]` | `aspect-[16/9]` |
| Image Position | Left | Top |
| Content Padding | `p-6` | `p-4` |

#### Styling
- Card Background: `bg-card` with `border border-border`
- Hover: `border-primary/30` + `shadow-lg shadow-primary/5`
- Image: `rounded-lg object-cover`

---

### 3. Articles Grid Section
**Purpose**: Display paginated list of articles

#### Layout Structure
```
+----------------------------------------------------------+
|                                                          |
|  +----------------+  +----------------+  +----------------+
|  |   Card 1       |  |   Card 2       |  |   Card 3       |
|  |                |  |                |  |                |
|  +----------------+  +----------------+  +----------------+
|  +----------------+  +----------------+  +----------------+
|  |   Card 4       |  |   Card 5       |  |   Card 6       |
|  |                |  |                |  |                |
|  +----------------+  +----------------+  +----------------+
|  +----------------+  +----------------+  +----------------+
|  |   Card 7       |  |   Card 8       |  |   Card 9       |
|  |                |  |                |  |                |
|  +----------------+  +----------------+  +----------------+
|                                                          |
+----------------------------------------------------------+
```

#### Grid Specifications
| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Desktop (lg+) | 3 | `gap-8` (32px) |
| Tablet (md) | 2 | `gap-6` (24px) |
| Mobile (sm) | 1 | `gap-6` (24px) |

#### Articles Per Page
- Default: 9 articles (fills 3x3 grid on desktop)

---

### Article Card Component

#### Card Structure
```
+--------------------------------+
|                                |
|        Featured Image          |
|        (aspect-[16/10])        |
|                                |
+--------------------------------+
|  [Category Badge]              |
|                                |
|  Article Title (H3)            |
|  Max 2 lines, line-clamp-2     |
|                                |
|  Excerpt text...               |
|  Max 3 lines, line-clamp-3     |
|                                |
|  +--------------------------+  |
|  | Avatar | Name  | Date   |  |
|  +--------------------------+  |
+--------------------------------+
```

#### Card Specifications
| Property | Value |
|----------|-------|
| Min Height | `420px` (desktop), `360px` (mobile) |
| Background | `bg-card` (#1a1a1a) |
| Border | `border border-border` (#27272a) |
| Border Radius | `rounded-lg` (8px) |
| Image Aspect | `aspect-[16/10]` |
| Content Padding | `p-5` |

#### Card Hover Effects
```css
.article-card {
  transition: all 0.3s ease;
}

.article-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
  transform: translateY(-4px);
}

.article-card:hover .card-image {
  transform: scale(1.05);
}
```

#### Typography
| Element | Styling |
|---------|---------|
| Title | `text-lg font-semibold text-foreground line-clamp-2` |
| Excerpt | `text-sm text-muted-foreground line-clamp-3 mt-2` |
| Category Badge | `text-xs font-medium px-2.5 py-1 rounded-full` |
| Meta Text | `text-xs text-muted-foreground` |

---

### Category Badge Component

#### Styling by Category
```typescript
const categoryStyles = {
  'uc-security': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'ai-infrastructure': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'ha-design': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'network-datacenter': 'bg-green-500/10 text-green-400 border-green-500/20',
};
```

---

### 4. Pagination Section
**Purpose**: Navigate between pages of articles

#### Layout
```
[ < Prev ]  [ 1 ] [ 2 ] [ 3 ] ... [ 10 ]  [ Next > ]
```

#### Specifications
| Property | Value |
|----------|-------|
| Container | `flex items-center justify-center gap-2` |
| Page Button Size | `w-10 h-10 rounded-lg` |
| Active Page | `bg-primary text-white` |
| Inactive Page | `bg-card text-muted-foreground hover:bg-card-hover` |
| Prev/Next | `px-4 h-10 rounded-lg` with icons |
| Disabled State | `opacity-50 cursor-not-allowed` |

#### Mobile Behavior
- Show simplified pagination: `< Prev | Page X of Y | Next >`

---

## Individual Article Page (`/insights/[slug]`)

### 1. Article Hero Section
**Purpose**: Article header with metadata

#### Layout Structure
```
+----------------------------------------------------------+
|                                                          |
|  Insights > [Category] > [Title (truncated)]             |
|                                                          |
|  [Category Badge]                                        |
|                                                          |
|  Article Title (H1)                                      |
|  Full title, can wrap to multiple lines                  |
|                                                          |
|  [Avatar 40px] Author Name · Jan 15, 2024 · 8 min read   |
|                                                          |
+----------------------------------------------------------+
```

#### Breadcrumb Specifications
| Property | Value |
|----------|-------|
| Separator | `ChevronRight` icon |
| Link Color | `text-muted-foreground hover:text-foreground` |
| Current Page | `text-foreground` (non-clickable) |

#### Typography
| Element | Styling |
|---------|---------|
| Title (H1) | `text-4xl md:text-5xl font-bold tracking-tight` |
| Max Width | `max-w-4xl` |
| Meta Row | `flex items-center gap-4 text-muted-foreground` |

---

### 2. Featured Image Section
**Purpose**: Large hero image for the article

#### Specifications
| Property | Value |
|----------|-------|
| Aspect Ratio | `aspect-[21/9]` (cinematic) |
| Border Radius | `rounded-xl` |
| Max Width | `max-w-6xl mx-auto` |
| Margin | `my-8 md:my-12` |
| Shadow | `shadow-2xl shadow-black/20` |

---

### 3. Article Content Section
**Purpose**: Main article body with sidebar

#### Layout Structure (Desktop)
```
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------+  +---------------+  |
|  |                                  |  |               |  |
|  |        Article Content           |  |  Table of     |  |
|  |        (max-w-[720px])           |  |  Contents     |  |
|  |                                  |  |  (sticky)     |  |
|  |        Rich text with            |  |               |  |
|  |        headings, images,         |  +---------------+  |
|  |        code blocks, etc.         |  |               |  |
|  |                                  |  |  Share        |  |
|  |                                  |  |  Buttons      |  |
|  |                                  |  |  (sticky)     |  |
|  |                                  |  |               |  |
|  +----------------------------------+  +---------------+  |
|                                                          |
+----------------------------------------------------------+
```

#### Grid Specifications
```css
.article-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Mobile: single column, TOC hidden or collapsible */
@media (max-width: 1024px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
}
```

#### Prose Styling
| Element | Styling |
|---------|---------|
| H2 | `text-2xl font-bold mt-12 mb-4 text-foreground` |
| H3 | `text-xl font-semibold mt-8 mb-3 text-foreground` |
| H4 | `text-lg font-medium mt-6 mb-2 text-foreground` |
| Paragraph | `text-base leading-relaxed text-muted-foreground mb-6` |
| Links | `text-primary hover:underline` |
| Lists | `my-4 pl-6 space-y-2 text-muted-foreground` |
| Blockquote | `border-l-4 border-primary pl-6 my-8 italic text-lg` |
| Code Block | `bg-[#0d0d0d] rounded-lg p-4 my-6 border border-border` |
| Inline Code | `bg-card px-1.5 py-0.5 rounded text-sm font-mono text-primary` |
| Images | `rounded-lg my-8 w-full` |
| Tables | `w-full my-8 border-collapse` |

---

### Table of Contents (Sidebar)

#### Specifications
| Property | Value |
|----------|-------|
| Position | `sticky top-24` |
| Background | `bg-card/50 backdrop-blur` |
| Border | `border border-border rounded-lg` |
| Padding | `p-4` |

#### TOC Item Styling
| State | Styling |
|-------|---------|
| Default | `text-sm text-muted-foreground py-1.5 pl-4 border-l-2 border-transparent` |
| Hover | `text-foreground border-primary/50` |
| Active | `text-primary border-primary` |
| Nested (H3) | `pl-8 text-xs` |

---

### Social Share Buttons

#### Buttons
| Platform | Purpose |
|----------|---------|
| LinkedIn | Primary share target for B2B |
| Twitter/X | Tech community engagement |
| Copy Link | Universal fallback |

#### Button Styling
```css
.share-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.share-button:hover {
  color: var(--text-primary);
  border-color: rgba(59, 130, 246, 0.5);
}
```

---

### 4. Author Bio Section
**Purpose**: Establish author credibility

#### Layout Structure
```
+----------------------------------------------------------+
|                                                          |
|  About the Author                                        |
|                                                          |
|  +----------+  [Author Name] · [Role]                    |
|  |          |                                            |
|  |  Avatar  |  [Bio text, 2-3 sentences about the        |
|  |  (80px)  |   author's expertise and background]       |
|  |          |                                            |
|  +----------+  [LinkedIn Icon Link]                      |
|                                                          |
+----------------------------------------------------------+
```

#### Specifications
| Property | Value |
|----------|-------|
| Container | `bg-card border border-border rounded-xl p-6 md:p-8` |
| Avatar | `w-20 h-20 rounded-full` |
| Name | `text-xl font-semibold text-foreground` |
| Role | `text-sm text-primary` |
| Bio | `text-muted-foreground mt-2` |

---

### 5. Related Articles Section
**Purpose**: Keep users engaged with more content

#### Heading
- **Title**: "Related Articles"

#### Layout
| Breakpoint | Layout |
|------------|--------|
| Desktop | 3 cards in a row |
| Tablet | 2 cards |
| Mobile | 1 card or horizontal scroll |

#### Selection Logic
1. Same category, different article
2. Shared tags
3. Most recent if no matches
4. Maximum 3 articles

---

### 6. Newsletter CTA Section
**Purpose**: Capture leads and build email list

#### Content
- **Headline**: "Stay Updated with Xerostop Insights"
- **Subheadline**: "Get the latest articles on enterprise IT, security, and AI delivered to your inbox."
- **Input**: Email field with submit button
- **Privacy Note**: "We respect your privacy. Unsubscribe anytime."

---

## Complete Component Hierarchy

```
app/insights/page.tsx
├── components/insights/insights-hero.tsx
├── components/insights/category-filter.tsx
├── components/insights/article-card-featured.tsx
├── components/insights/article-card.tsx
├── components/insights/pagination.tsx
└── components/insights/newsletter-cta.tsx

app/insights/[slug]/page.tsx
├── components/insights/article-hero.tsx
├── components/insights/article-content.tsx
├── components/insights/table-of-contents.tsx
├── components/insights/share-buttons.tsx
├── components/insights/author-bio.tsx
├── components/insights/related-articles.tsx
└── components/insights/newsletter-cta.tsx
```

### Component Props Interfaces
```typescript
// article-card.tsx
interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
  showExcerpt?: boolean;
  className?: string;
}

// category-filter.tsx
interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryChange: (categorySlug: string | null) => void;
}

// pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

// table-of-contents.tsx
interface TOCProps {
  headings: {
    id: string;
    text: string;
    level: number;
  }[];
}

// share-buttons.tsx
interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

// related-articles.tsx
interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
  tags: string[];
  limit?: number;
}
```

---

## Responsive Design Specifications

| Section | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|---------|-----------------|---------------------|-------------------|
| Hero | Stack centered, reduced padding | Increased text size | Full size |
| Category Filter | Horizontal scroll | Flex wrap | Flex wrap |
| Featured Article | Stacked layout | 60/40 split or stacked | 50/50 split |
| Article Grid | 1 column | 2 columns | 3 columns |
| Pagination | Simplified (Prev/Next) | Full pagination | Full pagination |
| Article TOC | Hidden or collapsible | Collapsible sidebar | Sticky sidebar |
| Share Buttons | Fixed bottom bar or inline | Inline | Sticky sidebar |

---

## Animation Specifications

### Page Load Animations (Framer Motion)
```typescript
// Staggered card entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Article page hero
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Featured image scale in
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};
```

### Hover Animations
```css
/* Card hover */
.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Image zoom on card hover */
.article-card .card-image {
  transition: transform 0.5s ease;
}

.article-card:hover .card-image {
  transform: scale(1.05);
}

/* Category pill hover */
.category-pill {
  transition: all 0.2s ease;
}

.category-pill:hover:not(.active) {
  background: var(--bg-card-hover);
  border-color: rgba(59, 130, 246, 0.5);
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .article-card,
  .category-pill,
  .card-image {
    transition: none;
    animation: none;
  }

  .article-card:hover {
    transform: none;
  }
}
```

---

## SEO Specifications

### Listing Page Meta
```typescript
export const metadata: Metadata = {
  title: 'Insights & Thought Leadership | Xerostop',
  description: 'Expert perspectives on UC security, AI in infrastructure, high availability design, and enterprise IT best practices.',
  openGraph: {
    title: 'Insights & Thought Leadership | Xerostop',
    description: 'Expert perspectives on enterprise IT, security, AI, and infrastructure.',
    url: 'https://xerostop.com/insights',
    type: 'website',
    images: [
      {
        url: 'https://xerostop.com/images/insights-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Xerostop Insights',
      },
    ],
  },
};
```

### Article Page Dynamic Meta
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: article.seo?.metaTitle || `${article.title} | Xerostop Insights`,
    description: article.seo?.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://xerostop.com/insights/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.seo?.ogImage || article.featuredImage.url,
          width: 1200,
          height: 630,
          alt: article.featuredImage.alt,
        },
      ],
    },
  };
}
```

### Article Structured Data (JSON-LD)
```typescript
const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  image: article.featuredImage.url,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt || article.publishedAt,
  author: {
    '@type': 'Person',
    name: article.author.name,
    jobTitle: article.author.role,
    url: article.author.linkedin,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Xerostop',
    logo: {
      '@type': 'ImageObject',
      url: 'https://xerostop.com/images/logo.svg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://xerostop.com/insights/${article.slug}`,
  },
  articleSection: article.category.name,
  keywords: article.tags.join(', '),
  wordCount: calculateWordCount(article.content),
  timeRequired: `PT${article.readingTime}M`,
};
```

### Breadcrumb Structured Data
```typescript
const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://xerostop.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Insights',
      item: 'https://xerostop.com/insights',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: article.category.name,
      item: `https://xerostop.com/insights?category=${article.category.slug}`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: article.title,
      item: `https://xerostop.com/insights/${article.slug}`,
    },
  ],
};
```

### Heading Hierarchy
**Listing Page:**
- h1: "Insights & Thought Leadership"
- h2: Featured article title
- h3: Individual article card titles

**Article Page:**
- h1: Article title
- h2: Section headings within content
- h3: Subsection headings within content
- h2: "About the Author"
- h2: "Related Articles"

---

## Accessibility Requirements

### Keyboard Navigation
| Requirement | Implementation |
|-------------|----------------|
| Focusable Elements | All interactive elements via Tab |
| Card Activation | Enter/Space to follow links |
| Filter Pills | Tab to navigate, Enter to select |
| Pagination | Arrow keys for navigation |
| Escape Key | Close modals/popovers |

### Screen Reader Support
```html
<!-- Article card -->
<article aria-labelledby="article-title-1">
  <a href="/insights/slug" aria-label="Read full article: Article Title">
    <img alt="Descriptive alt text for featured image" />
    <h3 id="article-title-1">Article Title</h3>
  </a>
</article>

<!-- Category filter -->
<nav aria-label="Filter articles by category">
  <button
    aria-pressed="true"
    aria-label="Filter by UC Security, currently selected"
  >
    UC Security
  </button>
</nav>

<!-- Pagination -->
<nav aria-label="Article pagination">
  <button aria-label="Go to previous page" aria-disabled="true">
    Previous
  </button>
  <button aria-current="page" aria-label="Page 1, current page">1</button>
  <button aria-label="Go to page 2">2</button>
</nav>

<!-- Table of Contents -->
<nav aria-label="Table of contents">
  <a href="#section-1" aria-current="location">Section 1</a>
  <a href="#section-2">Section 2</a>
</nav>
```

### Focus Indicators
```css
/* Custom focus ring matching brand */
.focus-visible:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Skip link for keyboard users */
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1rem;
  background: var(--accent-primary);
  color: white;
  border-radius: 8px;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

### Color Contrast
- All text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Category badges have sufficient contrast
- Focus indicators clearly visible
- Links distinguishable from surrounding text

---

## Loading States

### Listing Page Skeleton
```typescript
function ArticleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-card rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-[16/10] bg-muted" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-6 w-full bg-muted rounded" />
            <div className="h-6 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="flex items-center gap-2 pt-2">
              <div className="h-8 w-8 bg-muted rounded-full" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Article Page Skeleton
```typescript
function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="max-w-4xl mx-auto space-y-4 py-12">
        <div className="h-6 w-48 bg-muted rounded-full" />
        <div className="h-12 w-full bg-muted rounded" />
        <div className="h-12 w-3/4 bg-muted rounded" />
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-muted rounded-full" />
          <div className="h-4 w-48 bg-muted rounded" />
        </div>
      </div>
      {/* Image skeleton */}
      <div className="aspect-[21/9] max-w-6xl mx-auto bg-muted rounded-xl" />
      {/* Content skeleton */}
      <div className="max-w-3xl mx-auto py-12 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}
```

---

## Error Handling

### Error Boundary UI
```typescript
// error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          We couldn't load the articles. Please try again.
        </p>
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
```

### 404 Article Not Found
```typescript
// not-found.tsx for [slug]
export default function ArticleNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-xl text-foreground">Article Not Found</h2>
        <p className="text-muted-foreground">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/insights">
          <Button>Browse All Insights</Button>
        </Link>
      </div>
    </div>
  );
}
```

---

## CMS Integration (Strapi)

### API Functions
```typescript
// lib/api/insights.ts

// Get paginated articles
export async function getArticles(
  page: number = 1,
  pageSize: number = 9,
  category?: string
): Promise<ArticleListResponse> {
  const filters = category ? `&filters[category][slug][$eq]=${category}` : '';
  const response = await fetch(
    `${STRAPI_URL}/api/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc${filters}`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 3600 },
    }
  );
  return response.json();
}

// Get single article by slug
export async function getArticle(slug: string): Promise<Article | null> {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 3600 },
    }
  );
  const data = await response.json();
  return data.data?.[0] || null;
}

// Get related articles
export async function getRelatedArticles(
  articleId: string,
  categorySlug: string,
  tags: string[],
  limit: number = 3
): Promise<Article[]> {
  // Same category, shared tags, excluding current article
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    `${STRAPI_URL}/api/categories?populate=*`,
    {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      next: { revalidate: 86400 },
    }
  );
  return response.json();
}
```

### Static Generation
```typescript
// Generate static paths for articles
export async function generateStaticParams() {
  const articles = await getAllArticleSlugs();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Revalidate every hour
export const revalidate = 3600;
```

---

## Performance Optimizations

### Image Optimization
```typescript
<Image
  src={article.featuredImage.url}
  alt={article.featuredImage.alt}
  width={800}
  height={500}
  placeholder="blur"
  blurDataURL={article.featuredImage.blurDataURL}
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Code Splitting
- Dynamic import for MDX renderer
- Lazy load share buttons
- Defer non-critical animations

### Caching Strategy
- ISR with 1-hour revalidation for articles
- 24-hour revalidation for categories
- On-demand revalidation via webhook

---

## Implementation Checklist

### Phase 1: Core Structure
- [ ] Create route structure (`/insights`, `/insights/[slug]`)
- [ ] Define TypeScript interfaces in `types/index.ts`
- [ ] Set up CMS API integration in `lib/api/insights.ts`
- [ ] Create base page layouts with metadata

### Phase 2: Listing Page Components
- [ ] `components/insights/insights-hero.tsx` - Hero section
- [ ] `components/insights/category-filter.tsx` - Filter pills
- [ ] `components/insights/article-card.tsx` - Standard card
- [ ] `components/insights/article-card-featured.tsx` - Featured card
- [ ] `components/insights/pagination.tsx` - Pagination controls
- [ ] `app/insights/loading.tsx` - Loading skeleton
- [ ] `app/insights/error.tsx` - Error boundary

### Phase 3: Article Page Components
- [ ] `components/insights/article-hero.tsx` - Article header
- [ ] `components/insights/article-content.tsx` - MDX renderer
- [ ] `components/insights/table-of-contents.tsx` - Sticky TOC
- [ ] `components/insights/share-buttons.tsx` - Social sharing
- [ ] `components/insights/author-bio.tsx` - Author section
- [ ] `components/insights/related-articles.tsx` - Related content
- [ ] `components/insights/newsletter-cta.tsx` - Email signup
- [ ] `app/insights/[slug]/loading.tsx` - Loading skeleton
- [ ] `app/insights/[slug]/error.tsx` - Error boundary
- [ ] `app/insights/[slug]/not-found.tsx` - 404 page

### Phase 4: Polish & Optimization
- [ ] Add Framer Motion animations
- [ ] Implement reduced motion support
- [ ] Optimize images with blur placeholders
- [ ] Add SEO metadata and structured data (JSON-LD)
- [ ] Implement accessibility features (ARIA, focus management)
- [ ] Test responsive design across breakpoints

### Phase 5: Testing & QA
- [ ] Unit tests for components
- [ ] Integration tests for API calls
- [ ] Accessibility audit (axe, WAVE)
- [ ] Performance audit (Lighthouse 90+ target)
- [ ] Cross-browser testing
- [ ] Mobile device testing

---

## Future Enhancements

| Feature | Description | Priority |
|---------|-------------|----------|
| Search | Full-text search within articles | High |
| Tag Pages | Browse articles by tag | Medium |
| Reading Progress | Progress bar at top of article | Medium |
| Comments | Discussion system for articles | Low |
| Bookmarks | Save articles for later (requires auth) | Low |
| RSS Feed | `/insights/feed.xml` for subscribers | Medium |
| Print Styles | Optimized print CSS for articles | Low |
| Social Auto-Post | Auto-share new articles to social media | Low |
