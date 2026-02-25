import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Converter3() {
  const tool = ALL_TOOLS.find((t) => t.id === 'temperature-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('celsius');
  const [toUnit, setToUnit] = useState<string>('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  const convertTemperature = (val: number, from: string, to: string): number => {
    let celsius: number;

    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = val;
        break;
      case 'fahrenheit':
        celsius = (val - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = val - 273.15;
        break;
      default:
        celsius = val;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return (celsius * 9 / 5) + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const handleConvert = () => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const converted = convertTemperature(val, fromUnit, toUnit);
      setResult(converted);
    }
  };

  const handleReset = () => {
    setValue('');
    setResult(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-temperature-converter-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="value">Temperature Value</Label>
          <Input
            id="value"
            type="number"
            placeholder="Enter temperature"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step="0.1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 z-50">
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 z-50">
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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
              {result.toFixed(2)}° {toUnit === 'celsius' ? 'C' : toUnit === 'fahrenheit' ? 'F' : 'K'}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Formula: {fromUnit === 'celsius' && toUnit === 'fahrenheit' && '°F = (°C × 9/5) + 32'}
              {fromUnit === 'fahrenheit' && toUnit === 'celsius' && '°C = (°F - 32) × 5/9'}
              {fromUnit === 'celsius' && toUnit === 'kelvin' && 'K = °C + 273.15'}
              {fromUnit === 'kelvin' && toUnit === 'celsius' && '°C = K - 273.15'}
              {fromUnit === 'fahrenheit' && toUnit === 'kelvin' && 'K = (°F - 32) × 5/9 + 273.15'}
              {fromUnit === 'kelvin' && toUnit === 'fahrenheit' && '°F = (K - 273.15) × 9/5 + 32'}
            </p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
