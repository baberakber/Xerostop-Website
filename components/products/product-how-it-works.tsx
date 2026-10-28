import type { ProductStep } from '@/types/products';
import { SectionHeader } from '@/components/shared/section-header';

interface ProductHowItWorksProps {
  steps: ProductStep[];
}

export function ProductHowItWorks({ steps }: ProductHowItWorksProps) {
  if (steps.length === 0) return null;

  return (
    <section className="section-padding bg-background-primary">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="How It Works"
          title={
            <>
              Simple From <span className="text-gradient">Start to Finish</span>
            </>
          }
        />

        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-accent-primary/40 via-accent-secondary/40 to-accent-primary/40 lg:block"
            aria-hidden
          />
          {steps.map((step, index) => (
            <li data-reveal
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary-hover to-accent-primary text-lg font-extrabold text-white shadow-glow-sm ring-8 ring-background-primary">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
