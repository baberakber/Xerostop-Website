// Navigation types
export interface NavItem {
  name: string
  href: string
  description?: string
  children?: NavItem[]
}

// Service types
export interface Service {
  slug: string
  title: string
  description: string
  icon?: string
  features?: string[]
  benefits?: string[]
}

// Solution types
export interface Solution {
  slug: string
  title: string
  description: string
  icon?: string
  features?: string[]
  caseStudies?: CaseStudy[]
}

// Case Study types
export interface CaseStudy {
  slug: string
  title: string
  client: string
  industry: string
  description: string
  challenge: string
  solution: string
  results: string[]
  testimonial?: Testimonial
  image?: string
}

// Testimonial types
export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  image?: string
}

// Blog/Insights types
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: Author
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  image?: string
  readingTime?: number
}

export interface Author {
  name: string
  role: string
  image?: string
  bio?: string
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  message: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Metadata types for pages
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}
