import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './Button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { TOOL_CATEGORIES } from '../constants/categories';
import { ALL_TOOLS } from '../constants/tools';
import { filterTools, getToolPath } from '../utils/toolHelpers';
import type { ToolMetadata, ToolSortOption } from '../types/tools';
import DynamicIcon from './DynamicIcon';

interface ToolGridProps {
  categoryFilter?: string;
}

export default function ToolGrid({ categoryFilter }: ToolGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [sortBy, setSortBy] = useState<ToolSortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // Get only categories that have tools
  const availableCategories = useMemo(() => {
    const categoryIds = new Set(ALL_TOOLS.map(tool => tool.category));
    return TOOL_CATEGORIES.filter(cat => categoryIds.has(cat.id));
  }, []);

  const filteredTools = useMemo(() => {
    return filterTools(ALL_TOOLS, {
      search: searchQuery,
      categories: selectedCategories as any[],
      sortBy,
    });
  }, [searchQuery, selectedCategories, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories(categoryFilter ? [categoryFilter] : []);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as ToolSortOption)}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-accent' : ''}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <Card className="p-4">
          <h3 className="mb-3 font-semibold">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategories.includes(category.id) ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => toggleCategory(category.id)}
                className="gap-2"
              >
                <DynamicIcon name={category.icon} size={16} />
                {category.displayName}
              </Button>
            ))}
          </div>
          {selectedCategories.length > 0 && !categoryFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="mt-3"
            >
              Clear Filters
            </Button>
          )}
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTools.length} of {ALL_TOOLS.length} tools
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.map((tool) => {
          const toolPath = getToolPath(tool.id, ALL_TOOLS);
          
          return (
            <Link key={tool.id} to={toolPath}>
              <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform group-hover:scale-110">
                    <DynamicIcon name={tool.icon} size={40} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tools found matching your criteria.</p>
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
