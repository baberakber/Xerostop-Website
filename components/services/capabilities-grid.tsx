import type { ServiceFeature } from '@/lib/data/services';
import { getIcon } from '@/lib/icons';
import { SectionHeader } from '@/components/shared/section-header';

interface CapabilitiesGridProps {
  title: string;
  capabilities: ServiceFeature[];
}

export function CapabilitiesGrid({ title, capabilities }: CapabilitiesGridProps) {
  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader badge="Capabilities" title={title} />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = getIcon(capability.icon);
            return (
              <div data-reveal
                key={capability.title}
                className="brand-card group flex flex-col items-center p-5 text-center md:p-7"
              >
                <span className="icon-tile mb-4 h-14 w-14 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-base font-bold text-text-primary md:text-lg">{capability.title}</h3>
                <p className="mt-1 text-xs text-text-muted md:text-sm">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
