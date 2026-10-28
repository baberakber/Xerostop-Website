import type { Metadata } from 'next';
import Link from 'next/link';
import { GradientText } from '@/components/shared/gradient-text';
import { SimpleHero } from '@/components/shared/simple-hero';
import { siteConfig } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description:
    'How the XeroStop website uses browser storage and, where enabled, analytics cookies, and how you can control them in your browser settings.',
  path: '/cookies/',
});

export default function CookiePolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SimpleHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]}
        title={
          <>
            Cookie <GradientText as="span" gradient="primary">Policy</GradientText>
          </>
        }
        description="How XeroStop uses cookies and similar technologies on our website."
      >
        <p className="mt-4 text-sm text-text-secondary">Last updated: October 2026</p>
      </SimpleHero>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10 text-text-secondary">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to site owners. XeroStop uses cookies and similar technologies to improve your experience on xerostop.com.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                2. How We Use Cookies
              </h2>
              <p className="mb-4">
                Our website is intentionally lightweight. We use browser storage and cookies only for the following purposes:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li><strong className="text-text-primary">Preferences (local storage):</strong> We remember whether you chose the light or dark theme. This value never leaves your device.</li>
                <li><strong className="text-text-primary">Analytics cookies (if enabled):</strong> When Google Analytics is enabled, it sets first-party cookies (such as <code>_ga</code>) to measure aggregated page views and traffic sources. IP addresses are anonymized and advertising features are disabled.</li>
              </ul>
              <p className="mt-4">
                We do not use advertising or marketing cookies, and we do not sell or share browsing data with advertisers.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                3. Types of Cookies We Use
              </h2>
              <p className="mb-4">
                Depending on whether analytics is enabled, our website may use:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li><strong className="text-text-primary">Local storage:</strong> A single theme preference stored by your browser until you clear it.</li>
                <li><strong className="text-text-primary">First-party analytics cookies:</strong> Set on xerostop.com by Google Analytics and kept for up to 13 months.</li>
              </ul>
              <p className="mt-4">
                When you submit our contact form, your message is delivered through Formspree, which may set its own strictly necessary cookies to prevent spam.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                4. Your Choices
              </h2>
              <p>
                You can control and manage cookies in several ways. Most browsers allow you to refuse or accept cookies through their settings. You can also delete existing cookies. Please note that blocking or deleting certain cookies may affect the functionality of the XeroStop website. For more information, check your browser&apos;s help section or visit sites such as allaboutcookies.org.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                5. Other Technologies
              </h2>
              <p>
                In addition to cookies, we may use similar technologies such as local storage, pixel tags, or SDKs for analytics and functionality. Our use of these technologies is consistent with the purposes described in this Cookie Policy and our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                6. Updates
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We will post the revised policy on this page and update the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                7. Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact XeroStop at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-accent-primary hover:underline">
                  {siteConfig.contact.email}
                </a>
                {' '}or visit our{' '}
                <Link href="/contact/" className="text-accent-primary hover:underline">
                  Contact
                </Link>
                {' '}page. For more information about how we handle personal data, see our{' '}
                <Link href="/privacy/" className="text-accent-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
