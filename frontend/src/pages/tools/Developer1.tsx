import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function RegexTester() {
  const tool = ALL_TOOLS.find((t) => t.id === 'regex-tester')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [globalFlag, setGlobalFlag] = useState(true);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [multiline, setMultiline] = useState(false);
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleTest = () => {
    try {
      let flags = '';
      if (globalFlag) flags += 'g';
      if (caseInsensitive) flags += 'i';
      if (multiline) flags += 'm';

      const regex = new RegExp(pattern, flags);
      const foundMatches = testString.match(regex) || [];
      setMatches(foundMatches);
      setError('');
    } catch (e) {
      setError('Invalid regex pattern: ' + (e as Error).message);
      setMatches([]);
    }
  };

  const faqs = [
    {
      question: 'What is a regular expression?',
      answer: 'A regular expression (regex) is a sequence of characters that defines a search pattern, used for pattern matching in strings.'
    },
    {
      question: 'What do the flags mean?',
      answer: 'g = global (find all matches), i = case-insensitive, m = multiline (^ and $ match line breaks).'
    },
    {
      question: 'How do I match email addresses?',
      answer: 'A simple pattern is: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    },
    {
      question: 'Can I test multiple patterns?',
      answer: 'Test one pattern at a time. For multiple patterns, run the tool separately for each.'
    },
    {
      question: 'Where can I learn more about regex?',
      answer: 'Check out regex101.com or regexr.com for interactive tutorials and documentation.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-regex-tester-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="pattern" className="text-foreground">Regular Expression Pattern</Label>
          <Input
            id="pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g., \d{3}-\d{3}-\d{4}"
            className="mt-2 font-mono"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="global"
              checked={globalFlag}
              onCheckedChange={(checked) => setGlobalFlag(checked as boolean)}
            />
            <Label htmlFor="global" className="text-foreground cursor-pointer">Global (g)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="case"
              checked={caseInsensitive}
              onCheckedChange={(checked) => setCaseInsensitive(checked as boolean)}
            />
            <Label htmlFor="case" className="text-foreground cursor-pointer">Case Insensitive (i)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multiline"
              checked={multiline}
              onCheckedChange={(checked) => setMultiline(checked as boolean)}
            />
            <Label htmlFor="multiline" className="text-foreground cursor-pointer">Multiline (m)</Label>
          </div>
        </div>

        <div>
          <Label htmlFor="test-string" className="text-foreground">Test String</Label>
          <Textarea
            id="test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
            className="mt-2 min-h-[150px]"
          />
        </div>

        <Button onClick={handleTest} variant="primary" className="w-full">
          Test Regex
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {matches.length > 0 && (
          <div className="p-4 bg-success/10 border border-success rounded-lg">
            <Label className="text-foreground mb-2 block">Matches Found: {matches.length}</Label>
            <div className="space-y-2">
              {matches.map((match, index) => (
                <div key={index} className="p-2 bg-background rounded border border-border">
                  <span className="font-mono text-foreground">{match}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {matches.length === 0 && !error && testString && pattern && (
          <div className="p-4 bg-warning/10 border border-warning rounded-lg">
            <p className="text-warning font-medium">No matches found</p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
