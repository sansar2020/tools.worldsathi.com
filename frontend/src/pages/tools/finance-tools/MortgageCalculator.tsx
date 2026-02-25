import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

const MortgageCalculator: React.FC = () => {
  const tool = ALL_TOOLS.find(t => t.id === 'mortgage-calculator');
  const relatedTools = tool ? getRelatedTools(tool.id, ALL_TOOLS, 3) : [];
  
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handleCalculate = () => {
    setError('');
    setResults(null);

    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const t = parseFloat(loanTerm);

    if (!principal || !interestRate || !loanTerm) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(p) || p <= 0) {
      setError('Principal amount must be a positive number');
      return;
    }

    if (isNaN(r) || r < 0) {
      setError('Interest rate must be a non-negative number');
      return;
    }

    if (isNaN(t) || t <= 0) {
      setError('Loan term must be a positive number');
      return;
    }

    // Calculate monthly payment using amortization formula
    // M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyRate = r / 100 / 12;
    const numberOfPayments = t * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      // If interest rate is 0, simple division
      monthlyPayment = p / numberOfPayments;
    } else {
      const numerator = p * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      monthlyPayment = numerator / denominator;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - p;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest
    });
  };

  const faqs = [
    {
      question: 'How is monthly mortgage payment calculated?',
      answer: 'We use the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], where M is monthly payment, P is principal, r is monthly interest rate, and n is number of payments.'
    },
    {
      question: 'What is amortization?',
      answer: 'Amortization is the process of paying off a loan through regular payments over time. Each payment covers both principal and interest, with the proportion changing over the loan term.'
    },
    {
      question: 'How does interest rate affect my payment?',
      answer: 'Higher interest rates result in higher monthly payments and more total interest paid over the life of the loan. Even small rate differences can significantly impact total costs.'
    },
    {
      question: 'Should I choose a 15-year or 30-year mortgage?',
      answer: '15-year mortgages have higher monthly payments but lower total interest. 30-year mortgages have lower monthly payments but higher total interest. Choose based on your budget and financial goals.'
    },
    {
      question: 'What other costs should I consider besides the mortgage payment?',
      answer: 'Consider property taxes, homeowners insurance, HOA fees, maintenance costs, and utilities. These can add significantly to your monthly housing expenses.'
    }
  ];

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <ToolPageTemplate 
      tool={tool}
      gradientFilename="category-finance-tools-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Calculate Mortgage Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Principal Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="e.g., 300000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              min="0"
              step="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              placeholder="e.g., 4.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-term">Loan Term (Years)</Label>
            <Input
              id="loan-term"
              type="number"
              placeholder="e.g., 30"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              min="1"
              step="1"
            />
          </div>

          <Button 
            onClick={handleCalculate} 
            variant="primary"
            className="w-full"
          >
            Calculate Payment
          </Button>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {results && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-lg">Results</h3>
              
              <div className="grid gap-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(results.monthlyPayment)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(results.totalPayment)}
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground pt-2">
                <p>
                  Over {loanTerm} years, you will make {parseFloat(loanTerm) * 12} payments 
                  totaling {formatCurrency(results.totalPayment)}.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">About the Calculation</h3>
            <p className="text-sm text-muted-foreground">
              This calculator uses the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1], 
              where M is the monthly payment, P is the principal, r is the monthly interest rate, 
              and n is the number of payments.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
};

export default MortgageCalculator;
