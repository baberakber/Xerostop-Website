import Image from 'next/image';
import { CheckCircle2, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const highlights = [
  'Senior architects across UC, datacenter, network, security, and AI',
  'Bilingual Arabic and English delivery teams',
  'Vendor-agnostic designs built around your requirements',
  'One accountable partner from assessment to operations',
];

export function CompanyStory() {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(30,136,229,0.16),transparent_70%)]" aria-hidden />
            <div className="relative rounded-[1.75rem] border border-border bg-white p-2 shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)] dark:border-white/10 dark:bg-navy-800">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/images/about/team-collaboration.webp"
                  alt="XeroStop engineers reviewing a network architecture with clients"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-2xl border border-border bg-background-card p-4 shadow-xl sm:flex">
              <span className="icon-tile h-11 w-11">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="pr-2">
                <span className="block text-xs font-medium text-text-muted">Riyadh HQ</span>
                <span className="block text-sm font-bold text-text-primary">Serving KSA &amp; GCC</span>
              </span>
            </div>
          </div>

          <div>
            <SectionHeader
              badge="Who We Are"
              title={
                <>
                  A Saudi-focused engineering partner for <span className="text-gradient">mission-critical IT</span>
                </>
              }
              align="left"
              className="mb-6 md:mb-6"
            />
            <div data-reveal
            >
              <p className="leading-relaxed text-text-secondary">
                XeroStop consults, designs, delivers, and operates the infrastructure that keeps enterprises and
                government organizations running, from unified communications and contact centers to datacenters,
                networks, and security.
              </p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                Our bilingual teams work side by side with client stakeholders in Saudi Arabia, helping them modernize
                securely and deliver on their Vision 2030 digital transformation goals.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-text-primary">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
