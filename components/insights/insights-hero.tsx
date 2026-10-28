import { PageHero } from '@/components/shared/page-hero';

export function InsightsHero() {
  return (
    <PageHero
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
      eyebrow="Thought Leadership"
      title={
        <>
          Insights & <span className="text-gradient">Thought Leadership</span>
        </>
      }
      description="Expert perspectives on enterprise IT, security, AI, and infrastructure from our engineering team."
    />
  );
}
