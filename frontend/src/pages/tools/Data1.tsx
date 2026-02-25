import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function JSONFormatter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'json-formatter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is JSON?',
      answer: 'JSON (JavaScript Object Notation) is a lightweight data format used for storing and exchanging data between systems.'
    },
    {
      question: 'How do I fix JSON syntax errors?',
      answer: 'Common errors include missing commas, unquoted keys, trailing commas, and mismatched brackets. The error message will guide you to the problem.'
    },
    {
      question: 'What is the difference between format and minify?',
      answer: 'Format adds indentation and line breaks for readability. Minify removes all whitespace to reduce file size.'
    },
    {
      question: 'Can I validate large JSON files?',
      answer: 'Yes, but very large files (>10MB) may be slow to process in the browser.'
    },
    {
      question: 'Is my data sent to a server?',
      answer: 'No, all processing happens in your browser. Your data never leaves your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-json-formatter-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-foreground font-medium mb-2">Input JSON</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="font-mono min-h-[200px]"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button onClick={handleFormat} variant="primary">
            Format
          </Button>
          <Button onClick={handleMinify} variant="secondary">
            Minify
          </Button>
          <Button onClick={handleValidate} variant="secondary">
            Validate
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-foreground font-medium">Output</label>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
