import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { PageHero } from '@/components/shared/page-hero';
import { ContactForm } from '@/components/shared/contact-form';
import { buttonVariants } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us: Book a Free IT Consultation',
  description:
    'Contact XeroStop in Riyadh to book a free consultation on unified communications, datacenter, network, security, or AI projects. We reply within one business day.',
  path: '/contact/',
  keywords: ['contact XeroStop', 'IT consultation Riyadh', 'enterprise IT consultation Saudi Arabia', 'book IT consultation'],
});

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s <span className="text-gradient">Transform Your IT Infrastructure</span>
          </>
        }
        description="Book a free consultation with our enterprise IT specialists. We'll analyze your challenges and propose tailored solutions."
        actions={
          <Link
            href="#contact-form"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}
          >
            Book a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        }
      >
        <ul className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          {['Response within one business day', 'No-obligation consultation', 'Expert team with 20+ years experience'].map((item) => (
            <li key={item} className="inline-flex items-center gap-2 rounded-full border border-border bg-background-card px-4 py-2 font-medium text-text-secondary">
              <CheckCircle2 className="h-4 w-4 text-accent-primary" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Contact Form & Info */}
      <section
        id="contact-form"
        className="scroll-mt-24 bg-background-secondary py-16 md:py-24 lg:py-28"
      >
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form - 3 columns on desktop */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-border bg-background-card p-6 shadow-[0_30px_60px_-40px_rgba(11,31,58,0.5)] md:p-10">
                <h2 className="mb-6 text-2xl font-semibold text-text-primary">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info - 2 columns on desktop */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="mb-6 text-xl font-semibold text-text-primary">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-4 rounded-lg border border-border bg-background-card p-4 transition-colors hover:border-border-hover hover:bg-background-elevated"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Email Us</p>
                      <p className="font-medium text-text-primary">
                        {siteConfig.contact.email}
                      </p>
                    </div>
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`}
                    className="flex items-start gap-4 rounded-lg border border-border bg-background-card p-4 transition-colors hover:border-border-hover hover:bg-background-elevated"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Call Us</p>
                      <p className="font-medium text-text-primary">
                        {siteConfig.contact.phoneDisplay}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {siteConfig.contact.hoursLabel}
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-background-card p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Visit Our Riyadh Head Office</p>
                      <address className="font-medium not-italic text-text-primary">
                        {siteConfig.contact.address}
                      </address>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.name}, ${siteConfig.contact.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex min-h-[32px] items-center text-sm font-semibold text-accent-primary hover:underline"
                      >
                        Get directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Promise */}
              <div className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-primary" />
                  <div>
                    <p className="font-medium text-text-primary">
                      Quick Response Guaranteed
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      We respond to all inquiries within 24 business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
