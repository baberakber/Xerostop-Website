# 00 - Architecture & Project Setup

## Overview
This document outlines the complete project architecture, folder structure, and technical configuration for the Xerostop website.

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | Frontend Framework | 14+ (App Router) |
| TypeScript | Type Safety | 5.x |
| Tailwind CSS | Styling | 3.4+ |
| shadcn/ui | UI Components | Latest |
| Framer Motion | Animations | 10+ |
| React Hook Form | Form Handling | 7.x |
| Strapi | Headless CMS | 4.x |
| Zod | Schema Validation | 3.x |

## Design System

### Color Palette (Dark Theme)
```css
/* Background Colors */
--bg-primary: #0a0a0a;
--bg-secondary: #111111;
--bg-card: #1a1a1a;
--bg-card-hover: #222222;

/* Accent Colors */
--accent-primary: #3b82f6;    /* Blue - CTAs, highlights */
--accent-secondary: #06b6d4;  /* Cyan/Teal - AI sections */
--accent-gradient: linear-gradient(135deg, #3b82f6, #06b6d4);

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--text-muted: #71717a;

/* Border Colors */
--border-default: #27272a;
--border-hover: #3f3f46;

/* Status Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
```

### Typography
- **Font Family**: Inter (primary), system-ui fallback
- **Headings**: Font-weight 600-700, tracking-tight
- **Body**: Font-weight 400, leading-relaxed
- **Scale**:
  - h1: 48-72px (responsive)
  - h2: 36-48px
  - h3: 24-32px
  - h4: 20-24px
  - body: 16-18px
  - small: 14px

### Spacing System
Based on 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

### Border Radius
- Small: 6px (buttons, inputs)
- Medium: 8px (cards)
- Large: 12px (modals, large cards)
- Full: 9999px (pills, avatars)

## Layout Architecture

The root layout (`app/layout.tsx`) wraps all pages with **SiteLayout**, which provides:

1. **Header** — Fixed at top: logo (left), nav links (no Contact — "Get in Touch" handles it), "Get in Touch" CTA (right)
2. **MobileNav** — Slide-out drawer for mobile (< 1024px)
3. **Page Content** — Rendered as `{children}`
4. **Footer** — Site links, contact info, social

```
app/layout.tsx
└── <SiteLayout>
    ├── <Header onMobileMenuToggle={...} />
    ├── <MobileNav isOpen={...} onClose={...} />
    ├── {children}   ← page content (e.g., Hero, Pillars, etc.)
    └── <Footer />
```

---

## Project Structure

```
xerostop-website/
├── app/
│   ├── layout.tsx              # Root layout (uses SiteLayout)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx            # Services overview
│   │   └── [slug]/page.tsx     # Individual service
│   ├── solutions/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── insights/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Blog post
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts        # Contact form API
│
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── site-layout.tsx     # Layout wrapper (Header + MobileNav + children + Footer)
│   │   ├── header.tsx          # Logo left, nav, CTA — used in root layout
│   │   ├── footer.tsx
│   │   └── mobile-nav.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── pillars.tsx
│   │   ├── consulting-model.tsx
│   │   ├── why-xerostop.tsx
│   │   ├── cta-section.tsx
│   │   └── testimonials.tsx
│   └── shared/
│       ├── section-header.tsx
│       ├── service-card.tsx
│       ├── solution-card.tsx
│       ├── industry-card.tsx
│       ├── blog-card.tsx
│       ├── contact-form.tsx
│       ├── animated-counter.tsx
│       └── gradient-text.tsx
│
├── lib/
│   ├── strapi.ts               # CMS client
│   ├── utils.ts                # Utility functions
│   └── validations.ts          # Zod schemas
│
├── hooks/
│   ├── use-intersection.ts
│   └── use-media-query.ts
│
├── types/
│   └── index.ts                # TypeScript types
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.webp
│   │   └── icons/
│   └── fonts/
│
├── styles/
│   └── globals.css
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

## Configuration Files

### package.json Dependencies
```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.18.0",
    "react-hook-form": "^7.49.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.303.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        card: {
          DEFAULT: '#1a1a1a',
          hover: '#222222',
        },
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#06b6d4',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        border: '#27272a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://xerostop.com
NEXT_PUBLIC_STRAPI_URL=https://cms.xerostop.com
STRAPI_API_TOKEN=your_api_token_here

# Contact Form
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@xerostop.com
SMTP_PASS=your_smtp_password
CONTACT_EMAIL=contact@xerostop.com
```

## SEO Configuration

### Default Meta Tags
```typescript
export const siteConfig = {
  name: 'Xerostop',
  description: 'Enterprise IT consultancy specializing in UC, Datacenter, Security, Network, Software, and AI solutions.',
  url: 'https://xerostop.com',
  ogImage: 'https://xerostop.com/og-image.jpg',
  keywords: [
    'IT consultancy',
    'unified communications',
    'datacenter solutions',
    'network security',
    'AI solutions',
    'enterprise IT',
  ],
}
```

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

## Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 200ms

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators on all interactive elements
- Color contrast ratio minimum 4.5:1
- Skip navigation links
- Proper heading hierarchy

## Build Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Lint
npm run lint

# Type check
npm run type-check
```
