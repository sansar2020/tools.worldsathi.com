import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function PercentageChangeCalculator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'percentage-change-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [result, setResult] = useState<{ difference: number; percentage: number; isIncrease: boolean } | null>(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);

    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
      const difference = final - initial;
      const percentage = (difference / initial) * 100;
      setResult({
        difference,
        percentage,
        isIncrease: difference > 0,
      });
    }
  };

  const handleReset = () => {
    setInitialValue('');
    setFinalValue('');
    setResult(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-percentage-change-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initial">Initial Value</Label>
                <Input
                  id="initial"
                  type="number"
                  placeholder="Enter initial value"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="final">Final Value</Label>
                <Input
                  id="final"
                  type="number"
                  placeholder="Enter final value"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="default" onClick={handleCalculate} className="flex-1">
                Calculate
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Absolute Difference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {result.difference > 0 ? '+' : ''}{result.difference.toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card className={result.isIncrease ? 'border-green-500' : 'border-red-500'}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {result.isIncrease ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Percentage Increase
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      Percentage Decrease
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${result.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                  {result.percentage > 0 ? '+' : ''}{result.percentage.toFixed(2)}%
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
