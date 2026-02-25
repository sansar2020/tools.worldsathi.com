import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Calculator5() {
  const tool = ALL_TOOLS.find((t) => t.id === 'loan-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [result, setResult] = useState<{ monthly: number; total: number; totalInterest: number } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of payments

    if (!isNaN(p) && !isNaN(r) && !isNaN(n) && p > 0 && r > 0 && n > 0) {
      // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const totalInterest = total - p;

      setResult({ monthly, total, totalInterest });
    }
  };

  const handleReset = () => {
    setPrincipal('');
    setInterestRate('');
    setYears('');
    setResult(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-loan-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount (Principal)</Label>
          <Input
            id="principal"
            type="number"
            placeholder="Enter loan amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            step="1000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="years">Loan Term (Years)</Label>
          <Input
            id="years"
            type="number"
            placeholder="Enter loan term"
            value={years}
            onChange={(e) => setYears(e.target.value)}
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
                <p className="text-sm text-muted-foreground mb-1">Monthly Payment:</p>
                <p className="text-2xl font-bold text-primary">${result.monthly.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Payment:</p>
                <p className="text-2xl font-bold text-primary">${result.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Interest:</p>
                <p className="text-2xl font-bold text-primary">${result.totalInterest.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground pt-4 border-t">
              <p>Over {years} years, you will pay ${result.totalInterest.toFixed(2)} in interest on a ${principal} loan at {interestRate}% annual interest.</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
