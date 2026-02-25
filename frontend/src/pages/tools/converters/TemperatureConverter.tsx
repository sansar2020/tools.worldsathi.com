import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Thermometer, ArrowRightLeft, Info } from 'lucide-react';

type TemperatureUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

const UNITS: TemperatureUnit[] = ['Celsius', 'Fahrenheit', 'Kelvin'];

export default function TemperatureConverter() {
  const tool = getToolById('temperature-converter');
  const [temperature, setTemperature] = useState('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('Celsius');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('Fahrenheit');
  const [result, setResult] = useState<number | null>(null);
  const [formula, setFormula] = useState<string>('');

  useEffect(() => {
    if (temperature && !isNaN(parseFloat(temperature))) {
      convertTemperature();
    } else {
      setResult(null);
      setFormula('');
    }
  }, [temperature, fromUnit, toUnit]);

  const convertTemperature = () => {
    const temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setResult(null);
      setFormula('');
      return;
    }

    let converted: number;
    let formulaText: string;

    if (fromUnit === toUnit) {
      converted = temp;
      formulaText = 'Same unit - no conversion needed';
    } else if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
      converted = (temp * 9/5) + 32;
      formulaText = '°F = (°C × 9/5) + 32';
    } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
      converted = temp + 273.15;
      formulaText = 'K = °C + 273.15';
    } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
      converted = (temp - 32) * 5/9;
      formulaText = '°C = (°F - 32) × 5/9';
    } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
      converted = ((temp - 32) * 5/9) + 273.15;
      formulaText = 'K = (°F - 32) × 5/9 + 273.15';
    } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
      converted = temp - 273.15;
      formulaText = '°C = K - 273.15';
    } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
      converted = ((temp - 273.15) * 9/5) + 32;
      formulaText = '°F = (K - 273.15) × 9/5 + 32';
    } else {
      converted = temp;
      formulaText = '';
    }

    setResult(converted);
    setFormula(formulaText);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitSymbol = (unit: TemperatureUnit): string => {
    switch (unit) {
      case 'Celsius': return '°C';
      case 'Fahrenheit': return '°F';
      case 'Kelvin': return 'K';
    }
  };

  const handleReset = () => {
    setTemperature('');
    setFromUnit('Celsius');
    setToUnit('Fahrenheit');
    setResult(null);
    setFormula('');
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('unit-converter'),
    getToolById('weight-converter'),
    getToolById('speed-converter'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-temperature-converter-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Temperature Value
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="0"
                  step="0.01"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                <div>
                  <Label htmlFor="fromUnit">From</Label>
                  <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as TemperatureUnit)}>
                    <SelectTrigger id="fromUnit" className="mt-2 bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit} ({getUnitSymbol(unit)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={swapUnits}
                  variant="outline"
                  size="icon"
                  className="border-2 mb-0 md:mb-0"
                  title="Swap units"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>

                <div>
                  <Label htmlFor="toUnit">To</Label>
                  <Select value={toUnit} onValueChange={(value) => setToUnit(value as TemperatureUnit)}>
                    <SelectTrigger id="toUnit" className="mt-2 bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {UNITS.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit} ({getUnitSymbol(unit)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleReset} variant="outline" className="border-2 w-full">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                Conversion Result
              </h3>
              
              <div className="p-6 bg-background rounded-lg border-2 border-primary mb-4">
                <div className="text-sm text-muted-foreground mb-2">Converted Temperature</div>
                <div className="text-3xl font-bold text-primary">
                  {result.toFixed(2)} {getUnitSymbol(toUnit)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  From {parseFloat(temperature).toFixed(2)} {getUnitSymbol(fromUnit)}
                </div>
              </div>

              {formula && (
                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-primary" />
                    <div className="text-sm text-muted-foreground">Conversion Formula</div>
                  </div>
                  <div className="text-lg font-mono font-semibold">
                    {formula}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Temperature Scales:</strong> Celsius is used worldwide, Fahrenheit is common in the US, and
                  Kelvin is the SI unit used in science. Absolute zero is 0 K, -273.15°C, or -459.67°F.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
