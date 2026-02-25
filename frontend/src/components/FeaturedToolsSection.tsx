import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { ToolMetadata } from '../types/tools';
import DynamicIcon from './DynamicIcon';

interface FeaturedToolsSectionProps {
  tools: ToolMetadata[];
  title?: string;
}

export default function FeaturedToolsSection({ tools, title = 'Featured Tools' }: FeaturedToolsSectionProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-accent fill-accent" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.slice(0, 6).map((tool) => (
          <Link key={tool.id} to={tool.path}>
            <Card className="group h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2 border-2 border-primary/20 relative overflow-hidden">
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-accent text-accent-foreground shadow-lg">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              </div>
              <CardHeader>
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <DynamicIcon name={tool.icon} size={48} className="text-primary" />
                </div>
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-base">{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
