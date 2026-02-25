import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function HashGenerator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'hash-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string>('');

  const generateHash = async (algorithm: string, data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const results: Record<string, string> = {};
    results['SHA-1'] = await generateHash('SHA-1', input);
    results['SHA-256'] = await generateHash('SHA-256', input);
    results['SHA-384'] = await generateHash('SHA-384', input);
    results['SHA-512'] = await generateHash('SHA-512', input);

    setHashes(results);
  };

  const handleCopy = (algorithm: string, hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(algorithm);
    setTimeout(() => setCopied(''), 2000);
  };

  const faqs = [
    {
      question: 'What is a hash function?',
      answer: 'A hash function converts input data into a fixed-size string of characters, which is typically a digest that is unique to each unique input.'
    },
    {
      question: 'Which hash algorithm should I use?',
      answer: 'SHA-256 is recommended for most use cases. SHA-1 is deprecated for security purposes. SHA-512 offers higher security.'
    },
    {
      question: 'Can I reverse a hash?',
      answer: 'No, hash functions are one-way. You cannot reverse a hash to get the original input.'
    },
    {
      question: 'What is the difference between hashing and encryption?',
      answer: 'Hashing is one-way and cannot be reversed. Encryption is two-way and can be decrypted with the right key.'
    },
    {
      question: 'Is my data sent to a server?',
      answer: 'No, all hashing happens in your browser using the Web Crypto API. Your data never leaves your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-hash-generator-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="input" className="text-foreground">Text to Hash</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate hashes..."
            className="mt-2 min-h-[150px]"
          />
        </div>

        <Button onClick={handleGenerate} variant="primary" className="w-full">
          Generate Hashes
        </Button>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div key={algorithm} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-foreground font-bold">{algorithm}</Label>
                  <Button
                    onClick={() => handleCopy(algorithm, hash)}
                    variant="ghost"
                    size="sm"
                  >
                    {copied === algorithm ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="font-mono text-sm text-foreground break-all bg-muted p-3 rounded">
                  {hash}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
