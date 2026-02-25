import { Link } from '@tanstack/react-router';
import { TOOL_CATEGORIES } from '../constants/categories';
import { ALL_TOOLS } from '../constants/tools';
import ToolCard from './ToolCard';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function PopularToolsByCategory() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Tools by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most-used tools across different categories
          </p>
        </div>

        <div className="space-y-16">
          {TOOL_CATEGORIES.map((category) => {
            const categoryTools = ALL_TOOLS.filter((tool) => tool.category === category.id).slice(0, 4);

            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  {ALL_TOOLS.filter((tool) => tool.category === category.id).length > 4 && (
                    <Link to="/category/$categorySlug" params={{ categorySlug: category.id }}>
                      <Button variant="ghost" className="gap-2">
                        View All
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
