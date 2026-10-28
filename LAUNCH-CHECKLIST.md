# XeroStop Launch Checklist

Everything below needs an account, a business decision, or access outside this codebase.
Code-side SEO, security, and performance work is already in place.

## Before deploying

- [ ] Replace the placeholder USA office in `lib/config.ts` (marked `TODO`) with the real address and phone, then set `verified: true` so it is included in structured data. Remove the entry if there is no US office.
- [ ] Confirm the Riyadh address, phone, email, and business hours in `lib/config.ts` exactly match the Google Business Profile (name, address, and phone must be identical everywhere).
- [ ] Confirm the LinkedIn and X (Twitter) profile URLs in `lib/config.ts` exist; they are published as `sameAs` in structured data.
- [ ] Copy `.env.example` to `.env.local` (or set the variables in your build environment) and fill in:
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Google Search Console HTML tag value)
  - `NEXT_PUBLIC_BING_SITE_VERIFICATION` (Bing Webmaster Tools value)
  - `NEXT_PUBLIC_GA_ID` (optional, GA4 measurement ID)
- [ ] Run `npm run build`, then upload the contents of `out/` (including the hidden `.htaccess`) to the web root.

## Hosting (Apache)

- [ ] Install a valid TLS certificate for `xerostop.com` and `www.xerostop.com`. `.htaccess` redirects HTTP to HTTPS and `www` to the bare domain.
- [ ] Make sure `mod_rewrite`, `mod_headers`, and `mod_deflate` (or `mod_brotli`) are enabled and `AllowOverride All` is set for the site directory.
- [ ] After deploying, check the headers at https://securityheaders.com and the redirects with `curl -I http://www.xerostop.com/about`.
- [ ] Check that a missing URL (for example `/does-not-exist/`) returns the branded 404 page with a 404 status.
- [ ] Optional: put the site behind a CDN (for example Cloudflare) for HTTP/3, edge caching, and DDoS protection.

## Contact form (Formspree)

- [ ] In the Formspree dashboard for form `mvzbpape`, enable reCAPTCHA or Formspree's spam filtering.
- [ ] Restrict allowed domains to `xerostop.com`.
- [ ] Set the notification email to the inbox that will answer inquiries, then send a test from the live site.

## Search engines

- [ ] Google Search Console: verify the domain property, submit `https://xerostop.com/sitemap.xml`, and request indexing for the home, services, and contact pages.
- [ ] Bing Webmaster Tools: verify (or import from Search Console) and submit the sitemap.
- [ ] Validate structured data for a few pages with Google's Rich Results Test (home, an insight article, `/faq/`, a product page).
- [ ] Run PageSpeed Insights on the live URLs (mobile and desktop) and keep the report as a baseline.

## Local SEO (Saudi Arabia)

- [ ] Create and verify a Google Business Profile for the Riyadh office (category: "IT consultant" or "Computer consultant"), with hours Sun-Thu, 9:00-18:00, website link, logo, and photos.
- [ ] Add the business to Apple Business Connect and Bing Places.
- [ ] Add consistent business listings (same name, address, and phone) to Saudi and regional directories: Saudi Chamber / Riyadh Chamber member directory, Clutch, GoodFirms, and LinkedIn company page.
- [ ] Consider showing the commercial registration (CR) and VAT numbers in the footer; they are a trust signal for Saudi buyers.
- [ ] Ask early clients for Google reviews.

## Off-page SEO and content

- [ ] Publish at least one new Insights article per month; link each new article from related service pages.
- [ ] Share every article on the company LinkedIn page.
- [ ] Pursue backlinks from vendor partner directories (Cisco, Microsoft, Fortinet, and other partner locators), industry associations, and guest articles.
- [ ] Add real case studies (even anonymized) and client logos once approved; they strengthen both conversions and E-E-A-T.
- [ ] Add product screenshots to `public/images/products/<product>/` (`01.png` to `04.png`, plus `hero.png`/`.webp`); the pages pick them up automatically and `npm run build` generates optimized versions.
- [ ] Consider an Arabic version of the site (`/ar/` with `hreflang`) for government and enterprise buyers.

## Ongoing checks

- `node scripts/audit-seo.mjs` after each build: titles, descriptions, canonicals, Open Graph, H1s, JSON-LD, and sitemap coverage.
- `node scripts/lighthouse-batch.mjs mobile` and `node scripts/lighthouse-batch.mjs desktop` against `npx serve out -l 4173` for Lighthouse scores.
