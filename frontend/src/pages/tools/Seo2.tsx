import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function KeywordDensityChecker() {
  const tool = ALL_TOOLS.find((t) => t.id === 'keyword-density')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [text, setText] = useState('');
  const [results, setResults] = useState<Array<{ keyword: string; count: number; density: string }>>([]);

  const handleAnalyze = () => {
    if (!text.trim()) return;

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    const wordCount: Record<string, number> = {};

    words.forEach(word => {
      if (word.length > 3) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });

    const sortedResults = Object.entries(wordCount)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: ((count / totalWords) * 100).toFixed(2) + '%'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setResults(sortedResults);
  };

  const faqs = [
    {
      question: 'What is keyword density?',
      answer: 'Keyword density is the percentage of times a keyword appears in your text compared to the total word count.'
    },
    {
      question: 'What is a good keyword density?',
      answer: 'Generally, 1-3% is considered optimal. Higher densities may be seen as keyword stuffing by search engines.'
    },
    {
      question: 'Why are short words excluded?',
      answer: 'Words with 3 or fewer characters (like "the", "and", "is") are typically not meaningful keywords and are filtered out.'
    },
    {
      question: 'How can I improve my keyword density?',
      answer: 'Use your target keywords naturally throughout your content. Focus on quality writing rather than hitting specific density targets.'
    },
    {
      question: 'Does keyword density still matter for SEO?',
      answer: 'While less critical than before, keyword density still matters. Modern SEO focuses more on natural language and user intent.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-keyword-density-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div>
          <Label className="text-foreground mb-2 block">Text to Analyze</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to analyze keyword density..."
            className="min-h-[200px]"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Word count: {text.trim() ? text.match(/\b\w+\b/g)?.length || 0 : 0}
          </p>
        </div>

        <Button onClick={handleAnalyze} variant="primary" className="w-full">
          Analyze Keyword Density
        </Button>

        {results.length > 0 && (
          <div>
            <Label className="text-foreground mb-4 block">Top Keywords</Label>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 text-foreground">Keyword</th>
                    <th className="text-right p-3 text-foreground">Count</th>
                    <th className="text-right p-3 text-foreground">Density</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-3 text-foreground">{result.keyword}</td>
                      <td className="text-right p-3 text-foreground">{result.count}</td>
                      <td className="text-right p-3 text-foreground">{result.density}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
