import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Terminal, Bug } from 'lucide-react';

export default function TroubleshootingGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Bug className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Troubleshooting Guide</h1>
          </div>
          <p className="text-xl text-red-100 max-w-3xl">
            Solutions to common Internet Computer development issues including CORS errors, identity problems, 
            actor creation failures, and deployment issues with specific commands and fixes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Common Issues */}
        <div className="space-y-6">
          {/* Issue 1 */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-6 w-6" />
                CORS Errors with Local Replica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Problem:</strong> Browser blocks requests due to CORS policy
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Solution:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Configure dfx.json to allow CORS:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`{
  "canisters": {
    "frontend": {
      "type": "assets",
      "source": ["dist"]
    }
  },
  "defaults": {
    "replica": {
      "subnet_type": "application"
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Issue 2 */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-6 w-6" />
                Identity Delegation Problems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Problem:</strong> User stays logged in after logout or delegation expires
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Solution:</p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// Clear browser localStorage
localStorage.clear();

// Logout from AuthClient
await authClient.logout();

// Clear React Query cache
queryClient.clear();`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Issue 3 */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-6 w-6" />
                Actor Creation Failures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Problem:</strong> Cannot create actor instance or "Canister not found" error
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Solution:</p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# 1. Verify canister is deployed
dfx canister id backend

# 2. Check network configuration
# Ensure DFX_NETWORK environment variable is set correctly

# 3. Regenerate declarations
dfx generate backend`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Issue 4 */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-6 w-6" />
                TypeScript Declaration Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Problem:</strong> TypeScript cannot find declarations or types are incorrect
                </AlertDescription>
              </Alert>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Solution:</p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Regenerate declarations
dfx generate backend

# If still failing, clean and rebuild
rm -rf .dfx
dfx start --clean
dfx deploy`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Debugging Section */}
          <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Terminal className="h-6 w-6" />
                Debugging with dfx canister call
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Test backend methods directly from command line:
              </p>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Call a query method
dfx canister call backend getCallerUserProfile

# Call an update method with arguments
dfx canister call backend saveCallerUserProfile '(record {
  userId = principal "aaaaa-aa";
  displayName = opt "Test User";
  email = opt "test@example.com";
  registrationDate = 1234567890;
  creditsConsumed = 0;
  totalCreditsAllowed = 1000;
})'`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
