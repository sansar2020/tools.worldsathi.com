import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Layers, Code, Palette, Box, Database, Zap, Shield, Info } from 'lucide-react';

export default function TechnologyStack() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Technology Stack</h1>
          </div>
          <p className="text-xl text-teal-100 max-w-3xl">
            Comprehensive breakdown of all technologies powering the Worldsathi Tools Portal including Motoko, 
            React, Tailwind CSS, Shadcn UI, React Query, Three.js, and Internet Identity with integration patterns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Table of Contents */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><a href="#architecture" className="text-blue-600 hover:underline">1. Architecture Overview</a></li>
              <li><a href="#motoko" className="text-blue-600 hover:underline">2. Motoko Backend</a></li>
              <li><a href="#react" className="text-blue-600 hover:underline">3. React Frontend</a></li>
              <li><a href="#tailwind" className="text-blue-600 hover:underline">4. Tailwind CSS</a></li>
              <li><a href="#shadcn" className="text-blue-600 hover:underline">5. Shadcn UI</a></li>
              <li><a href="#react-query" className="text-blue-600 hover:underline">6. React Query</a></li>
              <li><a href="#threejs" className="text-blue-600 hover:underline">7. Three.js</a></li>
              <li><a href="#internet-identity" className="text-blue-600 hover:underline">8. Internet Identity</a></li>
            </ul>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card id="architecture" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">1</Badge>
              Architecture Overview
            </CardTitle>
            <CardDescription>
              Layered architecture showing technology integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src="/assets/generated/architecture-diagram.dim_1200x800.png" 
              alt="Layered architecture diagram showing UI layer, state management, integration layer, backend, and storage"
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Technology Layers:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`┌─────────────────────────────────────────────────────────┐
│  User Interface Layer                                   │
│  React + TypeScript + Tailwind CSS + Shadcn UI         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  State Management Layer                                 │
│  React Query (server state) + Context (app state)      │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Integration Layer                                      │
│  useActor + useInternetIdentity + Custom Hooks         │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Backend Layer                                          │
│  Motoko Actor (Single-Actor Architecture)              │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│  Storage Layer                                          │
│  Stable Variables (Persistent Storage)                 │
└─────────────────────────────────────────────────────────┘`}
              </pre>
            </div>

            <img 
              src="/assets/generated/architecture-data-flow.dim_1200x800.png" 
              alt="Data flow diagram showing request/response cycle through all layers"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </CardContent>
        </Card>

        {/* Motoko Backend */}
        <Card id="motoko" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">2</Badge>
              Motoko Backend
            </CardTitle>
            <CardDescription>
              Single-actor architecture with stable variables for persistence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>backend/main.mo</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Motoko is a programming language designed specifically for the Internet Computer. It provides 
                type safety, actor-based concurrency, and automatic memory management with stable variables 
                for data persistence across canister upgrades.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Single-Actor Architecture:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`actor {
  // Stable variables persist across upgrades
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userFavorites = Map.empty<Principal, UserFavorites>();
  let toolUsageCounts = Map.empty<Text, Nat>();
  
  // Query functions (read-only, fast)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };
  
  // Shared functions (state-changing, slower)
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
  
  // Credit consumption with validation
  public shared ({ caller }) func consumeCredits(amount : Nat) : async Bool {
    switch (userProfiles.get(caller)) {
      case (?profile) {
        let remaining = profile.totalCreditsAllowed - profile.creditsConsumed;
        if (remaining < amount) { return false; };
        // Update profile with new consumed amount
        let updated = { profile with creditsConsumed = profile.creditsConsumed + amount };
        userProfiles.add(caller, updated);
        true;
      };
      case (null) { Runtime.trap("Profile not found") };
    };
  };
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Type Safety:</strong> Compile-time type checking prevents runtime errors</li>
                <li><strong>Stable Variables:</strong> Data persists across canister upgrades</li>
                <li><strong>Authorization:</strong> Built-in access control using <code>Runtime.trap</code></li>
                <li><strong>Query vs Shared:</strong> Query functions are fast read-only, shared functions modify state</li>
                <li><strong>Principal-Based Auth:</strong> Caller identity automatically provided by IC</li>
                <li><strong>Single Actor:</strong> All functionality in one canister for simplicity</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Constraint:</strong> The backend must remain a single-actor architecture. Never create 
                separate canisters or actors. All functionality must be in <code>backend/main.mo</code>.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* React Frontend */}
        <Card id="react" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">3</Badge>
              React Frontend
            </CardTitle>
            <CardDescription>
              Functional components with hooks and TypeScript
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Version:</strong> React 19.1.0
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                React provides the component-based UI framework with hooks for state management, side effects, 
                and context. All components use functional patterns with TypeScript for type safety.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Component Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetCallerUserProfile } from '@/hooks/useQueries';

interface Props {
  toolId: string;
  onComplete?: () => void;
}

export default function ToolComponent({ toolId, onComplete }: Props) {
  // Local state
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  
  // Server state via React Query
  const { data: profile, isLoading } = useGetCallerUserProfile();
  
  // Side effects
  useEffect(() => {
    if (result && onComplete) {
      onComplete();
    }
  }, [result, onComplete]);
  
  // Event handlers
  const handleCalculate = () => {
    // Tool logic
    setResult(input.toUpperCase());
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Name</CardTitle>
      </CardHeader>
      <CardContent>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={handleCalculate}>Calculate</Button>
        {result && <div>Result: {result}</div>}
      </CardContent>
    </Card>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Hooks Used:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>useState:</strong> Local component state (form inputs, UI controls)</li>
                <li><strong>useEffect:</strong> Side effects (data fetching, subscriptions, DOM updates)</li>
                <li><strong>useContext:</strong> Access context values (theme, auth, admin auth)</li>
                <li><strong>useMemo:</strong> Memoize expensive computations</li>
                <li><strong>useCallback:</strong> Memoize callback functions</li>
                <li><strong>useParams:</strong> TanStack Router route parameters</li>
                <li><strong>useNavigate:</strong> Programmatic navigation</li>
                <li><strong>Custom Hooks:</strong> useActor, useInternetIdentity, useQueries, useCredits</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tailwind CSS */}
        <Card id="tailwind" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">4</Badge>
              Tailwind CSS
            </CardTitle>
            <CardDescription>
              Utility-first CSS with OKLCH color system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Version:</strong> Tailwind CSS 3.4.17
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Tailwind provides utility classes for rapid UI development with a custom OKLCH color system 
                for consistent light and dark mode support.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">OKLCH Color System (index.css):</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`@layer base {
  :root {
    --background: oklch(98% 0 0);
    --foreground: oklch(15% 0 0);
    --primary: oklch(55% 0.25 250);
    --primary-foreground: oklch(98% 0 0);
    --secondary: oklch(92% 0.02 250);
    --secondary-foreground: oklch(15% 0 0);
    --accent: oklch(92% 0.02 250);
    --accent-foreground: oklch(15% 0 0);
    --destructive: oklch(55% 0.22 25);
    --destructive-foreground: oklch(98% 0 0);
    --muted: oklch(92% 0.02 250);
    --muted-foreground: oklch(45% 0.02 250);
    --border: oklch(85% 0.02 250);
    --ring: oklch(55% 0.25 250);
  }
  
  .dark {
    --background: oklch(15% 0 0);
    --foreground: oklch(98% 0 0);
    --primary: oklch(65% 0.25 250);
    --primary-foreground: oklch(15% 0 0);
    /* ... dark mode colors */
  }
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Tailwind Config (tailwind.config.js):</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... other color mappings
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Usage Example:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`<div className="container mx-auto px-4 py-12">
  <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-xl transition-all">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-primary">
        Title
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-muted-foreground">Content</p>
      <Button className="bg-primary hover:bg-primary/90">
        Click Me
      </Button>
    </CardContent>
  </Card>
</div>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Shadcn UI */}
        <Card id="shadcn" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">5</Badge>
              Shadcn UI
            </CardTitle>
            <CardDescription>
              Accessible component library built on Radix UI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Shadcn UI provides pre-built, accessible components using Radix UI primitives. Components are 
                located in <code>frontend/src/components/ui/</code> and are <strong>read-only</strong> - 
                they cannot be modified.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Available Components:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-700 dark:text-gray-300">
                <div>• Accordion</div>
                <div>• Alert</div>
                <div>• AlertDialog</div>
                <div>• Avatar</div>
                <div>• Badge</div>
                <div>• Button</div>
                <div>• Calendar</div>
                <div>• Card</div>
                <div>• Carousel</div>
                <div>• Checkbox</div>
                <div>• Collapsible</div>
                <div>• Command</div>
                <div>• Dialog</div>
                <div>• Dropdown Menu</div>
                <div>• Form</div>
                <div>• Input</div>
                <div>• Label</div>
                <div>• Popover</div>
                <div>• Progress</div>
                <div>• Radio Group</div>
                <div>• ScrollArea</div>
                <div>• Select</div>
                <div>• Separator</div>
                <div>• Sheet</div>
                <div>• Skeleton</div>
                <div>• Slider</div>
                <div>• Switch</div>
                <div>• Table</div>
                <div>• Tabs</div>
                <div>• Textarea</div>
                <div>• Toast (Sonner)</div>
                <div>• Toggle</div>
                <div>• Tooltip</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Component Usage:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter name" />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="calc">Calculators</SelectItem>
              <SelectItem value="conv">Converters</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}`}
              </pre>
            </div>

            <Alert className="border-amber-500">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Immutability:</strong> Files in <code>frontend/src/components/ui/</code> are read-only. 
                Customize components via props, className, and design tokens in index.css/tailwind.config.js.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* React Query */}
        <Card id="react-query" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">6</Badge>
              React Query
            </CardTitle>
            <CardDescription>
              Server state management with caching and invalidation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Version:</strong> @tanstack/react-query 5.24.0
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                React Query manages server state with automatic caching, background refetching, and cache 
                invalidation. All backend interactions use React Query hooks defined in <code>useQueries.ts</code>.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Query Hook Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// frontend/src/hooks/useQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  
  return useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Usage in Components:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`function ProfileEditor() {
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();
  
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (profile?.displayName) {
      setName(profile.displayName);
    }
  }, [profile]);
  
  const handleSave = () => {
    saveProfile({
      ...profile,
      displayName: name,
    });
  };
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Automatic Caching:</strong> Query results cached by queryKey</li>
                <li><strong>Background Refetching:</strong> Stale data refetched automatically</li>
                <li><strong>Cache Invalidation:</strong> Mutations trigger related query refetches</li>
                <li><strong>Loading States:</strong> Built-in isLoading, isPending, isFetching</li>
                <li><strong>Error Handling:</strong> Automatic error state management</li>
                <li><strong>Optimistic Updates:</strong> UI updates before server confirmation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Three.js */}
        <Card id="threejs" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">7</Badge>
              Three.js
            </CardTitle>
            <CardDescription>
              3D graphics and visualizations (optional for specific tools)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Version:</strong> Three.js 0.176.0 with @react-three/fiber 9.1.2
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Three.js enables 3D visualizations for tools that require spatial representations, data 
                visualizations, or interactive 3D graphics. Used via React Three Fiber for React integration.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Basic Three.js Setup:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ThreeDVisualization() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </div>
  );
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Usage:</strong> Three.js is optional and only used for tools requiring 3D visualizations. 
                Most tools use standard 2D UI components.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Internet Identity */}
        <Card id="internet-identity" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white">8</Badge>
              Internet Identity
            </CardTitle>
            <CardDescription>
              Decentralized authentication system for the Internet Computer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Package:</strong> @dfinity/auth-client 3.3.0
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Internet Identity provides secure, anonymous authentication without passwords. Users authenticate 
                once and receive a unique principal ID for each application.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">useInternetIdentity Hook:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// frontend/src/hooks/useInternetIdentity.ts (auto-generated, read-only)
import { AuthClient } from '@dfinity/auth-client';
import { useState, useEffect } from 'react';

export function useInternetIdentity() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'logging-in' | 'success' | 'error'>('idle');
  
  const login = async () => {
    setLoginStatus('logging-in');
    const authClient = await AuthClient.create();
    
    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: () => {
        const identity = authClient.getIdentity();
        setIdentity(identity);
        setLoginStatus('success');
      },
      onError: () => {
        setLoginStatus('error');
      },
    });
  };
  
  const clear = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIdentity(null);
    setLoginStatus('idle');
  };
  
  return { identity, loginStatus, login, clear };
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Login Component:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  
  const isAuthenticated = !!identity;
  
  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear(); // Clear all cached data
    } else {
      await login();
    }
  };
  
  return (
    <Button 
      onClick={handleAuth}
      disabled={loginStatus === 'logging-in'}
    >
      {loginStatus === 'logging-in' ? 'Logging in...' : 
       isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Integration with useActor:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// useActor creates authenticated actor using identity
export function useActor() {
  const { identity } = useInternetIdentity();
  const [actor, setActor] = useState<backendInterface | null>(null);
  
  useEffect(() => {
    if (identity) {
      const agent = new HttpAgent({ identity });
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: BACKEND_CANISTER_ID,
      });
      setActor(actor);
    }
  }, [identity]);
  
  return { actor, isFetching: !actor };
}`}
              </pre>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Security:</strong> Internet Identity provides cryptographic authentication without 
                storing passwords. Each user gets a unique principal ID per application for privacy.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Related Resources */}
        <Card className="border-2 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle>Related Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="/docs/frontend-backend-integration" className="text-blue-600 hover:underline">
                  → Frontend-Backend Integration Guide
                </a>
              </li>
              <li>
                <a href="/docs/internet-identity-auth" className="text-blue-600 hover:underline">
                  → Internet Identity Authentication
                </a>
              </li>
              <li>
                <a href="/docs/best-practices" className="text-blue-600 hover:underline">
                  → Best Practices Guide
                </a>
              </li>
              <li>
                <a href="/docs" className="text-blue-600 hover:underline">
                  ← Back to Documentation Index
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
