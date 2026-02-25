import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Layout, Home, Grid, FileText, User, Shield, Info, Code } from 'lucide-react';

export default function DynamicPages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Dynamic Pages</h1>
          </div>
          <p className="text-xl text-pink-100 max-w-3xl">
            Comprehensive documentation of all dynamic pages including Homepage, Category pages, Tool pages, 
            Dashboard, and Admin pages with their architecture, components, and data flow patterns.
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
              <li><a href="#homepage" className="text-blue-600 hover:underline">1. Homepage</a></li>
              <li><a href="#category-pages" className="text-blue-600 hover:underline">2. Category Pages</a></li>
              <li><a href="#tool-pages" className="text-blue-600 hover:underline">3. Tool Pages</a></li>
              <li><a href="#dashboard" className="text-blue-600 hover:underline">4. Dashboard</a></li>
              <li><a href="#admin-pages" className="text-blue-600 hover:underline">5. Admin Pages</a></li>
              <li><a href="#component-hierarchy" className="text-blue-600 hover:underline">6. Component Hierarchy</a></li>
            </ul>
          </CardContent>
        </Card>

        {/* Component Hierarchy Diagram */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-pink-600" />
              Component Hierarchy Overview
            </CardTitle>
            <CardDescription>
              Visual representation of page components and their relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src="/assets/generated/component-hierarchy.dim_1000x800.png" 
              alt="Component hierarchy diagram showing page structure and nested components"
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Component Tree Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`App (Layout)
├── HomePage
│   ├── HeroSection
│   ├── FeaturedToolsGrid
│   ├── CategoryCards
│   ├── PopularToolsByCategory
│   ├── NewToolsSection
│   └── Sidebar
│       ├── TrendingTools
│       ├── QuickCategoryShortcuts
│       └── RecentBlogPosts
├── CategoryPage
│   ├── CategoryHero
│   ├── Breadcrumbs
│   ├── ToolGrid
│   └── Sidebar
├── Tool Pages
│   └── ToolPageTemplate
│       ├── ToolHero
│       ├── Breadcrumbs
│       ├── [Tool Component]
│       ├── AboutTheTool
│       ├── UsabilityGuide
│       ├── FAQs
│       ├── Testimonials
│       ├── PerformanceMetrics
│       └── RelatedTools
├── Dashboard (Auth Required)
│   ├── ProfileSection
│   ├── CreditBalance
│   ├── UsageStats
│   └── QuickActions
└── Admin Pages (Admin Auth Required)
    ├── AdminDashboard
    ├── CreditManagement
    ├── ToolManagement
    └── [Other Admin Pages]`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Homepage */}
        <Card id="homepage" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">1</Badge>
              Homepage
            </CardTitle>
            <CardDescription>
              Main landing page with hero, featured tools, categories, and sidebar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/HomePage.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/</code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Homepage Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <HeroSection />
      
      {/* Main Content Grid with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Tools */}
            <FeaturedToolsGrid />
            
            {/* New Tools */}
            <NewToolsSection />
            
            {/* Category Cards */}
            <CategoryCards />
            
            {/* Popular Tools by Category */}
            <PopularToolsByCategory />
            
            {/* Trust Signals */}
            <TrustSignals />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Components:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>HeroSection:</strong> Full-width hero with background image (<code>/assets/generated/hero-bg.dim_1920x800.png</code>), search functionality, and CTA buttons</li>
                <li><strong>FeaturedToolsGrid:</strong> Displays 6 featured tools with dynamic icons and corrected routing using <code>getToolPath</code> utility</li>
                <li><strong>CategoryCards:</strong> Shows all 16 categories with icons, descriptions, and tool counts</li>
                <li><strong>PopularToolsByCategory:</strong> Displays up to 4 tools per category with "View All" links</li>
                <li><strong>NewToolsSection:</strong> Highlights recently added tools with "New" badges</li>
                <li><strong>Sidebar:</strong> Contains TrendingTools, QuickCategoryShortcuts, and RecentBlogPosts widgets</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Routing Pattern:</strong> All tool links use <code>getToolPath(tool)</code> utility to generate 
                correct category-based URLs like <code>/tools/calculators/percentage-calculator</code>.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Category Pages */}
        <Card id="category-pages" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">2</Badge>
              Category Pages
            </CardTitle>
            <CardDescription>
              Filtered tool listings by category with search and sort
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/CategoryPage.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/category/$categorySlug</code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Category Page Implementation:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export default function CategoryPage() {
  const { categorySlug } = useParams({ from: '/category/$categorySlug' });
  
  // Find category from constants
  const category = TOOL_CATEGORIES.find(cat => cat.id === categorySlug);
  
  // Filter tools by category
  const categoryTools = ALL_TOOLS.filter(
    tool => tool.category === category?.name
  );
  
  return (
    <div className="min-h-screen">
      {/* Category Hero with Gradient Background */}
      <CategoryHero 
        category={category}
        backgroundImage={\`/assets/generated/category-\${categorySlug}-hero-gradient.dim_1200x400.png\`}
      />
      
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Filters and Sort */}
            <CategoryFilters />
            
            {/* Tool Grid */}
            <ToolGrid tools={categoryTools} />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Category Hero Backgrounds:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-700 dark:text-gray-300">
                <li><code>/assets/generated/category-calculators-hero-gradient.dim_1200x400.png</code></li>
                <li><code>/assets/generated/category-converters-hero-gradient.dim_1200x400.png</code></li>
                <li><code>/assets/generated/category-generators-hero-gradient.dim_1200x400.png</code></li>
                <li><code>/assets/generated/category-analyzers-hero-gradient.dim_1200x400.png</code></li>
                <li>...and 12 more category-specific gradients</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tool Pages */}
        <Card id="tool-pages" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">3</Badge>
              Tool Pages
            </CardTitle>
            <CardDescription>
              Individual tool pages using ToolPageTemplate pattern
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/tools/[category]/[ToolName].tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Template:</strong> <code>frontend/src/pages/tools/ToolPageTemplate.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route Pattern:</strong> <code>/tools/$category/$toolSlug</code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Tool Page Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { ALL_TOOLS } from '@/constants/tools';
import ToolPageTemplate from './ToolPageTemplate';

export default function PercentageCalculator() {
  const tool = ALL_TOOLS.find(t => t.id === 'percentage-calculator');
  
  // Tool-specific state and logic
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  
  const handleCalculate = () => {
    const val = parseFloat(value);
    const pct = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(pct)) {
      setResult((val * pct) / 100);
    }
  };
  
  return (
    <ToolPageTemplate tool={tool}>
      {/* Tool-specific UI */}
      <Card>
        <CardHeader>
          <CardTitle>Calculate Percentage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              label="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Input 
              label="Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <Button onClick={handleCalculate}>Calculate</Button>
            {result !== null && (
              <div className="text-2xl font-bold">
                Result: {result}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">ToolPageTemplate Features:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>ToolHero:</strong> Gradient background specific to each tool (<code>/assets/generated/tool-[slug]-hero-gradient.dim_1200x400.png</code>)</li>
                <li><strong>Breadcrumbs:</strong> Navigation path (Home → Category → Tool)</li>
                <li><strong>Tool Component:</strong> Passed as children to template</li>
                <li><strong>AboutTheTool:</strong> Four subsections (Introduction, Key Features, Who Benefits, Why Choose)</li>
                <li><strong>UsabilityGuide:</strong> Step-by-step instructions with numbered steps</li>
                <li><strong>FAQs:</strong> Accordion-style frequently asked questions</li>
                <li><strong>Testimonials:</strong> User reviews with ratings</li>
                <li><strong>PerformanceMetrics:</strong> Speed, accuracy, reliability indicators</li>
                <li><strong>RelatedTools:</strong> Sidebar with similar tools</li>
                <li><strong>Usage Tracking:</strong> Automatic recording via <code>useRecordToolUsage</code> hook</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard */}
        <Card id="dashboard" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">4</Badge>
              Dashboard
            </CardTitle>
            <CardDescription>
              User dashboard requiring authentication with profile and usage data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/Dashboard.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/dashboard</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Authentication:</strong> Required via Internet Identity
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Dashboard Implementation:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export default function Dashboard() {
  const { identity, isLoggingIn } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: creditBalance } = useGetCreditBalance(identity?.getPrincipal());
  const { data: favorites } = useGetCurrentUserFavorites();
  
  // Redirect if not authenticated
  if (!identity && !isLoggingIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert>
          <AlertDescription>
            Please log in to access your dashboard.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {userProfile?.displayName || 'Not set'}</p>
            <p>Email: {userProfile?.email || 'Not set'}</p>
          </CardContent>
        </Card>
        
        {/* Credit Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {creditBalance?.creditsRemaining || 0}
            </p>
            <p className="text-sm text-gray-600">
              of {creditBalance?.totalCreditsAllowed || 0} total
            </p>
          </CardContent>
        </Card>
        
        {/* Favorite Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Favorite Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{favorites?.favoriteToolIds.length || 0} tools saved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`}
              </pre>
            </div>

            <Alert>
              <User className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Profile Setup:</strong> On first login, users are prompted to set their display name via 
                <code>saveCallerUserProfile</code>. The profile modal only shows when <code>userProfile === null</code> 
                and <code>isFetched === true</code> to prevent flashing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Admin Pages */}
        <Card id="admin-pages" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">5</Badge>
              Admin Pages
            </CardTitle>
            <CardDescription>
              Administrative interfaces with hardcoded authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/admin/</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route Pattern:</strong> <code>/admin/*</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Authentication:</strong> Hardcoded credentials (mamamadhur@gmail.com / Admin@1988!!)
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Admin Authentication Guard:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// frontend/src/components/AdminAuthGuard.tsx
export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, [isAuthenticated, isLoading]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
}

// Usage in App.tsx
const creditManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/credits',
  component: () => (
    <AdminAuthGuard>
      <CreditManagement />
    </AdminAuthGuard>
  ),
});`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Admin Pages List:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Dashboard:</strong> Overview statistics and quick actions</li>
                <li><strong>Credit Management:</strong> View and update user credit balances</li>
                <li><strong>Tool Management:</strong> Add tool metadata definitions</li>
                <li><strong>Tools Diagnostic:</strong> View all tools with metadata completeness</li>
                <li><strong>Usage Analytics:</strong> Aggregate usage statistics (placeholder)</li>
                <li><strong>Quota Management:</strong> Configure usage limits (frontend-only)</li>
                <li><strong>Blog Management:</strong> Coming soon placeholder</li>
                <li><strong>User Management:</strong> Coming soon placeholder</li>
                <li><strong>Forum Moderation:</strong> Coming soon placeholder</li>
                <li><strong>User Statistics:</strong> Coming soon placeholder</li>
                <li><strong>Reset User Stats:</strong> Coming soon placeholder</li>
              </ul>
            </div>

            <Alert className="border-amber-500">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Security Note:</strong> Admin authentication uses hardcoded credentials stored in 
                <code>useAdminAuth</code> hook with localStorage session persistence. This is suitable for 
                development but should be replaced with proper backend authentication for production.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Component Hierarchy Details */}
        <Card id="component-hierarchy" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-pink-600 text-white">6</Badge>
              Component Hierarchy Details
            </CardTitle>
            <CardDescription>
              Detailed breakdown of component composition and data flow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Data Fetching Patterns:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// Page-level data fetching with React Query
export default function CategoryPage() {
  // Get route params
  const { categorySlug } = useParams();
  
  // Fetch data using custom hooks
  const { data: tools, isLoading } = useGetAllTools();
  const { data: usageCounts } = useGetAllToolUsageCounts();
  
  // Filter and transform data
  const categoryTools = useMemo(() => {
    return tools?.filter(t => t.category === categorySlug) || [];
  }, [tools, categorySlug]);
  
  // Pass data to child components
  return (
    <div>
      <ToolGrid tools={categoryTools} usageCounts={usageCounts} />
    </div>
  );
}

// Component-level data consumption
function ToolGrid({ tools, usageCounts }: Props) {
  // Use data directly without additional fetching
  return (
    <div className="grid grid-cols-3 gap-4">
      {tools.map(tool => (
        <ToolCard 
          key={tool.id} 
          tool={tool}
          usageCount={usageCounts?.[tool.id] || 0}
        />
      ))}
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Prop Passing vs Context:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Props:</strong> Used for component-specific data (tool metadata, display options)</li>
                <li><strong>Context:</strong> Used for app-wide state (authentication, theme, admin auth)</li>
                <li><strong>React Query:</strong> Used for server state (user profiles, favorites, tool data)</li>
                <li><strong>Local State:</strong> Used for UI controls (form inputs, modals, filters)</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Routing Integration:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// TanStack Router route parameters
const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categorySlug',
  component: CategoryPage,
});

// Accessing params in component
function CategoryPage() {
  const { categorySlug } = useParams({ from: '/category/$categorySlug' });
  // Use categorySlug to filter tools
}

// Programmatic navigation
function ToolCard({ tool }: Props) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate({ to: getToolPath(tool) });
  };
  
  return <div onClick={handleClick}>...</div>;
}`}
              </pre>
            </div>
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
                <a href="/docs/static-pages-content" className="text-blue-600 hover:underline">
                  → Static Pages Content Documentation
                </a>
              </li>
              <li>
                <a href="/docs/technology-stack" className="text-blue-600 hover:underline">
                  → Technology Stack Documentation
                </a>
              </li>
              <li>
                <a href="/docs/tool-architecture" className="text-blue-600 hover:underline">
                  → Tool Architecture Reference
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
