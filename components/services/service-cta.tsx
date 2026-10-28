import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceCategory } from '@/lib/data/services';
import { buttonVariants } from '@/components/ui/button';
import { NetworkBackground } from '@/components/shared/network-background';
import { cn } from '@/lib/utils';

interface ServiceCTAProps {
  service: ServiceCategory;
}

export function ServiceCTA({ service }: ServiceCTAProps) {
  return (
    <section className="bg-background-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div data-reveal
          className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-white shadow-[0_40px_80px_-40px_rgba(11,31,58,0.7)] sm:px-12 md:py-16"
        >
          <NetworkBackground density="subtle" />
          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">{service.cta.title}</h2>
              <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{service.cta.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'rounded-full px-8')}>
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'rounded-full border-white/30 bg-white/5 px-8 text-white hover:border-white/60 hover:bg-white/10'
                  )}
                >
                  All Services
                </Link>
              </div>
            </div>

            {service.benefits.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 lg:col-span-2 md:backdrop-blur-md">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">Business Outcomes</p>
                <ul className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
