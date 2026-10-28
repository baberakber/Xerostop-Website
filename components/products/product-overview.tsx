import { SectionHeader } from '@/components/shared/section-header';

interface ProductOverviewProps {
  productName: string;
  paragraphs: string[];
}

export function ProductOverview({ productName, paragraphs }: ProductOverviewProps) {
  if (paragraphs.length === 0) return null;

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            align="left"
            badge="Overview"
            title={
              <>
                What Is <span className="text-gradient">{productName}</span>?
              </>
            }
            className="mb-0 md:mb-0"
          />
        </div>
        <div className="space-y-5 lg:col-span-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-text-secondary md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
