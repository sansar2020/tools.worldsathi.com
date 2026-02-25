import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function RemoveDuplicateLines() {
  const tool = ALL_TOOLS.find((t) => t.id === 'remove-duplicate-lines')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [copied, setCopied] = useState(false);

  const lines = text.split('\n');
  const seen = new Set<string>();
  const uniqueLines = lines.filter((line) => {
    const key = caseSensitive ? line : line.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  const cleanedText = uniqueLines.join('\n');
  const originalCount = lines.length;
  const uniqueCount = uniqueLines.length;
  const duplicatesRemoved = originalCount - uniqueCount;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cleanedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setText('');
    setCopied(false);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-remove-duplicate-lines-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your text with duplicate lines here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <Label htmlFor="case-sensitive" className="cursor-pointer">
                Case-sensitive matching
              </Label>
              <Switch
                id="case-sensitive"
                checked={caseSensitive}
                onCheckedChange={setCaseSensitive}
              />
            </div>

            <Button variant="secondary" onClick={handleReset} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Lines</p>
                <p className="text-2xl font-bold text-primary">{originalCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Duplicates Removed</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{duplicatesRemoved}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Final Lines</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{uniqueCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cleaned Text</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!text}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg min-h-[150px]">
              <pre className="text-sm text-foreground whitespace-pre-wrap break-words font-mono">
                {cleanedText || '(cleaned text will appear here)'}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageTemplate>
  );
}
