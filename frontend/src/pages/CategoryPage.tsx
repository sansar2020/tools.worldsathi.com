import { useParams } from '@tanstack/react-router';
import { ALL_TOOLS } from '../constants/tools';
import { TOOL_CATEGORIES } from '../constants/categories';
import CategoryHero from '../components/CategoryHero';
import ToolGrid from '../components/ToolGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import { generateBreadcrumbs } from '../utils/breadcrumbHelpers';
import FeaturedToolsSection from '../components/FeaturedToolsSection';
import Sidebar from '../components/Sidebar';

export default function CategoryPage() {
  const { categorySlug } = useParams({ strict: false });

  const category = TOOL_CATEGORIES.find((cat) => cat.id === categorySlug);
  const categoryTools = ALL_TOOLS.filter((tool) => tool.category === categorySlug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Category not found</h1>
      </div>
    );
  }

  const breadcrumbs = generateBreadcrumbs(window.location.pathname);
  const featuredTools = categoryTools.filter((tool) => tool.isNew).slice(0, 3);

  return (
    <div>
      <CategoryHero categoryId={category.id} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        {featuredTools.length > 0 && (
          <div className="mt-8">
            <FeaturedToolsSection tools={featuredTools} />
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div>
            <ToolGrid categoryFilter={categorySlug} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
