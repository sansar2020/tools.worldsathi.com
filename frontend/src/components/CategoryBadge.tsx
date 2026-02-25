import { Badge } from '@/components/ui/badge';
import { getCategoryById } from '../constants/categories';
import DynamicIcon from './DynamicIcon';

interface CategoryBadgeProps {
  categoryId: string;
  subcategory?: string;
}

export default function CategoryBadge({ categoryId, subcategory }: CategoryBadgeProps) {
  const category = getCategoryById(categoryId);
  
  if (!category) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
        <DynamicIcon name={category.icon} size={16} />
        {category.displayName}
      </Badge>
      {subcategory && (
        <Badge variant="outline" className="px-3 py-1">
          {subcategory}
        </Badge>
      )}
    </div>
  );
}
