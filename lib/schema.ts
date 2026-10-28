import { siteConfig } from './config';
import { absoluteUrl } from './seo';
import type { Article } from '@/types/insights';
import type { Product } from '@/types/products';
import type { Solution } from '@/types/solutions';
import type { ServiceCategory } from './data/services';

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

const sameAs = Object.values(siteConfig.links);

const postalAddress = {
  '@type': 'PostalAddress',
  ...siteConfig.contact.postalAddress,
};

/** Site-wide graph: the company, its Riyadh head office, and the website. */
export function siteSchema() {
  const { contact } = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: `${siteConfig.url}/`,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/images/brand/xerostop-icon-512.png'),
          width: 512,
          height: 512,
        },
        image: absoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        email: contact.email,
        telephone: contact.phone,
        address: postalAddress,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: contact.openingHours.days,
          opens: contact.openingHours.opens,
          closes: contact.openingHours.closes,
        },
        areaServed: [
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'Place', name: 'Gulf Cooperation Council (GCC)' },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: contact.email,
            telephone: contact.phone,
            areaServed: 'SA',
            availableLanguage: ['English', 'Arabic'],
          },
        ],
        knowsAbout: [
          'Unified Communications',
          'Contact Center',
          'Datacenter',
          'Enterprise Networking',
          'SD-WAN',
          'Cybersecurity',
          'Zero Trust',
          'AIOps',
          'Managed IT Services',
          'Low Current Systems',
        ],
        priceRange: '$$$',
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: 'en',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

export function articleSchema(article: Article) {
  const url = absoluteUrl(`/insights/${article.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: article.title,
    description: article.seo?.metaDescription || article.excerpt,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(article.featuredImage.url),
      width: article.featuredImage.width,
      height: article.featuredImage.height,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { '@type': 'Organization', name: article.author.name, url: absoluteUrl('/about/') },
    publisher: { '@id': ORG_ID },
    articleSection: article.category.name,
    keywords: article.tags.join(', '),
    wordCount: article.content.split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${article.readingTime}M`,
    inLanguage: 'en',
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema(service: ServiceCategory) {
  const url = absoluteUrl(`/services/${service.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    image: absoluteUrl(service.heroImage),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} offerings`,
      itemListElement: service.keyOfferings.map((offering) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: offering.title, description: offering.description },
      })),
    },
  };
}

export function solutionSchema(solution: Solution) {
  const url = absoluteUrl(`/solutions/${solution.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name: solution.title,
    serviceType: solution.title,
    description: solution.description,
    image: absoluteUrl(solution.heroImage),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  };
}

export function productSchema(product: Product) {
  const url = absoluteUrl(`/products/${product.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}#software`,
    url,
    name: product.name,
    description: product.shortDescription,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Unified Communications',
    operatingSystem: 'Web-based',
    ...(product.heroImage && { image: absoluteUrl(product.heroImage.src), screenshot: absoluteUrl(product.heroImage.src) }),
    featureList: product.features.map((f) => f.title),
    publisher: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
