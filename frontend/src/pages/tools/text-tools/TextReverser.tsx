import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function TextReverser() {
  const tool = ALL_TOOLS.find((t) => t.id === 'text-reverser')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'characters' | 'words'>('characters');
  const [copied, setCopied] = useState(false);

  const reversedText =
    mode === 'characters'
      ? text.split('').reverse().join('')
      : text.split(' ').reverse().join(' ');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reversedText);
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
      gradientFilename="tool-text-reverser-hero-gradient.dim_1200x400.png"
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
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px]"
            />

            <div className="space-y-2">
              <Label>Reversal Mode</Label>
              <RadioGroup value={mode} onValueChange={(value) => setMode(value as 'characters' | 'words')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="characters" id="characters" />
                  <Label htmlFor="characters" className="font-normal cursor-pointer">
                    Character-level (entire string backwards)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="words" id="words" />
                  <Label htmlFor="words" className="font-normal cursor-pointer">
                    Word-level (reverse word order)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button variant="secondary" onClick={handleReset} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reversed Text</CardTitle>
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
            <div className="p-4 bg-muted rounded-lg min-h-[100px]">
              <p className="text-foreground break-words whitespace-pre-wrap">
                {reversedText || '(reversed text will appear here)'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolPageTemplate>
  );
}
