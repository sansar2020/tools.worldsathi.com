import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Server, Terminal, FileCode, Play, AlertCircle, CheckCircle, Info } from 'lucide-react';
import PdfDownloadButton from '@/components/docs/PdfDownloadButton';

export default function IcPlatformSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Server className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Internet Computer Platform Setup</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Complete guide to installing the DFX SDK, initializing Internet Computer projects, configuring 
            canisters, and deploying to local replica. Everything you need to start building on IC.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <PdfDownloadButton />

        {/* Prerequisites */}
        <Alert className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>Prerequisites:</strong> You'll need a Unix-based system (macOS, Linux, or Windows with WSL2), 
            Node.js 16+, and basic command-line knowledge. This guide takes about 15-20 minutes to complete.
          </AlertDescription>
        </Alert>

        {/* Step 1: Install DFX SDK */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Step 1</Badge>
                Install DFX SDK
              </CardTitle>
              <Terminal className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              The DFINITY Canister SDK (DFX) is the primary tool for creating, deploying, and managing Internet Computer projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Installation Commands:
              </h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">macOS and Linux:</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    This script downloads and installs the latest version of DFX to <code>~/.local/share/dfx</code>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Windows (WSL2):</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# First, ensure you have WSL2 installed
# Then run the same command as macOS/Linux:
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Note: Native Windows support is not available. You must use WSL2 (Windows Subsystem for Linux 2)
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Verify Installation:</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`dfx --version`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Expected output: <code>dfx 0.15.0</code> (or later version)
                  </p>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Troubleshooting:</strong> If the command fails, ensure curl is installed (<code>sudo apt install curl</code> on Ubuntu) 
                and you have write permissions to your home directory. For WSL2 issues, verify WSL2 is properly configured.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: Create New Project */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Step 2</Badge>
                Create a New Project
              </CardTitle>
              <FileCode className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              Initialize a new Internet Computer project with frontend and backend canisters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Create Project:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto mb-3">
{`# Create a new project
dfx new my_project

# Navigate into the project directory
cd my_project`}
              </pre>

              <h4 className="font-semibold mb-2 mt-4">Generated Project Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`my_project/
├── dfx.json                 # Project configuration
├── src/
│   ├── my_project_backend/  # Motoko backend canister
│   │   └── main.mo
│   └── my_project_frontend/ # Frontend assets
│       ├── src/
│       │   ├── index.html
│       │   ├── index.js
│       │   └── index.scss
│       └── assets/
├── .dfx/                    # Build artifacts (gitignored)
├── node_modules/
└── package.json`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Files Explained:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><strong>dfx.json:</strong> Configuration file defining canisters, build commands, and network settings</li>
                <li><strong>src/my_project_backend/main.mo:</strong> Motoko backend code (your smart contract)</li>
                <li><strong>src/my_project_frontend/:</strong> Frontend application files (HTML, JS, CSS)</li>
                <li><strong>.dfx/:</strong> Build artifacts and local canister state (automatically generated, don't commit)</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Project Templates:</strong> Use <code>dfx new --type</code> to create different project types. 
                Options include <code>motoko</code>, <code>rust</code>, or <code>azle</code> (TypeScript).
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: Configure dfx.json */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Step 3</Badge>
                Understanding dfx.json Configuration
              </CardTitle>
              <FileCode className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              Configure your canisters, networks, and build settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example dfx.json:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  "canisters": {
    "backend": {
      "main": "src/backend/main.mo",
      "type": "motoko"
    },
    "frontend": {
      "dependencies": ["backend"],
      "frontend": {
        "entrypoint": "frontend/index.html"
      },
      "source": ["frontend/dist"],
      "type": "assets"
    }
  },
  "defaults": {
    "build": {
      "args": "",
      "packtool": ""
    }
  },
  "output_env_file": ".env",
  "version": 1
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Configuration Sections:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><strong>canisters:</strong> Defines each canister (backend, frontend) with type and source files</li>
                <li><strong>backend canister:</strong> Specifies Motoko main file and type</li>
                <li><strong>frontend canister:</strong> Asset canister for serving static files, depends on backend</li>
                <li><strong>defaults:</strong> Build configuration and tooling options</li>
                <li><strong>output_env_file:</strong> Environment file for canister IDs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Development Workflow */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Step 4</Badge>
                Development Workflow
              </CardTitle>
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              Start local replica, deploy canisters, and develop your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Common Development Commands:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# 1. Start local Internet Computer replica
dfx start --clean --background

# 2. Deploy all canisters
dfx deploy

# 3. Generate TypeScript declarations
dfx generate backend

# 4. Get canister IDs
dfx canister id backend
dfx canister id frontend

# 5. Call backend functions
dfx canister call backend getCallerUserProfile

# 6. Stop local replica
dfx stop`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Command Explanations:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><strong>dfx start --clean:</strong> Starts fresh local replica, clearing previous state</li>
                <li><strong>--background:</strong> Runs replica in background so you can use the same terminal</li>
                <li><strong>dfx deploy:</strong> Compiles and deploys all canisters defined in dfx.json</li>
                <li><strong>dfx generate:</strong> Creates TypeScript type definitions from Motoko code</li>
                <li><strong>dfx canister call:</strong> Directly invoke backend functions for testing</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Development Tip:</strong> Keep <code>dfx start</code> running in the background during development. 
                Use <code>dfx deploy</code> to update canisters after code changes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 5: Accessing Your Application */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">Step 5</Badge>
                Access Your Application
              </CardTitle>
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <CardDescription>
              Open your deployed application in a web browser
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Local Development URL:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# URL format:
http://localhost:4943?canisterId=<frontend-canister-id>

# Example:
http://localhost:4943?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`}
              </pre>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Get your frontend canister ID with: <code>dfx canister id frontend</code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Accessing Backend Functions:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Your React frontend automatically connects to the backend using the generated actor from <code>dfx generate</code>.
              </p>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// In your React components:
import { useActor } from './hooks/useActor';

function MyComponent() {
  const { actor } = useActor();
  
  const fetchData = async () => {
    const profile = await actor.getCallerUserProfile();
    console.log(profile);
  };
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              Common Setup Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "dfx: command not found"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Add DFX to your PATH:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded">
{`echo 'export PATH="$HOME/.local/share/dfx/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc`}
                </pre>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "Replica already running"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Stop the existing replica:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded">
{`dfx stop
dfx start --clean --background`}
                </pre>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "Cannot find canister id"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Deploy your canisters first:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded">
{`dfx deploy`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="h-6 w-6" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your development environment is ready! Continue with:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/internet-identity-auth" className="text-blue-600 hover:underline">
                  Internet Identity Authentication
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Add user authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/frontend-backend-integration" className="text-blue-600 hover:underline">
                  Frontend-Backend Integration
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Connect React to Motoko</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/motoko-backend-patterns" className="text-blue-600 hover:underline">
                  Motoko Backend Patterns
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Learn backend best practices</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
