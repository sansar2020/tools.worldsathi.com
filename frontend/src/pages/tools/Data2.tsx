import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function CSVToJSONConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'csv-to-json')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [csvInput, setCSVInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!csvInput.trim()) return;

    const lines = csvInput.trim().split('\n');
    const headers = hasHeader ? lines[0].split(delimiter).map(h => h.trim()) : [];
    const dataLines = hasHeader ? lines.slice(1) : lines;

    const result = dataLines.map((line, index) => {
      const values = line.split(delimiter).map(v => v.trim());
      if (hasHeader) {
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || '';
        });
        return obj;
      } else {
        return values;
      }
    });

    setJsonOutput(JSON.stringify(result, null, 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is CSV?',
      answer: 'CSV (Comma-Separated Values) is a simple file format for storing tabular data, commonly used in spreadsheets.'
    },
    {
      question: 'What delimiters are supported?',
      answer: 'We support comma (,), semicolon (;), and tab delimiters, which are the most common in CSV files.'
    },
    {
      question: 'What if my CSV has no header row?',
      answer: 'Uncheck "First row is header" and the converter will create an array of arrays instead of objects.'
    },
    {
      question: 'Can I convert large CSV files?',
      answer: 'Yes, but very large files may be slow to process. For files over 10MB, consider using a desktop tool.'
    },
    {
      question: 'Is my data sent to a server?',
      answer: 'No, all conversion happens in your browser. Your data never leaves your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-csv-json-converter-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div>
          <Label className="text-foreground mb-2 block">CSV Input</Label>
          <Textarea
            value={csvInput}
            onChange={(e) => setCSVInput(e.target.value)}
            placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,Los Angeles"
            className="font-mono min-h-[200px]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="delimiter" className="text-foreground mb-2 block">Delimiter</Label>
            <Select value={delimiter} onValueChange={setDelimiter}>
              <SelectTrigger id="delimiter" className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value=",">Comma (,)</SelectItem>
                <SelectItem value=";">Semicolon (;)</SelectItem>
                <SelectItem value="\t">Tab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="header"
              checked={hasHeader}
              onCheckedChange={(checked) => setHasHeader(checked as boolean)}
            />
            <Label htmlFor="header" className="text-foreground cursor-pointer">
              First row is header
            </Label>
          </div>
        </div>

        <Button onClick={handleConvert} variant="primary" className="w-full">
          Convert to JSON
        </Button>

        {jsonOutput && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-foreground">JSON Output</Label>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={jsonOutput}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
