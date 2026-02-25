import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Generator4() {
  const tool = ALL_TOOLS.find((t) => t.id === 'uuid-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [uuids, setUuids] = useState<string[]>([]);
  const [batchSize, setBatchSize] = useState<string>('1');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const size = parseInt(batchSize);
    if (isNaN(size) || size <= 0 || size > 100) return;

    const newUuids: string[] = [];
    for (let i = 0; i < size; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    setCopiedIndex(null);
  };

  const handleCopy = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const faqs = [
    {
      question: 'What is a UUID?',
      answer: 'UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information. Also called GUID (Globally Unique Identifier).'
    },
    {
      question: 'Are these UUIDs truly unique?',
      answer: 'Yes! UUID v4 uses random generation with such a large number space that collisions are virtually impossible.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="category-generators-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="batchSize">Number of UUIDs (1-100)</Label>
          <Input
            id="batchSize"
            type="number"
            placeholder="Enter batch size"
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
            min="1"
            max="100"
          />
        </div>

        <Button variant="primary" onClick={handleGenerate} className="w-full">
          Generate UUID{parseInt(batchSize) > 1 ? 's' : ''}
        </Button>

        {uuids.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Generated UUIDs</Label>
              {uuids.length > 1 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyAll}
                  className="flex items-center gap-2"
                >
                  {copiedIndex === -1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedIndex === -1 ? 'Copied All!' : 'Copy All'}
                </Button>
              )}
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
                >
                  <code className="text-sm font-mono">{uuid}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(uuid, index)}
                    className="flex items-center gap-2"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
