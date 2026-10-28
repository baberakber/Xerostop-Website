import type { Metadata } from 'next';
import { siteConfig } from './config';

export const DEFAULT_OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} - Enterprise IT Consultancy in Saudi Arabia`,
};

/** Normalizes a site path to the exported URL shape (`trailingSlash: true`). */
export function canonicalPath(path = '/'): string {
  const [pathname, query] = path.split('?');
  let p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p = `${p}/`;
  return query ? `${p}?${query}` : p;
}

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${canonicalPath(path)}`;
}

interface BuildMetadataOptions {
  /** Page title without the brand; the root layout template appends " | XeroStop". */
  title: string;
  description: string;
  path: string;
  /** Use the title as-is (no brand suffix), e.g. for the home page. */
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = canonicalPath(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = [{ url: image.url, width: image.width, height: image.height, alt: image.alt }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
      ...(type === 'article' && { publishedTime, modifiedTime, authors, section, tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
