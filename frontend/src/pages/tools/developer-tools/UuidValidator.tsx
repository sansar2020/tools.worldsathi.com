import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function UuidValidator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'uuid-validator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [uuid, setUuid] = useState('');

  const validateUuid = (input: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isValid = uuidRegex.test(input);
    
    if (!isValid) return { isValid: false, version: null, components: null };

    const version = parseInt(input.charAt(14), 16);
    const components = {
      timeLow: input.substring(0, 8),
      timeMid: input.substring(9, 13),
      timeHiAndVersion: input.substring(14, 18),
      clockSeq: input.substring(19, 23),
      node: input.substring(24, 36),
    };

    return { isValid: true, version, components };
  };

  const result = uuid ? validateUuid(uuid) : null;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-uuid-validator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>UUID/GUID Input</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="uuid">Enter UUID to validate</Label>
              <Input
                id="uuid"
                type="text"
                placeholder="e.g., 550e8400-e29b-41d4-a716-446655440000"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
                className="font-mono"
              />
            </div>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Validation Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {result.isValid ? (
                    <>
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-semibold text-green-600 dark:text-green-400">Valid UUID</div>
                        <div className="text-sm text-muted-foreground">
                          Version {result.version} UUID detected
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-8 w-8 text-destructive" />
                      <div>
                        <div className="font-semibold text-destructive">Invalid UUID</div>
                        <div className="text-sm text-muted-foreground">
                          The input does not match UUID format
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {result.isValid && result.components && (
              <Card>
                <CardHeader>
                  <CardTitle>UUID Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time Low:</span>
                      <Badge variant="outline" className="font-mono">{result.components.timeLow}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time Mid:</span>
                      <Badge variant="outline" className="font-mono">{result.components.timeMid}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time Hi & Version:</span>
                      <Badge variant="outline" className="font-mono">{result.components.timeHiAndVersion}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Clock Sequence:</span>
                      <Badge variant="outline" className="font-mono">{result.components.clockSeq}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Node:</span>
                      <Badge variant="outline" className="font-mono">{result.components.node}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ToolPageTemplate>
  );
}
