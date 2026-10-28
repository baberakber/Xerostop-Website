import type { Metadata } from 'next';
import Link from 'next/link';
import { GradientText } from '@/components/shared/gradient-text';
import { SimpleHero } from '@/components/shared/simple-hero';
import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/config';
import { faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about XeroStop: our IT consulting services, industries we serve in Saudi Arabia, engagement model, support, and security approach.',
  path: '/faq/',
  keywords: ['XeroStop FAQ', 'IT consultancy questions', 'enterprise IT Saudi Arabia'],
});

const faqs = [
  {
    question: 'What services does XeroStop offer?',
    answer:
      'XeroStop provides enterprise IT consultancy and delivery across unified communications, customer experience and contact center, datacenter, networking, security, software, AI, managed services, and low current (ELV) systems. We consult, design, deliver, and operate.',
  },
  {
    question: 'How do I get started with XeroStop?',
    answer:
      'Request a free consultation through our Contact page. Our team responds within one business day to understand your needs and discuss how we can help, with no obligation.',
  },
  {
    question: 'What industries does XeroStop serve?',
    answer:
      'We work with government entities, banks and financial institutions, large enterprises, telecom and service providers, healthcare, and education. Our designs are aligned with sector requirements such as NCA ECC, SAMA CSF, and the Saudi PDPL.',
  },
  {
    question: 'Does XeroStop offer ongoing support?',
    answer:
      'Yes. Beyond design and implementation, we offer managed services with 24/7 monitoring and support. Support options range from break-fix to fully managed operations with defined service levels.',
  },
  {
    question: 'Where is XeroStop located?',
    answer: `XeroStop is headquartered in Riyadh, Saudi Arabia (${siteConfig.contact.address}). We serve clients across the Kingdom and the wider GCC, on site and remotely. Our office hours are ${siteConfig.contact.hoursLabel}.`,
  },
  {
    question: 'How does XeroStop approach security?',
    answer:
      'Security is built into everything we design. We follow zero trust principles, identity best practices, and regulatory frameworks, and our security services cover assessment, architecture, implementation, and continuous monitoring.',
  },
  {
    question: 'Can XeroStop help with cloud migration?',
    answer:
      'Yes. We plan and execute migrations to public, private, and hybrid cloud with minimal disruption, including data residency considerations for regulated Saudi organizations.',
  },
  {
    question: 'What makes XeroStop different?',
    answer:
      'We combine deep technical expertise with a business-outcome focus. We are vendor-agnostic, so we recommend what fits your requirements, and one accountable team stays with you from assessment through operations.',
  },
];

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(faqs)} />
      <SimpleHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        title={
          <>
            Frequently Asked <GradientText as="span" gradient="primary">Questions</GradientText>
          </>
        }
        description="Common questions about XeroStop and our enterprise IT consultancy services."
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-border bg-background-card p-6 transition-colors hover:border-border-hover"
              >
                <h2 className="mb-3 text-lg font-semibold text-text-primary">{faq.question}</h2>
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-text-secondary">
              Can&apos;t find what you&apos;re looking for?{' '}
              <Link href="/contact/" className="font-medium text-accent-primary hover:underline">
                Contact us
              </Link>{' '}
              and we&apos;ll be happy to help.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
