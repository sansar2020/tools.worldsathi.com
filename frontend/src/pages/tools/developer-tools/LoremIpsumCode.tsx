import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function LoremIpsumCode() {
  const tool = ALL_TOOLS.find((t) => t.id === 'lorem-ipsum-code')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [paragraphs, setParagraphs] = useState(3);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const loremText = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  ];

  const generateText = (count: number): string[] => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(loremText[i % loremText.length]);
    }
    return result;
  };

  const texts = generateText(paragraphs);

  const formats = [
    {
      label: 'JavaScript',
      value: `const loremIpsum = [\n  "${texts.join('",\n  "')}"\n];`
    },
    {
      label: 'Python',
      value: `lorem_ipsum = [\n    "${texts.join('",\n    "')}"\n]`
    },
    {
      label: 'JSON',
      value: JSON.stringify(texts, null, 2)
    },
  ];

  const handleCopy = async (value: string, format: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-lorem-ipsum-code-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="paragraphs">Number of Paragraphs</Label>
              <Input
                id="paragraphs"
                type="number"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {formats.map((format) => (
            <Card key={format.label}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{format.label}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(format.value, format.label)}
                  className="gap-2"
                >
                  {copiedFormat === format.label ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedFormat === format.label ? 'Copied!' : 'Copy'}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-muted font-mono text-sm overflow-x-auto">
                  {format.value}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolPageTemplate>
  );
}
