import React, { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolPageTemplate from '../ToolPageTemplate';
import { getToolById } from '@/constants/tools';

type AreaUnit = 'sqm' | 'sqft' | 'acre' | 'hectare' | 'sqkm';

interface ConversionRate {
  [key: string]: number;
}

// Conversion rates relative to square meters
const CONVERSION_RATES: ConversionRate = {
  sqm: 1,
  sqft: 10.7639,
  acre: 0.000247105,
  hectare: 0.0001,
  sqkm: 0.000001,
};

const UNIT_LABELS: { [key in AreaUnit]: string } = {
  sqm: 'Square Meters (m²)',
  sqft: 'Square Feet (ft²)',
  acre: 'Acres',
  hectare: 'Hectares',
  sqkm: 'Square Kilometers (km²)',
};

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<AreaUnit>('sqm');
  const [toUnit, setToUnit] = useState<AreaUnit>('sqft');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const tool = getToolById('area-converter');

  const handleConvert = () => {
    setError('');
    setResult('');

    const value = parseFloat(inputValue);
    if (isNaN(value) || inputValue.trim() === '') {
      setError('Please enter a valid number');
      return;
    }

    if (value < 0) {
      setError('Area cannot be negative');
      return;
    }

    // Convert to square meters first, then to target unit
    const valueInSqm = value / CONVERSION_RATES[fromUnit];
    const convertedValue = valueInSqm * CONVERSION_RATES[toUnit];

    // Format result with appropriate precision
    const formatted = convertedValue < 0.01 
      ? convertedValue.toExponential(4)
      : convertedValue.toFixed(6).replace(/\.?0+$/, '');

    setResult(formatted);
  };

  const handleReset = () => {
    setInputValue('');
    setFromUnit('sqm');
    setToUnit('sqft');
    setResult('');
    setError('');
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result) {
      setInputValue(result);
      setResult('');
    }
  };

  const faqs = [
    {
      question: 'How accurate is the area converter?',
      answer: 'The converter uses standard conversion rates and provides results accurate to 6 decimal places for most conversions.',
    },
    {
      question: 'What area units are supported?',
      answer: 'The tool supports square meters, square feet, acres, hectares, and square kilometers.',
    },
    {
      question: 'Can I convert between any two units?',
      answer: 'Yes, you can convert between any combination of the supported area units bidirectionally.',
    },
    {
      question: 'Why do I see scientific notation for some results?',
      answer: 'Very small values (less than 0.01) are displayed in scientific notation for better readability.',
    },
  ];

  const relatedTools = [
    getToolById('speed-converter'),
    getToolById('unit-converter'),
    getToolById('weight-converter'),
    getToolById('temperature-converter'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (!tool) {
    return <div className="container mx-auto px-4 py-8">Tool not found</div>;
  }

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-area-converter-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Area Conversion Tool
          </CardTitle>
          <CardDescription>
            Convert between different area units with precision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-value">Value</Label>
              <Input
                id="input-value"
                type="number"
                placeholder="Enter area value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-white dark:bg-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="from-unit">From</Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as AreaUnit)}>
                  <SelectTrigger id="from-unit" className="bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(UNIT_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapUnits}
                className="mb-0 md:mb-0"
                title="Swap units"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>

              <div className="space-y-2">
                <Label htmlFor="to-unit">To</Label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as AreaUnit)}>
                  <SelectTrigger id="to-unit" className="bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(UNIT_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Result</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {result} {UNIT_LABELS[toUnit].split('(')[1]?.replace(')', '') || toUnit}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {inputValue} {UNIT_LABELS[fromUnit].split('(')[1]?.replace(')', '') || fromUnit} = {result}{' '}
                  {UNIT_LABELS[toUnit].split('(')[1]?.replace(')', '') || toUnit}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleConvert} className="flex-1 border-2" disabled={!inputValue.trim()}>
              <Calculator className="mr-2 h-4 w-4" />
              Convert
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-2">
              Reset
            </Button>
          </div>

          {/* Conversion Reference */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quick Reference</h3>
            <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
              <p>• 1 m² = 10.764 ft²</p>
              <p>• 1 acre = 4,047 m² = 43,560 ft²</p>
              <p>• 1 hectare = 10,000 m² = 2.471 acres</p>
              <p>• 1 km² = 1,000,000 m² = 100 hectares</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
}
