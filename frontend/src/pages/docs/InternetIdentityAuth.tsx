import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Lock, Terminal, Code, Shield, AlertCircle, CheckCircle, Info } from 'lucide-react';
import PdfDownloadButton from '@/components/docs/PdfDownloadButton';

export default function InternetIdentityAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Internet Identity Authentication</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Implement secure, passwordless authentication using Internet Identity. Learn AuthClient integration, 
            useInternetIdentity hook, login/logout flows, and protected routes.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <PdfDownloadButton />

        {/* Authentication Flow Diagram */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600" />
              Authentication Flow
            </CardTitle>
            <CardDescription>
              Complete flow from login button click to authenticated canister calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src="/assets/generated/auth-flow-diagram.dim_1000x1200.png" 
              alt="Authentication flow diagram showing user clicks login, AuthClient initiates II flow, user authenticates with II, delegation is received, identity is stored in context, authenticated actor is created, and app components can now make authenticated calls"
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Step-by-step authentication process:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>User clicks login button</strong> - Triggers the authentication flow</li>
                <li><strong>AuthClient initiates II flow</strong> - Opens Internet Identity in a new window</li>
                <li><strong>User authenticates with II</strong> - Uses biometrics, security key, or passkey</li>
                <li><strong>Delegation is received</strong> - II returns a signed delegation to your app</li>
                <li><strong>Identity stored in context</strong> - useInternetIdentity hook manages the identity</li>
                <li><strong>Authenticated actor created</strong> - useActor hook creates actor with identity</li>
                <li><strong>App makes authenticated calls</strong> - Backend receives caller principal</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Alert className="mb-8 border-purple-200 bg-purple-50 dark:bg-purple-950">
          <Info className="h-5 w-5 text-purple-600" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            <strong>What is Internet Identity?</strong> Internet Identity is a blockchain authentication system that 
            lets users securely authenticate without passwords. It uses WebAuthn for biometric authentication and 
            provides a unique principal ID for each application.
          </AlertDescription>
        </Alert>

        {/* Step 1: Install Dependencies */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 1</Badge>
                Install Required Packages
              </CardTitle>
              <Terminal className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Add Internet Identity authentication packages to your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Install Dependencies:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`npm install @dfinity/auth-client @dfinity/agent @dfinity/identity @dfinity/principal`}
              </pre>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                These packages provide authentication, agent creation, and identity management functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: AuthClient Initialization */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 2</Badge>
                Initialize AuthClient
              </CardTitle>
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Create and configure the AuthClient for Internet Identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: AuthClient Setup</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { AuthClient } from '@dfinity/auth-client';

// Create AuthClient instance
const authClient = await AuthClient.create({
  idleOptions: {
    disableIdle: true, // Disable automatic logout on idle
    disableDefaultIdleCallback: true
  }
});

// Check if user is already authenticated
const isAuthenticated = await authClient.isAuthenticated();

if (isAuthenticated) {
  const identity = authClient.getIdentity();
  const principal = identity.getPrincipal();
  console.log('User principal:', principal.toString());
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Note:</strong> The AuthClient automatically stores the identity in IndexedDB, so users 
                remain logged in across page refreshes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 3: Login Flow */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 3</Badge>
                Implement Login Flow
              </CardTitle>
              <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Handle user login with Internet Identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Login Function:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const login = async () => {
  const authClient = await AuthClient.create();
  
  await authClient.login({
    identityProvider: 'https://identity.ic0.app',
    onSuccess: () => {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal();
      console.log('Login successful!', principal.toString());
      
      // Update your app state with the new identity
      setIdentity(identity);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
    // Optional: Customize the login window
    windowOpenerFeatures: \`
      left=\${window.screen.width / 2 - 525 / 2},
      top=\${window.screen.height / 2 - 705 / 2},
      toolbar=0,location=0,menubar=0,width=525,height=705
    \`
  });
};`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Login Options:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>identityProvider:</strong> URL of Internet Identity service (mainnet or local)</li>
                <li><strong>onSuccess:</strong> Callback executed after successful authentication</li>
                <li><strong>onError:</strong> Callback for handling authentication errors</li>
                <li><strong>maxTimeToLive:</strong> Optional delegation expiration time (default: 8 hours)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: useInternetIdentity Hook */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 4</Badge>
                useInternetIdentity React Hook
              </CardTitle>
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Pre-built hook for managing authentication state (already implemented in your project)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Using the Hook:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useInternetIdentity } from '../hooks/useInternetIdentity';

function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  
  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  
  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear(); // Logout
    } else {
      await login(); // Login
    }
  };
  
  return (
    <button onClick={handleAuth} disabled={disabled}>
      {loginStatus === 'logging-in' ? 'Logging in...' : 
       isAuthenticated ? 'Logout' : 'Login'}
    </button>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Hook API:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-4">
                <li><strong>login():</strong> Initiates Internet Identity authentication flow</li>
                <li><strong>clear():</strong> Logs out the user and clears stored identity</li>
                <li><strong>loginStatus:</strong> Current status ("idle", "logging-in", "success", "error")</li>
                <li><strong>identity:</strong> The authenticated identity object (null if not logged in)</li>
                <li><strong>isInitializing:</strong> True while loading stored identity on mount</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Principal Management */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 5</Badge>
                Working with Principals
              </CardTitle>
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Access and use the user's principal ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Getting the Principal:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useInternetIdentity } from '../hooks/useInternetIdentity';

function UserProfile() {
  const { identity } = useInternetIdentity();
  
  if (!identity) {
    return <div>Please log in</div>;
  }
  
  const principal = identity.getPrincipal();
  const principalText = principal.toString();
  
  return (
    <div>
      <h2>Your Principal ID:</h2>
      <code>{principalText}</code>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Comparing Principals:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { Principal } from '@dfinity/principal';

// Check if current user is the author
const isAuthor = (authorPrincipal: Principal): boolean => {
  if (!identity) return false;
  return authorPrincipal.toString() === identity.getPrincipal().toString();
};

// Example usage
const post = {
  author: Principal.fromText('aaaaa-aa'),
  content: 'Hello world'
};

if (isAuthor(post.author)) {
  // Show edit/delete buttons
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> Each user gets a unique principal ID per application. The same user 
                will have different principals on different dapps for privacy.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 6: Protected Routes */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Step 6</Badge>
                Implement Protected Routes
              </CardTitle>
              <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Restrict access to authenticated users only
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">AuthGuard Component:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Navigate } from '@tanstack/react-router';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();
  
  // Show loading while checking authentication
  if (isInitializing) {
    return <div>Loading...</div>;
  }
  
  // Redirect to home if not authenticated
  if (!identity) {
    return <Navigate to="/" />;
  }
  
  // Render protected content
  return <>{children}</>;
}

// Usage in routes:
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  ),
});`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              Common Authentication Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "User is already authenticated"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Clear the existing session before logging in again:
                </p>
                <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded">
{`await clear();
setTimeout(() => login(), 300);`}
                </pre>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Error: "Delegation has expired"
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> The user needs to log in again. Delegations expire after 8 hours by default.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Issue: Login popup blocked
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Solution:</strong> Ensure login is triggered by a user action (button click), not automatically.
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
              Authentication is configured! Continue with:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/frontend-backend-integration" className="text-blue-600 hover:underline">
                  Frontend-Backend Integration
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Connect authenticated actor</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/motoko-backend-patterns" className="text-blue-600 hover:underline">
                  Motoko Backend Patterns
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Handle caller principals</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/troubleshooting" className="text-blue-600 hover:underline">
                  Troubleshooting Guide
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Solve auth issues</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
