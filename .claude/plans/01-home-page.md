# 01 - Home Page

## Overview
The home page is the most critical page of the Xerostop website. It establishes the company's position as an enterprise IT consultancy and communicates the core value proposition immediately.

**Route**: `/`
**File**: `app/page.tsx`

---

## Page Layout Structure

The home page is rendered within the **global SiteLayout** (defined in `app/layout.tsx`). The visual order from top to bottom is:

1. **Header** (fixed) — Logo left, nav (Home, About, Services, Solutions, Industries, Insights), "Get in Touch" CTA right. No Contact nav link (redundant with Get in Touch).
2. **Hero Banner** — "Transforming Infrastructure into Business Value"
3. **Pillars** — Six service area cards
4. **Consulting Model** — 4-step process
5. **Why Xerostop** — Differentiators
6. **CTA Section** — Final conversion block
7. **Footer** — Site links and contact info

---

## Page Sections

### 1. Hero Section (Below Header, Above the Fold)
**Purpose**: Immediate impact and value proposition

#### Content
- **Headline**: "Transforming Infrastructure into Business Value"
- **Sub-headline**: "Unified Communications | Datacenter | Security | Networking | Software | AI"
- **Primary CTA**: "Book a Consultation" → `/contact` (blue gradient, clickable link)
- **Secondary CTA**: "Explore Our Solutions" → `/solutions` (outlined, clickable link)

#### CTA Implementation
- Use `<Link>` with `buttonVariants` (not `<Button>` inside `<Link>` — invalid HTML, blocks clicks)
- Decorative overlays (gradient, grid, bottom fade) use `pointer-events-none` so clicks reach the buttons

#### UI/UX Specifications
| Property | Value |
|----------|-------|
| Background | `#0a0a0a` with radial gradient accent |
| Min Height | `100vh` (desktop), `90vh` (mobile) |
| Padding | `pt-28 pb-20 md:pt-32` (top padding accounts for fixed header ~80px) |
| Text Alignment | Center |

#### Typography
- **Headline**: `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white`
- **Sub-headline**: `text-lg md:text-xl text-muted-foreground mt-6`
- **Pills**: `text-sm font-medium` with gradient border

#### Animation (Framer Motion)
```typescript
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
}

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}
```

#### Visual Elements
- Subtle grid pattern background
- Gradient glow behind headline
- Animated particles or floating geometric shapes (optional)
- **Note**: All decorative overlays use `pointer-events-none` to ensure CTA links remain clickable

---

### 2. Six Pillars Section
**Purpose**: Showcase core service areas with icons and brief descriptions

#### Content (6 Cards)
| Pillar | Icon | Description |
|--------|------|-------------|
| Unified Communications | `Phone` | Voice, Video, Contact Center, Collaboration |
| Datacenter Solutions | `Server` | Compute, Storage, Virtualization, HA/DR |
| Security Solutions | `Shield` | Network, UC, Identity, Zero Trust |
| Network Solutions | `Network` | Enterprise, Campus, WAN, SD-WAN |
| Software Solutions | `Code` | Custom Apps, Automation, Dashboards |
| AI Solutions | `Brain` | AI Agents, Analytics, Automation, Monitoring |

#### UI/UX Specifications
- Background: `#111111`
- Padding: `py-24 lg:py-32`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

#### Card Design
```typescript
// Card styling
{
  background: '#1a1a1a',
  border: '1px solid #27272a',
  borderRadius: '12px',
  padding: '32px',
  hoverState: {
    background: '#222222',
    borderColor: '#3b82f6',
    transform: 'translateY(-4px)',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)'
  }
}
```

#### Animation
- Scroll-triggered fade-in with stagger
- Icon scale on hover (1 -> 1.1)
- Card lift on hover

---

### 3. Consulting Model Section
**Purpose**: Position Xerostop as architects, not installers

#### Section Header
- **Pre-title**: "Our Approach"
- **Title**: "We don't just deploy technology — we design solutions."

#### 4-Step Process
| Step | Title | Description |
|------|-------|-------------|
| 01 | Assess & Discover | Deep-dive analysis of current infrastructure, challenges, and goals |
| 02 | Design & Architecture | Custom solution design with security and scalability built-in |
| 03 | Implement & Integrate | Seamless deployment with minimal disruption |
| 04 | Operate, Optimize & Automate | Continuous improvement with AI-driven operations |

#### UI/UX Specifications
- Background: `#0a0a0a`
- Layout: Horizontal timeline (desktop), Vertical stack (mobile)
- Step indicators: Numbered circles with connecting lines
- Active/hover state: Cyan accent (`#06b6d4`)

#### Animation
- Steps reveal sequentially on scroll
- Connecting line animates progressively
- Number counter animation (optional)

---

### 4. Why Xerostop Section
**Purpose**: Differentiate from competitors

#### Content
- **Title**: "Why Xerostop?"
- **Bullets**:
  - Enterprise & mission-critical experience
  - Vendor-agnostic approach
  - Security-first mindset
  - AI-driven operations
  - High-availability & resilience focus

#### UI/UX Specifications
- Background: `#111111`
- Layout: Split layout - content left, visual/graphic right
- Checkmark icons with cyan accent

#### Visual Element
- Abstract network/infrastructure visualization
- Or testimonial/client logos

---

### 5. CTA Section
**Purpose**: Drive consultation bookings

#### Content
- **Title**: "Ready to Transform Your Infrastructure?"
- **Subtitle**: "Schedule a free consultation with our enterprise architects."
- **CTA Button**: "Get Started" -> `/contact`

#### UI/UX Specifications
- Background: Gradient from `#0a0a0a` to `#111111` with blue glow
- Padding: `py-24 lg:py-32`
- Center-aligned content
- Button with glow animation on hover

---

## Component Hierarchy

```
app/layout.tsx (wraps all pages)
└── SiteLayout
    ├── Header (logo left, nav, CTA)
    ├── MobileNav
    ├── {children}
    └── Footer

app/page.tsx (home page content)
├── components/sections/hero.tsx        ← "Transforming Infrastructure into Business Value"
├── components/sections/pillars.tsx
├── components/sections/consulting-model.tsx
├── components/sections/why-xerostop.tsx
└── components/shared/cta-section.tsx
```

---

## Responsive Design

| Section | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|---------|-----------------|---------------------|-------------------|
| Header | Hamburger menu, logo visible | Same | Full nav, Services dropdown, Get in Touch |
| Hero | Reduced font sizes, stacked CTAs | Medium sizes | Full sizes |
| Pillars | 1 column | 2 columns | 3 columns |
| Consulting | Vertical timeline | Vertical timeline | Horizontal timeline |
| Why Xerostop | Stacked layout | Stacked layout | Split layout |
| CTA | Full width button | Centered button | Centered button |

---

## SEO Specifications

### Meta Tags
```typescript
export const metadata: Metadata = {
  title: 'Xerostop | Enterprise IT Consultancy',
  description: 'Xerostop helps enterprises design, secure, and automate modern IT infrastructure. Experts in UC, Datacenter, Security, Network, Software, and AI solutions.',
  keywords: ['IT consultancy', 'unified communications', 'datacenter', 'network security', 'AI solutions', 'enterprise IT'],
  openGraph: {
    title: 'Xerostop | Enterprise IT Consultancy',
    description: 'Transforming Infrastructure into Business Value',
    url: 'https://xerostop.com',
    siteName: 'Xerostop',
    images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Xerostop",
  "description": "Enterprise IT Consultancy",
  "url": "https://xerostop.com",
  "logo": "https://xerostop.com/logo.svg",
  "sameAs": ["LinkedIn", "Twitter"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "contact@xerostop.com"
  }
}
```

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Skip to content | Hidden link at top, visible on focus |
| Heading hierarchy | h1 (Hero) -> h2 (Sections) -> h3 (Cards) |
| Button labels | Descriptive text, no "Click here" |
| Color contrast | 4.5:1 minimum for all text |
| Focus indicators | Visible blue ring on focus |
| Reduced motion | Respect `prefers-reduced-motion` |

---

## Animation Specifications

### Scroll Animations
- Use Intersection Observer via custom hook
- Trigger at 20% visibility threshold
- Duration: 600-800ms
- Easing: `easeOut` or `[0.16, 1, 0.3, 1]`

### Hover States
- Transition: `all 0.2s ease`
- Card lift: `translateY(-4px)`
- Button glow: `box-shadow` animation

### Performance
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `margin`
- Disable animations on low-end devices

---

## File Checklist

| File | Description |
|------|-------------|
| `app/page.tsx` | Main home page with metadata |
| `components/sections/hero.tsx` | Hero section — uses Link + buttonVariants for CTAs (not Button in Link) |
| `components/sections/pillars.tsx` | 6 pillars grid |
| `components/sections/consulting-model.tsx` | 4-step process |
| `components/sections/why-xerostop.tsx` | Differentiators |
| `components/sections/cta-section.tsx` | Final CTA (via shared) |
| `components/layout/site-layout.tsx` | Wraps Header + content + Footer (in layout) |
