import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

const NumberBaseConverter: React.FC = () => {
  const tool = ALL_TOOLS.find(t => t.id === 'number-base-converter');
  const relatedTools = tool ? getRelatedTools(tool.id, ALL_TOOLS, 3) : [];
  
  const [inputValue, setInputValue] = useState('');
  const [sourceBase, setSourceBase] = useState<string>('10');
  const [targetBase, setTargetBase] = useState<string>('2');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const baseNames: Record<string, string> = {
    '2': 'Binary',
    '8': 'Octal',
    '10': 'Decimal',
    '16': 'Hexadecimal'
  };

  const validateInput = (value: string, base: string): boolean => {
    if (!value) return false;
    
    const baseNum = parseInt(base);
    const validChars: Record<number, RegExp> = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^[0-9]+$/,
      16: /^[0-9A-Fa-f]+$/
    };

    return validChars[baseNum]?.test(value) || false;
  };

  const handleConvert = () => {
    setError('');
    setResult('');

    if (!inputValue.trim()) {
      setError('Please enter a number to convert');
      return;
    }

    if (!validateInput(inputValue, sourceBase)) {
      setError(`Invalid input for ${baseNames[sourceBase]} base`);
      return;
    }

    try {
      const decimal = parseInt(inputValue, parseInt(sourceBase));
      const converted = decimal.toString(parseInt(targetBase)).toUpperCase();
      setResult(converted);
    } catch (err) {
      setError('Conversion failed. Please check your input.');
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError('');
    setResult('');
  };

  const faqs = [
    {
      question: 'What are number bases?',
      answer: 'Number bases (or radix) are different ways to represent numbers. Binary uses base 2 (0-1), octal uses base 8 (0-7), decimal uses base 10 (0-9), and hexadecimal uses base 16 (0-9, A-F).'
    },
    {
      question: 'How do I convert binary to hexadecimal?',
      answer: 'Select Binary as the source base, enter your binary number, select Hexadecimal as the target base, and click Convert.'
    },
    {
      question: 'What characters are valid for each base?',
      answer: 'Binary: 0-1, Octal: 0-7, Decimal: 0-9, Hexadecimal: 0-9 and A-F (case insensitive).'
    },
    {
      question: 'Why is hexadecimal used in programming?',
      answer: 'Hexadecimal is compact and easily converts to/from binary, making it ideal for representing memory addresses, colors, and binary data.'
    },
    {
      question: 'Can I convert negative numbers?',
      answer: 'This tool currently supports positive integers only. For negative numbers, convert the absolute value and add the negative sign manually.'
    }
  ];

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolPageTemplate 
      tool={tool}
      gradientFilename="category-converters-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Convert Number Base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input-number">Input Number</Label>
            <Input
              id="input-number"
              type="text"
              placeholder="Enter number"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-base">From Base</Label>
              <Select value={sourceBase} onValueChange={setSourceBase}>
                <SelectTrigger id="source-base" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="2">Binary (Base 2)</SelectItem>
                  <SelectItem value="8">Octal (Base 8)</SelectItem>
                  <SelectItem value="10">Decimal (Base 10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-base">To Base</Label>
              <Select value={targetBase} onValueChange={setTargetBase}>
                <SelectTrigger id="target-base" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="2">Binary (Base 2)</SelectItem>
                  <SelectItem value="8">Octal (Base 8)</SelectItem>
                  <SelectItem value="10">Decimal (Base 10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleConvert} 
            variant="primary"
            className="w-full"
          >
            Convert
          </Button>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <Label>Result</Label>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-mono font-bold break-all">{result}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {baseNames[targetBase]} representation
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Valid Characters by Base:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><strong>Binary:</strong> 0, 1</li>
              <li><strong>Octal:</strong> 0-7</li>
              <li><strong>Decimal:</strong> 0-9</li>
              <li><strong>Hexadecimal:</strong> 0-9, A-F</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
};

export default NumberBaseConverter;
