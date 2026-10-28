import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Sparkles, Heart } from 'lucide-react';
import { GradientText } from '@/components/shared/gradient-text';
import { SimpleHero } from '@/components/shared/simple-hero';
import { siteConfig } from '@/lib/config';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Careers in IT Consulting in Riyadh',
  description:
    'Build your career at XeroStop in Riyadh. Explore open roles for IT consultants, solutions architects, and security engineers working with Saudi enterprises.',
  path: '/careers/',
  keywords: ['IT jobs Riyadh', 'IT consultant careers Saudi Arabia', 'solutions architect jobs', 'security engineer jobs'],
});

const benefits = [
  'Competitive salary and performance-based incentives',
  'Medical insurance coverage',
  'Flexible and hybrid work options',
  'Professional development and vendor certifications',
  'Collaborative, inclusive culture',
  'Exposure to cutting-edge technologies and enterprise clients',
];

const openRoles = [
  { title: 'Senior IT Consultant', department: 'Consulting', location: 'Riyadh / Hybrid', type: 'Full-time' },
  { title: 'Solutions Architect', department: 'Solutions', location: 'Riyadh', type: 'Full-time' },
  { title: 'Security Engineer', department: 'Security', location: 'Riyadh', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <SimpleHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        title={
          <>
            Build Your Career at <GradientText as="span" gradient="primary">XeroStop</GradientText>
          </>
        }
        description="Join a team that designs, secures, and automates modern infrastructure for leading organizations in Saudi Arabia."
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-16">
            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-text-primary">
                <Sparkles className="h-6 w-6 text-accent-primary" />
                Why Join XeroStop?
              </h2>
              <p className="text-text-secondary">
                At XeroStop, we combine deep technical expertise with a culture of collaboration and continuous learning. You&apos;ll work on meaningful projects for enterprise and government clients, use modern tools and practices, and grow alongside experts in unified communications, security, cloud, and AI. We value curiosity, ownership, and outcomes, not just hours at a desk.
              </p>
            </div>

            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-text-primary">
                <Heart className="h-6 w-6 text-accent-primary" />
                Benefits & Perks
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-lg border border-border bg-background-card px-4 py-3 text-text-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-text-primary">
                <Briefcase className="h-6 w-6 text-accent-primary" />
                Open Positions
              </h2>
              <div className="space-y-4">
                {openRoles.map((role) => (
                  <Link
                    key={role.title}
                    href={`/contact/?subject=${encodeURIComponent(`Careers: ${role.title}`)}`}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-background-card p-6 transition-colors hover:border-border-hover hover:bg-background-elevated"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{role.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {role.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-accent-primary">
                      Apply <span className="sr-only">for {role.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm text-text-secondary">
                Don&apos;t see a fit? We&apos;re always interested in talented people.{' '}
                <Link href="/contact/?subject=General%20Careers%20Inquiry" className="text-accent-primary hover:underline">
                  Send us your profile
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-text-primary">
                <Users className="h-6 w-6 text-accent-primary" />
                How to Apply
              </h2>
              <p className="mb-4 text-text-secondary">
                To apply for a role at XeroStop, use our contact form and mention the position you&apos;re interested in, or email us at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-accent-primary hover:underline">
                  {siteConfig.contact.email}
                </a>{' '}
                with your resume and a short note. Our team reviews applications regularly and will get back to you if there&apos;s a match.
              </p>
              <Link
                href="/contact/"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-accent-primary-hover to-accent-primary px-8 text-base font-medium text-white transition-all hover:opacity-90"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
