import * as React from 'react';
import { Building2, Scale, ShieldCheck, Sparkles, Activity, Headphones } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { NetworkBackground } from '@/components/shared/network-background';
import { siteConfig } from '@/lib/config';

const benefits = [
  {
    icon: Building2,
    title: 'Mission-Critical Experience',
    description: 'Engineers who have designed and operated infrastructure for enterprises, government, and service providers.',
  },
  {
    icon: Scale,
    title: 'Vendor-Agnostic Advice',
    description: 'We recommend what fits your requirements and budget, not what pays the highest margin.',
  },
  {
    icon: ShieldCheck,
    title: 'Security-First Mindset',
    description: 'Zero trust principles, encryption, and compliance are engineered into every design from day one.',
  },
  {
    icon: Sparkles,
    title: 'AI-Driven Operations',
    description: 'Intelligent automation and analytics that reduce manual effort and surface issues before users notice.',
  },
  {
    icon: Activity,
    title: 'Resilience by Design',
    description: 'High-availability and disaster recovery architectures built for five-nines service levels.',
  },
  {
    icon: Headphones,
    title: 'Accountable Partnership',
    description: 'One team from assessment to operations, with clear ownership and round-the-clock support.',
  },
];

export function WhyXerostop() {
  return (
    <section className="section-padding cv-auto relative overflow-hidden text-white">
      <NetworkBackground density="subtle" />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              badge="Why Choose Us"
              tone="onDark"
              align="left"
              className="mb-8"
              title={
                <>
                  Why <span className="text-gradient-light">XeroStop?</span>
                </>
              }
              subtitle="Deep technical expertise combined with a consultative approach, so the solutions we deliver keep working for your business long after go-live."
            />

            <div
              data-reveal="scale"
              className="relative mx-auto hidden aspect-square max-w-xs items-center justify-center lg:flex"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-full border border-sky-300/15" />
              <div className="absolute inset-8 animate-spin-slow rounded-full border border-dashed border-sky-300/25" />
              <div className="absolute inset-16 rounded-full border border-accent-primary/40" />
              <div className="absolute inset-12 rounded-full bg-[radial-gradient(circle,rgba(30,136,229,0.45),transparent_70%)]" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-[0_0_50px_-5px_rgba(30,136,229,0.8)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={siteConfig.logo.iconLarge} alt="" width={100} height={91} loading="lazy" decoding="async" className="h-auto w-[100px]" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                data-reveal
                className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.1]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-primary/20 text-sky-300 ring-1 ring-sky-300/30 transition-colors group-hover:bg-accent-primary group-hover:text-white">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
