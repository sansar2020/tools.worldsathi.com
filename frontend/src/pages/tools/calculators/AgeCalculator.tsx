import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Calendar, Cake } from 'lucide-react';

export default function AgeCalculator() {
  const tool = getToolById('age-calculator');
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    nextBirthday: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      nextBirthday: nextBirthday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      daysUntilBirthday,
    });
  };

  const handleReset = () => {
    setBirthDate('');
    setResult(null);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('date-calculator'),
    getToolById('bmi-calculator'),
    getToolById('calorie-calculator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-age-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="birthDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={calculateAge} disabled={!birthDate} className="flex-1 border-2 border-primary">
                  Calculate Age
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
                <Cake className="h-5 w-5 text-primary" />
                Your Age
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-primary">{result.years}</div>
                  <div className="text-sm text-muted-foreground">Years</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-primary">{result.months}</div>
                  <div className="text-sm text-muted-foreground">Months</div>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="text-3xl font-bold text-primary">{result.days}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Next Birthday</div>
                    <div className="text-sm text-muted-foreground">{result.nextBirthday}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{result.daysUntilBirthday}</div>
                    <div className="text-sm text-muted-foreground">days to go</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
