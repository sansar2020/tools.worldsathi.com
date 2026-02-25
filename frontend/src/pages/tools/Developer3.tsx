import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function URLEncoder() {
  const tool = ALL_TOOLS.find((t) => t.id === 'url-encoder')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Invalid input');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Invalid encoded URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is URL encoding?',
      answer: 'URL encoding converts characters into a format that can be transmitted over the Internet by replacing unsafe ASCII characters with a "%" followed by two hexadecimal digits.'
    },
    {
      question: 'When should I encode URLs?',
      answer: 'Encode URLs when they contain special characters, spaces, or non-ASCII characters that need to be safely transmitted in HTTP requests.'
    },
    {
      question: 'What characters need encoding?',
      answer: 'Spaces, special characters like &, =, ?, #, and non-ASCII characters all need encoding in URLs.'
    },
    {
      question: 'Is URL encoding the same as HTML encoding?',
      answer: 'No, they serve different purposes. URL encoding is for URLs, while HTML encoding is for displaying special characters in HTML.'
    },
    {
      question: 'Can I encode entire URLs?',
      answer: 'Yes, but typically you only encode the query parameters and path segments, not the protocol or domain.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-url-encoder-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button
            onClick={() => setMode('encode')}
            variant={mode === 'encode' ? 'primary' : 'secondary'}
            className="flex-1"
          >
            Encode
          </Button>
          <Button
            onClick={() => setMode('decode')}
            variant={mode === 'decode' ? 'primary' : 'secondary'}
            className="flex-1"
          >
            Decode
          </Button>
        </div>

        <div>
          <Label className="text-foreground mb-2 block">
            {mode === 'encode' ? 'URL to Encode' : 'Encoded URL to Decode'}
          </Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'https://example.com/search?q=hello world' : 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
            className="font-mono min-h-[100px]"
          />
        </div>

        <Button
          onClick={mode === 'encode' ? handleEncode : handleDecode}
          variant="primary"
          className="w-full"
        >
          {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
        </Button>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-foreground">Output</Label>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="font-mono min-h-[100px] bg-muted"
            />
          </div>
        )}

        <div className="p-4 bg-muted rounded-lg">
          <Label className="text-foreground mb-2 block">Common Use Cases</Label>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Encoding URLs with special characters</li>
            <li>Encoding query parameters</li>
            <li>Decoding URLs from logs or analytics</li>
            <li>Preparing URLs for API requests</li>
          </ul>
        </div>
      </div>
    </ToolPageTemplate>
  );
}
