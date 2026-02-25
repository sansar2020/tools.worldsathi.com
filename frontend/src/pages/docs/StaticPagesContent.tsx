import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileText, Mail, Shield, Cookie, Database, Info, CheckCircle } from 'lucide-react';

export default function StaticPagesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Static Pages Content</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Comprehensive documentation of all static pages including About Us, Contact Us, and legal pages 
            (Terms of Service, Privacy Policy, Cookie Policy, Data Rights) with implementation details and content guidelines.
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
              <li><a href="#about-us" className="text-blue-600 hover:underline">1. About Us Page</a></li>
              <li><a href="#contact-us" className="text-blue-600 hover:underline">2. Contact Us Page</a></li>
              <li><a href="#terms-of-service" className="text-blue-600 hover:underline">3. Terms of Service</a></li>
              <li><a href="#privacy-policy" className="text-blue-600 hover:underline">4. Privacy Policy</a></li>
              <li><a href="#cookie-policy" className="text-blue-600 hover:underline">5. Cookie Policy</a></li>
              <li><a href="#data-rights" className="text-blue-600 hover:underline">6. Data Rights</a></li>
              <li><a href="#content-maintenance" className="text-blue-600 hover:underline">7. Content Maintenance Guidelines</a></li>
            </ul>
          </CardContent>
        </Card>

        {/* About Us Page */}
        <Card id="about-us" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">1</Badge>
              About Us Page
            </CardTitle>
            <CardDescription>
              Company mission, values, and team information with hero section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/AboutUs.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/about</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The About Us page showcases the company's mission, values, and unique selling propositions. 
                It features a hero section with a gradient background image, mission statement, value cards, 
                and a "Why Choose Us" section highlighting key benefits.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Page Structure:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/about-hero.dim_1200x400.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">About Worldsathi</h1>
            <p className="text-xl">Your trusted companion for everyday tools</p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 py-16">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Empowering users with simple, accessible tools...</p>
          </CardContent>
        </Card>
      </section>

      {/* Values Cards */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>{value.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Hero Image:</strong> The hero section uses a generated gradient background image 
                (<code>/assets/generated/about-hero.dim_1200x400.png</code>) with an overlay for text readability.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Contact Us Page */}
        <Card id="contact-us" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">2</Badge>
              Contact Us Page
            </CardTitle>
            <CardDescription>
              Contact information and functional contact form with validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/ContactUs.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/contact</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The Contact Us page provides multiple ways to reach the company including email, phone, WhatsApp, 
                and physical address. It features a functional contact form with validation and simulated submission.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Contact Form Implementation:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  setSubmitStatus('success');
  setIsSubmitting(false);
  
  // Reset form after 3 seconds
  setTimeout(() => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitStatus('idle');
  }, 3000);
};

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
    </div>
    {/* Email, Subject, Message fields... */}
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </Button>
  </form>
);`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Contact Information Cards:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@worldsathi.com',
    link: 'mailto:support@worldsathi.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 98765 43210',
    link: 'tel:+919876543210'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+91 98765 43210',
    link: 'https://wa.me/919876543210'
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '123 Tech Street, Mumbai, Maharashtra 400001, India',
    link: null
  }
];`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Terms of Service */}
        <Card id="terms-of-service" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">3</Badge>
              Terms of Service
            </CardTitle>
            <CardDescription>
              Legal terms governing the use of the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/legal/TermsOfService.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/legal/terms</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Last Updated:</strong> February 19, 2026
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Sections Covered:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Acceptance of Terms:</strong> Agreement to terms by using the service</li>
                <li><strong>Use of Services:</strong> Permitted and prohibited uses</li>
                <li><strong>User Accounts:</strong> Registration requirements and responsibilities</li>
                <li><strong>Free and Premium Tiers:</strong> Service levels and limitations</li>
                <li><strong>Content and Conduct:</strong> User-generated content policies</li>
                <li><strong>Intellectual Property:</strong> Ownership and licensing</li>
                <li><strong>Disclaimers:</strong> Service provided "as is"</li>
                <li><strong>Limitation of Liability:</strong> Legal protections</li>
                <li><strong>Termination:</strong> Account suspension and termination policies</li>
                <li><strong>Governing Law:</strong> Jurisdiction and dispute resolution</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Page Structure Example:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <CardDescription>Last updated: February 19, 2026</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using Worldsathi...</p>
            </section>
            {/* Additional sections */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card id="privacy-policy" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">4</Badge>
              Privacy Policy
            </CardTitle>
            <CardDescription>
              Data collection, usage, and protection practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/legal/PrivacyPolicy.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/legal/privacy</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Last Updated:</strong> February 19, 2026
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Key Sections Covered:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>Information We Collect:</strong> Personal data, usage data, device information</li>
                <li><strong>How We Use Your Information:</strong> Service provision, improvements, communications</li>
                <li><strong>Data Retention:</strong> How long data is stored</li>
                <li><strong>Data Security:</strong> Encryption and security measures</li>
                <li><strong>Third-Party Services:</strong> External service integrations</li>
                <li><strong>Your Rights (GDPR):</strong> Access, rectification, erasure, portability</li>
                <li><strong>Your Rights (CCPA):</strong> California-specific privacy rights</li>
                <li><strong>Cookies and Tracking:</strong> Browser storage usage</li>
                <li><strong>Children's Privacy:</strong> Age restrictions</li>
                <li><strong>Contact Information:</strong> privacy@worldsathi.com</li>
              </ul>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>GDPR & CCPA Compliance:</strong> The Privacy Policy includes specific sections addressing 
                both European GDPR and California CCPA requirements, ensuring comprehensive legal coverage.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Cookie Policy */}
        <Card id="cookie-policy" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">5</Badge>
              Cookie Policy
            </CardTitle>
            <CardDescription>
              Browser storage usage and tracking technologies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/legal/CookiePolicy.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/legal/cookies</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Last Updated:</strong> February 19, 2026
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Browser Storage Usage:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`// LocalStorage Usage (No Traditional Cookies)
1. Authentication Tokens
   - Key: 'auth_token'
   - Purpose: Internet Identity session management
   - Expiration: Session-based

2. Theme Preferences
   - Key: 'theme'
   - Purpose: Light/dark mode preference
   - Expiration: Persistent

3. Usage Limits
   - Key: 'usage_limits'
   - Purpose: Track tool usage for free tier
   - Expiration: Daily reset

4. User Preferences
   - Key: 'user_preferences'
   - Purpose: UI customization settings
   - Expiration: Persistent`}
              </pre>
            </div>

            <Alert>
              <Cookie className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>No Third-Party Tracking:</strong> The platform uses only LocalStorage for essential 
                functionality and does not employ third-party tracking cookies or analytics services.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Data Rights */}
        <Card id="data-rights" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">6</Badge>
              Data Rights
            </CardTitle>
            <CardDescription>
              User rights under GDPR and CCPA with request forms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>File Location:</strong> <code>frontend/src/pages/legal/DataRights.tsx</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Route:</strong> <code>/legal/data-rights</code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Data Export Request Form:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const [exportForm, setExportForm] = useState({
  email: '',
  dataTypes: [] as string[]
});

const dataTypeOptions = [
  'Profile Information',
  'Tool Usage History',
  'Favorites',
  'Preferences',
  'Search History'
];

const handleExportSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Simulate export request
  await new Promise(resolve => setTimeout(resolve, 1000));
  alert('Data export request submitted. You will receive an email within 30 days.');
};`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Data Deletion Request Form:</h4>
              <pre className="text-xs bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`const [deleteForm, setDeleteForm] = useState({
  email: '',
  reason: '',
  confirmation: false
});

const handleDeleteSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!deleteForm.confirmation) {
    alert('Please confirm that you understand this action is irreversible.');
    return;
  }
  
  // Simulate deletion request
  await new Promise(resolve => setTimeout(resolve, 1000));
  alert('Data deletion request submitted. Your data will be deleted within 30 days.');
};`}
              </pre>
            </div>

            <Alert className="border-destructive">
              <AlertDescription className="text-sm">
                <strong>Warning Message:</strong> The deletion form includes a prominent warning that data 
                deletion is permanent and irreversible, with a confirmation checkbox required before submission.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Content Maintenance Guidelines */}
        <Card id="content-maintenance" className="mb-8 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="bg-indigo-600 text-white">7</Badge>
              Content Maintenance Guidelines
            </CardTitle>
            <CardDescription>
              Best practices for updating and maintaining static page content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Legal Page Update Checklist:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Update "Last Updated" date at the top of the page</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Review all sections for accuracy and completeness</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Ensure GDPR and CCPA compliance sections are current</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Verify contact information (email, phone, address)</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Check all internal links and navigation</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Test forms for proper validation and submission</li>
                <li><CheckCircle className="inline h-4 w-4 text-green-600 mr-2" />Review mobile responsiveness</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Content Update Frequency:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>About Us:</strong> Review quarterly or when company information changes</li>
                <li><strong>Contact Us:</strong> Update immediately when contact details change</li>
                <li><strong>Terms of Service:</strong> Review annually or when service changes significantly</li>
                <li><strong>Privacy Policy:</strong> Update when data practices change or new regulations apply</li>
                <li><strong>Cookie Policy:</strong> Review when storage mechanisms change</li>
                <li><strong>Data Rights:</strong> Update when GDPR/CCPA requirements change</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Legal Review:</strong> Always have legal counsel review changes to Terms of Service, 
                Privacy Policy, and other legal documents before publishing updates.
              </AlertDescription>
            </Alert>
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
                <a href="/docs/dynamic-pages" className="text-blue-600 hover:underline">
                  → Dynamic Pages Documentation
                </a>
              </li>
              <li>
                <a href="/docs/best-practices" className="text-blue-600 hover:underline">
                  → Best Practices Guide
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
