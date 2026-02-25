import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { ALL_TOOLS } from '../../constants/tools';
import { getToolPath } from '../../utils/toolHelpers';
import DynamicIcon from '../DynamicIcon';

export default function TrendingTools() {
  // Get top 5 tools (for now, first 5 tools - could be enhanced with usage data)
  const trendingTools = ALL_TOOLS.slice(0, 5);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-accent" />
          Trending Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTools.map((tool, index) => {
          const toolPath = getToolPath(tool.id, ALL_TOOLS);
          
          return (
            <Link key={tool.id} to={toolPath}>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors group cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
                  <DynamicIcon name={tool.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    #{index + 1} trending
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
