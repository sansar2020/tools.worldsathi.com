import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Layout, Database, Shield, Zap } from 'lucide-react';

export default function ProjectSpecification() {
  const toolCategories = [
    { name: 'Calculators', count: 9, tools: ['Percentage Calculator', 'BMI Calculator', 'Tip Calculator', 'Loan Calculator', 'Compound Interest Calculator', 'Calorie Calculator', 'Age Calculator', 'Date Calculator', 'Discount Calculator', 'Standard Deviation Calculator', 'Percentage Change Calculator', 'Mortgage Calculator'] },
    { name: 'Converters', count: 8, tools: ['Unit Converter', 'Currency Converter', 'Temperature Converter', 'Time Zone Converter', 'Weight Converter', 'Area Converter', 'Speed Converter', 'Number Base Converter'] },
    { name: 'Generators', count: 11, tools: ['Password Generator', 'QR Code Generator', 'Lorem Ipsum Generator', 'UUID Generator', 'Color Palette Generator', 'Gradient Pattern Generator', 'Gradient Art Studio', 'SVG Pattern Designer', 'Mesh Gradient Creator', 'Barcode Generator', 'Username Generator'] },
    { name: 'Analyzers', count: 4, tools: ['Text Analyzer', 'Color Palette Extractor', 'Readability Analyzer', 'Keyword Density Checker'] },
    { name: 'Image Tools', count: 4, tools: ['Image Resizer', 'Image Compressor', 'Image Format Converter', 'Duotone Image Filter'] },
    { name: 'SEO Tools', count: 3, tools: ['Meta Tags Generator', 'Keyword Density Checker', 'Open Graph Preview'] },
    { name: 'Developer Tools', count: 10, tools: ['Regex Tester', 'Hash Generator', 'URL Encoder/Decoder', 'JSON to TypeScript', 'Color Code Converter', 'Lorem Ipsum Code', 'UUID Validator', 'Bcrypt Generator', 'Secure Random String', 'Favicon Generator'] },
    { name: 'Data Tools', count: 4, tools: ['JSON Formatter', 'CSV to JSON', 'Base64 Tool', 'XML to JSON Converter'] },
    { name: 'Finance Tools', count: 1, tools: ['Mortgage Calculator'] },
    { name: 'Text Tools', count: 5, tools: ['Character Counter', 'Case Converter', 'Text Reverser', 'Remove Duplicate Lines', 'Text Diff Checker'] },
    { name: 'Productivity', count: 1, tools: ['Pomodoro Timer'] },
    { name: 'Health Tools', count: 2, tools: ['BMI Calculator', 'Calorie Calculator'] },
    { name: 'Education Tools', count: 1, tools: ['Standard Deviation Calculator'] },
    { name: 'Security Tools', count: 3, tools: ['Password Generator', 'Bcrypt Generator', 'Secure Random String'] },
    { name: 'Design Tools', count: 6, tools: ['Color Palette Generator', 'Gradient Pattern Generator', 'Gradient Art Studio', 'SVG Pattern Designer', 'Mesh Gradient Creator', 'Color Code Converter'] },
    { name: 'Entertainment Tools', count: 2, tools: ['Lorem Ipsum Generator', 'Username Generator'] }
  ];

  const staticPages = [
    { 
      name: 'Homepage', 
      path: '/', 
      description: 'Hero section with search, featured tools grid (6 tools), category cards (16 categories), popular tools by category, new tools section with NEW badges, trust signals metrics, and sidebar with trending tools and recent blog posts',
      components: ['HeroSection', 'FeaturedToolsSection', 'CategoryCards', 'PopularToolsByCategory', 'NewToolsSection', 'TrustSignals', 'Sidebar']
    },
    { 
      name: 'About Us', 
      path: '/about', 
      description: 'Hero section with background image (about-hero.dim_1200x400.png), mission statement explaining platform purpose, values cards highlighting core principles, "Why Choose Us" section with benefits, and team information',
      components: ['Hero with background image', 'Mission statement', 'Values cards', 'Why Choose Us section']
    },
    { 
      name: 'Contact Us', 
      path: '/contact', 
      description: 'Hero section with background image (contact-hero.dim_1200x400.png), contact information cards (email: contact@worldsathi.com, phone, WhatsApp, physical address), and functional contact form with field validation',
      components: ['Hero with background image', 'Contact info cards', 'Contact form with validation']
    },
    { 
      name: 'Terms of Service', 
      path: '/legal/terms', 
      description: 'Comprehensive legal document covering acceptance of terms, use of services, user accounts and responsibilities, free/premium tier rules, content conduct policies, intellectual property rights, disclaimers, liability limitations, and termination policies. Last updated 2/19/2026',
      sections: ['Acceptance', 'Usage Rules', 'Accounts', 'Tiers', 'Content Conduct', 'IP Rights', 'Disclaimers', 'Liability', 'Termination']
    },
    { 
      name: 'Privacy Policy', 
      path: '/legal/privacy', 
      description: 'Privacy policy explaining blockchain storage on Internet Computer, data collection practices (user profiles, usage data, favorites), no third-party data sharing, retention periods, security measures, user rights under GDPR/CCPA, and contact information (privacy@worldsathi.com). Last updated 2/19/2026',
      sections: ['Data Collection', 'Usage', 'Retention', 'Security', 'Third-party Services', 'User Rights', 'GDPR/CCPA Compliance']
    },
    { 
      name: 'Cookie Policy', 
      path: '/legal/cookies', 
      description: 'Cookie policy documenting browser storage usage including LocalStorage for Internet Identity authentication tokens, theme preferences (light/dark mode), and usage limit tracking. Explicitly states no third-party tracking cookies are used. Last updated 2/19/2026',
      sections: ['LocalStorage Usage', 'Authentication', 'Theme Preferences', 'Usage Limits', 'No Third-party Cookies']
    },
    { 
      name: 'Data Rights', 
      path: '/legal/data-rights', 
      description: 'Interactive page with GDPR/CCPA rights information, data export request form allowing users to download their data, data deletion request form with warning message about permanent deletion, and contact information for privacy inquiries (privacy@worldsathi.com)',
      components: ['Rights information', 'Export request form', 'Deletion request form with warning', 'Privacy contact info']
    },
    {
      name: 'Legal Hub',
      path: '/legal',
      description: 'Central hub page displaying cards linking to all legal documents (Terms of Service, Privacy Policy, Cookie Policy, Data Rights) with descriptions and navigation',
      components: ['Legal document cards', 'Navigation links']
    }
  ];

  const dynamicPages = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      description: 'User dashboard displaying profile information with edit functionality, credit balance card showing consumed and remaining credits with "Check Balance" button and purchase dialog, favorites grid displaying saved tools with quick access, usage statistics (if available), and authentication requirement via useInternetIdentity hook',
      features: ['Profile display and editing', 'Credit balance with purchase dialog', 'Favorites grid', 'Usage statistics', 'Authentication guard']
    },
    { 
      name: 'Category Pages', 
      path: '/category/:categorySlug', 
      description: 'CategoryHero component with category-specific gradient backgrounds (e.g., category-calculators-hero-gradient.dim_1200x400.png), CategoryFilters with sort options (name A-Z, Z-A, popular, recent) and active filter display, ToolGrid with search and filtering capabilities, breadcrumb navigation, and sidebar on the right',
      components: ['CategoryHero', 'Breadcrumbs', 'CategoryFilters', 'ToolGrid', 'Sidebar']
    },
    { 
      name: 'Tool Pages', 
      path: '/tools/:category/:toolSlug', 
      description: 'ToolPageTemplate structure including ToolHero with tool-specific gradient backgrounds (lighter overlay for visibility), main tool interface area for functionality, UsabilityGuide with numbered steps, AboutTheTool sections (introduction, key features, who benefits, why choose), FAQ accordion, related tools sidebar, and optional PerformanceMetrics, TestimonialsSection, and ApiAccessSection components',
      components: ['ToolHero', 'Tool interface', 'UsabilityGuide', 'AboutTheTool', 'FAQ accordion', 'Related tools', 'Optional: PerformanceMetrics, Testimonials, API Access']
    },
    {
      name: 'Documentation Hub',
      path: '/docs',
      description: 'Documentation index page with two sections: Internet Computer Development (6 guides) and Project Documentation (11 guides) with descriptions, icons, and navigation links',
      sections: ['IC Development Guides', 'Project Documentation Guides']
    }
  ];

  const adminPages = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', description: 'Overview statistics cards showing total users, tools, categories, and recent activity. Management section cards with links to all admin features. Quick action buttons for common admin tasks', status: 'Implemented' },
    { name: 'Credit Management', path: '/admin/credit-management', description: 'Sortable table displaying all user credit balances with columns for user ID, display name, total credits allowed, credits consumed, and credits remaining. Summary statistics cards showing total users and average credits. Refresh functionality and inline credit editing with updateProfileCredits backend call', status: 'Implemented' },
    { name: 'Blog Management', path: '/admin/blog', description: 'Placeholder page showing "Coming Soon" message. Planned features: post editor with rich text, scheduling system, category management, draft/published status, SEO metadata fields, and featured image upload', status: 'Placeholder' },
    { name: 'Forum Moderation', path: '/admin/forum', description: 'Placeholder page showing "Coming Soon" message. Planned features: thread management interface, user moderation tools, content flagging system, ban/warning capabilities, and moderation logs', status: 'Placeholder' },
    { name: 'Tool Management', path: '/admin/tools', description: 'Form interface for adding tool metadata definitions including name, slug, description, category dropdown (using category.id), icon name, and tags with proper reset functionality', status: 'Implemented' },
    { name: 'User Management', path: '/admin/users', description: 'Placeholder page showing "Coming Soon" message. Planned features: user list with search and filters, role management (admin/user/guest), account actions (suspend, delete), user activity logs, and bulk operations', status: 'Placeholder' },
    { name: 'Quota Management', path: '/admin/quota-management', description: 'Editable table for configuring daily and weekly usage limits per tool category. Includes inline editing with white background inputs, save/cancel actions, reset functionality, and alert indicating backend integration requirements', status: 'Partial - UI only' },
    { name: 'Usage Analytics', path: '/admin/usage-analytics', description: 'Placeholder showing aggregate usage statistics structure. Planned features: real-time data visualization, most popular tools chart, usage by category breakdown, time-series graphs, and export functionality. Alert indicates backend methods needed: getAggregateUsageStats(), getMostPopularTools(), getUsageByCategory()', status: 'Placeholder' },
    { name: 'Tools Diagnostic', path: '/admin/tools-diagnostic', description: 'Diagnostic page displaying all tools with metadata completeness indicators (description, icon, tags, FAQs, usability steps), route paths, sortable columns, and filter controls for categories and status (complete/incomplete)', status: 'Implemented' },
    { name: 'Reset User Stats', path: '/admin/reset-user-stats', description: 'Placeholder page showing "Coming Soon" message with planned functionality description. Intended for resetting user statistics, usage counts, and credit consumption as part of the usage tracking system', status: 'Placeholder' },
    { name: 'User Statistics', path: '/admin/statistics', description: 'Placeholder page showing "Coming Soon" message. Planned features: user engagement metrics, usage charts, retention analysis, cohort analysis, and demographic breakdowns', status: 'Placeholder' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Project Specification
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete overview of all implemented features, pages, tools, and functionality in the Worldsathi Tools Portal
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-indigo-600" />
              Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Backend Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Single-actor Motoko backend (backend/main.mo) with stable variables for persistent state across canister upgrades. 
                All backend logic resides in one actor file with query (read-only) and update (state-changing) methods.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                <li>Stable variable storage for UserProfiles, UserFavorites, ToolUsageRecords, UserPreferences</li>
                <li>Authorization component mixin for role-based access control (admin/user/guest)</li>
                <li>Blob storage mixin for file handling (images, documents)</li>
                <li>Credit system with consumption tracking and balance management</li>
                <li>Query calls for fast read operations, update calls for state modifications</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Layout className="h-5 w-5 text-green-600" />
                Frontend Architecture
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                React 18 with TypeScript, Tailwind CSS for styling, Shadcn UI component library, TanStack Router for routing with lazy-loaded pages, 
                and React Query (TanStack Query) for server state management.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                <li>Component-based architecture with pages/, components/, hooks/ separation</li>
                <li>OKLCH color system in index.css for light/dark mode theming</li>
                <li>Custom hooks pattern (useQueries.ts, useCredits.ts) for backend integration</li>
                <li>Immutable paths: hooks/useActor.ts, hooks/useInternetIdentity.ts, main.tsx, components/ui/*</li>
                <li>Dynamic icon system using Lucide React with DynamicIcon component</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-600" />
                Authentication System
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Internet Identity for user authentication with principal-based identity. Admin authentication uses hardcoded credentials 
                (mamamadhur@gmail.com / Admin@1988!!) stored in localStorage with session persistence.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                <li>useInternetIdentity hook provides login(), clear(), loginStatus, identity</li>
                <li>First-time profile setup flow using getCallerUserProfile and saveCallerUserProfile</li>
                <li>AdminAuthGuard component protects admin routes with redirect to /admin/login</li>
                <li>Role-based access control via AccessControl from authorization component</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Complete Tool Inventory */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Complete Tool Inventory ({toolCategories.reduce((sum, cat) => sum + cat.count, 0)}+ Tools Across 16 Categories)</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {toolCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <Badge variant="secondary">{category.count} tools</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.tools.map((tool) => (
                        <div key={tool} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          {tool}
                        </div>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Static Pages Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Static Pages Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staticPages.map((page) => (
                <div key={page.path} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <Badge variant="outline" className="mt-0.5">{page.path}</Badge>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{page.name}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{page.description}</p>
                      {page.components && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {page.components.map((comp) => (
                            <Badge key={comp} variant="secondary" className="text-xs">{comp}</Badge>
                          ))}
                        </div>
                      )}
                      {page.sections && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {page.sections.map((section) => (
                            <Badge key={section} variant="secondary" className="text-xs">{section}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Pages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dynamic Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dynamicPages.map((page) => (
                <div key={page.path} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <Badge variant="outline" className="mt-0.5">{page.path}</Badge>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{page.name}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{page.description}</p>
                      {page.components && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {page.components.map((comp) => (
                            <Badge key={comp} variant="secondary" className="text-xs">{comp}</Badge>
                          ))}
                        </div>
                      )}
                      {page.features && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {page.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">{feature}</Badge>
                          ))}
                        </div>
                      )}
                      {page.sections && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {page.sections.map((section) => (
                            <Badge key={section} variant="secondary" className="text-xs">{section}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Pages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Admin Pages (11 Pages)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminPages.map((page) => (
                <div key={page.path} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5 min-w-[200px]">{page.path}</Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold">{page.name}</div>
                        <Badge 
                          variant={page.status === 'Implemented' ? 'default' : page.status === 'Partial - UI only' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {page.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{page.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Flow */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">User Journey: First-Time Visitor</h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Lands on Homepage → sees hero section, search bar, featured tools, categories</li>
                  <li>Browses tools as guest (no authentication required for viewing)</li>
                  <li>Clicks "Login" → redirected to Internet Identity authentication</li>
                  <li>After successful login → prompted to create profile (display name, email)</li>
                  <li>Profile created → assigned default credit balance (totalCreditsAllowed)</li>
                  <li>Can now use tools, save favorites, track usage</li>
                </ol>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">User Journey: Tool Usage</h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Navigate to tool via category page, search, or direct URL</li>
                  <li>Tool page loads with ToolPageTemplate (hero, interface, guide, FAQs)</li>
                  <li>User interacts with tool (inputs, calculations, conversions)</li>
                  <li>Tool usage recorded via recordToolUsage backend call</li>
                  <li>Daily limit tracked in localStorage (10 uses per tool per day)</li>
                  <li>Credits consumed if applicable via consumeCredits backend call</li>
                  <li>Can favorite tool → saved to UserFavorites in backend</li>
                </ol>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Admin Journey</h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Navigate to /admin/login → enter hardcoded credentials</li>
                  <li>Successful login → redirected to /admin/dashboard</li>
                  <li>Dashboard shows overview stats and management cards</li>
                  <li>Access Credit Management → view/edit user credit balances</li>
                  <li>Access Tool Management → add new tool metadata</li>
                  <li>Access Tools Diagnostic → check metadata completeness</li>
                  <li>Access Quota Management → configure category usage limits</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">User Features</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>User profiles with display names and email</li>
                  <li>Credit tracking (consumed/allowed) with balance checks</li>
                  <li>Favorites system for tools with quick access</li>
                  <li>Usage tracking with timestamps and counts</li>
                  <li>Search history storage with result counts</li>
                  <li>User preferences (theme, measurement units, notifications)</li>
                  <li>Daily usage limits (10 per tool) with localStorage tracking</li>
                  <li>Profile editing from Dashboard</li>
                  <li>Internet Identity authentication</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Admin Features</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Credit management dashboard with sortable table</li>
                  <li>User credit balance editing and reset</li>
                  <li>Tool metadata management with form interface</li>
                  <li>Tools diagnostic checks for completeness</li>
                  <li>Quota configuration per category</li>
                  <li>Usage analytics (placeholder - needs backend)</li>
                  <li>Blog/forum management (placeholder)</li>
                  <li>User management (placeholder)</li>
                  <li>User statistics (placeholder)</li>
                  <li>Reset user stats (placeholder)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Tool Features</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>125+ tools across 16 categories</li>
                  <li>Consistent ToolPageTemplate structure</li>
                  <li>Usability guides with step-by-step instructions</li>
                  <li>FAQ sections for common questions</li>
                  <li>Related tools suggestions</li>
                  <li>Tool-specific gradient hero backgrounds</li>
                  <li>About sections (intro, features, benefits, why choose)</li>
                  <li>Optional performance metrics and testimonials</li>
                  <li>Search and filter capabilities</li>
                  <li>Category-based organization</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Platform Features</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Responsive design (mobile, tablet, desktop)</li>
                  <li>Light/dark mode with theme switcher</li>
                  <li>Breadcrumb navigation on all pages</li>
                  <li>Scroll-to-top button</li>
                  <li>Dynamic icon system with Lucide React</li>
                  <li>Sidebar with trending tools and blog posts</li>
                  <li>Trust signals with platform metrics</li>
                  <li>Legal pages (Terms, Privacy, Cookies, Data Rights)</li>
                  <li>Contact form with validation</li>
                  <li>Comprehensive documentation (17 guides)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
