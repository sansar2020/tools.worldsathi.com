import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileCode, Layers, Database, Code2, AlertCircle, Info } from 'lucide-react';

export default function ToolArchitectureReference() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Tool Architecture Reference</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Technical reference documentation for tool file structure, naming conventions, TypeScript interfaces, 
            and ToolPageTemplate component usage patterns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* File Structure */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-6 w-6 text-purple-600" />
              File Structure Overview
            </CardTitle>
            <CardDescription>
              Where to place files and how they're organized in the project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Core Files for Tool Creation:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                    frontend/src/pages/tools/[category]/[ToolName].tsx
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 ml-4">
                    Your tool's React component. Category folders: calculators, converters, generators, 
                    analyzers, text-tools, developer-tools, image-tools, data-tools, seo-tools, 
                    productivity, finance-tools
                  </p>
                </div>

                <div>
                  <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                    frontend/src/constants/tools.ts
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 ml-4">
                    Tool metadata registry. Add your tool's information to the ALL_TOOLS array.
                  </p>
                </div>

                <div>
                  <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                    frontend/src/types/tools.ts
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 ml-4">
                    TypeScript type definitions for ToolMetadata and related interfaces.
                  </p>
                </div>

                <div>
                  <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                    frontend/src/App.tsx
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 ml-4">
                    Application router. Register your tool's route here for navigation.
                  </p>
                </div>

                <div>
                  <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
                    frontend/src/pages/tools/ToolPageTemplate.tsx
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 ml-4">
                    Reusable wrapper component that provides consistent layout for all tools.
                  </p>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Read-Only Files:</strong> Do not modify files in <code>frontend/src/components/ui/</code> 
                or <code>frontend/package.json</code>. These are managed by the build system.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Naming Conventions */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-purple-600" />
              Naming Conventions
            </CardTitle>
            <CardDescription>
              Standard naming patterns for files, components, and identifiers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Component Files</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Use PascalCase</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>BmiCalculator.tsx</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>CurrencyConverter.tsx</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">✗ Bad</Badge>
                    <code>bmi-calculator.tsx</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Tool IDs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Use kebab-case</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>bmi-calculator</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>currency-converter</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">✗ Bad</Badge>
                    <code>BmiCalculator</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">URL Paths</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Use kebab-case with category</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>/tools/calculators/bmi-calculator</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">✗ Bad</Badge>
                    <code>/tools/BmiCalculator</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Category IDs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Use kebab-case (plural)</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>calculators</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Good</Badge>
                    <code>developer-tools</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">✗ Bad</Badge>
                    <code>Calculator</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TypeScript Interfaces */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-purple-600" />
              TypeScript Interfaces
            </CardTitle>
            <CardDescription>
              Required type definitions from frontend/src/types/tools.ts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">ToolMetadata Interface:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export interface ToolMetadata {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  description: string;           // Short description for cards
  category: string;              // Category ID (must match categories.ts)
  icon: string;                  // Lucide icon name
  path: string;                  // URL path to tool
  tags: string[];                // Search keywords
  isNew?: boolean;               // Shows "New" badge
  featured?: boolean;            // Shows in featured section
  usabilitySteps?: string[];     // Step-by-step usage guide
  aboutContent?: AboutContent;   // Detailed information
  faqs?: FAQ[];                  // Frequently asked questions
  performanceMetrics?: PerformanceMetric[];
  apiInfo?: ApiInfo;
  gradientFilename?: string;     // Hero background image
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">AboutContent Interface:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export interface AboutContent {
  introduction: string;          // What the tool does
  keyFeatures: string[];         // List of main features
  whoBenefits: string[];         // Target audience
  whyChoose: string[];           // Unique selling points
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">FAQ Interface:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export interface FAQ {
  question: string;              // User question
  answer: string;                // Detailed answer
}`}
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Import Types:</strong> Import these interfaces with <code>import type &#123; ToolMetadata &#125; from '@/types/tools';</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* ToolPageTemplate Props */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-purple-600" />
              ToolPageTemplate Component
            </CardTitle>
            <CardDescription>
              Props and usage patterns for the tool wrapper component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Component Props:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`interface ToolPageTemplateProps {
  tool: ToolMetadata | undefined;  // Tool metadata object
  children: React.ReactNode;       // Your tool's UI
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Usage Example:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';

export default function MyTool() {
  // Find your tool in the registry
  const tool = ALL_TOOLS.find(t => t.id === 'my-tool');

  return (
    <ToolPageTemplate tool={tool}>
      {/* Your tool interface goes here */}
      <div className="space-y-4">
        {/* Inputs, buttons, results, etc. */}
      </div>
    </ToolPageTemplate>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What ToolPageTemplate Provides:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li>Hero section with gradient background and tool name</li>
                <li>Breadcrumb navigation (Home → Category → Tool)</li>
                <li>Main content area for your tool interface</li>
                <li>Usability guide section (if usabilitySteps provided)</li>
                <li>About section (if aboutContent provided)</li>
                <li>FAQs section (if faqs provided)</li>
                <li>Related tools section (automatically generated)</li>
                <li>Automatic tool usage tracking</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Automatic Features:</strong> The template handles breadcrumbs, related tools, and 
                usage tracking automatically. You only need to provide your tool's core functionality.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Standard Patterns */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-purple-600" />
              Standard Component Patterns
            </CardTitle>
            <CardDescription>
              Common patterns used across tool implementations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">State Management Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// Input states
const [input1, setInput1] = useState('');
const [input2, setInput2] = useState('');

// Result state
const [result, setResult] = useState<number | null>(null);

// Error state (optional)
const [error, setError] = useState<string>('');`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Calculation Handler Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const handleCalculate = () => {
  // Clear previous errors
  setError('');
  
  // Validate inputs
  if (!input1 || !input2) {
    setError('Please fill in all fields');
    return;
  }
  
  // Parse and validate
  const num1 = parseFloat(input1);
  const num2 = parseFloat(input2);
  
  if (isNaN(num1) || isNaN(num2)) {
    setError('Please enter valid numbers');
    return;
  }
  
  // Perform calculation
  const calculatedResult = num1 + num2;
  setResult(calculatedResult);
};`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Reset Handler Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const handleReset = () => {
  setInput1('');
  setInput2('');
  setResult(null);
  setError('');
};`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">UI Components Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

// Use in JSX:
<div className="space-y-4">
  <div>
    <Label htmlFor="input1">First Value</Label>
    <Input 
      id="input1"
      type="number"
      value={input1}
      onChange={(e) => setInput1(e.target.value)}
      placeholder="Enter value"
    />
  </div>
  
  <div className="flex gap-2">
    <Button onClick={handleCalculate}>Calculate</Button>
    <Button variant="outline" onClick={handleReset}>Reset</Button>
  </div>
</div>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="border-2 border-purple-200 bg-purple-50 dark:bg-purple-950">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100">Quick Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Tool Component:</strong> <code>frontend/src/pages/tools/[category]/[ToolName].tsx</code></p>
            <p><strong>Metadata:</strong> Add to <code>ALL_TOOLS</code> array in <code>frontend/src/constants/tools.ts</code></p>
            <p><strong>Route:</strong> Register in <code>frontend/src/App.tsx</code></p>
            <p><strong>Types:</strong> Import from <code>@/types/tools</code></p>
            <p><strong>Template:</strong> Wrap with <code>&lt;ToolPageTemplate tool=&#123;tool&#125;&gt;</code></p>
            <p><strong>UI Components:</strong> Import from <code>@/components/ui/*</code></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
