import type { Metadata } from 'next';
import Link from 'next/link';
import { GradientText } from '@/components/shared/gradient-text';
import { SimpleHero } from '@/components/shared/simple-hero';
import { siteConfig } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How XeroStop collects, uses, stores, and protects personal information submitted through our website and services, in line with the Saudi PDPL.',
  path: '/privacy/',
});

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SimpleHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        title={
          <>
            Privacy <GradientText as="span" gradient="primary">Policy</GradientText>
          </>
        }
        description="How XeroStop collects, uses, and protects your information."
      >
        <p className="mt-4 text-sm text-text-secondary">Last updated: October 2026</p>
      </SimpleHero>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10 text-text-secondary">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                1. Introduction
              </h2>
              <p>
                XeroStop (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at xerostop.com or use our enterprise IT consultancy services. Please read this policy carefully.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We may collect information that you provide directly to us, including:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>Name, email address, phone number, and company details when you contact us or request a consultation</li>
                <li>Information you submit through our contact forms or when signing up for newsletters</li>
                <li>Communications and correspondence with XeroStop</li>
                <li>Feedback, survey responses, or other information you choose to provide</li>
              </ul>
              <p className="mt-4">
                We also automatically collect certain technical information when you visit our website, such as IP address, browser type, device information, and usage data. We may use cookies and similar technologies as described in our Cookie Policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                XeroStop uses the information we collect to:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Deliver and improve our IT consultancy services</li>
                <li>Send relevant updates, marketing communications (where you have consented), and service-related notices</li>
                <li>Analyze website usage and trends to improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                4. Sharing and Disclosure
              </h2>
              <p>
                We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and business, subject to confidentiality agreements. These include Formspree, which processes and delivers contact form submissions to our team by email, our web hosting provider, and, where enabled, Google Analytics for aggregated usage statistics. We may also disclose information when required by law or to protect the rights and safety of XeroStop, our users, or others.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                5. Data Security
              </h2>
              <p>
                XeroStop implements appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                6. Your Rights
              </h2>
              <p>
                We process personal data in line with the Saudi Personal Data Protection Law (PDPL) and other applicable laws. Depending on your location, you may have rights to access, correct, delete, or restrict the processing of your personal data. You may also have the right to object to certain processing or to data portability. To exercise these rights or ask questions about your data, please contact us at the email or address provided on our Contact page.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the revised policy on this page and update the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold text-text-primary">
                8. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact XeroStop at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-accent-primary hover:underline">
                  {siteConfig.contact.email}
                </a>
                {' '}or visit our{' '}
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
