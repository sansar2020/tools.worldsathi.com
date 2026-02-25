import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { DollarSign, ArrowRightLeft, TrendingUp } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
];

// Exchange rates relative to USD (hardcoded for now)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  SGD: 1.34,
};

export default function CurrencyConverter() {
  const tool = getToolById('currency-converter');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      convertCurrency();
    } else {
      setResult(null);
      setExchangeRate(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      setResult(null);
      setExchangeRate(null);
      return;
    }

    // Convert from source currency to USD, then to target currency
    const amountInUSD = amountNum / EXCHANGE_RATES[fromCurrency];
    const convertedAmount = amountInUSD * EXCHANGE_RATES[toCurrency];
    const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency];

    setResult(convertedAmount);
    setExchangeRate(rate);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ' ' + (currency?.symbol || currencyCode);
  };

  const handleReset = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setResult(null);
    setExchangeRate(null);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('unit-converter'),
    getToolById('percentage-calculator'),
    getToolById('discount-calculator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-currency-converter-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                <div>
                  <Label htmlFor="fromCurrency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger id="fromCurrency" className="mt-2 bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={swapCurrencies}
                  variant="outline"
                  size="icon"
                  className="border-2 mb-0 md:mb-0"
                  title="Swap currencies"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>

                <div>
                  <Label htmlFor="toCurrency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger id="toCurrency" className="mt-2 bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
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

        {result !== null && exchangeRate !== null && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Conversion Result
              </h3>
              
              <div className="p-6 bg-background rounded-lg border-2 border-primary mb-4">
                <div className="text-sm text-muted-foreground mb-2">Converted Amount</div>
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(result, toCurrency)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  From {formatCurrency(parseFloat(amount), fromCurrency)}
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg border-2 border-border">
                <div className="text-sm text-muted-foreground mb-1">Exchange Rate</div>
                <div className="text-lg font-semibold">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Rates are indicative and for reference only
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Note:</strong> Exchange rates are hardcoded for demonstration purposes. For real-time rates,
                  please consult a financial service provider or bank.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
