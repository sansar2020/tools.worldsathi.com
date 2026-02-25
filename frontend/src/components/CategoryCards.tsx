import { Link } from '@tanstack/react-router';
import { TOOL_CATEGORIES } from '../constants/categories';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import DynamicIcon from './DynamicIcon';
import { ALL_TOOLS } from '../constants/tools';

export default function CategoryCards() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of tools organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOL_CATEGORIES.map((category) => {
            const toolCount = ALL_TOOLS.filter((tool) => tool.category === category.id).length;

            return (
              <Link key={category.id} to="/category/$categorySlug" params={{ categorySlug: category.id }}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DynamicIcon name={category.icon} className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <p className="text-sm font-semibold text-primary">
                      {toolCount} {toolCount === 1 ? 'tool' : 'tools'} available
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
