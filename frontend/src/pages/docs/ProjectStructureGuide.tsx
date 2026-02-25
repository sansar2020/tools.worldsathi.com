import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FolderTree, FileCode, Info, AlertTriangle, Database, Layout } from 'lucide-react';

export default function ProjectStructureGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FolderTree className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Technical Architecture</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Backend structure, frontend directory organization, file paths, and immutable components. 
            Complete reference for understanding the Worldsathi Tools Portal architecture.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Backend Architecture */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-indigo-600" />
              Backend Architecture
            </CardTitle>
            <CardDescription>
              Single-actor Motoko pattern with stable variables for data persistence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Single-Actor Pattern</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                All backend logic resides in a single Motoko actor file: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">backend/main.mo</code>
              </p>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`actor {
  // Stable variables for persistent state
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userFavorites = Map.empty<Principal, UserFavorites>();
  let toolUsageRecords = Map.empty<Text, ToolUsageRecord>();
  
  // Include mixins for additional functionality
  include MixinStorage();
  include MixinAuthorization(accessControlState);
  
  // Query methods (read-only, fast)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };
  
  // Update methods (state-changing, finalized on chain)
  public shared ({ caller }) func saveCallerUserProfile(profile: UserProfile) : async () {
    userProfiles.add(caller, profile);
  };
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Stable Variables for Persistence</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Data persists across canister upgrades using stable variables:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li><code>userProfiles</code> - User profile data (displayName, email, credits)</li>
                <li><code>userFavorites</code> - User's favorited tools</li>
                <li><code>toolUsageRecords</code> - Tool usage tracking with timestamps</li>
                <li><code>userPreferences</code> - Theme, settings, measurement units</li>
                <li><code>searchHistory</code> - User search queries and results</li>
                <li><code>toolUsageCounts</code> - Aggregate usage counts per tool</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Authorization Component Mixin</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Role-based access control using the authorization component:
              </p>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

let accessControlState = AccessControl.initState();
include MixinAuthorization(accessControlState);

// Usage in functions
public shared ({ caller }) func adminOnlyFunction() : async () {
  if (not AccessControl.isAdmin(accessControlState, caller)) {
    Runtime.trap("Unauthorized: Only admins can access");
  };
  // Admin logic here
};`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Blob Storage Mixin</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                File storage capabilities for images, documents, and other binary data:
              </p>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

include MixinStorage();

// ExternalBlob class provides:
// - getBytes(): Promise<Uint8Array>
// - getDirectURL(): string
// - fromURL(url: string): ExternalBlob
// - fromBytes(blob: Uint8Array): ExternalBlob
// - withUploadProgress(onProgress): ExternalBlob`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Frontend Directory Structure */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-6 w-6 text-indigo-600" />
              Frontend Directory Organization
            </CardTitle>
            <CardDescription>
              Complete file structure with explanations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <img 
                src="/assets/generated/directory-structure.dim_800x1000.png" 
                alt="Project directory structure"
                className="w-full h-auto rounded-lg shadow-lg mb-4"
              />
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Shadcn UI components (READ-ONLY)
│   │   ├── layout/          # Header, Footer, Layout wrappers
│   │   ├── sidebar/         # Sidebar widgets
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── gamification/    # Badge, streak components (placeholder)
│   │   └── onboarding/      # Onboarding tour (placeholder)
│   ├── pages/               # Route components
│   │   ├── tools/           # Tool pages organized by category
│   │   │   ├── calculators/
│   │   │   ├── converters/
│   │   │   ├── generators/
│   │   │   ├── analyzers/
│   │   │   ├── text-tools/
│   │   │   ├── image-tools/
│   │   │   ├── developer-tools/
│   │   │   ├── data-tools/
│   │   │   ├── seo-tools/
│   │   │   ├── finance-tools/
│   │   │   └── productivity/
│   │   ├── admin/           # Admin pages
│   │   ├── legal/           # Legal pages
│   │   ├── docs/            # Documentation pages
│   │   ├── forum/           # Forum pages (placeholder)
│   │   ├── HomePage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AboutUs.tsx
│   │   └── ContactUs.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useActor.ts      # Backend actor hook (GENERATED - READ-ONLY)
│   │   ├── useInternetIdentity.ts  # Auth hook (GENERATED - READ-ONLY)
│   │   ├── useQueries.ts    # React Query hooks for backend
│   │   ├── useCredits.ts    # Credit management hooks
│   │   ├── useAdminAuth.ts  # Admin authentication
│   │   ├── useGamification.ts  # Gamification (placeholder)
│   │   └── useKeyboardShortcuts.ts  # Keyboard shortcuts (placeholder)
│   ├── contexts/            # React contexts
│   │   └── AdminAuthContext.tsx
│   ├── utils/               # Helper functions
│   │   ├── toolHelpers.ts   # Tool filtering, sorting, path generation
│   │   ├── formatters.ts    # Date, number, currency formatting
│   │   └── breadcrumbHelpers.ts  # Breadcrumb generation
│   ├── types/               # TypeScript definitions
│   │   ├── tools.ts         # Tool metadata types
│   │   └── blog.ts          # Blog types
│   ├── constants/           # Static data
│   │   ├── tools.ts         # ALL_TOOLS array with metadata
│   │   └── categories.ts    # TOOL_CATEGORIES definitions
│   ├── lib/                 # Library utilities
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Entry point (GENERATED - READ-ONLY)
│   ├── config.ts            # App configuration (GENERATED - READ-ONLY)
│   ├── index.css            # Global styles with OKLCH colors
│   ├── components.json      # Shadcn/ui config
│   └── ui-summary.json      # UI components summary
├── public/                  # Static assets
│   └── assets/
│       └── generated/       # Generated images
├── declarations/            # Generated TS types (gitignored)
├── package.json             # Dependencies (READ-ONLY)
├── tsconfig.json            # TypeScript config (READ-ONLY)
├── vite.config.js           # Vite config (READ-ONLY)
├── tailwind.config.js       # Tailwind config (editable)
└── postcss.config.js        # PostCSS config (READ-ONLY)`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Key Directories Explained */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-6 w-6 text-indigo-600" />
              Key Directories Explained
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/pages/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Route components representing different pages. Organized by feature area (tools, admin, legal, docs). 
                    Tool pages are further organized by category subdirectories for better maintainability.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/components/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reusable UI components. The <code>ui/</code> subdirectory contains Shadcn UI components (read-only). 
                    Other subdirectories organize components by feature (layout, sidebar, dashboard, etc.).
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/hooks/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Custom React hooks for state management and side effects. <code>useActor.ts</code> and 
                    <code>useInternetIdentity.ts</code> are auto-generated and should not be modified. 
                    <code>useQueries.ts</code> contains all React Query hooks for backend operations.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/utils/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Helper functions and utilities. <code>toolHelpers.ts</code> provides tool filtering, sorting, 
                    and path generation. <code>formatters.ts</code> handles date, number, and currency formatting.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/types/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    TypeScript type definitions. <code>tools.ts</code> defines ToolMetadata interface and ToolCategory type. 
                    Backend types are auto-generated in <code>src/backend.d.ts</code>.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">src/constants/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Static data and configuration. <code>tools.ts</code> contains the ALL_TOOLS array with complete 
                    metadata for all tools. <code>categories.ts</code> defines TOOL_CATEGORIES with IDs, names, and descriptions.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">declarations/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Auto-generated TypeScript type definitions from Motoko backend code. Created by <code>dfx generate backend</code>. 
                    Should be gitignored as it's regenerated on each build.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">.dfx/</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Build artifacts and local canister state. Contains compiled WebAssembly modules and canister IDs. 
                    Automatically generated during <code>dfx deploy</code>. Should be gitignored.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Immutable Paths */}
        <Card className="mb-8 border-2 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-6 w-6" />
              Immutable Paths (DO NOT MODIFY)
            </CardTitle>
            <CardDescription>
              These files are auto-generated or part of the fixed template. Any edits will be ignored or overwritten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 border-red-200 bg-red-50 dark:bg-red-950">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-gray-700 dark:text-gray-300">
                <strong>Critical:</strong> Modifying these files will cause build failures or have your changes overwritten. 
                They are managed by the build system or template infrastructure.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Frontend Hooks (Auto-generated)</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li><code>frontend/src/hooks/useActor.ts</code> - Backend actor initialization</li>
                  <li><code>frontend/src/hooks/useInternetIdentity.ts</code> - Internet Identity provider</li>
                  <li><code>frontend/src/hooks/useInternetIdentity.tsx</code> - Internet Identity component</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Frontend Entry Points (Template-managed)</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li><code>frontend/src/main.tsx</code> - Application entry point with providers</li>
                  <li><code>frontend/src/config.ts</code> - Application configuration</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">UI Components (Shadcn/ui)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  All files under <code>frontend/src/components/ui/</code> are read-only:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Customization:</strong> Use props, className, and design tokens (index.css, tailwind.config.js) instead of editing component files.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">Configuration Files (Fixed by template)</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li><code>frontend/package.json</code> - Dependencies and scripts</li>
                  <li><code>frontend/tsconfig.json</code> - TypeScript configuration</li>
                  <li><code>frontend/vite.config.js</code> - Vite build configuration</li>
                  <li><code>frontend/postcss.config.js</code> - PostCSS configuration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Organization Conventions */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>File Organization Conventions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Components</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">PascalCase</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>UserProfile.tsx</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>ToolPageTemplate.tsx</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">✗</Badge>
                    <code>user-profile.tsx</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Utilities</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">camelCase</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>toolHelpers.ts</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>formatters.ts</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">✗</Badge>
                    <code>ToolHelpers.ts</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Routes/URLs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">kebab-case</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>/tools/calculators/bmi-calculator</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>/category/developer-tools</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">✗</Badge>
                    <code>/tools/calculators/BmiCalculator</code>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Categories</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">kebab-case</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>developer-tools</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                    <code>text-tools</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">✗</Badge>
                    <code>dev-tools</code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Files */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Configuration Files Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">dfx.json</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Internet Computer project configuration defining canisters, build settings, and network configurations.
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  "canisters": {
    "backend": {
      "type": "motoko",
      "main": "src/backend/main.mo"
    },
    "frontend": {
      "type": "assets",
      "source": ["frontend/dist"]
    }
  }
}`}
                </pre>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">package.json (Read-only)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Frontend dependencies and scripts. Fixed by template - do not modify.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                  <li>React 19, TypeScript, Vite</li>
                  <li>Tailwind CSS, Shadcn UI components</li>
                  <li>TanStack Router, TanStack Query</li>
                  <li>Lucide React icons, React Icons</li>
                  <li>Internet Computer SDK packages</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">vite.config.js (Read-only)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vite build configuration with React plugin, environment variables, and Internet Computer integration.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">tailwind.config.js (Editable)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Tailwind CSS configuration. Customize theme, colors, fonts, and utilities here.
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Map to CSS variables from index.css
        primary: 'oklch(var(--primary))',
        secondary: 'oklch(var(--secondary))',
        // ... more colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}`}
                </pre>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">tsconfig.json (Read-only)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  TypeScript compiler configuration with path aliases (@/* → src/*) and strict type checking.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Architecture Diagrams */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>Architecture Diagrams</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">System Architecture</h4>
              <img 
                src="/assets/generated/architecture-diagram.dim_1200x800.png" 
                alt="System architecture showing frontend React app, backend Motoko canister, Internet Identity, and data flow"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Component Hierarchy</h4>
              <img 
                src="/assets/generated/component-hierarchy.dim_1000x800.png" 
                alt="Component hierarchy showing App → Layout → Pages → Components structure"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
