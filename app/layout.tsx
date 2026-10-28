import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { siteSchema } from '@/lib/schema';
import { SiteLayout } from '@/components/layout/site-layout';
import { ChunkLoadErrorHandler } from '@/components/layout/chunk-load-error-handler';
import { JsonLd } from '@/components/seo/json-ld';
import { Analytics } from '@/components/seo/analytics';

const defaultTitle = `${siteConfig.name} | Enterprise IT Consultancy in Saudi Arabia`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE.url],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1f3a' },
  ],
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('xerostop-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/orbitron-brand.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background-primary font-sans antialiased">
        <JsonLd data={siteSchema()} />
        <ChunkLoadErrorHandler />
        <SiteLayout>{children}</SiteLayout>
        <Analytics />
      </body>
    </html>
  );
}
