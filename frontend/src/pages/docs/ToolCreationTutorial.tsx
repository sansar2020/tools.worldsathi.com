import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Code, 
  FileCode, 
  Layers, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export default function ToolCreationTutorial() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Tool Creation Tutorial</h1>
          </div>
          <p className="text-xl text-teal-100 max-w-3xl">
            A comprehensive step-by-step guide for beginner developers to create and integrate new tools 
            into the Worldsathi Tools Portal. Learn the complete workflow from planning to deployment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Workflow Diagram */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-teal-600" />
              Tool Creation Workflow
            </CardTitle>
            <CardDescription>
              Visual overview of the complete tool creation process from idea to deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <img 
                src="/assets/generated/tool-creation-workflow.dim_1200x800.png" 
                alt="Tool Creation Workflow showing phases: Planning (idea validation, requirements), Design (UI sketching, data structure), Implementation (component creation, metadata registration, routing), Integration (testing, verification), and Deployment"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">Major Phases:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Planning:</strong> Validate your idea and gather requirements</li>
                <li><strong>Design:</strong> Sketch UI and plan data structures</li>
                <li><strong>Implementation:</strong> Create component, add metadata, register routes</li>
                <li><strong>Integration:</strong> Test functionality and verify all connections</li>
                <li><strong>Deployment:</strong> Build and deploy your tool to production</li>
              </ul>
              <p className="mt-3 text-xs italic">
                <strong>Decision Points:</strong> Choose between existing UI patterns vs. custom components, 
                and select appropriate tool categories based on functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Alert className="mb-8 border-teal-200 bg-teal-50 dark:bg-teal-950">
          <Lightbulb className="h-5 w-5 text-teal-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>Welcome!</strong> This tutorial is designed for beginner developers who want to create 
            new tools for the Worldsathi platform. We'll walk through every step with clear explanations 
            and examples. No prior experience with the codebase is required!
          </AlertDescription>
        </Alert>

        {/* Step 1: Planning */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 1</Badge>
                Planning Your Tool
              </CardTitle>
              <CheckCircle className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Before writing any code, plan what your tool will do and how users will interact with it.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                What to Define:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><strong>Purpose:</strong> What problem does your tool solve? (e.g., "Calculate BMI from height and weight")</li>
                <li><strong>Inputs:</strong> What information does the user need to provide? (e.g., weight, height, unit system)</li>
                <li><strong>Outputs:</strong> What results will the tool display? (e.g., BMI value, health category, recommendations)</li>
                <li><strong>Category:</strong> Which category fits best? (calculators, converters, generators, analyzers, etc.)</li>
                <li><strong>User Flow:</strong> How will users interact with your tool step-by-step?</li>
              </ul>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Why this matters:</strong> Clear planning prevents confusion later. It helps you 
                choose the right UI components and ensures your tool meets user needs.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: File Structure Setup */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 2</Badge>
                Set Up File Structure
              </CardTitle>
              <FileCode className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Create your tool component file in the correct location based on its category.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">File Location Pattern:</h4>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mb-3">
                frontend/src/pages/tools/[category]/[ToolName].tsx
              </code>
              
              <h4 className="font-semibold mb-2 mt-4">Examples by Category:</h4>
              <ul className="list-none space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>Calculators:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">frontend/src/pages/tools/calculators/BmiCalculator.tsx</code></li>
                <li>• <strong>Converters:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">frontend/src/pages/tools/converters/CurrencyConverter.tsx</code></li>
                <li>• <strong>Generators:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">frontend/src/pages/tools/generators/PasswordGenerator.tsx</code></li>
                <li>• <strong>Analyzers:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">frontend/src/pages/tools/analyzers/TextAnalyzer.tsx</code></li>
              </ul>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Naming Convention:</strong> Use PascalCase for component files (e.g., BmiCalculator.tsx, 
                not bmi-calculator.tsx). The file name should match the component name inside.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: Create Component */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 3</Badge>
                Create the React Component
              </CardTitle>
              <Code className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Build your tool's user interface using React and the ToolPageTemplate wrapper.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Basic Component Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ALL_TOOLS } from '@/constants/tools';

export default function MyCalculator() {
  // 1. State for inputs and results
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // 2. Calculation logic
  const handleCalculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResult(num1 + num2); // Your calculation here
    }
  };

  // 3. Reset function
  const handleReset = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  // 4. Get tool metadata
  const tool = ALL_TOOLS.find(t => t.id === 'my-calculator');

  return (
    <ToolPageTemplate tool={tool}>
      {/* Your tool UI goes here */}
      <div className="space-y-4">
        <div>
          <Label>First Value</Label>
          <Input 
            type="number" 
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleCalculate}>Calculate</Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>

        {result !== null && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p>Result: {result}</p>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}`}
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Key Concepts:</strong> Use <code>useState</code> for managing input values and results. 
                The <code>ToolPageTemplate</code> component wraps your tool and provides consistent layout, 
                breadcrumbs, and sections for FAQs and related tools.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 4: Add Metadata */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 4</Badge>
                Register Tool Metadata
              </CardTitle>
              <FileCode className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Add your tool's information to the tools catalog so it appears in listings and search.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">File to Edit:</h4>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mb-3">
                frontend/src/constants/tools.ts
              </code>

              <h4 className="font-semibold mb-2 mt-4">Add to ALL_TOOLS Array:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  id: 'my-calculator',  // Unique kebab-case ID
  name: 'My Calculator',  // Display name
  description: 'Calculate something useful quickly',
  category: 'calculators',  // Must match a category ID
  icon: 'Calculator',  // Lucide icon name
  path: '/tools/calculators/my-calculator',
  tags: ['calculator', 'math', 'utility'],
  isNew: true,  // Shows "New" badge
  usabilitySteps: [
    'Enter your first value',
    'Enter your second value',
    'Click Calculate to see the result',
    'Use Reset to start over'
  ],
  faqs: [
    { 
      question: 'How does this work?', 
      answer: 'It performs the calculation using...' 
    }
  ]
}`}
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> The <code>id</code> must be unique and match what you use in 
                your component. The <code>path</code> must match the route you'll register in Step 5.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 5: Register Route */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 5</Badge>
                Register the Route
              </CardTitle>
              <Layers className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Add your tool to the application's routing system so users can navigate to it.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">File to Edit:</h4>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded block mb-3">
                frontend/src/App.tsx
              </code>

              <h4 className="font-semibold mb-2 mt-4">Step 5a: Import Your Component (at top of file)</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto mb-3">
{`const MyCalculator = lazy(() => import('./pages/tools/calculators/MyCalculator'));`}
              </pre>

              <h4 className="font-semibold mb-2">Step 5b: Create Route (with other routes)</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const myCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/my-calculator',
  component: MyCalculator,
});`}
              </pre>

              <h4 className="font-semibold mb-2 mt-4">Step 5c: Add to Route Tree (in routeTree array)</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const routeTree = rootRoute.addChildren([
  // ... other routes ...
  myCalculatorRoute,  // Add your route here
]);`}
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Path Matching:</strong> The route path must exactly match the path in your tool 
                metadata. Use lazy loading for better performance.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 6: Test */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white">Step 6</Badge>
                Test Your Tool
              </CardTitle>
              <CheckCircle className="h-6 w-6 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Verify that everything works correctly before considering your tool complete.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Testing Checklist:</h4>
              <ul className="list-none space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Tool appears in the correct category page</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Tool is searchable from the homepage search bar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Direct URL navigation works (e.g., /tools/calculators/my-calculator)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Breadcrumbs display correctly at the top</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Icon displays properly (not showing fallback icon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>All inputs accept user data correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Calculate button produces correct results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Reset button clears all fields</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Tool works on mobile devices (responsive design)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>FAQs section displays if provided</span>
                </li>
              </ul>
            </div>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Pro Tip:</strong> Test with invalid inputs (empty fields, negative numbers, etc.) 
                to ensure your tool handles errors gracefully.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-2 border-teal-200 bg-teal-50 dark:bg-teal-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
              <Lightbulb className="h-6 w-6" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>Congratulations! You've learned the complete tool creation workflow. Here's what to explore next:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><a href="/docs/tool-architecture-reference" className="text-teal-600 hover:underline">Tool Architecture Reference</a> - Deep dive into file structure and interfaces</li>
              <li><a href="/docs/tool-examples" className="text-teal-600 hover:underline">Tool Examples</a> - Study complete implementations of different tool types</li>
              <li><a href="/docs/tool-integration-checklist" className="text-teal-600 hover:underline">Integration Checklist</a> - Detailed verification steps</li>
              <li><a href="/docs/tool-best-practices" className="text-teal-600 hover:underline">Best Practices</a> - Code quality and accessibility guidelines</li>
              <li><a href="/docs/tool-troubleshooting" className="text-teal-600 hover:underline">Troubleshooting</a> - Solutions for common problems</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
