import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CaseConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'case-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [text, setText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const conversions = [
    { label: 'UPPERCASE', value: text.toUpperCase() },
    { label: 'lowercase', value: text.toLowerCase() },
    {
      label: 'Title Case',
      value: text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    },
    {
      label: 'Sentence case',
      value: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    },
    {
      label: 'aLtErNaTiNg CaSe',
      value: text
        .split('')
        .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
        .join(''),
    },
  ];

  const handleCopy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setText('');
    setCopiedIndex(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-case-converter-hero-gradient.dim_1200x400.png"
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
            <Button variant="secondary" onClick={handleReset} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {conversions.map((conversion, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">{conversion.label}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(conversion.value, index)}
                    className="gap-2"
                  >
                    {copiedIndex === index ? (
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
                </div>
                <p className="text-foreground break-words">{conversion.value || '(empty)'}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ToolPageTemplate>
  );
}
