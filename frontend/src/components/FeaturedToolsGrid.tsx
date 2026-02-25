import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';
import { ALL_TOOLS } from '../constants/tools';
import { getToolPath } from '../utils/toolHelpers';
import DynamicIcon from './DynamicIcon';

export default function FeaturedToolsGrid() {
  // Select 6-8 featured tools (for now, first 6 tools)
  const featuredTools = ALL_TOOLS.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-6 w-6 text-accent fill-accent" />
            <h2 className="text-3xl font-bold">Featured Tools</h2>
            <Star className="h-6 w-6 text-accent fill-accent" />
          </div>
          <p className="text-muted-foreground text-lg">
            Our most popular and essential tools to boost your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => {
            const toolPath = getToolPath(tool.id, ALL_TOOLS);
            
            return (
              <Link key={tool.id} to={toolPath}>
                <Card className="group h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2 border-2 border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-accent text-accent-foreground shadow-lg">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <DynamicIcon name={tool.icon} size={48} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
