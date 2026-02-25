import React, { Suspense, lazy } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import AdminAuthGuard from './components/AdminAuthGuard';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));

// Legal pages
const LegalPage = lazy(() => import('./pages/legal/LegalPage'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const DataRights = lazy(() => import('./pages/legal/DataRights'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ForumModeration = lazy(() => import('./pages/admin/ForumModeration'));
const UserStatistics = lazy(() => import('./pages/admin/UserStatistics'));
const UsageAnalytics = lazy(() => import('./pages/admin/UsageAnalytics'));
const QuotaManagement = lazy(() => import('./pages/admin/QuotaManagement'));
const ResetUserStats = lazy(() => import('./pages/admin/ResetUserStats'));
const ToolManagement = lazy(() => import('./pages/admin/ToolManagement'));
const ToolsDiagnostic = lazy(() => import('./pages/admin/ToolsDiagnostic'));
const CreditManagement = lazy(() => import('./pages/admin/CreditManagement'));

// Documentation pages
const DocsIndex = lazy(() => import('./pages/docs/DocsIndex'));
const ProjectSpecification = lazy(() => import('./pages/docs/ProjectSpecification'));
const ToolCreationTutorial = lazy(() => import('./pages/docs/ToolCreationTutorial'));
const ToolArchitectureReference = lazy(() => import('./pages/docs/ToolArchitectureReference'));
const ToolExamples = lazy(() => import('./pages/docs/ToolExamples'));
const IcPlatformSetup = lazy(() => import('./pages/docs/IcPlatformSetup'));
const InternetIdentityAuth = lazy(() => import('./pages/docs/InternetIdentityAuth'));
const FrontendBackendIntegration = lazy(() => import('./pages/docs/FrontendBackendIntegration'));
const CanisterDeployment = lazy(() => import('./pages/docs/CanisterDeployment'));
const TroubleshootingGuide = lazy(() => import('./pages/docs/TroubleshootingGuide'));
const ProjectStructureGuide = lazy(() => import('./pages/docs/ProjectStructureGuide'));

// Tool pages
const Calculator1 = lazy(() => import('./pages/tools/Calculator1'));
const Calculator3 = lazy(() => import('./pages/tools/Calculator3'));
const Calculator4 = lazy(() => import('./pages/tools/Calculator4'));
const Calculator5 = lazy(() => import('./pages/tools/Calculator5'));
const Calculator6 = lazy(() => import('./pages/tools/Calculator6'));
const Calculator7 = lazy(() => import('./pages/tools/Calculator7'));
const Converter1 = lazy(() => import('./pages/tools/Converter1'));
const Converter2 = lazy(() => import('./pages/tools/Converter2'));
const Converter3 = lazy(() => import('./pages/tools/Converter3'));
const Converter4 = lazy(() => import('./pages/tools/Converter4'));
const Converter5 = lazy(() => import('./pages/tools/Converter5'));
const Generator1 = lazy(() => import('./pages/tools/Generator1'));
const Generator2 = lazy(() => import('./pages/tools/Generator2'));
const Generator3 = lazy(() => import('./pages/tools/Generator3'));
const Generator4 = lazy(() => import('./pages/tools/Generator4'));
const Generator5 = lazy(() => import('./pages/tools/Generator5'));
const Analyzer1 = lazy(() => import('./pages/tools/Analyzer1'));
const Productivity1 = lazy(() => import('./pages/tools/Productivity1'));
const Image1 = lazy(() => import('./pages/tools/Image1'));
const Image2 = lazy(() => import('./pages/tools/Image2'));
const Image3 = lazy(() => import('./pages/tools/Image3'));
const Data1 = lazy(() => import('./pages/tools/Data1'));
const Data2 = lazy(() => import('./pages/tools/Data2'));
const Data3 = lazy(() => import('./pages/tools/Data3'));
const Seo1 = lazy(() => import('./pages/tools/Seo1'));
const Seo2 = lazy(() => import('./pages/tools/Seo2'));
const Seo3 = lazy(() => import('./pages/tools/Seo3'));
const Developer1 = lazy(() => import('./pages/tools/Developer1'));
const Developer2 = lazy(() => import('./pages/tools/Developer2'));
const Developer3 = lazy(() => import('./pages/tools/Developer3'));
const XmlToJsonConverter = lazy(() => import('./pages/tools/XmlToJsonConverter'));
const CharacterCounter = lazy(() => import('./pages/tools/text-tools/CharacterCounter'));
const CaseConverter = lazy(() => import('./pages/tools/text-tools/CaseConverter'));
const TextReverser = lazy(() => import('./pages/tools/text-tools/TextReverser'));
const RemoveDuplicateLines = lazy(() => import('./pages/tools/text-tools/RemoveDuplicateLines'));
const JsonToTypescript = lazy(() => import('./pages/tools/developer-tools/JsonToTypescript'));
const ColorCodeConverter = lazy(() => import('./pages/tools/developer-tools/ColorCodeConverter'));
const LoremIpsumCode = lazy(() => import('./pages/tools/developer-tools/LoremIpsumCode'));
const UuidValidator = lazy(() => import('./pages/tools/developer-tools/UuidValidator'));
const BcryptGenerator = lazy(() => import('./pages/tools/developer-tools/BcryptGenerator'));
const SecureRandomString = lazy(() => import('./pages/tools/developer-tools/SecureRandomString'));
const PercentageChangeCalculator = lazy(() => import('./pages/tools/calculators/PercentageChangeCalculator'));
const StandardDeviationCalculator = lazy(() => import('./pages/tools/calculators/StandardDeviationCalculator'));
const AgeCalculator = lazy(() => import('./pages/tools/calculators/AgeCalculator'));
const DateCalculator = lazy(() => import('./pages/tools/calculators/DateCalculator'));
const DiscountCalculator = lazy(() => import('./pages/tools/calculators/DiscountCalculator'));
const AreaConverter = lazy(() => import('./pages/tools/converters/AreaConverter'));
const SpeedConverter = lazy(() => import('./pages/tools/converters/SpeedConverter'));
const BarcodeGenerator = lazy(() => import('./pages/tools/generators/BarcodeGenerator'));
const UsernameGenerator = lazy(() => import('./pages/tools/generators/UsernameGenerator'));
const TextDiffChecker = lazy(() => import('./pages/tools/text-tools/TextDiffChecker'));
const ReadabilityAnalyzer = lazy(() => import('./pages/tools/analyzers/ReadabilityAnalyzer'));
const FaviconGenerator = lazy(() => import('./pages/tools/developer-tools/FaviconGenerator'));
const GradientPatternGenerator = lazy(() => import('./pages/tools/generators/GradientPatternGenerator'));
const GradientArtStudio = lazy(() => import('./pages/tools/generators/GradientArtStudio'));
const SvgPatternDesigner = lazy(() => import('./pages/tools/generators/SvgPatternDesigner'));
const ColorPaletteExtractor = lazy(() => import('./pages/tools/analyzers/ColorPaletteExtractor'));
const MeshGradientCreator = lazy(() => import('./pages/tools/generators/MeshGradientCreator'));
const DuotoneImageFilter = lazy(() => import('./pages/tools/image-tools/DuotoneImageFilter'));
const TextAnalyzer = lazy(() => import('./pages/tools/analyzers/TextAnalyzer'));
const CurrencyConverter = lazy(() => import('./pages/tools/converters/CurrencyConverter'));
const TemperatureConverter = lazy(() => import('./pages/tools/converters/TemperatureConverter'));
const HashGenerator = lazy(() => import('./pages/tools/developer-tools/HashGenerator'));
const NumberBaseConverter = lazy(() => import('./pages/tools/converters/NumberBaseConverter'));
const MortgageCalculator = lazy(() => import('./pages/tools/finance-tools/MortgageCalculator'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categorySlug',
  component: CategoryPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutUs,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactUs,
});

// Legal routes
const legalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal',
  component: LegalPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/privacy',
  component: PrivacyPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/terms',
  component: TermsOfService,
});

const cookiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/cookies',
  component: CookiePolicy,
});

const dataRightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/legal/data-rights',
  component: DataRights,
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: () => (
    <AdminAuthGuard>
      <AdminDashboard />
    </AdminAuthGuard>
  ),
});

const blogManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/blog',
  component: () => (
    <AdminAuthGuard>
      <BlogManagement />
    </AdminAuthGuard>
  ),
});

const userManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: () => (
    <AdminAuthGuard>
      <UserManagement />
    </AdminAuthGuard>
  ),
});

const forumModerationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/forum',
  component: () => (
    <AdminAuthGuard>
      <ForumModeration />
    </AdminAuthGuard>
  ),
});

const userStatisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/statistics',
  component: () => (
    <AdminAuthGuard>
      <UserStatistics />
    </AdminAuthGuard>
  ),
});

const usageAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/analytics',
  component: () => (
    <AdminAuthGuard>
      <UsageAnalytics />
    </AdminAuthGuard>
  ),
});

const quotaManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/quotas',
  component: () => (
    <AdminAuthGuard>
      <QuotaManagement />
    </AdminAuthGuard>
  ),
});

const resetUserStatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reset-stats',
  component: () => (
    <AdminAuthGuard>
      <ResetUserStats />
    </AdminAuthGuard>
  ),
});

const toolManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/tools',
  component: () => (
    <AdminAuthGuard>
      <ToolManagement />
    </AdminAuthGuard>
  ),
});

const toolsDiagnosticRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/tools-diagnostic',
  component: () => (
    <AdminAuthGuard>
      <ToolsDiagnostic />
    </AdminAuthGuard>
  ),
});

const creditManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/credits',
  component: () => (
    <AdminAuthGuard>
      <CreditManagement />
    </AdminAuthGuard>
  ),
});

// Documentation routes
const docsIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: DocsIndex,
});

const projectSpecRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/specification',
  component: ProjectSpecification,
});

const toolCreationTutorialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/tool-creation-tutorial',
  component: ToolCreationTutorial,
});

const toolArchitectureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/tool-architecture',
  component: ToolArchitectureReference,
});

const toolExamplesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/tool-examples',
  component: ToolExamples,
});

const icPlatformSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/ic-platform-setup',
  component: IcPlatformSetup,
});

const internetIdentityAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/internet-identity-auth',
  component: InternetIdentityAuth,
});

const frontendBackendIntegrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/frontend-backend-integration',
  component: FrontendBackendIntegration,
});

const canisterDeploymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/canister-deployment',
  component: CanisterDeployment,
});

const troubleshootingGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/troubleshooting',
  component: TroubleshootingGuide,
});

const projectStructureGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs/project-structure',
  component: ProjectStructureGuide,
});

// Tool routes
const calculator1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/percentage-calculator',
  component: Calculator1,
});

const calculator3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/bmi-calculator',
  component: Calculator3,
});

const calculator4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/tip-calculator',
  component: Calculator4,
});

const calculator5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/loan-calculator',
  component: Calculator5,
});

const calculator6Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/compound-interest-calculator',
  component: Calculator6,
});

const calculator7Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/calorie-calculator',
  component: Calculator7,
});

const converter1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/unit-converter',
  component: Converter1,
});

const converter2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/currency-converter',
  component: Converter2,
});

const converter3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/temperature-converter',
  component: Converter3,
});

const converter4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/timezone-converter',
  component: Converter4,
});

const converter5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/weight-converter',
  component: Converter5,
});

const generator1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/password-generator',
  component: Generator1,
});

const generator2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/qr-code-generator',
  component: Generator2,
});

const generator3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/lorem-ipsum-generator',
  component: Generator3,
});

const generator4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/uuid-generator',
  component: Generator4,
});

const generator5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/color-palette-generator',
  component: Generator5,
});

const analyzer1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/analyzers/text-analyzer',
  component: Analyzer1,
});

const productivity1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/productivity/pomodoro-timer',
  component: Productivity1,
});

const image1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-tools/image-resizer',
  component: Image1,
});

const image2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-tools/image-compressor',
  component: Image2,
});

const image3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-tools/image-format-converter',
  component: Image3,
});

const data1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/data-tools/json-formatter',
  component: Data1,
});

const data2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/data-tools/csv-to-json',
  component: Data2,
});

const data3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/data-tools/base64-tool',
  component: Data3,
});

const seo1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/seo-tools/meta-tags-generator',
  component: Seo1,
});

const seo2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/seo-tools/keyword-density',
  component: Seo2,
});

const seo3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/seo-tools/og-preview',
  component: Seo3,
});

const developer1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/regex-tester',
  component: Developer1,
});

const developer2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/hash-generator',
  component: Developer2,
});

const developer3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/url-encoder',
  component: Developer3,
});

const xmlToJsonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/data-tools/xml-to-json',
  component: XmlToJsonConverter,
});

const characterCounterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/text-tools/character-counter',
  component: CharacterCounter,
});

const caseConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/text-tools/case-converter',
  component: CaseConverter,
});

const textReverserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/text-tools/text-reverser',
  component: TextReverser,
});

const removeDuplicateLinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/text-tools/remove-duplicate-lines',
  component: RemoveDuplicateLines,
});

const jsonToTypescriptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/json-to-typescript',
  component: JsonToTypescript,
});

const colorCodeConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/color-code-converter',
  component: ColorCodeConverter,
});

const loremIpsumCodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/lorem-ipsum-code',
  component: LoremIpsumCode,
});

const uuidValidatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/uuid-validator',
  component: UuidValidator,
});

const bcryptGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/bcrypt-generator',
  component: BcryptGenerator,
});

const secureRandomStringRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/secure-random-string',
  component: SecureRandomString,
});

const percentageChangeCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/percentage-change-calculator',
  component: PercentageChangeCalculator,
});

const standardDeviationCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/standard-deviation-calculator',
  component: StandardDeviationCalculator,
});

const ageCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/age-calculator',
  component: AgeCalculator,
});

const dateCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/date-calculator',
  component: DateCalculator,
});

const discountCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/calculators/discount-calculator',
  component: DiscountCalculator,
});

const areaConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/area-converter',
  component: AreaConverter,
});

const speedConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/speed-converter',
  component: SpeedConverter,
});

const barcodeGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/barcode-generator',
  component: BarcodeGenerator,
});

const usernameGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/username-generator',
  component: UsernameGenerator,
});

const textDiffCheckerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/text-tools/text-diff-checker',
  component: TextDiffChecker,
});

const readabilityAnalyzerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/analyzers/readability-analyzer',
  component: ReadabilityAnalyzer,
});

const faviconGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/favicon-generator',
  component: FaviconGenerator,
});

const gradientPatternGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/gradient-pattern-generator',
  component: GradientPatternGenerator,
});

const gradientArtStudioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/gradient-art-studio',
  component: GradientArtStudio,
});

const svgPatternDesignerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/svg-pattern-designer',
  component: SvgPatternDesigner,
});

const colorPaletteExtractorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/analyzers/color-palette-extractor',
  component: ColorPaletteExtractor,
});

const meshGradientCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/generators/mesh-gradient-creator',
  component: MeshGradientCreator,
});

const duotoneImageFilterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-tools/duotone-image-filter',
  component: DuotoneImageFilter,
});

const textAnalyzerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/analyzers/text-analyzer-v2',
  component: TextAnalyzer,
});

const currencyConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/currency-converter-v2',
  component: CurrencyConverter,
});

const temperatureConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/temperature-converter-v2',
  component: TemperatureConverter,
});

const hashGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/developer-tools/hash-generator-v2',
  component: HashGenerator,
});

const numberBaseConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/converters/number-base-converter',
  component: NumberBaseConverter,
});

const mortgageCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/finance-tools/mortgage-calculator',
  component: MortgageCalculator,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  dashboardRoute,
  aboutRoute,
  contactRoute,
  legalRoute,
  privacyRoute,
  termsRoute,
  cookiesRoute,
  dataRightsRoute,
  adminLoginRoute,
  adminDashboardRoute,
  blogManagementRoute,
  userManagementRoute,
  forumModerationRoute,
  userStatisticsRoute,
  usageAnalyticsRoute,
  quotaManagementRoute,
  resetUserStatsRoute,
  toolManagementRoute,
  toolsDiagnosticRoute,
  creditManagementRoute,
  docsIndexRoute,
  projectSpecRoute,
  toolCreationTutorialRoute,
  toolArchitectureRoute,
  toolExamplesRoute,
  icPlatformSetupRoute,
  internetIdentityAuthRoute,
  frontendBackendIntegrationRoute,
  canisterDeploymentRoute,
  troubleshootingGuideRoute,
  projectStructureGuideRoute,
  calculator1Route,
  calculator3Route,
  calculator4Route,
  calculator5Route,
  calculator6Route,
  calculator7Route,
  converter1Route,
  converter2Route,
  converter3Route,
  converter4Route,
  converter5Route,
  generator1Route,
  generator2Route,
  generator3Route,
  generator4Route,
  generator5Route,
  analyzer1Route,
  productivity1Route,
  image1Route,
  image2Route,
  image3Route,
  data1Route,
  data2Route,
  data3Route,
  seo1Route,
  seo2Route,
  seo3Route,
  developer1Route,
  developer2Route,
  developer3Route,
  xmlToJsonRoute,
  characterCounterRoute,
  caseConverterRoute,
  textReverserRoute,
  removeDuplicateLinesRoute,
  jsonToTypescriptRoute,
  colorCodeConverterRoute,
  loremIpsumCodeRoute,
  uuidValidatorRoute,
  bcryptGeneratorRoute,
  secureRandomStringRoute,
  percentageChangeCalculatorRoute,
  standardDeviationCalculatorRoute,
  ageCalculatorRoute,
  dateCalculatorRoute,
  discountCalculatorRoute,
  areaConverterRoute,
  speedConverterRoute,
  barcodeGeneratorRoute,
  usernameGeneratorRoute,
  textDiffCheckerRoute,
  readabilityAnalyzerRoute,
  faviconGeneratorRoute,
  gradientPatternGeneratorRoute,
  gradientArtStudioRoute,
  svgPatternDesignerRoute,
  colorPaletteExtractorRoute,
  meshGradientCreatorRoute,
  duotoneImageFilterRoute,
  textAnalyzerRoute,
  currencyConverterRoute,
  temperatureConverterRoute,
  hashGeneratorRoute,
  numberBaseConverterRoute,
  mortgageCalculatorRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
