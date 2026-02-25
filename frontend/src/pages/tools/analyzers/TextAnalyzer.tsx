import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { FileText, Hash, Type, Clock, AlignLeft, BarChart3 } from 'lucide-react';

interface TextMetrics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  averageWordLength: number;
  longestWord: string;
}

export default function TextAnalyzer() {
  const tool = getToolById('text-analyzer');
  const [text, setText] = useState('');
  const [metrics, setMetrics] = useState<TextMetrics>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    averageWordLength: 0,
    longestWord: '',
  });

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  const analyzeText = (inputText: string) => {
    if (!inputText.trim()) {
      setMetrics({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        averageWordLength: 0,
        longestWord: '',
      });
      return;
    }

    // Character count
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;

    // Word count
    const wordArray = inputText.trim().split(/\s+/).filter(word => word.length > 0);
    const words = wordArray.length;

    // Sentence count
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Paragraph count
    const paragraphs = inputText.split(/\n\n+/).filter(p => p.trim().length > 0).length;

    // Reading time (assuming 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Average word length
    const totalLetters = wordArray.reduce((sum, word) => sum + word.length, 0);
    const averageWordLength = words > 0 ? Math.round((totalLetters / words) * 10) / 10 : 0;

    // Longest word
    const longestWord = wordArray.reduce((longest, word) => 
      word.length > longest.length ? word : longest, ''
    );

    setMetrics({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      averageWordLength,
      longestWord,
    });
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('character-counter'),
    getToolById('readability-analyzer'),
    getToolById('case-converter'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-text-analyzer-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="textInput" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Enter Your Text
                </Label>
                <Textarea
                  id="textInput"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here to analyze..."
                  className="mt-2 min-h-[200px] resize-y"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Start typing to see real-time analysis of your text
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {text.trim() && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Text Analysis Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </div>
                  <div className="text-2xl font-bold">{metrics.characters.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {metrics.charactersNoSpaces.toLocaleString()} without spaces
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="h-4 w-4 text-primary" />
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                  <div className="text-2xl font-bold">{metrics.words.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Avg. {metrics.averageWordLength} letters/word
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <AlignLeft className="h-4 w-4 text-primary" />
                    <div className="text-sm text-muted-foreground">Sentences</div>
                  </div>
                  <div className="text-2xl font-bold">{metrics.sentences.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {metrics.paragraphs} paragraph{metrics.paragraphs !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border-2 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-sm text-muted-foreground">Reading Time</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {metrics.readingTime} min
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    At 200 words/min
                  </div>
                </div>
              </div>

              {metrics.longestWord && (
                <div className="mt-4 p-4 bg-background rounded-lg border-2 border-border">
                  <div className="text-sm text-muted-foreground mb-1">Longest Word</div>
                  <div className="text-lg font-semibold break-all">
                    {metrics.longestWord}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {metrics.longestWord.length} characters
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Tip:</strong> This analyzer provides real-time metrics as you type. Use it to optimize your
                  content length, check reading time, and ensure your text meets specific requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
