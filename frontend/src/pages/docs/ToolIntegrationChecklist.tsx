import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, AlertTriangle, FileCode, Route, Search, Eye } from 'lucide-react';

export default function ToolIntegrationChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Tool Integration Checklist</h1>
          </div>
          <p className="text-xl text-amber-100 max-w-3xl">
            Step-by-step verification checklist to ensure your tool is properly integrated into the 
            Worldsathi platform. Follow each step and verify completion before moving to the next.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> Complete each step in order. Skipping steps may cause your tool 
            to not appear in listings or fail to load properly.
          </AlertDescription>
        </Alert>

        {/* Step 1: Metadata */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">Step 1</Badge>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-6 w-6 text-amber-600" />
                  Add Tool Metadata
                </CardTitle>
                <CardDescription className="mt-1">
                  Register your tool in the tools catalog with all required fields
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">File: frontend/src/constants/tools.ts</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-1" 
                    checked={checkedItems['meta-1']}
                    onCheckedChange={() => toggleCheck('meta-1')}
                  />
                  <label htmlFor="meta-1" className="text-sm cursor-pointer">
                    <strong>Add tool object to ALL_TOOLS array</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Insert your tool metadata in the appropriate category section
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-2" 
                    checked={checkedItems['meta-2']}
                    onCheckedChange={() => toggleCheck('meta-2')}
                  />
                  <label htmlFor="meta-2" className="text-sm cursor-pointer">
                    <strong>Set unique ID in kebab-case</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Example: 'my-calculator' (not 'MyCalculator' or 'my_calculator')
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-3" 
                    checked={checkedItems['meta-3']}
                    onCheckedChange={() => toggleCheck('meta-3')}
                  />
                  <label htmlFor="meta-3" className="text-sm cursor-pointer">
                    <strong>Verify category ID matches categories.ts</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Must be one of: calculators, converters, generators, analyzers, text-tools, 
                      developer-tools, image-tools, data-tools, seo-tools, productivity, finance-tools
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-4" 
                    checked={checkedItems['meta-4']}
                    onCheckedChange={() => toggleCheck('meta-4')}
                  />
                  <label htmlFor="meta-4" className="text-sm cursor-pointer">
                    <strong>Set path matching route pattern</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Format: /tools/[category]/[tool-slug] (e.g., /tools/calculators/my-calculator)
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-5" 
                    checked={checkedItems['meta-5']}
                    onCheckedChange={() => toggleCheck('meta-5')}
                  />
                  <label htmlFor="meta-5" className="text-sm cursor-pointer">
                    <strong>Verify icon name is valid Lucide icon</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Check <a href="https://lucide.dev" target="_blank" rel="noopener" className="text-amber-600 hover:underline">lucide.dev</a> for available icon names
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-6" 
                    checked={checkedItems['meta-6']}
                    onCheckedChange={() => toggleCheck('meta-6')}
                  />
                  <label htmlFor="meta-6" className="text-sm cursor-pointer">
                    <strong>Add at least 3 relevant tags</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Tags improve searchability (e.g., ['calculator', 'math', 'percentage'])
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="meta-7" 
                    checked={checkedItems['meta-7']}
                    onCheckedChange={() => toggleCheck('meta-7')}
                  />
                  <label htmlFor="meta-7" className="text-sm cursor-pointer">
                    <strong>Include usabilitySteps array (3-5 steps)</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Clear instructions for users on how to use your tool
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Common Mistake:</strong> Using incorrect category ID. The category must exactly 
                match one defined in frontend/src/constants/categories.ts
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: Component */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">Step 2</Badge>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-6 w-6 text-amber-600" />
                  Create Component File
                </CardTitle>
                <CardDescription className="mt-1">
                  Build your tool component in the correct location
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">File: frontend/src/pages/tools/[category]/[ToolName].tsx</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-1" 
                    checked={checkedItems['comp-1']}
                    onCheckedChange={() => toggleCheck('comp-1')}
                  />
                  <label htmlFor="comp-1" className="text-sm cursor-pointer">
                    <strong>Create file in correct category folder</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Example: frontend/src/pages/tools/calculators/MyCalculator.tsx
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-2" 
                    checked={checkedItems['comp-2']}
                    onCheckedChange={() => toggleCheck('comp-2')}
                  />
                  <label htmlFor="comp-2" className="text-sm cursor-pointer">
                    <strong>Use PascalCase for file name</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      File name should match component name (e.g., MyCalculator.tsx exports MyCalculator)
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-3" 
                    checked={checkedItems['comp-3']}
                    onCheckedChange={() => toggleCheck('comp-3')}
                  />
                  <label htmlFor="comp-3" className="text-sm cursor-pointer">
                    <strong>Import and use ToolPageTemplate</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Wrap your tool UI with &lt;ToolPageTemplate tool=&#123;tool&#125;&gt;
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-4" 
                    checked={checkedItems['comp-4']}
                    onCheckedChange={() => toggleCheck('comp-4')}
                  />
                  <label htmlFor="comp-4" className="text-sm cursor-pointer">
                    <strong>Fetch tool metadata using ALL_TOOLS.find()</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      const tool = ALL_TOOLS.find(t =&gt; t.id === 'your-tool-id');
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-5" 
                    checked={checkedItems['comp-5']}
                    onCheckedChange={() => toggleCheck('comp-5')}
                  />
                  <label htmlFor="comp-5" className="text-sm cursor-pointer">
                    <strong>Implement Calculate and Reset functions</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Both functions should work correctly and clear all state
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="comp-6" 
                    checked={checkedItems['comp-6']}
                    onCheckedChange={() => toggleCheck('comp-6')}
                  />
                  <label htmlFor="comp-6" className="text-sm cursor-pointer">
                    <strong>Add input validation and error handling</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Check for empty fields, invalid numbers, and edge cases
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Routing */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">Step 3</Badge>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-6 w-6 text-amber-600" />
                  Register Route
                </CardTitle>
                <CardDescription className="mt-1">
                  Add your tool to the application router
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">File: frontend/src/App.tsx</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="route-1" 
                    checked={checkedItems['route-1']}
                    onCheckedChange={() => toggleCheck('route-1')}
                  />
                  <label htmlFor="route-1" className="text-sm cursor-pointer">
                    <strong>Add lazy import at top of file</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      const MyTool = lazy(() =&gt; import('./pages/tools/category/MyTool'));
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="route-2" 
                    checked={checkedItems['route-2']}
                    onCheckedChange={() => toggleCheck('route-2')}
                  />
                  <label htmlFor="route-2" className="text-sm cursor-pointer">
                    <strong>Create route with createRoute()</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Define route with correct path and component reference
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="route-3" 
                    checked={checkedItems['route-3']}
                    onCheckedChange={() => toggleCheck('route-3')}
                  />
                  <label htmlFor="route-3" className="text-sm cursor-pointer">
                    <strong>Verify path matches metadata path exactly</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Path in App.tsx must match path in tools.ts
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="route-4" 
                    checked={checkedItems['route-4']}
                    onCheckedChange={() => toggleCheck('route-4')}
                  />
                  <label htmlFor="route-4" className="text-sm cursor-pointer">
                    <strong>Add route to routeTree array</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Include your route in the children array of rootRoute
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Common Mistake:</strong> Path mismatch between metadata and route. Both must be 
                identical including category folder name.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 4: Verification */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge className="bg-amber-600 text-white">Step 4</Badge>
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-amber-600" />
                  Verify Integration
                </CardTitle>
                <CardDescription className="mt-1">
                  Test that everything works correctly
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Testing Checklist:</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-1" 
                    checked={checkedItems['verify-1']}
                    onCheckedChange={() => toggleCheck('verify-1')}
                  />
                  <label htmlFor="verify-1" className="text-sm cursor-pointer">
                    <strong>Tool appears in category page</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Navigate to /category/[your-category] and verify your tool card is visible
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-2" 
                    checked={checkedItems['verify-2']}
                    onCheckedChange={() => toggleCheck('verify-2')}
                  />
                  <label htmlFor="verify-2" className="text-sm cursor-pointer">
                    <strong>Direct URL navigation works</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Type your tool's full URL in browser and verify it loads
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-3" 
                    checked={checkedItems['verify-3']}
                    onCheckedChange={() => toggleCheck('verify-3')}
                  />
                  <label htmlFor="verify-3" className="text-sm cursor-pointer">
                    <strong>Tool is searchable from homepage</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Search for your tool name or tags in the homepage search bar
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-4" 
                    checked={checkedItems['verify-4']}
                    onCheckedChange={() => toggleCheck('verify-4')}
                  />
                  <label htmlFor="verify-4" className="text-sm cursor-pointer">
                    <strong>Breadcrumbs display correctly</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Check that breadcrumb shows: Home → Category → Tool Name
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-5" 
                    checked={checkedItems['verify-5']}
                    onCheckedChange={() => toggleCheck('verify-5')}
                  />
                  <label htmlFor="verify-5" className="text-sm cursor-pointer">
                    <strong>Icon displays (not fallback)</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Verify your chosen icon appears, not the default wrench icon
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-6" 
                    checked={checkedItems['verify-6']}
                    onCheckedChange={() => toggleCheck('verify-6')}
                  />
                  <label htmlFor="verify-6" className="text-sm cursor-pointer">
                    <strong>Calculate button works correctly</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Test with valid inputs and verify correct results
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-7" 
                    checked={checkedItems['verify-7']}
                    onCheckedChange={() => toggleCheck('verify-7')}
                  />
                  <label htmlFor="verify-7" className="text-sm cursor-pointer">
                    <strong>Reset button clears all fields</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Verify all inputs and results are cleared on reset
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-8" 
                    checked={checkedItems['verify-8']}
                    onCheckedChange={() => toggleCheck('verify-8')}
                  />
                  <label htmlFor="verify-8" className="text-sm cursor-pointer">
                    <strong>Error handling works</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Test with invalid inputs (empty, negative, text in number fields)
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-9" 
                    checked={checkedItems['verify-9']}
                    onCheckedChange={() => toggleCheck('verify-9')}
                  />
                  <label htmlFor="verify-9" className="text-sm cursor-pointer">
                    <strong>Mobile responsive design</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Test on mobile viewport or use browser dev tools
                    </p>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="verify-10" 
                    checked={checkedItems['verify-10']}
                    onCheckedChange={() => toggleCheck('verify-10')}
                  />
                  <label htmlFor="verify-10" className="text-sm cursor-pointer">
                    <strong>FAQs section displays (if provided)</strong>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Scroll down to verify FAQ section appears with your questions
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-8 border-2 border-red-200 bg-red-50 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100">
              <AlertTriangle className="h-6 w-6" />
              Common Integration Mistakes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Incorrect slug formatting</p>
              <p className="text-sm ml-4">Use kebab-case (my-tool) not camelCase (myTool) or snake_case (my_tool)</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Missing metadata fields</p>
              <p className="text-sm ml-4">All required fields (id, name, description, category, icon, path, tags) must be present</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Route path mismatch</p>
              <p className="text-sm ml-4">Path in App.tsx must exactly match path in tools.ts metadata</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Wrong category ID</p>
              <p className="text-sm ml-4">Category must match one defined in categories.ts (e.g., 'calculators' not 'calculator')</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Invalid icon name</p>
              <p className="text-sm ml-4">Icon must be a valid Lucide icon name (check lucide.dev)</p>
            </div>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">❌ Forgot to add route to routeTree</p>
              <p className="text-sm ml-4">Creating the route is not enough - must add to routeTree.addChildren() array</p>
            </div>
          </CardContent>
        </Card>

        {/* Success Card */}
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
              <CheckCircle className="h-6 w-6" />
              Integration Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300">
            <p className="mb-3">
              If all checklist items are complete and verified, your tool is successfully integrated! 
              Users can now discover and use it.
            </p>
            <p className="text-sm">
              <strong>Next Steps:</strong> Consider adding more detailed FAQs, aboutContent, and 
              performance metrics to enhance the user experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
