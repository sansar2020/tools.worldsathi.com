import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getToolById } from '@/constants/tools';
import { Calendar } from 'lucide-react';

type Operation = 'difference' | 'add' | 'subtract';

export default function DateCalculator() {
  const tool = getToolById('date-calculator');
  const [operation, setOperation] = useState<Operation>('difference');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState<string>('');

  const calculateDate = () => {
    if (operation === 'difference') {
      if (!date1 || !date2) return;
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const remainingDays = diffDays % 30;
      setResult(`${diffDays} days (${years} years, ${months} months, ${remainingDays} days)`);
    } else {
      if (!date1 || !days) return;
      const d1 = new Date(date1);
      const daysNum = parseInt(days);
      if (operation === 'add') {
        d1.setDate(d1.getDate() + daysNum);
      } else {
        d1.setDate(d1.getDate() - daysNum);
      }
      setResult(d1.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  };

  const handleReset = () => {
    setDate1('');
    setDate2('');
    setDays('');
    setResult('');
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('age-calculator'),
    getToolById('timezone-converter'),
    getToolById('percentage-calculator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-date-calculator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="operation">Operation</Label>
                <Select value={operation} onValueChange={(value) => setOperation(value as Operation)}>
                  <SelectTrigger id="operation" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="difference">Calculate Difference</SelectItem>
                    <SelectItem value="add">Add Days</SelectItem>
                    <SelectItem value="subtract">Subtract Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date1" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {operation === 'difference' ? 'First Date' : 'Start Date'}
                </Label>
                <Input
                  id="date1"
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="mt-2"
                />
              </div>

              {operation === 'difference' ? (
                <div>
                  <Label htmlFor="date2" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Second Date
                  </Label>
                  <Input
                    id="date2"
                    type="date"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    className="mt-2"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="days">Number of Days</Label>
                  <Input
                    id="days"
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="Enter number of days"
                    min="0"
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={calculateDate} className="flex-1 border-2 border-primary">
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
              <h3 className="text-lg font-semibold mb-2">Result</h3>
              <p className="text-2xl font-bold text-primary">{result}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
