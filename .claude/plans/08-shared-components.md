# 08 - Shared & Reusable Components

## Overview
This document provides comprehensive specifications for all shared and reusable components used throughout the Xerostop website. Each component follows the established design system with dark theme, TypeScript interfaces, Tailwind CSS styling, shadcn/ui base components, and Framer Motion animations.

## Design System Reference

```css
/* Background Colors */
--bg-primary: #0a0a0a;
--bg-secondary: #111111;
--bg-card: #1a1a1a;
--bg-card-hover: #222222;

/* Accent Colors */
--accent-primary: #3b82f6;    /* Blue */
--accent-secondary: #06b6d4;  /* Cyan */
--accent-gradient: linear-gradient(135deg, #3b82f6, #06b6d4);

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--text-muted: #71717a;

/* Border Colors */
--border-default: #27272a;
--border-hover: #3f3f46;
```

---

## Layout Components

### 0. Site Layout (Root Wrapper)

**File**: `components/layout/site-layout.tsx`

Wraps all page content in the root layout. Provides Header, MobileNav, and Footer around `{children}`.

#### Layout Order (Top to Bottom)
1. **Header** — Fixed at top
2. **MobileNav** — Overlay when hamburger clicked
3. **Page Content** — Hero, sections, etc.
4. **Footer**

#### Usage
Used in `app/layout.tsx`:
```tsx
<SiteLayout>{children}</SiteLayout>
```

---

### 1. Header

**File**: `components/layout/header.tsx`

**Status**: Implemented and used in root layout via SiteLayout. Appears above all page content including the Hero banner.

#### Props Interface

```typescript
interface HeaderProps {
  onMobileMenuToggle: () => void;  // Required — opens/closes mobile nav
}

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];         // For dropdown menus
}
```

#### Navigation Items

Contact is **not** in the nav — "Get in Touch" button (right) links to `/contact` and avoids redundancy.

```typescript
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },  // Dropdown shows 6 services
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
];

// Services dropdown links (matching lib/data/services.ts slugs)
// unified-communications, datacenter-solutions, network-solutions,
// security-solutions, software-solutions, ai-solutions
```

#### Styling Specifications

| Property | Default State | Scrolled State |
|----------|---------------|----------------|
| Background | `transparent` or `bg-[#0a0a0a]/80` | `bg-[#0a0a0a]/95 backdrop-blur-md` |
| Height | `80px` | `64px` |
| Position | `fixed top-0 left-0 right-0` | Same |
| Z-index | `z-50` | Same |
| Border | `none` | `border-b border-[#27272a]` |
| Transition | `transition-all duration-300` | Same |

#### Logo Specifications

- **Design**: Gradient square (blue-to-cyan) with "X" + "Xerostop" text
- **Size**: `32px` icon (h-8 w-8), text `text-xl font-bold`
- **Position**: Left-aligned in header
- **Link**: Wraps logo, navigates to `/`

#### Desktop Navigation

```css
/* Nav Container */
.nav-desktop {
  @apply hidden lg:flex items-center gap-8;
}

/* Nav Links */
.nav-link {
  @apply text-[#a1a1aa] text-sm font-medium
         hover:text-white transition-colors duration-200
         relative py-2;
}

/* Active State */
.nav-link-active {
  @apply text-white;
}

/* Active Indicator */
.nav-link-active::after {
  @apply content-[''] absolute bottom-0 left-0 right-0
         h-[2px] bg-gradient-to-r from-[#3b82f6] to-[#06b6d4];
}
```

#### Dropdown Menu (Services)

```typescript
interface DropdownProps {
  items: NavItem[];
  isOpen: boolean;
}
```

```css
/* Dropdown Container */
.dropdown {
  @apply absolute top-full left-1/2 -translate-x-1/2
         mt-2 py-2 min-w-[220px]
         bg-[#111111] border border-[#27272a] rounded-lg
         shadow-xl shadow-black/20;
}

/* Dropdown Item */
.dropdown-item {
  @apply px-4 py-2 text-sm text-[#a1a1aa]
         hover:text-white hover:bg-[#1a1a1a]
         transition-colors duration-150;
}
```

#### CTA Button (Desktop)

- **Style**: Primary gradient button
- **Text**: "Get in Touch"
- **Link**: `/contact`
- **Position**: Right side of navigation

```css
.header-cta {
  @apply px-5 py-2.5 text-sm font-medium text-white
         bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         rounded-md hover:opacity-90 transition-opacity;
}
```

#### Mobile Hamburger Button

```typescript
interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}
```

```css
/* Hamburger Button */
.hamburger {
  @apply lg:hidden flex flex-col justify-center items-center
         w-10 h-10 gap-1.5 cursor-pointer;
}

/* Hamburger Lines */
.hamburger-line {
  @apply w-6 h-0.5 bg-white transition-all duration-300;
}

/* Open State */
.hamburger-open .line-1 {
  @apply rotate-45 translate-y-2;
}
.hamburger-open .line-2 {
  @apply opacity-0;
}
.hamburger-open .line-3 {
  @apply -rotate-45 -translate-y-2;
}
```

#### Framer Motion Animations

```typescript
// Header scroll animation
const headerVariants = {
  top: {
    backgroundColor: 'rgba(10, 10, 10, 0)',
    height: 80,
    borderBottomColor: 'rgba(39, 39, 42, 0)'
  },
  scrolled: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    height: 64,
    borderBottomColor: 'rgba(39, 39, 42, 1)'
  }
};

// Dropdown animation
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};
```

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `< 1024px` | Hide desktop nav, show hamburger, mobile drawer |
| `>= 1024px` | Show desktop nav with dropdowns, hide hamburger |

#### Accessibility Requirements

- Logo wrapped in `<Link>` with `aria-label="Xerostop Home"`
- Navigation wrapped in `<nav aria-label="Main navigation">`
- Hamburger button: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label="Toggle menu"`
- Dropdown trigger: `aria-haspopup="true"`, `aria-expanded`
- Skip navigation link as first focusable element
- Focus visible states on all interactive elements

---

### 2. Footer

**File**: `components/layout/footer.tsx`

#### Props Interface

```typescript
interface FooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'youtube';
  href: string;
  icon: LucideIcon;
}
```

#### Content Structure

```typescript
const footerSections: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Unified Communications', href: '/services/unified-communications' },
      { label: 'Datacenter', href: '/services/datacenter' },
      { label: 'Security', href: '/services/security' },
      { label: 'Network', href: '/services/network' },
      { label: 'Software', href: '/services/software' },
      { label: 'AI Solutions', href: '/services/ai' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '/insights?type=case-study' },
      { label: 'Whitepapers', href: '/insights?type=whitepaper' },
      { label: 'Blog', href: '/insights' },
      { label: 'FAQ', href: '/faq' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ]
  }
];

const socialLinks: SocialLink[] = [
  { platform: 'linkedin', href: 'https://linkedin.com/company/xerostop', icon: Linkedin },
  { platform: 'twitter', href: 'https://twitter.com/xerostop', icon: Twitter },
  { platform: 'github', href: 'https://github.com/xerostop', icon: Github },
  { platform: 'youtube', href: 'https://youtube.com/@xerostop', icon: Youtube },
];

const contactInfo = {
  email: 'contact@xerostop.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Boulevard, Suite 500, San Francisco, CA 94105',
};
```

#### Styling Specifications

```css
/* Footer Container */
.footer {
  @apply bg-[#0a0a0a] border-t border-[#27272a] pt-16 pb-8;
}

/* Footer Grid */
.footer-grid {
  @apply container mx-auto px-4
         grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12;
}

/* Logo Section (spans 2 columns on large screens) */
.footer-logo-section {
  @apply col-span-2 md:col-span-3 lg:col-span-2 mb-8 lg:mb-0;
}

/* Section Title */
.footer-section-title {
  @apply text-white text-sm font-semibold uppercase tracking-wider mb-4;
}

/* Footer Link */
.footer-link {
  @apply text-[#71717a] text-sm hover:text-white
         transition-colors duration-200 block py-1.5;
}

/* Social Icons Container */
.footer-social {
  @apply flex gap-4 mt-6;
}

/* Social Icon */
.footer-social-icon {
  @apply w-10 h-10 rounded-full bg-[#1a1a1a]
         flex items-center justify-center
         text-[#a1a1aa] hover:text-white hover:bg-[#222222]
         transition-all duration-200;
}

/* Contact Info */
.footer-contact {
  @apply text-[#71717a] text-sm mt-4 space-y-2;
}

/* Divider */
.footer-divider {
  @apply border-t border-[#27272a] mt-12 pt-8;
}

/* Copyright */
.footer-copyright {
  @apply text-[#71717a] text-sm text-center;
}
```

#### Responsive Behavior

| Breakpoint | Grid Layout |
|------------|-------------|
| `< 768px` | 2 columns |
| `768px - 1023px` | 3 columns |
| `>= 1024px` | 6 columns (logo spans 2) |

#### Accessibility Requirements

- Footer wrapped in `<footer role="contentinfo">`
- Each section in `<nav aria-labelledby="section-title-id">`
- Social links with `aria-label` describing destination
- Email/phone links using `mailto:` and `tel:` protocols

---

### 3. Mobile Navigation

**File**: `components/layout/mobile-nav.tsx`

#### Props Interface

```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

interface MobileNavItemProps {
  item: NavItem;
  onItemClick: () => void;
  depth?: number;
}
```

#### Styling Specifications

```css
/* Overlay */
.mobile-nav-overlay {
  @apply fixed inset-0 bg-black/60 backdrop-blur-sm z-40;
}

/* Drawer Container */
.mobile-nav-drawer {
  @apply fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px]
         bg-[#111111] z-50 overflow-y-auto;
}

/* Drawer Header */
.mobile-nav-header {
  @apply flex items-center justify-between p-4
         border-b border-[#27272a];
}

/* Close Button */
.mobile-nav-close {
  @apply w-10 h-10 rounded-full bg-[#1a1a1a]
         flex items-center justify-center
         text-[#a1a1aa] hover:text-white hover:bg-[#222222]
         transition-all duration-200;
}

/* Nav Item */
.mobile-nav-item {
  @apply flex items-center justify-between
         px-4 py-4 text-white text-base font-medium
         border-b border-[#27272a]
         active:bg-[#1a1a1a] transition-colors;
}

/* Submenu Container */
.mobile-nav-submenu {
  @apply bg-[#0a0a0a] border-b border-[#27272a];
}

/* Submenu Item */
.mobile-nav-submenu-item {
  @apply block px-8 py-3 text-[#a1a1aa] text-sm
         active:bg-[#1a1a1a] transition-colors;
}

/* CTA Button */
.mobile-nav-cta {
  @apply mx-4 mt-6 py-3 text-center text-white font-medium
         bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         rounded-md;
}

/* Contact Info */
.mobile-nav-contact {
  @apply px-4 py-6 space-y-3 text-[#71717a] text-sm;
}
```

#### Framer Motion Animations

```typescript
// Overlay animation
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

// Drawer slide animation
const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300
    }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2 }
  }
};

// Staggered nav items
const navItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 }
  })
};

// Submenu expand
const submenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};
```

#### Interaction States

- **Expandable items**: Chevron rotates 180deg when expanded
- **Active route**: Text color changes to white with gradient underline
- **Touch feedback**: Background highlight on press

#### Accessibility Requirements

- Drawer: `role="dialog"`, `aria-modal="true"`, `aria-label="Mobile navigation"`
- Focus trapped within drawer when open
- Close on Escape key press
- Close button: `aria-label="Close navigation menu"`
- Expandable items: `aria-expanded`, `aria-controls`
- Restore focus to hamburger button on close

---

## Reusable UI Components

### 4. Section Header

**File**: `components/shared/section-header.tsx`

#### Props Interface

```typescript
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animated?: boolean;
}
```

#### Styling Specifications

```css
/* Container */
.section-header {
  @apply mb-12 md:mb-16;
}

/* Center alignment */
.section-header-center {
  @apply text-center max-w-3xl mx-auto;
}

/* Left alignment */
.section-header-left {
  @apply text-left;
}

/* Badge */
.section-badge {
  @apply inline-flex items-center px-3 py-1 mb-4
         text-xs font-medium uppercase tracking-wider
         text-[#3b82f6] bg-[#3b82f6]/10
         border border-[#3b82f6]/20 rounded-full;
}

/* Title */
.section-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold text-white
         tracking-tight leading-tight;
}

/* Gradient Title Variant */
.section-title-gradient {
  @apply bg-gradient-to-r from-white via-white to-[#a1a1aa]
         bg-clip-text text-transparent;
}

/* Subtitle */
.section-subtitle {
  @apply mt-4 text-lg md:text-xl text-[#a1a1aa]
         leading-relaxed max-w-2xl;
}

.section-header-center .section-subtitle {
  @apply mx-auto;
}
```

#### Framer Motion Animations

```typescript
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};
```

#### Usage Example

```tsx
<SectionHeader
  badge="Our Services"
  title="Enterprise IT Solutions"
  subtitle="Comprehensive technology services designed to transform your business operations and drive growth."
  align="center"
  animated
/>
```

#### Accessibility Requirements

- Title uses appropriate heading level (`h2` by default, configurable)
- Badge uses `<span>` with decorative role if purely visual
- Sufficient color contrast for subtitle text (4.5:1 minimum)

---

### 5. Service Card

**File**: `components/shared/service-card.tsx`

#### Props Interface

```typescript
interface ServiceCardProps {
  icon: LucideIcon | React.ReactNode;
  title: string;
  description: string;
  href: string;
  features?: string[];
  className?: string;
  index?: number;          // For staggered animations
}
```

#### Styling Specifications

```css
/* Card Container */
.service-card {
  @apply group relative p-6 md:p-8
         bg-[#111111] border border-[#27272a] rounded-xl
         hover:border-[#3f3f46] hover:bg-[#1a1a1a]
         transition-all duration-300;
}

/* Gradient Border Effect (hover) */
.service-card::before {
  @apply content-[''] absolute inset-0 rounded-xl opacity-0
         bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20
         transition-opacity duration-300;
}
.service-card:hover::before {
  @apply opacity-100;
}

/* Icon Container */
.service-card-icon {
  @apply w-12 h-12 mb-4
         flex items-center justify-center
         bg-gradient-to-br from-[#3b82f6]/10 to-[#06b6d4]/10
         border border-[#3b82f6]/20 rounded-lg
         text-[#3b82f6] group-hover:text-[#06b6d4]
         transition-colors duration-300;
}

/* Icon Size */
.service-card-icon svg {
  @apply w-6 h-6;
}

/* Title */
.service-card-title {
  @apply text-lg md:text-xl font-semibold text-white mb-2
         group-hover:text-[#3b82f6] transition-colors duration-300;
}

/* Description */
.service-card-description {
  @apply text-[#a1a1aa] text-sm md:text-base leading-relaxed;
}

/* Features List (optional) */
.service-card-features {
  @apply mt-4 space-y-2;
}

.service-card-feature {
  @apply flex items-center gap-2 text-sm text-[#71717a];
}

.service-card-feature-icon {
  @apply w-4 h-4 text-[#3b82f6];
}

/* Link Arrow */
.service-card-arrow {
  @apply absolute bottom-6 right-6
         w-8 h-8 rounded-full bg-[#1a1a1a]
         flex items-center justify-center
         text-[#71717a] group-hover:text-white
         group-hover:bg-[#3b82f6]
         transform group-hover:translate-x-1
         transition-all duration-300;
}
```

#### Hover/Active States

| State | Changes |
|-------|---------|
| Default | `bg-[#111111]`, `border-[#27272a]` |
| Hover | `bg-[#1a1a1a]`, `border-[#3f3f46]`, title turns blue, arrow animates |
| Focus | Focus ring `ring-2 ring-[#3b82f6] ring-offset-2 ring-offset-[#0a0a0a]` |
| Active | Slight scale down `scale-[0.98]` |

#### Framer Motion Animations

```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

const iconVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3 }
  }
};

const arrowVariants = {
  idle: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } }
};
```

#### Responsive Behavior

| Breakpoint | Adjustments |
|------------|-------------|
| Mobile | Padding `24px`, smaller icon `40px` |
| Tablet+ | Padding `32px`, icon `48px` |
| Grid | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |

#### Accessibility Requirements

- Entire card is wrapped in `<Link>` or `<a>` for click area
- `aria-label` includes service title: `aria-label="Learn more about {title}"`
- Icon has `aria-hidden="true"` (decorative)
- Focus visible with clear outline
- Card content readable by screen readers

---

### 6. Solution Card

**File**: `components/shared/solution-card.tsx`

#### Props Interface

```typescript
interface SolutionCardProps {
  title: string;
  description?: string;
  features: string[];
  ctaText?: string;
  ctaHref: string;
  highlighted?: boolean;    // Featured solution
  icon?: LucideIcon;
  className?: string;
  index?: number;
}
```

#### Styling Specifications

```css
/* Card Container */
.solution-card {
  @apply relative p-6 md:p-8
         bg-[#111111] border border-[#27272a] rounded-xl
         transition-all duration-300;
}

/* Highlighted Variant */
.solution-card-highlighted {
  @apply border-[#3b82f6]/50 bg-gradient-to-b from-[#3b82f6]/5 to-transparent;
}

.solution-card-highlighted::before {
  @apply content-[''] absolute -top-px left-1/2 -translate-x-1/2
         w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent;
}

/* Featured Badge */
.solution-card-badge {
  @apply absolute -top-3 left-6
         px-3 py-1 text-xs font-medium
         text-white bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         rounded-full;
}

/* Icon */
.solution-card-icon {
  @apply w-10 h-10 mb-4 text-[#3b82f6];
}

/* Title */
.solution-card-title {
  @apply text-xl md:text-2xl font-semibold text-white mb-3;
}

/* Description */
.solution-card-description {
  @apply text-[#a1a1aa] text-sm mb-6;
}

/* Features List */
.solution-card-features {
  @apply space-y-3 mb-8;
}

.solution-card-feature {
  @apply flex items-start gap-3 text-sm text-[#a1a1aa];
}

.solution-card-feature-check {
  @apply w-5 h-5 mt-0.5 text-[#22c55e] flex-shrink-0;
}

/* CTA Button */
.solution-card-cta {
  @apply w-full py-3 text-sm font-medium text-center
         text-white bg-[#1a1a1a] border border-[#27272a]
         rounded-lg hover:bg-[#222222] hover:border-[#3f3f46]
         transition-all duration-200;
}

/* Highlighted CTA */
.solution-card-highlighted .solution-card-cta {
  @apply bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         border-0 hover:opacity-90;
}
```

#### Hover/Active States

| State | Standard | Highlighted |
|-------|----------|-------------|
| Default | Standard border | Blue gradient border |
| Hover | Lift effect, border lightens | Glow effect |
| Focus | Focus ring | Focus ring |

#### Framer Motion Animations

```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }),
  hover: {
    y: -8,
    transition: { duration: 0.3 }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.05 }
  })
};
```

#### Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile | Full width, stacked |
| Tablet | 2 columns |
| Desktop | 3 columns, highlighted centered |

#### Accessibility Requirements

- Features list uses `<ul>` with `<li>` elements
- Checkmark icons have `aria-hidden="true"`
- CTA button is keyboard accessible
- Card has clear visual hierarchy

---

### 7. Industry Card

**File**: `components/shared/industry-card.tsx`

#### Props Interface

```typescript
interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  stats?: {
    label: string;
    value: string;
  };
  className?: string;
  index?: number;
}
```

#### Styling Specifications

```css
/* Card Container */
.industry-card {
  @apply group relative p-6
         bg-[#111111] border border-[#27272a] rounded-xl
         hover:border-[#3f3f46]
         transition-all duration-300 cursor-pointer;
}

/* Hover Background Gradient */
.industry-card::before {
  @apply content-[''] absolute inset-0 rounded-xl opacity-0
         bg-gradient-to-br from-[#3b82f6]/5 to-[#06b6d4]/5
         transition-opacity duration-300;
}
.industry-card:hover::before {
  @apply opacity-100;
}

/* Icon Container */
.industry-card-icon {
  @apply w-14 h-14 mb-4
         flex items-center justify-center
         bg-[#1a1a1a] rounded-xl
         text-[#3b82f6] group-hover:text-[#06b6d4]
         group-hover:scale-110
         transition-all duration-300;
}

/* Icon Size */
.industry-card-icon svg {
  @apply w-7 h-7;
}

/* Title */
.industry-card-title {
  @apply text-lg font-semibold text-white mb-2;
}

/* Description */
.industry-card-description {
  @apply text-sm text-[#a1a1aa] leading-relaxed;
}

/* Stats (optional) */
.industry-card-stats {
  @apply mt-4 pt-4 border-t border-[#27272a];
}

.industry-card-stats-value {
  @apply text-2xl font-bold text-white;
}

.industry-card-stats-label {
  @apply text-xs text-[#71717a] uppercase tracking-wider;
}

/* Arrow indicator */
.industry-card-arrow {
  @apply absolute top-6 right-6
         w-6 h-6 text-[#71717a]
         opacity-0 transform translate-x-2
         group-hover:opacity-100 group-hover:translate-x-0
         transition-all duration-300;
}
```

#### Framer Motion Animations

```typescript
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: 'easeOut'
    }
  })
};

const iconVariants = {
  idle: { rotate: 0 },
  hover: {
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};
```

#### Responsive Behavior

| Breakpoint | Grid Layout |
|------------|-------------|
| Mobile | 1 column |
| Small | 2 columns |
| Medium | 3 columns |
| Large | 4 columns |

#### Accessibility Requirements

- If clickable, wrap in `<Link>` or `<a>` with descriptive `aria-label`
- Icon has `aria-hidden="true"`
- Stats value has associated label for context

---

### 8. Blog Card

**File**: `components/shared/blog-card.tsx`

#### Props Interface

```typescript
interface BlogCardProps {
  title: string;
  excerpt: string;
  featuredImage: {
    src: string;
    alt: string;
  };
  date: string;                    // ISO date string
  category: string;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: string;               // e.g., "5 min read"
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
  index?: number;
}
```

#### Styling Specifications

```css
/* Card Container */
.blog-card {
  @apply group relative
         bg-[#111111] border border-[#27272a] rounded-xl
         overflow-hidden
         hover:border-[#3f3f46]
         transition-all duration-300;
}

/* Image Container */
.blog-card-image {
  @apply relative aspect-[16/10] overflow-hidden;
}

.blog-card-image img {
  @apply w-full h-full object-cover
         group-hover:scale-105
         transition-transform duration-500;
}

/* Image Overlay */
.blog-card-image::after {
  @apply content-[''] absolute inset-0
         bg-gradient-to-t from-[#111111] via-transparent to-transparent
         opacity-60;
}

/* Category Badge */
.blog-card-category {
  @apply absolute top-4 left-4 z-10
         px-3 py-1 text-xs font-medium
         text-white bg-[#3b82f6]/80 backdrop-blur-sm
         rounded-full;
}

/* Content Container */
.blog-card-content {
  @apply p-5 md:p-6;
}

/* Meta Row (date, read time) */
.blog-card-meta {
  @apply flex items-center gap-3 mb-3
         text-xs text-[#71717a];
}

.blog-card-meta-divider {
  @apply w-1 h-1 bg-[#71717a] rounded-full;
}

/* Title */
.blog-card-title {
  @apply text-lg md:text-xl font-semibold text-white
         line-clamp-2 mb-2
         group-hover:text-[#3b82f6]
         transition-colors duration-300;
}

/* Excerpt */
.blog-card-excerpt {
  @apply text-sm text-[#a1a1aa] line-clamp-2 leading-relaxed;
}

/* Author Row */
.blog-card-author {
  @apply flex items-center gap-3 mt-4 pt-4
         border-t border-[#27272a];
}

.blog-card-author-avatar {
  @apply w-8 h-8 rounded-full bg-[#1a1a1a] overflow-hidden;
}

.blog-card-author-name {
  @apply text-sm text-[#a1a1aa];
}

/* Featured Variant */
.blog-card-featured {
  @apply md:flex md:flex-row;
}

.blog-card-featured .blog-card-image {
  @apply md:w-1/2 md:aspect-auto;
}

.blog-card-featured .blog-card-content {
  @apply md:w-1/2 md:flex md:flex-col md:justify-center md:p-8;
}

.blog-card-featured .blog-card-title {
  @apply md:text-2xl lg:text-3xl;
}

/* Compact Variant */
.blog-card-compact {
  @apply flex flex-row gap-4;
}

.blog-card-compact .blog-card-image {
  @apply w-24 h-24 aspect-square flex-shrink-0;
}

.blog-card-compact .blog-card-content {
  @apply p-0 flex flex-col justify-center;
}

.blog-card-compact .blog-card-title {
  @apply text-base line-clamp-2;
}
```

#### Hover/Active States

| Element | Hover Effect |
|---------|--------------|
| Card | Border lightens |
| Image | Scale 1.05 |
| Title | Color changes to blue |

#### Framer Motion Animations

```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const imageVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};
```

#### Responsive Behavior

| Variant | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Default | 1 col | 2 cols | 3 cols |
| Featured | Full width, stacked | Side-by-side | Side-by-side |
| Compact | Horizontal | Horizontal | Horizontal |

#### Accessibility Requirements

- Image has descriptive `alt` text
- Card wrapped in `<article>` element
- Link covers entire card with `::after` pseudo-element
- Date uses `<time datetime="ISO-date">`
- `line-clamp` text has `title` attribute with full text

---

### 9. CTA Section

**File**: `components/shared/cta-section.tsx`

#### Props Interface

```typescript
interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

interface CTASectionProps {
  heading: string;
  description?: string;
  buttons: CTAButton[];
  variant?: 'default' | 'gradient' | 'card';
  align?: 'left' | 'center';
  backgroundPattern?: boolean;
  className?: string;
}
```

#### Styling Specifications

```css
/* Default Variant */
.cta-section {
  @apply py-16 md:py-24;
}

/* Gradient Background Variant */
.cta-section-gradient {
  @apply relative overflow-hidden
         bg-gradient-to-r from-[#3b82f6]/10 via-[#111111] to-[#06b6d4]/10;
}

/* Card Variant */
.cta-section-card {
  @apply my-16 mx-4 md:mx-8
         p-8 md:p-12 lg:p-16
         bg-[#111111] border border-[#27272a] rounded-2xl;
}

/* Background Pattern */
.cta-section-pattern {
  @apply absolute inset-0 opacity-30;
  background-image: radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0);
  background-size: 40px 40px;
}

/* Container */
.cta-section-container {
  @apply container mx-auto px-4 relative z-10;
}

/* Content Wrapper - Center */
.cta-section-center {
  @apply text-center max-w-3xl mx-auto;
}

/* Content Wrapper - Left */
.cta-section-left {
  @apply md:flex md:items-center md:justify-between md:gap-8;
}

/* Heading */
.cta-section-heading {
  @apply text-2xl md:text-3xl lg:text-4xl font-bold text-white
         tracking-tight;
}

/* Description */
.cta-section-description {
  @apply mt-4 text-lg text-[#a1a1aa] max-w-2xl;
}

.cta-section-center .cta-section-description {
  @apply mx-auto;
}

/* Buttons Container */
.cta-section-buttons {
  @apply flex flex-col sm:flex-row gap-4 mt-8;
}

.cta-section-center .cta-section-buttons {
  @apply justify-center;
}

/* Primary Button */
.cta-button-primary {
  @apply px-8 py-4 text-base font-medium text-white
         bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         rounded-lg hover:opacity-90
         shadow-lg shadow-[#3b82f6]/25
         transition-all duration-200;
}

/* Secondary Button */
.cta-button-secondary {
  @apply px-8 py-4 text-base font-medium text-white
         bg-[#1a1a1a] border border-[#27272a]
         rounded-lg hover:bg-[#222222] hover:border-[#3f3f46]
         transition-all duration-200;
}

/* Outline Button */
.cta-button-outline {
  @apply px-8 py-4 text-base font-medium text-[#3b82f6]
         bg-transparent border border-[#3b82f6]
         rounded-lg hover:bg-[#3b82f6] hover:text-white
         transition-all duration-200;
}
```

#### Framer Motion Animations

```typescript
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};
```

#### Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile | Stacked, full-width buttons |
| Tablet | Side-by-side buttons |
| Desktop | `left` variant: heading left, buttons right |

#### Accessibility Requirements

- Section uses `<section>` with `aria-labelledby` pointing to heading
- Buttons are actual `<Link>` or `<a>` elements
- Sufficient color contrast for all button variants
- Focus states clearly visible

#### Clickable CTA Pattern (Hero, etc.)

For clickable links that look like buttons, use `<Link>` with `buttonVariants`:

```tsx
<Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
  Book a Consultation
</Link>
```

**Avoid**: `<Link><Button>...</Button></Link>` — invalid HTML (button inside anchor), can block clicks. Decorative overlays should use `pointer-events-none` so clicks reach links.

---

### 10. Gradient Text

**File**: `components/shared/gradient-text.tsx`

#### Props Interface

```typescript
interface GradientTextProps {
  children: React.ReactNode;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  gradient?: 'primary' | 'secondary' | 'rainbow' | 'custom';
  customGradient?: string;       // Custom gradient CSS
  animated?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  className?: string;
}
```

#### Gradient Presets

```css
/* Primary Gradient (Blue to Cyan) */
.gradient-primary {
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
}

/* Secondary Gradient (Cyan to Purple) */
.gradient-secondary {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
}

/* Rainbow Gradient */
.gradient-rainbow {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
}
```

#### Styling Specifications

```css
/* Base Gradient Text */
.gradient-text {
  @apply bg-clip-text text-transparent;
  background-size: 200% 200%;
}

/* Static (no animation) */
.gradient-text-static {
  background-size: 100% 100%;
}

/* Animated Gradient */
.gradient-text-animated {
  animation: gradientShift var(--animation-duration) ease infinite;
}

/* Animation Speeds */
.gradient-text-slow {
  --animation-duration: 8s;
}

.gradient-text-normal {
  --animation-duration: 4s;
}

.gradient-text-fast {
  --animation-duration: 2s;
}

/* Keyframes */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
```

#### Implementation

```typescript
'use client';

import { cn } from '@/lib/utils';

const gradients = {
  primary: 'bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]',
  secondary: 'bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]',
  rainbow: 'bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] via-[#ec4899] to-[#f59e0b]',
};

const animationSpeeds = {
  slow: 'animate-[gradientShift_8s_ease_infinite]',
  normal: 'animate-[gradientShift_4s_ease_infinite]',
  fast: 'animate-[gradientShift_2s_ease_infinite]',
};

export function GradientText({
  children,
  as: Component = 'span',
  gradient = 'primary',
  customGradient,
  animated = false,
  animationSpeed = 'normal',
  className,
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        'bg-clip-text text-transparent',
        customGradient || gradients[gradient],
        animated && [
          'bg-[length:200%_200%]',
          animationSpeeds[animationSpeed]
        ],
        className
      )}
    >
      {children}
    </Component>
  );
}
```

#### Usage Examples

```tsx
// Simple static gradient
<GradientText>Innovative Solutions</GradientText>

// Animated heading
<GradientText as="h1" animated animationSpeed="slow">
  Transform Your Business
</GradientText>

// Custom gradient
<GradientText customGradient="bg-gradient-to-r from-green-400 to-blue-500">
  Custom Colors
</GradientText>
```

#### Accessibility Requirements

- Text remains readable (no reliance on color alone for meaning)
- Animation respects `prefers-reduced-motion`
- Underlying text color fallback for browsers without gradient support

---

### 11. Animated Counter

**File**: `components/shared/animated-counter.tsx`

#### Props Interface

```typescript
interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;           // in milliseconds
  delay?: number;              // delay before starting
  prefix?: string;             // e.g., "$"
  suffix?: string;             // e.g., "%", "+", "K"
  decimals?: number;           // decimal places
  separator?: string;          // thousands separator
  enableScrollTrigger?: boolean;
  className?: string;
  valueClassName?: string;
  label?: string;
  labelClassName?: string;
}
```

#### Styling Specifications

```css
/* Counter Container */
.animated-counter {
  @apply text-center;
}

/* Counter Value */
.animated-counter-value {
  @apply text-4xl md:text-5xl lg:text-6xl font-bold text-white
         tabular-nums;
}

/* Gradient Value Variant */
.animated-counter-value-gradient {
  @apply bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]
         bg-clip-text text-transparent;
}

/* Prefix/Suffix */
.animated-counter-affix {
  @apply text-[#3b82f6];
}

/* Label */
.animated-counter-label {
  @apply mt-2 text-sm md:text-base text-[#a1a1aa] uppercase tracking-wider;
}
```

#### Implementation Logic

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  enableScrollTrigger = true,
  className,
  valueClassName,
  label,
  labelClassName,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(start);

  const motionValue = useMotionValue(start);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (!enableScrollTrigger || isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(end);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, enableScrollTrigger, end, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  const formattedValue = formatNumber(displayValue, decimals, separator);

  return (
    <div className={cn('animated-counter', className)}>
      <span ref={ref} className={cn('animated-counter-value', valueClassName)}>
        {prefix && <span className="animated-counter-affix">{prefix}</span>}
        {formattedValue}
        {suffix && <span className="animated-counter-affix">{suffix}</span>}
      </span>
      {label && (
        <p className={cn('animated-counter-label', labelClassName)}>
          {label}
        </p>
      )}
    </div>
  );
}

function formatNumber(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const withSeparator = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart ? `${withSeparator}.${decPart}` : withSeparator;
}
```

#### Animation Configuration

```typescript
// Spring configuration options
const springConfigs = {
  smooth: { damping: 50, stiffness: 100 },    // Default - smooth deceleration
  bouncy: { damping: 20, stiffness: 300 },    // Overshoots slightly
  stiff: { damping: 30, stiffness: 400 },     // Snappy, quick settle
};

// Easing functions for non-spring animations
const easings = {
  easeOut: [0.25, 0.1, 0.25, 1],
  easeInOut: [0.42, 0, 0.58, 1],
};
```

#### Usage Examples

```tsx
// Basic counter
<AnimatedCounter end={500} label="Projects Completed" />

// With prefix and suffix
<AnimatedCounter
  end={99.9}
  decimals={1}
  suffix="%"
  label="Client Satisfaction"
/>

// Currency with K suffix
<AnimatedCounter
  end={2.5}
  decimals={1}
  prefix="$"
  suffix="M"
  label="Revenue Generated"
/>

// Delayed start
<AnimatedCounter
  end={150}
  suffix="+"
  delay={500}
  label="Team Members"
/>
```

#### Responsive Behavior

| Breakpoint | Value Size | Label Size |
|------------|------------|------------|
| Mobile | `text-4xl` (36px) | `text-sm` (14px) |
| Tablet | `text-5xl` (48px) | `text-base` (16px) |
| Desktop | `text-6xl` (60px) | `text-base` (16px) |

#### Accessibility Requirements

- Uses `tabular-nums` font feature for stable width during animation
- Animation respects `prefers-reduced-motion` (instant display of final value)
- Label associated with value via `aria-label` or visual proximity
- Value is readable by screen readers as final number

```typescript
// Reduced motion support
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  setDisplayValue(end); // Skip animation
}
```

---

## Component File Structure

```
components/
├── layout/
│   ├── site-layout.tsx       # Root wrapper: Header + MobileNav + children + Footer
│   ├── header.tsx            # Logo left, nav center, CTA right — fixed at top
│   ├── footer.tsx
│   ├── mobile-nav.tsx
│   └── index.ts              # Barrel exports
│
├── shared/
│   ├── section-header.tsx
│   ├── service-card.tsx
│   ├── solution-card.tsx
│   ├── industry-card.tsx
│   ├── blog-card.tsx
│   ├── cta-section.tsx
│   ├── gradient-text.tsx
│   ├── animated-counter.tsx
│   └── index.ts              # Barrel exports
│
└── ui/                       # shadcn/ui base components
    ├── button.tsx
    ├── card.tsx
    ├── badge.tsx
    └── ...
```

## Shared Types

**File**: `types/components.ts`

```typescript
import type { LucideIcon } from 'lucide-react';

// Common prop types
export interface BaseComponentProps {
  className?: string;
}

export interface AnimatableProps {
  animated?: boolean;
  animationDelay?: number;
  index?: number;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: LucideIcon;
}

// Card content types
export interface ServiceContent {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  features?: string[];
}

export interface SolutionContent {
  title: string;
  description?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
  icon?: LucideIcon;
}

export interface IndustryContent {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  stats?: { label: string; value: string };
}

export interface BlogPost {
  title: string;
  excerpt: string;
  featuredImage: { src: string; alt: string };
  date: string;
  category: string;
  slug: string;
  author?: { name: string; avatar?: string };
  readTime?: string;
}

// CTA types
export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}
```

## Utility Functions

**File**: `lib/animation-utils.ts`

```typescript
import { Variants } from 'framer-motion';

// Stagger children animation
export function createStaggerVariants(
  staggerDelay = 0.1,
  initialY = 30
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay }
    }
  };
}

// Fade up animation for individual items
export function createFadeUpVariants(
  delay = 0,
  duration = 0.5
): Variants {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration, ease: [0.25, 0.1, 0.25, 1] }
    }
  };
}

// Scale animation
export function createScaleVariants(): Variants {
  return {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 }
  };
}
```

## Testing Considerations

- All components should have unit tests for prop variations
- Test hover/focus states with user-event library
- Test accessibility with jest-axe
- Test responsive behavior with viewport mocking
- Test animation triggers with Framer Motion test utilities

## Implementation Priority

1. **Phase 1 - Core Layout**
   - Header (with scroll behavior)
   - Footer
   - Mobile Navigation

2. **Phase 2 - Essential Cards**
   - Section Header
   - Service Card
   - CTA Section

3. **Phase 3 - Content Cards**
   - Solution Card
   - Industry Card
   - Blog Card

4. **Phase 4 - Enhancement Components**
   - Gradient Text
   - Animated Counter

---

## Checklist

- [x] Header component with sticky scroll behavior (used in root layout)
- [ ] Footer component with all sections
- [ ] Mobile navigation with drawer animation
- [ ] Section header with badge support
- [ ] Service card with hover effects
- [ ] Solution card with highlighted variant
- [ ] Industry card with stats
- [ ] Blog card with all variants
- [ ] CTA section with multiple layouts
- [ ] Gradient text with animation
- [ ] Animated counter with scroll trigger
- [ ] All components TypeScript typed
- [ ] All components use Tailwind CSS
- [ ] All components have Framer Motion animations
- [ ] All components meet accessibility requirements
- [ ] All components are responsive
