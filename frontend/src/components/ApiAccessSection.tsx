import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/Button';
import { Code, ExternalLink } from 'lucide-react';
import type { ApiInfo } from '@/types/tools';

interface ApiAccessSectionProps {
  apiInfo: ApiInfo;
}

export default function ApiAccessSection({ apiInfo }: ApiAccessSectionProps) {
  return (
    <Card className="bg-card border border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            API Access & Integration
          </CardTitle>
          <Badge variant={apiInfo.available ? 'default' : 'secondary'}>
            {apiInfo.available ? 'Available' : 'Coming Soon'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {apiInfo.description}
        </p>

        {apiInfo.codeExample && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Example Usage:</p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono">
                <code>{apiInfo.codeExample}</code>
              </pre>
            </div>
          </div>
        )}

        {apiInfo.documentationUrl && (
          <Button variant="primary" asChild>
            <a href={apiInfo.documentationUrl} target="_blank" rel="noopener noreferrer">
              View Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
