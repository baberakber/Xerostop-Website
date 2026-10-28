import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { solutions } from '@/lib/data/solutions';
import { SolutionHero } from '@/components/solutions/solution-hero';
import { SolutionFeatures } from '@/components/solutions/solution-features';
import { SolutionDeliverables } from '@/components/solutions/solution-deliverables';
import { SolutionUseCases } from '@/components/solutions/solution-use-cases';
import { SolutionRelated } from '@/components/solutions/solution-related';
import { SolutionCTA } from '@/components/solutions/solution-cta';
import { TechPartners } from '@/components/services/tech-partners';
import { JsonLd } from '@/components/seo/json-ld';
import { solutionSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface SolutionPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = solutions.find((s) => s.slug === params.slug);

  if (!solution) {
    return { title: 'Solution Not Found', robots: { index: false } };
  }

  return buildMetadata({
    title: solution.seo.metaTitle,
    description: solution.seo.metaDescription,
    path: `/solutions/${solution.slug}/`,
    keywords: solution.seo.keywords,
    image: { url: solution.heroImage, width: 1200, height: 900, alt: solution.title },
  });
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const solution = solutions.find((s) => s.slug === params.slug);

  if (!solution) {
    notFound();
  }

  return (
    <main>
      <JsonLd data={solutionSchema(solution)} />
      <SolutionHero solution={solution} />
      <SolutionFeatures solutionTitle={solution.title} features={solution.features} />
      <SolutionDeliverables deliverables={solution.deliverables} benefits={solution.benefits} />
      <SolutionUseCases useCases={solution.useCases} />
      <TechPartners
        technologies={solution.technologies}
        badge="Supported Platforms"
        title={
          <>
            Works With Your <span className="text-gradient">Existing Stack</span>
          </>
        }
        subtitle="Vendor-agnostic design that integrates with the platforms you already run."
      />
      <SolutionRelated solution={solution} />
      <SolutionCTA solution={solution} />
    </main>
  );
}
