// Solution feature within a solution offering
export interface SolutionFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Use case with industry scenario
export interface SolutionUseCase {
  id: string;
  industry: string;
  scenario: string;
  outcome: string;
}

// Deliverable item
export interface SolutionDeliverable {
  id: string;
  title: string;
  description: string;
  included: boolean;
}

// Optional tier/pricing structure
export interface SolutionTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

// Solution category type
export type SolutionCategory = 'uc' | 'infrastructure' | 'security' | 'automation';

// Full solution with all content
export interface Solution {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  category: SolutionCategory;
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  deliverables: SolutionDeliverable[];
  tiers?: SolutionTier[];
  relatedSolutions: string[];
  relatedServices: string[];
  technologies: string[];
  benefits: {
    title: string;
    metric?: string;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
