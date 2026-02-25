import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Calculator6() {
  const tool = ALL_TOOLS.find((t) => t.id === 'compound-interest-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('12'); // Monthly by default
  const [result, setResult] = useState<{ finalAmount: number; interestEarned: number } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n) && p > 0 && t > 0) {
      // Compound interest formula: A = P(1 + r/n)^(nt)
      const finalAmount = p * Math.pow(1 + r / n, n * t);
      const interestEarned = finalAmount - p;

      setResult({ finalAmount, interestEarned });
    }
  };

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setFrequency('12');
    setResult(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-compound-interest-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="principal">Initial Investment</Label>
          <Input
            id="principal"
            type="number"
            placeholder="Enter initial amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            step="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input
            id="rate"
            type="number"
            placeholder="Enter interest rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time Period (Years)</Label>
          <Input
            id="time"
            type="number"
            placeholder="Enter time in years"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label>Compounding Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="1">Annually</SelectItem>
              <SelectItem value="2">Semi-annually</SelectItem>
              <SelectItem value="4">Quarterly</SelectItem>
              <SelectItem value="12">Monthly</SelectItem>
              <SelectItem value="365">Daily</SelectItem>
            </SelectContent>
          </Select>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Final Amount:</p>
                <p className="text-2xl font-bold text-primary">${result.finalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interest Earned:</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${result.interestEarned.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground pt-4 border-t">
              <p>Your ${principal} investment will grow to ${result.finalAmount.toFixed(2)} over {time} years at {rate}% annual interest, compounded {frequency === '1' ? 'annually' : frequency === '2' ? 'semi-annually' : frequency === '4' ? 'quarterly' : frequency === '12' ? 'monthly' : 'daily'}.</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
