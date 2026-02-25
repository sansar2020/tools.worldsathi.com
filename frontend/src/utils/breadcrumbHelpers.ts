import { BreadcrumbItem } from '../components/Breadcrumbs';
import { getCategoryById } from '../constants/categories';
import { ALL_TOOLS } from '../constants/tools';

/**
 * Generates breadcrumb items from the current pathname
 */
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  // Skip breadcrumbs for homepage
  if (pathname === '/') {
    return [];
  }

  const segments = pathname.split('/').filter(Boolean);

  // Handle category pages: /category/:categoryId
  if (segments[0] === 'category' && segments[1]) {
    const category = getCategoryById(segments[1]);
    if (category) {
      breadcrumbs.push({
        label: category.displayName,
      });
    }
    return breadcrumbs;
  }

  // Handle tool pages: /tools/:category/:toolSlug
  if (segments[0] === 'tools' && segments[1] && segments[2]) {
    const categorySlug = segments[1];
    const toolSlug = segments[2];
    
    const category = getCategoryById(categorySlug);
    const tool = ALL_TOOLS.find((t) => t.id === toolSlug);
    
    if (category) {
      breadcrumbs.push({
        label: category.displayName,
        path: `/category/${category.id}`,
      });
    }
    
    if (tool) {
      breadcrumbs.push({
        label: tool.name,
      });
    }
    
    return breadcrumbs;
  }

  // Handle dashboard
  if (segments[0] === 'dashboard') {
    breadcrumbs.push({
      label: 'Dashboard',
    });
    return breadcrumbs;
  }

  // Handle admin pages
  if (segments[0] === 'admin') {
    breadcrumbs.push({
      label: 'Admin',
      path: '/admin',
    });
    
    if (segments[1]) {
      breadcrumbs.push({
        label: segments[1].split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
      });
    }
    
    return breadcrumbs;
  }

  // Default: capitalize segments
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      path: isLast ? undefined : `/${segments.slice(0, index + 1).join('/')}`,
    });
  });

  return breadcrumbs;
}
