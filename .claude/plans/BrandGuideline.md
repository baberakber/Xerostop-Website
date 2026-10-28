# Xerostop Brand Guidelines

This document defines the visual identity and design system used across the Xerostop website. Use these standards for consistency in UI, marketing assets, and future development.

---

## 1. Brand Overview

- **Brand name:** Xerostop  
- **Positioning:** Enterprise IT consultancy — design, secure, and automate modern infrastructure.  
- **Visual tone:** Dark, professional, tech-forward. High contrast and accent-driven.  
- **Theme:** Dark mode by default (`dark` class on `html`).

---

## 2. Main Colors

### Backgrounds

| Token | Hex | Usage |
|-------|-----|--------|
| **Background Primary** | `#0a0a0a` | Page background, main surfaces |
| **Background Secondary** | `#111111` | Section backgrounds, alternating blocks |
| **Background Card** | `#1a1a1a` | Cards, panels, elevated content |
| **Background Elevated** | `#222222` | Hover states, dropdowns, overlays |

**Tailwind:** `bg-background-primary`, `bg-background-secondary`, `bg-background-card`, `bg-background-elevated`

### Accent Colors

| Token | Hex | Usage |
|-------|-----|--------|
| **Accent Primary** | `#3b82f6` | Primary actions, links, key UI elements, blue accent |
| **Accent Primary Hover** | `#2563eb` | Hover state for primary |
| **Accent Secondary** | `#06b6d4` | Secondary accent, gradients, cyan |
| **Accent Secondary Hover** | `#0891b2` | Hover state for secondary |

**Tailwind:** `accent-primary`, `accent-primary-hover`, `accent-secondary`, `accent-secondary-hover`

---

## 3. Text Colors

| Token | Hex | Usage |
|-------|-----|--------|
| **Text Primary** | `#ffffff` | Headings, primary body copy |
| **Text Secondary** | `#a1a1aa` | Descriptions, secondary copy |
| **Text Muted** | `#71717a` | Labels, captions, tertiary info |

**Tailwind:** `text-text-primary`, `text-text-secondary`, `text-text-muted`

---

## 4. Border Colors

| Token | Hex | Usage |
|-------|-----|--------|
| **Border Default** | `#27272a` | Default borders (cards, inputs, dividers) |
| **Border Hover** | `#3f3f46` | Borders on hover/focus |

**Tailwind:** `border-border`, `border-border-hover`

---

## 5. Hover Styles

### Buttons

- **Primary:**  
  Default: `bg-accent-primary`.  
  Hover: `bg-accent-primary-hover`, `shadow-glow-md`.
- **Secondary / Outline:**  
  Default: `border-border`, `bg-transparent`.  
  Hover: `border-border-hover`, `bg-background-card`.

### Links

- Default: `text-accent-primary`.
- Hover: `text-accent-primary-hover` or `hover:underline`.
- Optional: animated underline (`.link-underline`) — underline grows from left on hover.

### Cards & Tiles

- Default: `border-border`, `bg-background-card`.
- Hover: `border-border-hover` or `border-accent-primary/30` or `border-accent-primary/50`, `shadow-glow-sm`, optionally `bg-background-elevated`.
- Icon/heading on card hover: `group-hover:text-accent-primary`, `group-hover:bg-accent-primary/20` for icon containers.

### Icon Containers

- Default: `bg-accent-primary/10`, `text-accent-primary`.
- Hover (inside card): `group-hover:bg-accent-primary/20`, optional `group-hover:scale-110` for icon.

---

## 6. Gradients

### Primary Brand Gradient (Blue → Cyan)

- **Direction:** Left to right.  
- **Stops:** `#3b82f6` → `#06b6d4`.  
- **Usage:** CTAs, gradient text, logo mark, key visuals.  
- **Tailwind:** `bg-gradient-to-r from-accent-primary to-accent-secondary`.

### Reversed Gradient

- **Stops:** `#06b6d4` → `#3b82f6`.  
- **Tailwind:** `from-accent-secondary to-accent-primary`.

### Gradient Text

- **Primary:** `from-accent-primary to-accent-secondary` + `bg-clip-text text-transparent`.
- **Secondary:** reverse of above.
- **Rainbow (optional):** `from-blue-500 via-purple-500 to-pink-500` — use sparingly.

### Background Gradients

- **Hero / section:** `bg-gradient-to-b from-background-primary to-background-secondary`.
- **Subtle accent overlay:** `from-accent-primary/5 via-transparent to-transparent`.
- **Hero gradient (Tailwind):** `hero-gradient` — `linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)`.

### Soft Icon/Background Gradients

- **Icon container:** `bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10` with `border border-accent-primary/20`.

---

## 7. Shadows & Glow

| Token | Value | Usage |
|-------|--------|--------|
| **Glow SM** | `0 0 10px rgba(59, 130, 246, 0.3)` | Card hover, subtle emphasis |
| **Glow MD** | `0 0 20px rgba(59, 130, 246, 0.4)` | Button hover, focused elements |
| **Glow LG** | `0 0 30px rgba(59, 130, 246, 0.5)` | Hero or feature emphasis |

**Tailwind:** `shadow-glow-sm`, `shadow-glow-md`, `shadow-glow-lg`

Glow uses the primary accent blue for a consistent tech feel.

---

## 8. Typography

- **Font family:** Inter (`--font-inter`), fallback `system-ui`, `sans-serif`.
- **Body:** `antialiased`, default color `text-text-primary`.

### Heading Scale

- **H1:** `text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl` (`.heading-1`)
- **H2:** `text-3xl font-bold tracking-tight sm:text-4xl` (`.heading-2`)
- **H3:** `text-2xl font-semibold tracking-tight sm:text-3xl` (`.heading-3`)

Use `GradientText` for one word in key headings (e.g. “Privacy **Policy**”) with the primary gradient.

---

## 9. Image & Visual Guidelines

### Image Color Idea

- **Backgrounds:** Prefer dark tones that sit on or near `#0a0a0a` / `#111111`. Avoid bright or pure white backgrounds.
- **Overlays:** Use subtle accent overlays (e.g. `accent-primary/5`, `accent-primary/10`) to tie images to the brand.
- **Icons & graphics:** Use `accent-primary` and `accent-secondary` for line art, icons, and decorative elements. Optional borders with `accent-primary/20` or `accent-secondary/20`.
- **Photos:** Slightly desaturated or dark-toned images work best. Blue/cyan tint in post-processing can align with the accent palette.
- **Contrast:** Ensure text on images uses `text-primary` or has a dark overlay for readability.

### Decorative Elements

- Circles/rings: `border-accent-primary/20`, `border-accent-secondary/20`, dots `bg-accent-primary/50`, `bg-accent-secondary/50`.
- Corner brackets: `border-accent-primary/30`, `border-accent-secondary/30`.

---

## 10. Component Patterns

### Cards

- Base: `rounded-xl border border-border bg-background-card p-6` (or `p-8`).
- Hover: `hover:border-accent-primary/30 hover:shadow-glow-sm` (or `border-accent-primary/50` for stronger emphasis).

### Buttons

- **Primary:** `rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white`; hover: `hover:opacity-90`.
- **Secondary:** `rounded-lg border border-border bg-transparent`; hover: `hover:border-border-hover hover:bg-background-card`.

### Badges / Pills

- Example: `rounded-full border border-accent-primary/20 bg-accent-primary/10 text-accent-primary`.

### Focus & Accessibility

- **Focus ring:** `ring-2 ring-accent-primary ring-offset-2 ring-offset-background-primary`.
- **Selection:** `bg-accent-primary/30 text-text-primary`.

---

## 11. Motion & Animation

- **Transitions:** `transition-all duration-300` (cards, hovers); `duration-200` for links.
- **Keyframes:** `fadeIn`, `slideUp`, `slideDown`, `glow`, `pulse-slow` (see `tailwind.config.ts`).
- **Scrollbar:** Track `#111111`, thumb `border-hover`, thumb hover `text-muted`.

---

## 12. Quick Reference

| Purpose | Use |
|--------|-----|
| Page background | `#0a0a0a` |
| Section background | `#111111` |
| Cards / panels | `#1a1a1a` |
| Primary actions & links | `#3b82f6` → hover `#2563eb` |
| Secondary accent / gradient end | `#06b6d4` |
| Headings & primary text | `#ffffff` |
| Body secondary | `#a1a1aa` |
| Muted / labels | `#71717a` |
| Borders | `#27272a` → hover `#3f3f46` |
| Gradient (main) | `#3b82f6` → `#06b6d4` |
| Glow | Blue `rgba(59, 130, 246, 0.3–0.5)` |

---

*Document derived from Xerostop website implementation. Last updated: February 2025.*
