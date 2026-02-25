import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ToolExamples() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Tool Examples</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Complete, working examples of different tool types with annotated code showing best practices 
            and common patterns. Learn by studying real implementations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
          <Lightbulb className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>How to Use These Examples:</strong> Each example shows a complete tool implementation 
            with both the React component code and metadata registration. Study the patterns, copy what you 
            need, and adapt for your own tools.
          </AlertDescription>
        </Alert>

        {/* Example 1: Simple Calculator */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-white">Simple</Badge>
                  Percentage Calculator
                </CardTitle>
                <CardDescription className="mt-2">
                  A basic calculator with two inputs, calculation logic, and result display. 
                  Perfect starting point for beginners.
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSection('calc1')}
              >
                {expandedSections['calc1'] ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections['calc1'] && (
            <CardContent className="space-y-4">
              <Tabs defaultValue="component">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="component">Component Code</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                <TabsContent value="component" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">File: frontend/src/pages/tools/Calculator1.tsx</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ALL_TOOLS } from '@/constants/tools';

export default function PercentageCalculator() {
  // 📌 State Management: Track user inputs and results
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // 📌 Calculation Logic: Core functionality
  const handleCalculate = () => {
    const num = parseFloat(value);
    const percent = parseFloat(percentage);
    
    // Validate inputs before calculating
    if (!isNaN(num) && !isNaN(percent)) {
      const calculatedResult = (num * percent) / 100;
      setResult(calculatedResult);
    }
  };

  // 📌 Reset Function: Clear all fields
  const handleReset = () => {
    setValue('');
    setPercentage('');
    setResult(null);
  };

  // 📌 Get Tool Metadata: Fetch from registry
  const tool = ALL_TOOLS.find(t => t.id === 'percentage-calculator');

  return (
    // 📌 ToolPageTemplate: Provides consistent layout
    <ToolPageTemplate tool={tool}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Input Fields */}
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>

            <div>
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleCalculate}>Calculate</Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>

            {/* Result Display */}
            {result !== null && (
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-lg font-semibold">
                  Result: {result.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {percentage}% of {value} = {result.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
}`}
                    </pre>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Key Patterns:</strong> Simple state with useState, input validation, 
                      clear result display, and proper reset functionality.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Add to: frontend/src/constants/tools.ts</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  id: 'percentage-calculator',
  name: 'Percentage Calculator',
  description: 'Calculate percentages, increases, and decreases instantly',
  category: 'calculators',
  icon: 'Percent',
  path: '/tools/calculators/percentage-calculator',
  tags: ['math', 'percentage', 'calculator', 'finance'],
  isNew: false,
  usabilitySteps: [
    'Enter the base value in the first input field',
    'Enter the percentage in the second field',
    'Click the "Calculate" button to see the result',
    'View the detailed breakdown of your calculation',
    'Use the Reset button to clear and start over'
  ],
  faqs: [
    { 
      question: 'How do I calculate percentage increase?', 
      answer: 'Enter the original value and the new value, then the calculator will show you the percentage change.' 
    },
    { 
      question: 'Is this tool free?', 
      answer: 'Yes, completely free with no registration required.' 
    }
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>

        {/* Example 2: Converter with Dropdowns */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white">Intermediate</Badge>
                  Currency Converter
                </CardTitle>
                <CardDescription className="mt-2">
                  Converter with dropdown selections, bidirectional conversion, and exchange rate display.
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSection('conv1')}
              >
                {expandedSections['conv1'] ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections['conv1'] && (
            <CardContent className="space-y-4">
              <Tabs defaultValue="component">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="component">Component Code</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                <TabsContent value="component" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">File: frontend/src/pages/tools/converters/CurrencyConverter.tsx</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ALL_TOOLS } from '@/constants/tools';

// 📌 Data Structure: Exchange rates relative to USD
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  INR: 74.5,
};

export default function CurrencyConverter() {
  // 📌 State: Amount and currency selections
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  // 📌 Conversion Logic: Multi-step calculation
  const handleConvert = () => {
    const num = parseFloat(amount);
    if (!isNaN(num)) {
      // Convert to USD first, then to target currency
      const inUSD = num / exchangeRates[fromCurrency];
      const converted = inUSD * exchangeRates[toCurrency];
      setResult(converted);
    }
  };

  // 📌 Swap Function: Switch currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const handleReset = () => {
    setAmount('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setResult(null);
  };

  const tool = ALL_TOOLS.find(t => t.id === 'currency-converter');

  return (
    <ToolPageTemplate tool={tool}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Amount Input */}
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            {/* Currency Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(exchangeRates).map(currency => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(exchangeRates).map(currency => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleConvert}>Convert</Button>
              <Button variant="outline" onClick={handleSwap}>Swap</Button>
              <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>

            {/* Result Display */}
            {result !== null && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-2xl font-bold">
                  {result.toFixed(2)} {toCurrency}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
}`}
                    </pre>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Key Patterns:</strong> Select dropdowns for options, swap functionality, 
                      data structure for conversion rates, multi-step calculations.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Add to: frontend/src/constants/tools.ts</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  id: 'currency-converter',
  name: 'Currency Converter',
  description: 'Convert between different currencies with real-time rates',
  category: 'converters',
  icon: 'DollarSign',
  path: '/tools/converters/currency-converter',
  tags: ['currency', 'converter', 'money', 'exchange'],
  usabilitySteps: [
    'Enter the amount to convert',
    'Select the currency to convert from',
    'Select the currency to convert to',
    'View the converted amount with exchange rate'
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>

        {/* Example 3: Generator */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white">Intermediate</Badge>
                  Password Generator
                </CardTitle>
                <CardDescription className="mt-2">
                  Generator with multiple options, checkboxes, and copy-to-clipboard functionality.
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSection('gen1')}
              >
                {expandedSections['gen1'] ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections['gen1'] && (
            <CardContent className="space-y-4">
              <Tabs defaultValue="component">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="component">Component Code</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                <TabsContent value="component" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Key Excerpt: frontend/src/pages/tools/Generator1.tsx</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export default function PasswordGenerator() {
  // 📌 State: Options and generated password
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  // 📌 Generation Logic: Build character set and generate
  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      alert('Please select at least one character type');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  // 📌 Copy to Clipboard: Modern clipboard API
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // Show toast notification (using sonner)
  };

  return (
    <div className="space-y-4">
      {/* Length Slider */}
      <div>
        <Label>Length: {length}</Label>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Checkboxes for Options */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="uppercase"
            checked={includeUppercase}
            onCheckedChange={setIncludeUppercase}
          />
          <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
        </div>
        {/* More checkboxes... */}
      </div>

      {/* Generate Button */}
      <Button onClick={generatePassword}>Generate Password</Button>

      {/* Result with Copy Button */}
      {password && (
        <div className="flex items-center gap-2 p-4 bg-gray-100 rounded">
          <code className="flex-1 font-mono">{password}</code>
          <Button size="sm" variant="outline" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}`}
                    </pre>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Key Patterns:</strong> Multiple boolean states with checkboxes, range slider 
                      for numeric input, string building logic, clipboard API integration.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Add to: frontend/src/constants/tools.ts</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  id: 'password-generator',
  name: 'Password Generator',
  description: 'Generate secure random passwords with custom options',
  category: 'generators',
  icon: 'Key',
  path: '/tools/generators/password-generator',
  tags: ['password', 'generator', 'security', 'random'],
  featured: true,
  usabilitySteps: [
    'Set your desired password length',
    'Choose character types to include',
    'Click Generate to create password',
    'Copy the password to your clipboard'
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>

        {/* Example 4: Analyzer */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-orange-600 text-white">Advanced</Badge>
                  Text Analyzer
                </CardTitle>
                <CardDescription className="mt-2">
                  Real-time analysis with multiple metrics, textarea input, and detailed statistics display.
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleSection('ana1')}
              >
                {expandedSections['ana1'] ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </CardHeader>
          {expandedSections['ana1'] && (
            <CardContent className="space-y-4">
              <Tabs defaultValue="component">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="component">Component Code</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                <TabsContent value="component" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Key Excerpt: frontend/src/pages/tools/analyzers/TextAnalyzer.tsx</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TextAnalyzer() {
  const [text, setText] = useState('');

  // 📌 Real-time Analysis: useMemo for performance
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\\n+/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(words / 200); // 200 words per minute

    return {
      chars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    };
  }, [text]);

  return (
    <div className="space-y-4">
      {/* Text Input */}
      <div>
        <Label>Enter your text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={10}
          className="font-mono"
        />
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.chars}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Words</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.words}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reading Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.readingTime} min</p>
          </CardContent>
        </Card>

        {/* More stat cards... */}
      </div>
    </div>
  );
}`}
                    </pre>
                  </div>

                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Key Patterns:</strong> useMemo for performance optimization, real-time updates, 
                      regex for text parsing, grid layout for statistics, textarea for multi-line input.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">Add to: frontend/src/constants/tools.ts</h4>
                    <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  id: 'text-analyzer',
  name: 'Text Analyzer',
  description: 'Analyze text for word count, character count, and reading time',
  category: 'analyzers',
  icon: 'FileText',
  path: '/tools/analyzers/text-analyzer',
  tags: ['text', 'analyzer', 'word-count', 'statistics'],
  usabilitySteps: [
    'Paste or type your text in the input area',
    'View real-time statistics as you type',
    'See character count, word count, and reading time',
    'Use the analysis for content planning'
  ]
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          )}
        </Card>

        {/* Summary Card */}
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100">Learning Path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>Start Simple:</strong> Begin with the Percentage Calculator pattern for basic tools.</p>
            <p><strong>Add Complexity:</strong> Move to Currency Converter when you need dropdowns and data structures.</p>
            <p><strong>Explore Options:</strong> Study Password Generator for checkbox-based configuration.</p>
            <p><strong>Master Performance:</strong> Learn from Text Analyzer for real-time updates and optimization.</p>
            <p className="pt-2 text-sm">
              Each example builds on concepts from the previous one. Copy, modify, and experiment to learn!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
