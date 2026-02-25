import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Calculator7() {
  const tool = ALL_TOOLS.find((t) => t.id === 'calorie-calculator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.55');
  const [result, setResult] = useState<{ maintenance: number; weightLoss: number; weightGain: number } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (!isNaN(w) && w > 0 && !isNaN(h) && h > 0 && !isNaN(a) && a > 0) {
      let bmr: number;
      
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }

      const maintenance = bmr * activity;
      const weightLoss = maintenance - 500;
      const weightGain = maintenance + 500;

      setResult({
        maintenance,
        weightLoss,
        weightGain,
      });
    }
  };

  const handleReset = () => {
    setAge('');
    setGender('male');
    setWeight('');
    setHeight('');
    setActivityLevel('1.55');
    setResult(null);
  };

  const faqs = [
    {
      question: 'How accurate is this calorie calculator?',
      answer: 'This calculator uses the Mifflin-St Jeor equation, one of the most accurate formulas for estimating calorie needs.'
    },
    {
      question: 'What activity level should I choose?',
      answer: 'Choose based on your typical week: Sedentary (desk job, little exercise), Lightly Active (light exercise 1-3 days/week), Moderately Active (moderate exercise 3-5 days/week), Very Active (hard exercise 6-7 days/week), or Extra Active (very hard exercise, physical job).'
    },
    {
      question: 'How many calories should I cut to lose weight?',
      answer: 'A deficit of 500 calories per day typically results in about 1 pound of weight loss per week, which is considered safe and sustainable.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="category-calculators-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="Enter your height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="1"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label>Activity Level</Label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="1.375">Lightly active (1-3 days/week)</SelectItem>
              <SelectItem value="1.55">Moderately active (3-5 days/week)</SelectItem>
              <SelectItem value="1.725">Very active (6-7 days/week)</SelectItem>
              <SelectItem value="1.9">Extra active (athlete)</SelectItem>
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
          <div className="space-y-4 p-6 bg-primary/10 border-2 border-primary rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Maintenance Calories:</p>
              <p className="text-3xl font-bold text-primary">{Math.round(result.maintenance)} cal/day</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Weight Loss:</p>
                <p className="text-xl font-semibold text-success">{Math.round(result.weightLoss)} cal/day</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight Gain:</p>
                <p className="text-xl font-semibold text-accent">{Math.round(result.weightGain)} cal/day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
