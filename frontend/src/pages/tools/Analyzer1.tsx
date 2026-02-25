import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Analyzer1() {
  const tool = ALL_TOOLS.find((t) => t.id === 'text-analyzer')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [text, setText] = useState<string>('');
  const [stats, setStats] = useState<{
    characters: number;
    words: number;
    sentences: number;
    paragraphs: number;
  } | null>(null);

  const handleAnalyze = () => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;

    setStats({ characters, words, sentences, paragraphs });
  };

  const handleReset = () => {
    setText('');
    setStats(null);
  };

  const faqs = [
    {
      question: 'How does the word count work?',
      answer: 'Words are counted by splitting text on whitespace. Hyphenated words count as one word.',
    },
    {
      question: 'What counts as a sentence?',
      answer: 'Sentences are identified by periods, exclamation marks, and question marks.',
    },
    {
      question: 'Is there a text length limit?',
      answer: 'No, you can analyze text of any length.',
    },
    {
      question: 'Does it count special characters?',
      answer: 'Yes, all characters including spaces and punctuation are counted.',
    },
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-text-analyzer-gradient.dim_1200x300.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text to Analyze</Label>
          <Textarea
            id="text"
            placeholder="Enter or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleAnalyze} className="flex-1">
            Analyze Text
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
              <p className="text-2xl font-bold text-primary">{stats.characters}</p>
              <p className="text-sm text-muted-foreground">Characters</p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
              <p className="text-2xl font-bold text-primary">{stats.words}</p>
              <p className="text-sm text-muted-foreground">Words</p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
              <p className="text-2xl font-bold text-primary">{stats.sentences}</p>
              <p className="text-sm text-muted-foreground">Sentences</p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary rounded-lg text-center">
              <p className="text-2xl font-bold text-primary">{stats.paragraphs}</p>
              <p className="text-sm text-muted-foreground">Paragraphs</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
