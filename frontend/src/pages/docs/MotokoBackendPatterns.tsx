import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Lock, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import PdfDownloadButton from '@/components/docs/PdfDownloadButton';

export default function MotokoBackendPatterns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Motoko Backend Patterns</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-3xl">
            Practical code examples and best practices for building robust Motoko backends on the Internet Computer. 
            Learn stable variables, async patterns, authorization, error handling, and query optimization.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <PdfDownloadButton />

        {/* Actor Lifecycle Diagram */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-purple-600" />
              Actor Lifecycle and State Persistence
            </CardTitle>
            <CardDescription>
              Understanding how Motoko actors manage state across upgrades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src="/assets/generated/motoko-lifecycle.dim_1200x600.png" 
              alt="Motoko actor lifecycle showing initialization, stable variable persistence during upgrades, and the upgrade process"
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                Motoko actors follow a specific lifecycle that includes initialization, normal operation, and upgrades. 
                During upgrades, stable variables preserve their state while regular variables are reset. This diagram 
                illustrates the complete flow from initial deployment through multiple upgrade cycles.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>When upgrades occur:</strong> Upgrades happen when you redeploy your canister with <code>dfx deploy</code> 
                or <code>dfx canister install --mode upgrade</code>. The upgrade process preserves stable variables, 
                allowing your application to maintain critical state across code updates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 1: Stable Variables */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 1</Badge>
                Stable Variables for State Persistence
              </CardTitle>
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Preserve data across canister upgrades using stable variables
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use stable variables for any data that must survive canister upgrades, 
                such as user profiles, application state, or configuration. Without stable variables, all data is lost 
                during upgrades.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Example: User Profile Storage
              </h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  // Stable variable - persists across upgrades
  stable let userProfiles = Map.empty<Principal, UserProfile>();
  
  type UserProfile = {
    userId: Principal;
    displayName: ?Text;
    email: ?Text;
    registrationDate: Int;
    creditsConsumed: Nat;
    totalCreditsAllowed: Nat;
  };
  
  // Save user profile - data persists after upgrade
  public shared({ caller }) func saveCallerUserProfile(profile: UserProfile) : async () {
    if (profile.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save profile for another user");
    };
    userProfiles.add(caller, profile);
  };
  
  // Retrieve user profile
  public query({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Best Practice:</strong> Always use stable variables for Maps, arrays, and any data structures 
                that store application state. Regular variables are reset to their initial values during upgrades.
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Common Pitfalls:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Forgetting to mark critical data structures as stable</li>
                <li>Using non-stable types in stable variables (some types can't be stable)</li>
                <li>Not testing upgrade scenarios before deploying to mainnet</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 2: Async/Await for Inter-Canister Calls */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 2</Badge>
                Async/Await Patterns
              </CardTitle>
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Handle asynchronous operations and inter-canister calls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use async functions for update calls that modify state or make 
                inter-canister calls. Async operations allow the canister to wait for responses without blocking.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Consuming Credits with Async Logic</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`public shared({ caller }) func consumeCredits(amount: Nat) : async Bool {
  // Check authorization
  if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
    Runtime.trap("Unauthorized: Only users can consume credits");
  };
  
  // Async operation - retrieve profile
  switch (userProfiles.get(caller)) {
    case (?profile) {
      let remainingCredits = profile.totalCreditsAllowed - profile.creditsConsumed;
      
      // Check if sufficient credits
      if (remainingCredits < amount) {
        return false; // Insufficient credits
      };
      
      // Update profile with new credit balance
      let updatedProfile : UserProfile = {
        userId = profile.userId;
        registrationDate = profile.registrationDate;
        email = profile.email;
        displayName = profile.displayName;
        creditsConsumed = profile.creditsConsumed + amount;
        totalCreditsAllowed = profile.totalCreditsAllowed;
      };
      
      userProfiles.add(caller, updatedProfile);
      true; // Success
    };
    case (null) { 
      Runtime.trap("Profile not found for caller");
    };
  };
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Best Practice:</strong> Use async for update calls and inter-canister communication. 
                Use query for read-only operations that don't modify state - they're faster and don't require consensus.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Pattern 3: Principal-Based Authorization */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 3</Badge>
                Principal-Based Authorization
              </CardTitle>
              <Lock className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Implement role-based access control using caller principals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use principal-based authorization for any operation that requires 
                user authentication or role-based permissions. The <code>caller</code> parameter provides the 
                authenticated principal making the request.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Admin-Only Operations</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  
  // Admin-only function to update user credits
  public shared({ caller }) func updateProfileCredits(
    userId: Principal, 
    totalCreditsAllowed: Nat
  ) : async () {
    // Check if caller is admin
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update profile credits");
    };
    
    // Proceed with admin operation
    switch (userProfiles.get(userId)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = profile.displayName;
          creditsConsumed = 0; // Reset consumed credits
          totalCreditsAllowed;
        };
        userProfiles.add(userId, updatedProfile);
      };
      case (null) { 
        Runtime.trap("Profile not found for user");
      };
    };
  };
  
  // User can only access their own data
  public shared({ caller }) func editDisplayName(newDisplayName: ?Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can edit their display name");
    };
    
    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = newDisplayName; // Update display name
          creditsConsumed = profile.creditsConsumed;
          totalCreditsAllowed = profile.totalCreditsAllowed;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) { 
        Runtime.trap("Profile not found for caller");
      };
    };
  };
}`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Authorization Patterns:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Admin-only:</strong> Check <code>AccessControl.isAdmin()</code> before sensitive operations</li>
                <li><strong>User-only:</strong> Check <code>AccessControl.hasPermission(caller, #user)</code></li>
                <li><strong>Self-only:</strong> Verify <code>caller == userId</code> for personal data access</li>
                <li><strong>Public:</strong> No authorization check needed for public read operations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 4: Error Handling with Runtime.trap */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 4</Badge>
                Error Handling with Runtime.trap
              </CardTitle>
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Handle errors gracefully and provide meaningful error messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use <code>Runtime.trap()</code> to halt execution and return an error 
                message to the caller. This is the primary error handling mechanism in Motoko for unrecoverable errors.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Validation and Error Handling</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import Runtime "mo:core/Runtime";

public shared({ caller }) func recordToolUsage(
  userId: Principal, 
  toolId: Text
) : async () {
  // Authorization check
  if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
    Runtime.trap("Unauthorized: Can only record your own tool usage");
  };
  
  // Validation check
  if (toolId == "") {
    Runtime.trap("Invalid input: toolId cannot be empty");
  };
  
  // Business logic
  let currentCount = switch (toolUsageCounts.get(toolId)) {
    case (null) { 0 };
    case (?count) { count };
  };
  
  toolUsageCounts.add(toolId, currentCount + 1);
};

// Alternative: Using Result type for recoverable errors
public shared({ caller }) func consumeCreditsWithResult(
  amount: Nat
) : async Result.Result<(), Text> {
  switch (userProfiles.get(caller)) {
    case (?profile) {
      let remainingCredits = profile.totalCreditsAllowed - profile.creditsConsumed;
      
      if (remainingCredits < amount) {
        // Return error without trapping
        return #err("Insufficient credits: " # Nat.toText(remainingCredits) # " available");
      };
      
      // Update profile...
      #ok(());
    };
    case (null) { 
      #err("Profile not found");
    };
  };
}`}
              </pre>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Best Practice:</strong> Use <code>Runtime.trap()</code> for unrecoverable errors (authorization, 
                invalid state). Use Result types for recoverable errors where the caller should handle the failure gracefully.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Pattern 5: Query vs Update Optimization */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 5</Badge>
                Query vs Update Method Optimization
              </CardTitle>
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Choose the right method type for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use <code>query</code> for read-only operations that don't modify state. 
                Queries are fast (2-3 seconds) and don't require consensus. Use update calls for state-changing operations 
                (4-6 seconds, requires consensus).
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Query vs Update Methods</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// QUERY - Fast, read-only, no state changes
public query({ caller }) func getCallerUserProfile() : async ?UserProfile {
  if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
    Runtime.trap("Unauthorized: Only users can access profiles");
  };
  userProfiles.get(caller); // Just reading data
};

// QUERY - Fast retrieval of usage counts
public query({ caller }) func getAllToolUsageCounts() : async [(Text, Nat)] {
  toolUsageCounts.toArray(); // Read-only operation
};

// UPDATE - Modifies state, requires consensus
public shared({ caller }) func saveCallerUserProfile(
  profile: UserProfile
) : async () {
  if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
    Runtime.trap("Unauthorized: Only users can save profiles");
  };
  if (profile.userId != caller) {
    Runtime.trap("Unauthorized: Cannot save profile for another user");
  };
  userProfiles.add(caller, profile); // Modifying state
};

// UPDATE - State-changing operation
public shared({ caller }) func recordToolUsage(
  userId: Principal, 
  toolId: Text
) : async () {
  if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
    Runtime.trap("Unauthorized: Can only record your own tool usage");
  };
  
  let currentCount = switch (toolUsageCounts.get(toolId)) {
    case (null) { 0 };
    case (?count) { count };
  };
  toolUsageCounts.add(toolId, currentCount + 1); // Modifying state
}`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Performance Comparison:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Query calls:</strong> 2-3 seconds, no consensus, read-only, up to ~2MB response</li>
                <li><strong>Update calls:</strong> 4-6 seconds, requires consensus, can modify state</li>
                <li><strong>Rule of thumb:</strong> If it doesn't change state, make it a query</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 6: Shared Function Patterns */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 6</Badge>
                Shared Function Patterns with Caller Context
              </CardTitle>
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Access caller identity in shared functions for authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use the shared function pattern with caller context for any function that needs 
                to know who is calling it. This is essential for authentication, authorization, and user-specific operations.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Caller Context Patterns</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// Pattern 1: Shared update with caller
public shared({ caller }) func saveCurrentUserFavorites(
  favorites: UserFavorites
) : async () {
  // Verify caller matches the userId in the data
  if (favorites.userId != caller) {
    Runtime.trap("Unauthorized: Cannot save favorites for another user");
  };
  userFavorites.add(caller, favorites);
};

// Pattern 2: Shared query with caller
public query({ caller }) func getCurrentUserPreferences() : async ?UserPreferences {
  if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
    Runtime.trap("Unauthorized: Only users can access preferences");
  };
  userPreferences.get(caller);
};

// Pattern 3: Admin check with caller
public shared({ caller }) func listAllCreditBalances() : async [UserCreditStatus] {
  if (not AccessControl.isAdmin(accessControlState, caller)) {
    Runtime.trap("Unauthorized: Only admins can view credit balances");
  };
  
  userProfiles.values().toArray().map(
    func(profile) {
      {
        userId = profile.userId;
        displayName = switch (profile.displayName) { 
          case (?name) { name }; 
          case (null) { "" } 
        };
        totalCreditsAllowed = profile.totalCreditsAllowed;
        creditsConsumed = profile.creditsConsumed;
        creditsRemaining = if (profile.totalCreditsAllowed > profile.creditsConsumed) {
          profile.totalCreditsAllowed - profile.creditsConsumed;
        } else { 0 };
      };
    }
  );
};

// Pattern 4: Flexible authorization (self or admin)
public shared({ caller }) func addSearchHistory(
  userId: Principal, 
  searchQuery: Text, 
  resultCount: Nat
) : async () {
  // Allow user to add their own history OR admin to add any history
  if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
    Runtime.trap("Unauthorized: Can only add your own search history");
  };
  
  let newSearch : SearchHistory = {
    userId;
    searchQuery;
    timestamp = Time.now();
    resultsCount = resultCount;
  };
  searchHistory := searchHistory.concat([newSearch]);
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 7: Data Structure Best Practices */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 7</Badge>
                Data Structure Best Practices with mo:core Map
              </CardTitle>
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Efficient data storage using Map from mo:core library
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> Use <code>Map</code> from mo:core for key-value storage with O(log n) 
                lookup performance. Maps are more efficient than arrays for large datasets and support stable storage.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Using Map for Efficient Storage</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

actor {
  // Map with Principal keys for user data
  stable let userProfiles = Map.empty<Principal, UserProfile>();
  
  // Map with Text keys for tool usage tracking
  stable let toolUsageCounts = Map.empty<Text, Nat>();
  
  // Map with Nat keys for tool categories
  stable let toolCategories = Map.empty<Nat, ToolCategory>();
  
  // Adding to a Map
  public shared({ caller }) func saveProfile(profile: UserProfile) : async () {
    userProfiles.add(caller, profile);
  };
  
  // Getting from a Map (returns Option type)
  public query({ caller }) func getProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };
  
  // Checking if key exists
  public query func hasProfile(userId: Principal) : async Bool {
    switch (userProfiles.get(userId)) {
      case (null) { false };
      case (?_) { true };
    };
  };
  
  // Iterating over Map values
  public query func getAllProfiles() : async [UserProfile] {
    userProfiles.values().toArray();
  };
  
  // Iterating over Map entries (key-value pairs)
  public query func getAllToolUsage() : async [(Text, Nat)] {
    toolUsageCounts.toArray();
  };
  
  // Filtering Map values
  public query func getActiveUsers() : async [UserProfile] {
    let profiles = userProfiles.values().toArray();
    profiles.filter(func(profile) { 
      profile.creditsConsumed > 0 
    });
  };
  
  // Updating a value in Map
  public shared({ caller }) func incrementToolUsage(toolId: Text) : async () {
    let currentCount = switch (toolUsageCounts.get(toolId)) {
      case (null) { 0 };
      case (?count) { count };
    };
    toolUsageCounts.add(toolId, currentCount + 1);
  };
}`}
              </pre>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Map Best Practices:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Use Map for key-value storage with frequent lookups</li>
                <li>Always handle the Option type returned by <code>get()</code></li>
                <li>Use <code>values().toArray()</code> to get all values</li>
                <li>Use <code>toArray()</code> to get all key-value pairs</li>
                <li>Mark Maps as stable to preserve data across upgrades</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Pattern 8: Single-Actor Architecture */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-purple-600 text-white">Pattern 8</Badge>
                Single-Actor Architecture Pattern
              </CardTitle>
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <CardDescription>
              Organize all backend logic in a single actor for simplicity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>When to use:</strong> For most applications, a single-actor architecture is sufficient and 
                simplifies development. All state and functions live in one actor, making it easier to manage and deploy.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Example: Single-Actor Structure</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

// Import mixins for modular functionality
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  // ========== State Variables ==========
  stable let userProfiles = Map.empty<Principal, UserProfile>();
  stable let userFavorites = Map.empty<Principal, UserFavorites>();
  stable let toolUsageCounts = Map.empty<Text, Nat>();
  
  // ========== Include Mixins ==========
  include MixinStorage();
  
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  
  // ========== Type Definitions ==========
  type UserProfile = {
    userId: Principal;
    displayName: ?Text;
    email: ?Text;
    registrationDate: Int;
    creditsConsumed: Nat;
    totalCreditsAllowed: Nat;
  };
  
  // ========== User Profile Functions ==========
  public query({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };
  
  public shared({ caller }) func saveCallerUserProfile(
    profile: UserProfile
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save profile for another user");
    };
    userProfiles.add(caller, profile);
  };
  
  // ========== Tool Usage Functions ==========
  public shared({ caller }) func recordToolUsage(
    userId: Principal, 
    toolId: Text
  ) : async () {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only record your own tool usage");
    };
    
    let currentCount = switch (toolUsageCounts.get(toolId)) {
      case (null) { 0 };
      case (?count) { count };
    };
    toolUsageCounts.add(toolId, currentCount + 1);
  };
  
  public query func getAllToolUsageCounts() : async [(Text, Nat)] {
    toolUsageCounts.toArray();
  };
  
  // ========== Admin Functions ==========
  public shared({ caller }) func updateProfileCredits(
    userId: Principal, 
    totalCreditsAllowed: Nat
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update profile credits");
    };
    
    switch (userProfiles.get(userId)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = profile.displayName;
          creditsConsumed = 0;
          totalCreditsAllowed;
        };
        userProfiles.add(userId, updatedProfile);
      };
      case (null) { 
        Runtime.trap("Profile not found for user");
      };
    };
  };
}`}
              </pre>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Benefits:</strong> Single-actor architecture simplifies deployment, reduces inter-canister 
                call overhead, and makes state management straightforward. Use mixins to organize code into logical modules.
              </AlertDescription>
            </Alert>
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
              Continue learning with these related guides:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">→</Badge>
                <a href="/docs/frontend-backend-integration" className="text-blue-600 hover:underline">
                  Frontend-Backend Integration
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Connect React to Motoko</span>
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
                <a href="/docs/troubleshooting" className="text-blue-600 hover:underline">
                  Troubleshooting Guide
                </a>
                <span className="text-gray-600 dark:text-gray-400">- Solve common issues</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
