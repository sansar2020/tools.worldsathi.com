import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/Button';
import { Calculator, RotateCcw } from 'lucide-react';

export default function StandardDeviationCalculator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'standard-deviation-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [stats, setStats] = useState<{
    n: number;
    mean: number;
    variance: number;
    stdDev: number;
    sum: number;
    squaredDiffsSum: number;
  } | null>(null);

  const parseNumbers = (text: string): number[] => {
    if (!text.trim()) {
      setError('Please enter at least one number');
      return [];
    }

    const numbers: number[] = [];
    // Split by commas, newlines, or both
    const parts = text.split(/[\n,]+/).map(s => s.trim()).filter(s => s.length > 0);
    
    if (parts.length === 0) {
      setError('Please enter at least one number');
      return [];
    }

    for (const part of parts) {
      const num = parseFloat(part);
      if (isNaN(num)) {
        setError(`Invalid number: "${part}". Please enter valid numbers only.`);
        return [];
      }
      numbers.push(num);
    }
    
    if (numbers.length < 2) {
      setError('Please enter at least 2 numbers to calculate standard deviation');
      return [];
    }

    setError('');
    return numbers;
  };

  const calculateStats = (numbers: number[]) => {
    if (numbers.length === 0) return null;

    const n = numbers.length;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / n;
    
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    const squaredDiffsSum = squaredDiffs.reduce((acc, diff) => acc + diff, 0);
    const variance = squaredDiffsSum / n;
    const stdDev = Math.sqrt(variance);

    return { n, mean, variance, stdDev, sum, squaredDiffsSum };
  };

  const handleCalculate = () => {
    const numbers = parseNumbers(input);
    if (numbers.length > 0) {
      const result = calculateStats(numbers);
      setStats(result);
      setCalculated(true);
    } else {
      setStats(null);
      setCalculated(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setError('');
    setStats(null);
    setCalculated(false);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-standard-deviation-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Dataset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dataset">Numbers (comma or line separated)</Label>
              <Textarea
                id="dataset"
                placeholder="Enter numbers separated by commas or line breaks:&#10;10, 20, 30, 40, 50&#10;or&#10;10&#10;20&#10;30&#10;40&#10;50"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (calculated) {
                    setCalculated(false);
                    setStats(null);
                  }
                }}
                className="min-h-[150px] font-mono"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleCalculate}
                disabled={!input.trim()}
                className="flex-1"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                disabled={!input && !stats}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {stats && calculated && !error && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Statistical Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-1">Count (n)</div>
                    <div className="text-2xl font-bold">{stats.n}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-1">Mean (μ)</div>
                    <div className="text-2xl font-bold">{stats.mean.toFixed(4)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="text-sm text-muted-foreground mb-1">Variance (σ²)</div>
                    <div className="text-2xl font-bold">{stats.variance.toFixed(4)}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">Standard Deviation (σ)</div>
                    <div className="text-2xl font-bold text-primary">{stats.stdDev.toFixed(4)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Calculation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-1">Step 1: Count the numbers</div>
                    <div className="font-mono">n = {stats.n}</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-1">Step 2: Calculate the mean (average)</div>
                    <div className="font-mono">Sum = {stats.sum.toFixed(4)}</div>
                    <div className="font-mono">Mean (μ) = Sum / n = {stats.sum.toFixed(4)} / {stats.n} = {stats.mean.toFixed(4)}</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="font-semibold mb-1">Step 3: Calculate variance</div>
                    <div className="text-muted-foreground mb-1">Find the squared difference from mean for each number, then average them:</div>
                    <div className="font-mono">Sum of squared differences = {stats.squaredDiffsSum.toFixed(4)}</div>
                    <div className="font-mono">Variance (σ²) = {stats.squaredDiffsSum.toFixed(4)} / {stats.n} = {stats.variance.toFixed(4)}</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="font-semibold mb-1">Step 4: Calculate standard deviation</div>
                    <div className="text-muted-foreground mb-1">Take the square root of variance:</div>
                    <div className="font-mono font-bold text-primary">
                      Standard Deviation (σ) = √{stats.variance.toFixed(4)} = {stats.stdDev.toFixed(4)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <div className="text-sm">
                    <div className="font-semibold mb-2">Formula Used:</div>
                    <div className="font-mono text-xs">
                      σ = √(Σ(x - μ)² / n)
                    </div>
                    <div className="text-muted-foreground mt-2 text-xs">
                      Where σ is standard deviation, μ is mean, x represents each value, and n is the count of values.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ToolPageTemplate>
  );
}
