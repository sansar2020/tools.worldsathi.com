import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Rocket, Terminal, Globe, AlertCircle, CheckCircle, Info } from 'lucide-react';
import PdfDownloadButton from '@/components/docs/PdfDownloadButton';

export default function CanisterDeployment() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Canister Deployment</h1>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl">
            Deploy your Internet Computer canisters to local replica and mainnet. Learn deployment commands, 
            upgrade modes, cycle management, and how to access your deployed applications.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <PdfDownloadButton />

        {/* Introduction */}
        <Alert className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950">
          <Info className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>Deployment Overview:</strong> Canisters can be deployed to local replica (development) 
            or IC mainnet (production). Each deployment creates a unique canister ID that serves as the 
            permanent address for your application.
          </AlertDescription>
        </Alert>

        {/* Step 1: Local Deployment */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-orange-600 text-white">Step 1</Badge>
                Local Deployment
              </CardTitle>
              <Terminal className="h-6 w-6 text-orange-600" />
            </div>
            <CardDescription>
              Deploy to local replica for development and testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Deploy to Local Replica:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# 1. Start local replica
dfx start --clean --background

# 2. Deploy all canisters
dfx deploy

# 3. Get canister IDs
dfx canister id backend
dfx canister id frontend

# Output example:
# rrkah-fqaaa-aaaaa-aaaaq-cai`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Access Local Application:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Frontend URL format:
http://localhost:4943?canisterId=<frontend-canister-id>

# Example:
http://localhost:4943?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Mainnet Deployment */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-orange-600 text-white">Step 2</Badge>
                Mainnet Deployment
              </CardTitle>
              <Globe className="h-6 w-6 text-orange-600" />
            </div>
            <CardDescription>
              Deploy to Internet Computer mainnet for production
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Deploy to Mainnet:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Deploy to IC mainnet
dfx deploy --network ic

# Get mainnet canister IDs
dfx canister id backend --network ic
dfx canister id frontend --network ic`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Access Mainnet Application:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Frontend URL format:
https://<frontend-canister-id>.ic0.app

# Example:
https://rrkah-fqaaa-aaaaa-aaaaq-cai.ic0.app`}
              </pre>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Cycles Required:</strong> Mainnet deployment requires cycles (IC's compute units). 
                You'll need to add cycles to your canisters to keep them running. Get free cycles from 
                the cycles faucet for testing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: Upgrade Modes */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-orange-600 text-white">Step 3</Badge>
              Canister Upgrade Modes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Three Upgrade Modes:</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">1. Install (Fresh Install):</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded mt-1">
{`dfx canister install backend --mode install`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Use for first-time deployment. Fails if canister already exists.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">2. Reinstall (Wipes State):</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded mt-1">
{`dfx canister install backend --mode reinstall`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Deletes all data and reinstalls. Use with caution in production!
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">3. Upgrade (Preserves State):</p>
                  <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded mt-1">
{`dfx canister install backend --mode upgrade`}
                  </pre>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Updates code while preserving stable variables. Default for <code>dfx deploy</code>.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Canister Management */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-orange-600 text-white">Step 4</Badge>
              Canister Management Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Useful Management Commands:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Check canister status
dfx canister status backend

# Stop canister
dfx canister stop backend

# Start canister
dfx canister start backend

# Delete canister
dfx canister delete backend

# Call canister method
dfx canister call backend getCallerUserProfile`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              Common Deployment Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "Canister already exists"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Use upgrade mode instead:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded">
{`dfx deploy
# or
dfx canister install backend --mode upgrade`}
                </pre>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "Insufficient cycles"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Add cycles to your canister or get free cycles from faucet.
                </p>
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
              Your application is now deployed! Continue with:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/troubleshooting" className="text-blue-600 hover:underline">
                  Troubleshooting Guide
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Solve deployment issues</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/project-structure" className="text-blue-600 hover:underline">
                  Project Structure
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Organize your code</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
