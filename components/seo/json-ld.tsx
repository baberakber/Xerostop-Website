import { absoluteUrl } from '@/lib/seo';

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/** Renders schema.org structured data. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.label,
          ...(item.href && { item: absoluteUrl(item.href) }),
        })),
      }}
    />
  );
}
