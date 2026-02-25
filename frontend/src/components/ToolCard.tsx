import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DynamicIcon from './DynamicIcon';
import { getToolPath } from '../utils/toolHelpers';
import { ALL_TOOLS } from '../constants/tools';
import type { ToolMetadata } from '../types/tools';

interface ToolCardProps {
  tool: ToolMetadata;
  showCategory?: boolean;
}

export default function ToolCard({ tool, showCategory = false }: ToolCardProps) {
  const toolPath = getToolPath(tool.id, ALL_TOOLS);

  return (
    <Link to={toolPath}>
      <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 border-2 border-border hover:border-primary/30">
        <CardHeader>
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform group-hover:scale-110">
            {tool.icon ? (
              <DynamicIcon name={tool.icon} size={32} className="text-primary" />
            ) : (
              <DynamicIcon name="Wrench" size={32} className="text-primary" />
            )}
          </div>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{tool.name}</CardTitle>
            {tool.isNew && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground shrink-0">
                NEW
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2 text-sm">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
