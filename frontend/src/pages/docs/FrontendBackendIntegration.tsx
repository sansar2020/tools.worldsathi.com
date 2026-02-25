import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Link2, Code, Database, Zap, AlertCircle, CheckCircle, Info } from 'lucide-react';
import PdfDownloadButton from '@/components/docs/PdfDownloadButton';

export default function FrontendBackendIntegration() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link2 className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Frontend-Backend Integration</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Connect your React frontend to Motoko backend with TypeScript declarations, useActor hook, 
            React Query integration, and authenticated canister calls.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <PdfDownloadButton />

        {/* Architecture Data Flow Diagram */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-green-600" />
              Architecture Overview
            </CardTitle>
            <CardDescription>
              Data flow from React components through hooks to the Motoko backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src="/assets/generated/architecture-data-flow.dim_1200x800.png" 
              alt="Architecture diagram showing data flow from UI components through useActor and useQueries hooks to the Motoko backend, with React Query caching layer"
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Data Flow Explanation:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>UI Components</strong> call custom hooks from useQueries.ts</li>
                <li><strong>useQueries hooks</strong> use React Query for caching and state management</li>
                <li><strong>useActor hook</strong> provides authenticated actor instance</li>
                <li><strong>Actor</strong> makes canister calls to Motoko backend</li>
                <li><strong>Backend</strong> processes requests and returns data</li>
                <li><strong>React Query</strong> caches responses and manages invalidation</li>
                <li><strong>Components</strong> re-render with updated data</li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                <strong>How queries are cached:</strong> React Query automatically caches query results using queryKey. 
                When the same query is requested again, React Query returns the cached data immediately while optionally 
                refetching in the background. This provides instant UI updates and reduces backend load.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>How mutations invalidate cache:</strong> After a mutation (create, update, delete), React Query 
                invalidates related queries using <code>queryClient.invalidateQueries()</code>. This triggers automatic 
                refetching of affected data, keeping the UI in sync with backend state.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Authentication state flow:</strong> The useInternetIdentity hook manages identity state. When a 
                user logs in, the identity is stored in context and passed to useActor, which creates an authenticated 
                actor. All subsequent canister calls include the user's principal, enabling backend authorization checks.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Generate TypeScript Declarations */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Step 1</Badge>
                Generate TypeScript Declarations
              </CardTitle>
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <CardDescription>
              Create TypeScript types from your Motoko backend code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Generate Command:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`# Generate TypeScript declarations from Motoko code
dfx generate backend

# This creates:
# - frontend/src/declarations/backend/backend.did.d.ts
# - frontend/src/declarations/backend/backend.did.js
# - frontend/src/declarations/backend/index.js`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example Generated Types:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// frontend/src/declarations/backend/backend.did.d.ts
export interface UserProfile {
  userId: Principal;
  displayName?: string;
  email?: string;
  registrationDate: bigint;
  creditsConsumed: bigint;
  totalCreditsAllowed: bigint;
}

export interface backendInterface {
  getCallerUserProfile(): Promise<UserProfile | null>;
  saveCallerUserProfile(profile: UserProfile): Promise<void>;
  consumeCredits(amount: bigint): Promise<boolean>;
  // ... other methods
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Auto-generation:</strong> Run <code>dfx generate</code> after every backend change to keep 
                TypeScript types in sync with your Motoko code.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: useActor Hook Implementation */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Step 2</Badge>
                useActor Hook Implementation
              </CardTitle>
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <CardDescription>
              Create authenticated actor instances for backend communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>How useActor works:</strong> The useActor hook creates an authenticated actor instance that 
                communicates with your Motoko backend. It automatically handles identity changes, manages loading states, 
                and provides the actor to child components.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Key responsibilities:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>Creates HttpAgent with correct host and identity</li>
                <li>Initializes actor with generated interface</li>
                <li>Handles identity updates when user logs in/out</li>
                <li>Provides loading state while actor is being created</li>
                <li>Automatically fetches local canister IDs in development</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Using useActor in Components:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useActor } from '../hooks/useActor';

function MyComponent() {
  const { actor, isFetching } = useActor();
  
  const fetchProfile = async () => {
    if (!actor) return;
    
    try {
      const profile = await actor.getCallerUserProfile();
      console.log('Profile:', profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  
  if (isFetching) {
    return <div>Loading actor...</div>;
  }
  
  return (
    <button onClick={fetchProfile}>
      Fetch Profile
    </button>
  );
}`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">useActor API:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>actor:</strong> The authenticated actor instance (null while loading)</li>
                <li><strong>isFetching:</strong> True while actor is being created or updated</li>
                <li><strong>Auto-updates:</strong> Actor recreates when identity changes (login/logout)</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-3">Typical Usage Pattern:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// 1. Get actor from useActor hook
const { actor, isFetching } = useActor();

// 2. Use actor in React Query hooks (see useQueries.ts)
const query = useQuery({
  queryKey: ['profile'],
  queryFn: async () => {
    if (!actor) throw new Error('Actor not available');
    return actor.getCallerUserProfile();
  },
  enabled: !!actor && !isFetching,
});

// 3. Actor automatically includes caller identity
// Backend receives: shared({ caller }) func getCallerUserProfile()`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: React Query Integration */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Step 3</Badge>
                React Query Integration
              </CardTitle>
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <CardDescription>
              Manage server state with React Query for caching and automatic refetching
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>React Query manages canister call caching and invalidation:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li><strong>queryKey patterns:</strong> Unique identifiers for each query (e.g., ['profile'], ['tools'], ['favorites'])</li>
                <li><strong>Caching strategy:</strong> Queries are cached for 5 minutes (staleTime), reducing backend calls</li>
                <li><strong>Automatic refetch:</strong> Stale queries refetch in background when components mount</li>
                <li><strong>staleTime configuration:</strong> Set to 5 minutes globally, can be overridden per query</li>
                <li><strong>Mutation invalidation:</strong> After mutations, related queries are invalidated and refetched</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Query Hook (frontend/src/hooks/useQueries.ts)</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

// Query hook - fetches and caches data
export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

// Mutation hook - modifies data and invalidates cache
export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      // Invalidate and refetch profile query
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Using Queries in Components:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';

function ProfileEditor() {
  const { data: profile, isLoading, error } = useGetCallerUserProfile();
  const saveMutation = useSaveCallerUserProfile();
  
  const handleSave = async (newProfile: UserProfile) => {
    try {
      await saveMutation.mutateAsync(newProfile);
      // Profile query automatically refetches after save
    } catch (error) {
      console.error('Save failed:', error);
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>{profile?.displayName || 'No name set'}</h2>
      <button 
        onClick={() => handleSave({ ...profile, displayName: 'New Name' })}
        disabled={saveMutation.isPending}
      >
        {saveMutation.isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">React Query Benefits:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Automatic caching reduces backend load</li>
                <li>Background refetching keeps data fresh</li>
                <li>Built-in loading and error states</li>
                <li>Optimistic updates for better UX</li>
                <li>Automatic retry on failure</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Authentication Context Usage */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white">Step 4</Badge>
                Authentication Context Usage
              </CardTitle>
              <Code className="h-6 w-6 text-green-600" />
            </div>
            <CardDescription>
              Access authentication state throughout your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none mb-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>How InternetIdentityProvider works:</strong> The InternetIdentityProvider wraps your entire 
                application, providing authentication state to all components. Components access identity state using 
                the useInternetIdentity hook.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Login/logout flow:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>User clicks login button</li>
                <li>useInternetIdentity.login() opens Internet Identity</li>
                <li>User authenticates with biometrics/passkey</li>
                <li>Identity is stored in context and IndexedDB</li>
                <li>useActor detects identity change and creates authenticated actor</li>
                <li>All components re-render with authenticated state</li>
                <li>Backend receives caller principal in all requests</li>
              </ol>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">App Setup with Provider:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// frontend/src/main.tsx
import { InternetIdentityProvider } from './hooks/useInternetIdentity';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </InternetIdentityProvider>
  </React.StrictMode>
);`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Using Authentication in Components:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useInternetIdentity } from '../hooks/useInternetIdentity';

function Header() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  
  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Principal: {identity.getPrincipal().toString()}</span>
          <button onClick={clear}>Logout</button>
        </>
      ) : (
        <button onClick={login} disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
      )}
    </header>
  );
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Source files:</strong> See <code>frontend/src/hooks/useInternetIdentity.ts</code> for the 
                authentication hook and <code>frontend/src/hooks/useActor.ts</code> for actor creation logic.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Error Handling */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              Error Handling Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Handling Backend Errors:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useGetCallerUserProfile } from '../hooks/useQueries';

function ProfileDisplay() {
  const { data, isLoading, error } = useGetCallerUserProfile();
  
  if (isLoading) {
    return <div>Loading profile...</div>;
  }
  
  if (error) {
    // Handle different error types
    if (error.message.includes('Unauthorized')) {
      return <div>Please log in to view your profile</div>;
    }
    return <div>Error loading profile: {error.message}</div>;
  }
  
  if (!data) {
    return <div>No profile found. Please create one.</div>;
  }
  
  return <div>Welcome, {data.displayName}!</div>;
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Handling Mutation Errors:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';

function ProfileEditor() {
  const saveMutation = useSaveCallerUserProfile();
  
  const handleSave = async (profile: UserProfile) => {
    try {
      await saveMutation.mutateAsync(profile);
      toast.success('Profile saved successfully!');
    } catch (error: any) {
      if (error.message.includes('Unauthorized')) {
        toast.error('You must be logged in to save your profile');
      } else {
        toast.error(\`Failed to save profile: \${error.message}\`);
      }
    }
  };
  
  return (
    <button 
      onClick={() => handleSave(newProfile)}
      disabled={saveMutation.isPending}
    >
      {saveMutation.isPending ? 'Saving...' : 'Save Profile'}
    </button>
  );
}`}
              </pre>
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
              Your frontend and backend are connected! Continue with:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/motoko-backend-patterns" className="text-blue-600 hover:underline">
                  Motoko Backend Patterns
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Backend best practices</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/tool-architecture" className="text-blue-600 hover:underline">
                  Tool Architecture Reference
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Component patterns</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/canister-deployment" className="text-blue-600 hover:underline">
                  Canister Deployment
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Deploy to mainnet</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
