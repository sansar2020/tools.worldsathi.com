import { Link } from '@tanstack/react-router';
import { TOOL_CATEGORIES } from '../../constants/categories';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DynamicIcon from '../DynamicIcon';

export default function QuickCategoryShortcuts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {TOOL_CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link
                to="/category/$categorySlug"
                params={{ categorySlug: category.id }}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
              >
                <DynamicIcon name={category.icon} className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
