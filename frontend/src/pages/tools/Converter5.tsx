import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Converter5() {
  const tool = ALL_TOOLS.find((t) => t.id === 'weight-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('kilograms');
  const [toUnit, setToUnit] = useState<string>('pounds');
  const [result, setResult] = useState<number | null>(null);

  const conversionRates: Record<string, number> = {
    kilograms: 1,
    pounds: 2.20462,
    ounces: 35.274,
    grams: 1000,
    tons: 0.001,
  };

  const handleConvert = () => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const inKilograms = val / conversionRates[fromUnit];
      const converted = inKilograms * conversionRates[toUnit];
      setResult(converted);
    }
  };

  const handleReset = () => {
    setValue('');
    setResult(null);
  };

  const faqs = [
    {
      question: 'What weight units are supported?',
      answer: 'We support kilograms, pounds, ounces, grams, and metric tons - covering both metric and imperial systems.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="category-converters-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="value">Weight Value</Label>
          <Input
            id="value"
            type="number"
            placeholder="Enter weight"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                <SelectItem value="pounds">Pounds (lb)</SelectItem>
                <SelectItem value="ounces">Ounces (oz)</SelectItem>
                <SelectItem value="grams">Grams (g)</SelectItem>
                <SelectItem value="tons">Metric Tons (t)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                <SelectItem value="pounds">Pounds (lb)</SelectItem>
                <SelectItem value="ounces">Ounces (oz)</SelectItem>
                <SelectItem value="grams">Grams (g)</SelectItem>
                <SelectItem value="tons">Metric Tons (t)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleConvert} className="flex-1">
            Convert
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result !== null && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Result:</p>
            <p className="text-3xl font-bold text-primary">
              {result.toFixed(4)} {toUnit}
            </p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
