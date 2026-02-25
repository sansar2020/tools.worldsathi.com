import React from 'react';
import { Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/Button';
import CategoryBadge from '@/components/CategoryBadge';
import type { ToolMetadata } from '@/types/tools';
import { TOOL_CATEGORIES } from '@/constants/categories';
import { getToolPath } from '@/utils/toolHelpers';
import { ALL_TOOLS } from '@/constants/tools';
import DynamicIcon from './DynamicIcon';

interface NewToolsSectionProps {
  tools: ToolMetadata[];
}

export default function NewToolsSection({ tools }: NewToolsSectionProps) {
  const displayTools = tools.slice(0, 8);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            <span className="text-accent">New Arrival</span> Tools
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Discover our latest tools designed to boost your productivity and simplify your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayTools.map((tool) => {
            const category = TOOL_CATEGORIES.find((cat) => cat.id === tool.category);
            const toolPath = getToolPath(tool.id, ALL_TOOLS);

            return (
              <div
                key={tool.id}
                className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* NEW Badge */}
                <Badge
                  variant="secondary"
                  className="absolute top-4 right-4 bg-accent text-accent-foreground font-semibold"
                >
                  NEW
                </Badge>

                {/* Tool Icon */}
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
                  <DynamicIcon name={tool.icon} size={32} className="text-primary" />
                </div>

                {/* Tool Name */}
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                  {tool.description.split('.')[0]}
                </p>

                {/* Category Badge */}
                <div className="mb-4">
                  <CategoryBadge categoryId={tool.category} />
                </div>

                {/* Pricing Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Free</Badge>
                    <span className="text-lg font-bold text-foreground">$0.00</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={toolPath} className="block">
                  <Button variant="primary" className="w-full">
                    Open Tool
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
