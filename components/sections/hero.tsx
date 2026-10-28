import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Activity, Sparkles, ChevronDown } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { NetworkBackground } from '@/components/shared/network-background';
import { Wordmark } from '@/components/layout/logo';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const highlights = [
  { icon: ShieldCheck, label: 'Security-First' },
  { icon: Activity, label: 'High Availability' },
  { icon: Sparkles, label: 'AI-Driven' },
];

const practices = [
  'Unified Communications',
  'Customer Experience',
  'Datacenter',
  'Networks',
  'Security',
  'Software',
  'AI',
  'Managed Services',
  'Low Current Systems',
];

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden text-white">
      <NetworkBackground />

      <div className="container relative mx-auto px-4 pb-24 pt-28 sm:pt-32 md:pt-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative mb-10">
            <div className="absolute inset-[-28px] animate-spin-slow rounded-full border border-sky-300/20">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
            </div>
            <div className="absolute inset-[-14px] rounded-full border border-accent-primary/40" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.55),transparent_70%)] scale-125" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_0_60px_-5px_rgba(30,136,229,0.8)] ring-4 ring-accent-primary/40 sm:h-44 sm:w-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.logo.iconLarge}
                alt="XeroStop logo"
                width={124}
                height={113}
                fetchPriority="high"
                decoding="async"
                className="h-auto w-[92px] sm:w-[124px]"
              />
            </div>
          </div>

          <p className="text-[2.6rem] drop-shadow-[0_0_24px_rgba(30,136,229,0.35)] [-webkit-text-stroke:3px_#ffffff] min-[400px]:text-5xl sm:text-6xl md:text-7xl">
            <span className="sr-only">XeroStop</span>
            <span aria-hidden>
              <Wordmark />
            </span>
          </p>

          <h1 className="mt-4">
            <span className="block text-xl font-semibold text-sky-100 sm:text-2xl md:text-3xl">
              Engineering <span className="text-white">What&apos;s Next</span>
            </span>
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-sky-300 sm:text-sm">
              Enterprise IT Consultancy in Saudi Arabia
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            We help enterprises design, secure, and operate modern IT infrastructure, from unified
            communications and customer experience to datacenters, networks, security, AI, and smart buildings.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/services/"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full rounded-full px-8 sm:w-auto')}
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact/"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full rounded-full border-white/30 bg-white/5 px-8 text-white hover:border-white/60 hover:bg-white/10 sm:w-auto md:backdrop-blur'
              )}
            >
              Book a Consultation
            </Link>
          </div>

          <ul className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/90 md:bg-white/5 md:backdrop-blur-md"
              >
                <item.icon className="h-5 w-5 text-sky-300" />
                {item.label}
              </li>
            ))}
          </ul>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/75">
            {practices.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && <span className="text-sky-400/80" aria-hidden>|</span>}
                <span>{p}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <a
        href="#stats"
        className="absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center text-white/70 transition-colors hover:text-white"
        aria-label="Scroll to content"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
