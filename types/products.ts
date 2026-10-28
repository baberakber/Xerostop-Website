// Feature card shown in the "Key Features" grid
export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

// Module shown as a tab in the "Functionality" section
export interface ProductModule {
  id: string;
  title: string;
  description: string;
  points: string[];
  image?: string;
}

// Step in the "How It Works" flow
export interface ProductStep {
  title: string;
  description: string;
}

// Screenshot in the gallery; `src` is relative to /public
export interface ProductScreenshot {
  src: string;
  caption: string;
}

// Image shown on the right side of the page hero; `src` is relative to /public
export interface ProductHeroImage {
  src: string;
  width: number;
  height: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  icon: string;
  overview: string[];
  features: ProductFeature[];
  modules: ProductModule[];
  howItWorks: ProductStep[];
  screenshots: ProductScreenshot[];
  heroImage?: ProductHeroImage;
  integrations: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
