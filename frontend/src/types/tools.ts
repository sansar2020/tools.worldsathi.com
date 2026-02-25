/**
 * TypeScript type definitions for tools
 */

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
  tags?: string[];
  favoriteCount?: number;
  subcategory?: string;
  introduction?: string;
  usabilitySteps?: string[];
  aboutContent?: AboutToolContent;
  testimonials?: Testimonial[];
  performanceMetrics?: PerformanceMetric[];
  apiInfo?: ApiInfo;
  isNew?: boolean;
  faqs?: ToolFAQ[];
}

export interface AboutToolContent {
  introduction: string;
  keyFeatures: string[];
  whoBenefits: string[];
  whyChoose: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating?: number;
}

export interface PerformanceMetric {
  label: string;
  value: string | number;
  icon: string;
  description?: string;
}

export interface ApiInfo {
  available: boolean;
  description: string;
  codeExample?: string;
  documentationUrl?: string;
}

export type ToolCategory =
  | 'calculators'
  | 'converters'
  | 'generators'
  | 'analyzers'
  | 'productivity'
  | 'text-tools'
  | 'image-tools'
  | 'data-tools'
  | 'seo-tools'
  | 'dev-tools'
  | 'finance-tools'
  | 'health-tools'
  | 'education-tools'
  | 'business-tools'
  | 'security-tools'
  | 'social-tools';

export interface ToolFilter {
  search?: string;
  categories?: ToolCategory[];
  sortBy?: ToolSortOption;
}

export type ToolSortOption = 'name-asc' | 'name-desc' | 'popular' | 'recent';

export interface RelatedTool {
  name: string;
  path: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}
