import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function JsonToTypescript() {
  const tool = ALL_TOOLS.find((t) => t.id === 'json-to-typescript')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const inferType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      return `${inferType(value[0])}[]`;
    }
    if (typeof value === 'object') return 'object';
    return typeof value;
  };

  const generateInterface = (obj: any, interfaceName: string = 'Root'): string => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return `type ${interfaceName} = ${inferType(obj)};`;
    }

    const properties = Object.entries(obj).map(([key, value]) => {
      const type = inferType(value);
      if (type === 'object' && value !== null && !Array.isArray(value)) {
        const nestedInterfaceName = key.charAt(0).toUpperCase() + key.slice(1);
        return `  ${key}: ${nestedInterfaceName};`;
      }
      return `  ${key}: ${type};`;
    });

    let result = `interface ${interfaceName} {\n${properties.join('\n')}\n}`;

    // Generate nested interfaces
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedInterfaceName = key.charAt(0).toUpperCase() + key.slice(1);
        result += '\n\n' + generateInterface(value, nestedInterfaceName);
      }
    });

    return result;
  };

  const convertToTypescript = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      return generateInterface(parsed);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      return '';
    }
  };

  const typescriptOutput = jsonInput ? convertToTypescript() : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(typescriptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-json-to-typescript-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>TypeScript Interface</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!typescriptOutput || !!error}
              className="gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto min-h-[200px]">
              {typescriptOutput || <span className="text-muted-foreground">Your TypeScript interface will appear here...</span>}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolPageTemplate>
  );
}
