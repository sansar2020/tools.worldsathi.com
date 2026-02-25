import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Base64Tool() {
  const tool = ALL_TOOLS.find((t) => t.id === 'base64-tool')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (e) {
      setOutput('Error: Invalid input for encoding');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (e) {
      setOutput('Error: Invalid Base64 string');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is Base64 encoding?',
      answer: 'Base64 is a method of encoding binary data into ASCII text, commonly used for transmitting data over text-based protocols.'
    },
    {
      question: 'When should I use Base64?',
      answer: 'Use Base64 when you need to embed binary data in text formats like JSON, XML, or HTML, or when transmitting data over text-only channels.'
    },
    {
      question: 'Does Base64 encrypt my data?',
      answer: 'No, Base64 is encoding, not encryption. Anyone can decode Base64 data. Use encryption for security.'
    },
    {
      question: 'Why is Base64 data larger than the original?',
      answer: 'Base64 encoding increases data size by about 33% because it uses only 64 characters to represent binary data.'
    },
    {
      question: 'Is my data sent to a server?',
      answer: 'No, all encoding and decoding happens in your browser. Your data never leaves your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-base64-tool-hero-gradient.dim_1200x400.png"
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
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            className="font-mono min-h-[150px]"
          />
        </div>

        <Button
          onClick={mode === 'encode' ? handleEncode : handleDecode}
          variant="primary"
          className="w-full"
        >
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
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
              className="font-mono min-h-[150px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
