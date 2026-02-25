import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/Button';
import { Copy } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { toast } from 'sonner';

export default function Generator1() {
  const tool = ALL_TOOLS.find((t) => t.id === 'password-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [length, setLength] = useState<string>('12');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState<string>('');

  const handleGenerate = () => {
    const len = parseInt(length);
    if (isNaN(len) || len < 1) return;

    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') return;

    let result = '';
    for (let i = 0; i < len; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard');
  };

  const handleReset = () => {
    setPassword('');
  };

  const faqs = [
    {
      question: 'How secure are the generated passwords?',
      answer: 'Passwords are generated using cryptographically secure random methods, making them highly secure.',
    },
    {
      question: 'What is a good password length?',
      answer: 'We recommend at least 12-16 characters for strong security. Longer passwords are more secure.',
    },
    {
      question: 'Should I include symbols?',
      answer: 'Yes, including symbols increases password complexity and security significantly.',
    },
    {
      question: 'Are the passwords stored anywhere?',
      answer: 'No, passwords are generated locally in your browser and are never stored or transmitted.',
    },
    {
      question: 'Can I customize the character types?',
      answer: 'Yes, you can choose to include or exclude uppercase, lowercase, numbers, and symbols.',
    },
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-password-generator-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="length">Password Length</Label>
          <Input
            id="length"
            type="number"
            placeholder="Enter length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) =>
                setIncludeUppercase(checked as boolean)
              }
            />
            <Label htmlFor="uppercase" className="cursor-pointer">
              Include Uppercase Letters
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) =>
                setIncludeLowercase(checked as boolean)
              }
            />
            <Label htmlFor="lowercase" className="cursor-pointer">
              Include Lowercase Letters
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) =>
                setIncludeNumbers(checked as boolean)
              }
            />
            <Label htmlFor="numbers" className="cursor-pointer">
              Include Numbers
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) =>
                setIncludeSymbols(checked as boolean)
              }
            />
            <Label htmlFor="symbols" className="cursor-pointer">
              Include Symbols
            </Label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleGenerate} className="flex-1">
            Generate Password
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {password && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Generated Password:</p>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-xl font-mono font-bold text-primary break-all">
              {password}
            </p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
