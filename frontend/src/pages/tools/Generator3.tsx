import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Generator3() {
  const tool = ALL_TOOLS.find((t) => t.id === 'lorem-ipsum-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [type, setType] = useState<string>('paragraphs');
  const [count, setCount] = useState<string>('3');
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  ];

  const generateWords = (num: number): string => {
    const words: string[] = [];
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(' ');
  };

  const generateSentence = (): string => {
    const wordCount = Math.floor(Math.random() * 10) + 5;
    const sentence = generateWords(wordCount);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    const sentences: string[] = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const handleGenerate = () => {
    const num = parseInt(count);
    if (isNaN(num) || num <= 0) return;

    let generated = '';

    switch (type) {
      case 'paragraphs':
        const paragraphs: string[] = [];
        for (let i = 0; i < num; i++) {
          paragraphs.push(generateParagraph());
        }
        generated = paragraphs.join('\n\n');
        break;
      case 'words':
        generated = generateWords(num);
        break;
      case 'characters':
        generated = generateWords(Math.ceil(num / 5)).substring(0, num);
        break;
    }

    setResult(generated);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is Lorem Ipsum?',
      answer: 'Lorem Ipsum is placeholder text used in design and publishing. It\'s derived from Latin text and has been the industry standard since the 1500s.'
    },
    {
      question: 'Why use Lorem Ipsum instead of real text?',
      answer: 'Lorem Ipsum has a natural distribution of letters, making it look like readable text without distracting from the design with actual content.'
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="words">Words</SelectItem>
                <SelectItem value="characters">Characters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Count</Label>
            <Input
              id="count"
              type="number"
              placeholder="Enter count"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <Button variant="primary" onClick={handleGenerate} className="w-full">
          Generate Lorem Ipsum
        </Button>

        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Text</Label>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <Textarea
              value={result}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
