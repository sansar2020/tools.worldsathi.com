import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Converter4() {
  const tool = ALL_TOOLS.find((t) => t.id === 'timezone-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [dateTime, setDateTime] = useState<string>('');
  const [fromTimezone, setFromTimezone] = useState<string>('UTC');
  const [toTimezone, setToTimezone] = useState<string>('America/New_York');
  const [result, setResult] = useState<string | null>(null);

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: 0 },
    { value: 'America/New_York', label: 'EST/EDT (New York)', offset: -5 },
    { value: 'America/Chicago', label: 'CST/CDT (Chicago)', offset: -6 },
    { value: 'America/Denver', label: 'MST/MDT (Denver)', offset: -7 },
    { value: 'America/Los_Angeles', label: 'PST/PDT (Los Angeles)', offset: -8 },
    { value: 'Europe/London', label: 'GMT/BST (London)', offset: 0 },
    { value: 'Europe/Paris', label: 'CET/CEST (Paris)', offset: 1 },
    { value: 'Asia/Tokyo', label: 'JST (Tokyo)', offset: 9 },
    { value: 'Asia/Shanghai', label: 'CST (Shanghai)', offset: 8 },
    { value: 'Australia/Sydney', label: 'AEDT/AEST (Sydney)', offset: 10 },
  ];

  const handleConvert = () => {
    if (dateTime) {
      try {
        const date = new Date(dateTime);
        const formatted = date.toLocaleString('en-US', {
          timeZone: toTimezone,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        });
        setResult(formatted);
      } catch (error) {
        setResult('Invalid date/time');
      }
    }
  };

  const handleReset = () => {
    setDateTime('');
    setResult(null);
  };

  const faqs = [
    {
      question: 'Does this account for daylight saving time?',
      answer: 'Yes, the converter automatically accounts for daylight saving time changes in regions that observe it.'
    },
    {
      question: 'Can I convert times for future dates?',
      answer: 'Absolutely! You can convert times for any date, which is perfect for scheduling future meetings or events.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="category-converters-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dateTime">Date and Time</Label>
          <Input
            id="dateTime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From Timezone</Label>
            <Select value={fromTimezone} onValueChange={setFromTimezone}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To Timezone</Label>
            <Select value={toTimezone} onValueChange={setToTimezone}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {timezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleConvert} className="flex-1">
            Convert
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {result !== null && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Converted Time:</p>
            <p className="text-xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
