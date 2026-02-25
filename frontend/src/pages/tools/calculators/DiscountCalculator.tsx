import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Percent, DollarSign, TrendingDown } from 'lucide-react';

export default function DiscountCalculator() {
  const tool = getToolById('discount-calculator');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
    savings: number;
  } | null>(null);
  const [errors, setErrors] = useState<{
    originalPrice?: string;
    discountPercentage?: string;
  }>({});

  useEffect(() => {
    // Real-time calculation
    if (originalPrice && discountPercentage) {
      calculateDiscount();
    } else {
      setResult(null);
    }
  }, [originalPrice, discountPercentage]);

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (!originalPrice || isNaN(price) || price <= 0) {
      newErrors.originalPrice = 'Please enter a valid positive price';
    }

    if (!discountPercentage || isNaN(discount) || discount < 0 || discount > 100) {
      newErrors.discountPercentage = 'Please enter a discount between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDiscount = () => {
    if (!validateInputs()) {
      setResult(null);
      return;
    }

    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    const savings = discountAmount;

    setResult({
      discountAmount,
      finalPrice,
      savings,
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setResult(null);
    setErrors({});
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('percentage-calculator'),
    getToolById('percentage-change-calculator'),
    getToolById('tip-calculator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-discount-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="originalPrice" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Original Price
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`pl-7 ${errors.originalPrice ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.originalPrice && (
                  <p className="text-xs text-destructive mt-1">{errors.originalPrice}</p>
                )}
              </div>

              <div>
                <Label htmlFor="discountPercentage" className="flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Discount Percentage
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="1"
                    className={`pr-7 ${errors.discountPercentage ? 'border-destructive' : ''}`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
                {errors.discountPercentage && (
                  <p className="text-xs text-destructive mt-1">{errors.discountPercentage}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={calculateDiscount}
                  disabled={!originalPrice || !discountPercentage}
                  className="flex-1 border-2 border-primary"
                >
                  Calculate
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                Discount Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="text-sm text-muted-foreground mb-1">Discount Amount</div>
                  <div className="text-2xl font-bold text-destructive">
                    {formatCurrency(result.discountAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {discountPercentage}% off
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border-2 border-primary">
                  <div className="text-sm text-muted-foreground mb-1">Final Price</div>
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(result.finalPrice)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    After discount
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <div className="text-sm text-muted-foreground mb-1">You Save</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                    {formatCurrency(result.savings)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Total savings
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-background rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span className="font-semibold">{formatCurrency(parseFloat(originalPrice))}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Discount ({discountPercentage}%):</span>
                  <span className="font-semibold text-destructive">
                    -{formatCurrency(result.discountAmount)}
                  </span>
                </div>
                <div className="border-t border-border my-2" />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Final Price:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(result.finalPrice)}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Calculation:</strong> Discount Amount = Original Price × (Discount % ÷ 100) | Final Price =
                  Original Price - Discount Amount
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
