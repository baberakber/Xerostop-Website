import type { Metadata } from 'next';
import Link from 'next/link';
import { GradientText } from '@/components/shared/gradient-text';
import { SimpleHero } from '@/components/shared/simple-hero';
import { siteConfig } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'Terms and conditions that govern your use of the XeroStop website and our enterprise IT consultancy services, under the laws of the Kingdom of Saudi Arabia.',
  path: '/terms/',
});

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SimpleHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
        title={
          <>
            Terms of <GradientText as="span" gradient="primary">Service</GradientText>
          </>
        }
        description="Terms and conditions for using the XeroStop website and services."
      >
        <p className="mt-4 text-sm text-text-secondary">Last updated: October 2026</p>
      </SimpleHero>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10 text-text-secondary">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the XeroStop website (xerostop.com) or our enterprise IT consultancy services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. XeroStop reserves the right to modify these terms at any time; continued use after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                2. Use of Our Website and Services
              </h2>
              <p className="mb-4">
                You may use the XeroStop website and services only for lawful purposes and in accordance with these terms. You agree not to:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>Use the site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems, networks, or data</li>
                <li>Transmit any malware, viruses, or other harmful code</li>
                <li>Scrape, copy, or use automated means to collect content without permission</li>
                <li>Impersonate XeroStop or any other person or entity</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                3. Intellectual Property
              </h2>
              <p>
                All content on the XeroStop website, including text, graphics, logos, and software, is the property of XeroStop or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                4. Consultancy and Service Agreements
              </h2>
              <p>
                Specific consultancy projects, engagements, and deliverables may be governed by separate agreements (e.g., statements of work, master service agreements). In the event of a conflict between these Terms of Service and a signed agreement, the signed agreement shall prevail for that engagement.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The XeroStop website and general information provided thereon are offered &quot;as is&quot; and &quot;as available.&quot; We do not warrant that the site will be uninterrupted, error-free, or free of viruses. Any reliance on information on the site is at your own risk. Professional advice should be sought for specific business or technical decisions.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, XeroStop shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claims related to these terms or the site shall not exceed the amount you paid to XeroStop in the twelve months preceding the claim, if any.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                7. Links to Third-Party Sites
              </h2>
              <p>
                Our website may contain links to third-party websites. XeroStop is not responsible for the content or practices of those sites. Your use of third-party sites is at your own risk and subject to their terms and policies.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                8. Governing Law
              </h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to conflict of law principles. Any disputes shall be resolved by the competent courts of Riyadh, Saudi Arabia.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                9. Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact XeroStop at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-accent-primary hover:underline">
                  {siteConfig.contact.email}
                </a>
                {' '}or through our{' '}
                <Link href="/contact/" className="text-accent-primary hover:underline">
                  Contact
                </Link>
                {' '}page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
