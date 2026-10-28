import * as React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { Logo } from '@/components/layout/logo';
import { serviceNav, productNav, solutionNav } from '@/components/layout/nav-data';

const quickLinks = [
  { label: 'About Us', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Products', href: '/products/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Careers', href: '/careers/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

const legal = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Cookie Policy', href: '/cookies/' },
];

const socialLinks = [
  { icon: Linkedin, href: siteConfig.links.linkedin, label: 'XeroStop on LinkedIn' },
  { icon: Twitter, href: siteConfig.links.twitter, label: 'XeroStop on X (Twitter)' },
];

const commitments = [
  { icon: ShieldCheck, label: 'Security-First' },
  { icon: Layers, label: 'Vendor-Agnostic' },
  { icon: Clock, label: '24/7 Support' },
];

const headingClass = 'mb-5 text-sm font-bold uppercase tracking-[0.16em] text-sky-300';
const linkClass = 'inline-flex min-h-[32px] items-center text-sm text-white/80 transition-colors hover:text-white';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getUTCFullYear();
  const { email, offices, hoursLabel } = siteConfig.contact;

  return (
    <footer className={cn('navy-band cv-auto relative overflow-hidden text-white', className)}>
      <h2 className="sr-only">Site footer</h2>
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.25),transparent_70%)]"
        aria-hidden
      />

      <div className="container relative mx-auto px-4 pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="onDark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/80">
              Riyadh-based enterprise IT consultancy helping organizations across Saudi Arabia and the GCC design,
              secure, and automate modern infrastructure with AI-driven solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {commitments.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
                >
                  <item.icon className="h-3.5 w-3.5 text-sky-300" />
                  {item.label}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all hover:border-sky-300 hover:bg-accent-primary hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <h3 className={cn(headingClass, 'mt-10')}>Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`mailto:${email}`} className="group flex items-start gap-3 text-white/85 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Mail className="h-4 w-4 text-sky-300" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/70">Email</span>
                    {email}
                  </span>
                </a>
              </li>
              {offices.map((office) => (
                <li key={office.label} className="flex items-start gap-3 text-white/85">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <MapPin className="h-4 w-4 text-sky-300" />
                  </span>
                  <span>
                    <span className="block text-xs text-white/70">{office.label}</span>
                    <address className="not-italic">{office.address}</address>
                    <a
                      href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                      className="mt-1 flex min-h-[32px] items-center gap-1.5 transition-colors hover:text-white"
                    >
                      <Phone className="h-3.5 w-3.5 text-sky-300" />
                      {office.phone}
                    </a>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Clock className="h-4 w-4 text-sky-300" />
                </span>
                <span>
                  <span className="block text-xs text-white/70">Business Hours</span>
                  {hoursLabel}
                </span>
              </li>
            </ul>
          </div>

          <nav className="lg:col-span-2" aria-label="Company">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-1.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className={headingClass}>Services</h3>
            <ul className="space-y-1.5">
              {serviceNav.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className={cn(linkClass, 'group gap-2')}>
                    <item.icon className="h-4 w-4 text-sky-300/90" />
                    {item.title}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10 lg:col-span-3">
            <nav aria-label="Products">
              <h3 className={headingClass}>Products</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {productNav.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className={linkClass}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Solutions">
              <h3 className={headingClass}>Solutions</h3>
              <ul className="space-y-1.5">
                {solutionNav.map((item) => (
                  <li key={item.title}>
                    <Link href={item.href} className={linkClass}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/75 md:flex-row">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="inline-flex min-h-[32px] items-center transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
