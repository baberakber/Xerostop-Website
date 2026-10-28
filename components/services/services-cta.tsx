import { CTASection } from '@/components/shared/cta-section';

export function ServicesCTA() {
  return (
    <CTASection
      heading={
        <>
          Ready to Transform Your <span className="text-gradient-light">Technology?</span>
        </>
      }
      description="Let's discuss how our services can help you achieve your business objectives. Schedule a free consultation with our enterprise architects."
      buttons={[
        { text: 'Schedule a Consultation', href: '/contact', variant: 'primary' },
        { text: 'View Solutions', href: '/solutions', variant: 'secondary' },
      ]}
    />
  );
}
