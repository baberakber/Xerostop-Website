import { CTASection } from '@/components/shared/cta-section';
import type { Solution } from '@/types/solutions';

interface SolutionCTAProps {
  solution: Solution;
}

export function SolutionCTA({ solution }: SolutionCTAProps) {
  return (
    <CTASection
      heading={
        <>
          Ready to Transform with <span className="text-gradient-light">{solution.title}</span>?
        </>
      }
      description="Schedule a consultation to discuss how this solution can address your specific challenges and deliver measurable outcomes."
      buttons={[
        { text: 'Schedule Consultation', href: '/contact', variant: 'primary' },
        { text: 'View All Solutions', href: '/solutions', variant: 'secondary' },
      ]}
    />
  );
}
