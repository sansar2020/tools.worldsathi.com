/**
 * Tool category definitions with metadata
 * Each category includes display information and Lucide icon names
 * All 16 categories for comprehensive tool organization
 */

export interface CategoryMetadata {
  id: string;
  name: string;
  displayName: string;
  icon: string; // Lucide icon name
  description: string;
}

export const TOOL_CATEGORIES: CategoryMetadata[] = [
  {
    id: 'calculators',
    name: 'calculators',
    displayName: 'Calculators',
    icon: 'Calculator',
    description: 'Mathematical and financial calculation tools',
  },
  {
    id: 'converters',
    name: 'converters',
    displayName: 'Converters',
    icon: 'Repeat',
    description: 'Unit and format conversion utilities',
  },
  {
    id: 'generators',
    name: 'generators',
    displayName: 'Generators',
    icon: 'Sparkles',
    description: 'Generate passwords, codes, and content',
  },
  {
    id: 'analyzers',
    name: 'analyzers',
    displayName: 'Analyzers',
    icon: 'Search',
    description: 'Analyze text, images, and data',
  },
  {
    id: 'productivity',
    name: 'productivity',
    displayName: 'Productivity',
    icon: 'Zap',
    description: 'Boost your productivity and efficiency',
  },
  {
    id: 'text-tools',
    name: 'text-tools',
    displayName: 'Text Tools',
    icon: 'Type',
    description: 'Text manipulation and formatting tools',
  },
  {
    id: 'image-tools',
    name: 'image-tools',
    displayName: 'Image Tools',
    icon: 'Image',
    description: 'Image editing and processing utilities',
  },
  {
    id: 'data-tools',
    name: 'data-tools',
    displayName: 'Data Tools',
    icon: 'Database',
    description: 'Data conversion and validation tools',
  },
  {
    id: 'seo-tools',
    name: 'seo-tools',
    displayName: 'SEO Tools',
    icon: 'TrendingUp',
    description: 'Search engine optimization utilities',
  },
  {
    id: 'developer-tools',
    name: 'developer-tools',
    displayName: 'Developer Tools',
    icon: 'Code',
    description: 'Tools for developers and programmers',
  },
  {
    id: 'finance-tools',
    name: 'finance-tools',
    displayName: 'Finance Tools',
    icon: 'DollarSign',
    description: 'Financial planning and calculation tools',
  },
  {
    id: 'health-tools',
    name: 'health-tools',
    displayName: 'Health Tools',
    icon: 'Heart',
    description: 'Health and fitness calculators',
  },
  {
    id: 'education-tools',
    name: 'education-tools',
    displayName: 'Education Tools',
    icon: 'GraduationCap',
    description: 'Learning and teaching utilities',
  },
  {
    id: 'business-tools',
    name: 'business-tools',
    displayName: 'Business Tools',
    icon: 'Briefcase',
    description: 'Business planning and management tools',
  },
  {
    id: 'security-tools',
    name: 'security-tools',
    displayName: 'Security Tools',
    icon: 'Shield',
    description: 'Security and privacy utilities',
  },
  {
    id: 'social-tools',
    name: 'social-tools',
    displayName: 'Social Media Tools',
    icon: 'Share2',
    description: 'Social media content and analytics tools',
  },
];

export function getCategoryById(id: string): CategoryMetadata | undefined {
  return TOOL_CATEGORIES.find((cat) => cat.id === id);
}

export function getCategoryDisplayName(id: string): string {
  return getCategoryById(id)?.displayName || id;
}
