import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { BookOpen } from 'lucide-react';

export default function ReadabilityAnalyzer() {
  const tool = getToolById('readability-analyzer');
  const [text, setText] = useState('');
  const [result, setResult] = useState<{
    fleschScore: number;
    gradeLevel: number;
    avgWordsPerSentence: number;
    rating: string;
  } | null>(null);

  const analyzeReadability = () => {
    if (!text.trim()) return;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    // Flesch Reading Ease
    const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

    // Flesch-Kincaid Grade Level
    const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    let rating = '';
    if (fleschScore >= 90) rating = 'Very Easy';
    else if (fleschScore >= 80) rating = 'Easy';
    else if (fleschScore >= 70) rating = 'Fairly Easy';
    else if (fleschScore >= 60) rating = 'Standard';
    else if (fleschScore >= 50) rating = 'Fairly Difficult';
    else if (fleschScore >= 30) rating = 'Difficult';
    else rating = 'Very Difficult';

    setResult({
      fleschScore: Math.max(0, Math.min(100, fleschScore)),
      gradeLevel: Math.max(0, gradeLevel),
      avgWordsPerSentence,
      rating,
    });
  };

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const handleReset = () => {
    setText('');
    setResult(null);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('text-analyzer'),
    getToolById('character-counter'),
    getToolById('case-converter'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-readability-analyzer-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Text to Analyze
                </Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here to analyze readability..."
                  rows={10}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={analyzeReadability} disabled={!text.trim()} className="flex-1 border-2 border-primary">
                  Analyze Readability
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Readability Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Flesch Reading Ease</div>
                  <div className="text-3xl font-bold text-primary">{result.fleschScore.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground mt-1">{result.rating}</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Grade Level</div>
                  <div className="text-3xl font-bold text-primary">{result.gradeLevel.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground mt-1">Flesch-Kincaid</div>
                </div>
                <div className="p-4 bg-background rounded-lg md:col-span-2">
                  <div className="text-sm text-muted-foreground mb-1">Average Words per Sentence</div>
                  <div className="text-3xl font-bold text-primary">{result.avgWordsPerSentence.toFixed(1)}</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Interpretation:</strong> A Flesch Reading Ease score of 60-70 is considered standard and
                  suitable for general audiences. Higher scores indicate easier reading, while lower scores suggest more
                  complex text.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
