import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Calculator4() {
  const tool = ALL_TOOLS.find((t) => t.id === 'tip-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [numPeople, setNumPeople] = useState<string>('1');
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);

  const handleCalculate = () => {
    const bill = parseFloat(billAmount);
    const people = parseInt(numPeople);

    if (!isNaN(bill) && !isNaN(people) && people > 0) {
      const tip = (bill * tipPercentage) / 100;
      const total = bill + tip;
      const perPerson = total / people;

      setResult({ tip, total, perPerson });
    }
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercentage(18);
    setNumPeople('1');
    setResult(null);
  };

  const presetTips = [15, 18, 20, 25];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-tip-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="billAmount">Bill Amount</Label>
          <Input
            id="billAmount"
            type="number"
            placeholder="Enter bill amount"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label>Tip Percentage: {tipPercentage}%</Label>
          <div className="flex gap-2 flex-wrap">
            {presetTips.map((tip) => (
              <Button
                key={tip}
                variant={tipPercentage === tip ? 'primary' : 'secondary'}
                onClick={() => setTipPercentage(tip)}
                className="flex-1 min-w-[60px]"
              >
                {tip}%
              </Button>
            ))}
          </div>
          <Input
            type="number"
            placeholder="Custom percentage"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numPeople">Number of People</Label>
          <Input
            id="numPeople"
            type="number"
            placeholder="Enter number of people"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
          />
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleCalculate} className="flex-1">
            Calculate
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result !== null && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tip Amount:</p>
                <p className="text-2xl font-bold text-primary">${result.tip.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount:</p>
                <p className="text-2xl font-bold text-primary">${result.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Per Person:</p>
                <p className="text-2xl font-bold text-primary">${result.perPerson.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
