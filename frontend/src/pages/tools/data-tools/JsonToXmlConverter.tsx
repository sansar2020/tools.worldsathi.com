import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Code2 } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function JsonToXmlConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'json-to-xml-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [jsonInput, setJsonInput] = useState<string>('');
  const [xmlOutput, setXmlOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const jsonToXml = (obj: any, rootName: string = 'root'): string => {
    let xml = '';

    const convertValue = (key: string, value: any, indent: string = ''): string => {
      if (value === null || value === undefined) {
        return `${indent}<${key} />\n`;
      }

      if (Array.isArray(value)) {
        return value.map(item => convertValue(key, item, indent)).join('');
      }

      if (typeof value === 'object') {
        let attrs = '';
        let children = '';

        for (const [k, v] of Object.entries(value)) {
          if (k === '@attributes' && typeof v === 'object') {
            attrs = Object.entries(v as object)
              .map(([attrKey, attrVal]) => ` ${attrKey}="${attrVal}"`)
              .join('');
          } else {
            children += convertValue(k, v, indent + '  ');
          }
        }

        if (children) {
          return `${indent}<${key}${attrs}>\n${children}${indent}</${key}>\n`;
        } else {
          return `${indent}<${key}${attrs} />\n`;
        }
      }

      return `${indent}<${key}>${value}</${key}>\n`;
    };

    xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += convertValue(rootName, obj);

    return xml;
  };

  const handleConvert = () => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);
      const result = jsonToXml(parsed);
      setXmlOutput(result);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format');
      setXmlOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'How are JSON objects converted to XML?',
      answer: 'JSON objects become XML elements, with nested objects creating child elements. Arrays create multiple elements with the same tag name.'
    },
    {
      question: 'Can I specify XML attributes?',
      answer: 'Yes, use an "@attributes" object within your JSON to define XML attributes for an element.'
    },
    {
      question: 'What happens to JSON arrays?',
      answer: 'Arrays are converted to multiple XML elements with the same tag name, preserving the array structure.'
    },
    {
      question: 'Is the conversion reversible?',
      answer: 'Use our XML to JSON converter to reverse the process, though some formatting details may differ.'
    },
    {
      question: 'What if my JSON is invalid?',
      answer: 'The tool will display an error message. Ensure your JSON is properly formatted before converting.'
    },
    {
      question: 'Can I customize the root element name?',
      answer: 'Currently, the root element is named "root" by default. Structure your JSON accordingly.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-json-to-xml-converter-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="jsonInput">JSON Input</Label>
          <Textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
            className="font-mono min-h-[200px]"
          />
        </div>

        <Button variant="primary" onClick={handleConvert} className="w-full">
          <Code2 className="mr-2 h-4 w-4" />
          Convert to XML
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {xmlOutput && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>XML Output</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={xmlOutput}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
