import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { FileText } from 'lucide-react';

export default function TextDiffChecker() {
  const tool = getToolById('text-diff-checker');
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [differences, setDifferences] = useState<{ type: 'added' | 'removed' | 'unchanged'; text: string }[]>([]);

  const compareTexts = () => {
    if (!originalText && !modifiedText) return;

    const originalLines = originalText.split('\n');
    const modifiedLines = modifiedText.split('\n');
    const diffs: { type: 'added' | 'removed' | 'unchanged'; text: string }[] = [];

    const maxLength = Math.max(originalLines.length, modifiedLines.length);

    for (let i = 0; i < maxLength; i++) {
      const origLine = originalLines[i] || '';
      const modLine = modifiedLines[i] || '';

      if (origLine === modLine) {
        if (origLine) {
          diffs.push({ type: 'unchanged', text: origLine });
        }
      } else {
        if (origLine && !modifiedLines.includes(origLine)) {
          diffs.push({ type: 'removed', text: origLine });
        }
        if (modLine && !originalLines.includes(modLine)) {
          diffs.push({ type: 'added', text: modLine });
        }
      }
    }

    setDifferences(diffs);
  };

  const handleReset = () => {
    setOriginalText('');
    setModifiedText('');
    setDifferences([]);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('character-counter'),
    getToolById('text-reverser'),
    getToolById('remove-duplicate-lines'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-text-diff-checker-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="originalText" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Original Text
                </Label>
                <Textarea
                  id="originalText"
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder="Paste your original text here..."
                  rows={8}
                  className="mt-2 font-mono"
                />
              </div>

              <div>
                <Label htmlFor="modifiedText" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Modified Text
                </Label>
                <Textarea
                  id="modifiedText"
                  value={modifiedText}
                  onChange={(e) => setModifiedText(e.target.value)}
                  placeholder="Paste your modified text here..."
                  rows={8}
                  className="mt-2 font-mono"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={compareTexts} className="flex-1 border-2 border-primary">
                  Compare Texts
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {differences.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Differences</h3>
              <div className="space-y-1 font-mono text-sm">
                {differences.map((diff, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      diff.type === 'added'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : diff.type === 'removed'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                        : 'bg-background'
                    }`}
                  >
                    <span className="mr-2 font-bold">
                      {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : ' '}
                    </span>
                    {diff.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-background rounded-lg">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Removed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <span>Unchanged</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
