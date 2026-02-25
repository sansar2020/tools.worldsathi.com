import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Calculator3() {
  const tool = ALL_TOOLS.find((t) => t.id === 'bmi-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<string>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!isNaN(w) && !isNaN(h) && h > 0) {
      let bmiValue: number;
      
      if (unit === 'metric') {
        // BMI = weight (kg) / (height (m))^2
        const heightInMeters = h / 100;
        bmiValue = w / (heightInMeters * heightInMeters);
      } else {
        // BMI = (weight (lbs) / (height (inches))^2) * 703
        bmiValue = (w / (h * h)) * 703;
      }

      setBmi(bmiValue);

      // Determine category
      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  const getCategoryColor = () => {
    if (category === 'Underweight') return 'text-blue-600 dark:text-blue-400';
    if (category === 'Normal weight') return 'text-green-600 dark:text-green-400';
    if (category === 'Overweight') return 'text-orange-600 dark:text-orange-400';
    if (category === 'Obese') return 'text-red-600 dark:text-red-400';
    return '';
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-bmi-calculator-gradient.dim_1200x300.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Unit System</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
          <Input
            id="weight"
            type="number"
            placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
          <Input
            id="height"
            type="number"
            placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={calculateBMI} className="flex-1">
            Calculate BMI
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {bmi !== null && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your BMI:</p>
              <p className="text-3xl font-bold text-primary">{bmi.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Category:</p>
              <p className={`text-2xl font-semibold ${getCategoryColor()}`}>{category}</p>
            </div>
            <div className="text-sm text-muted-foreground pt-4 border-t">
              <p className="font-medium mb-2">BMI Categories:</p>
              <ul className="space-y-1">
                <li>• Underweight: BMI &lt; 18.5</li>
                <li>• Normal weight: BMI 18.5 - 24.9</li>
                <li>• Overweight: BMI 25 - 29.9</li>
                <li>• Obese: BMI ≥ 30</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
