import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Cookie, Database } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      {/* Main Content - No Hero Section */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Legal Information</h1>
            <p className="text-xl text-muted-foreground">
              Important legal documents and policies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Terms of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Read our terms and conditions for using World Sathi Tools. By using our platform, you agree to these terms.
                </CardDescription>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Learn how we collect, use, and protect your personal information. Your privacy is important to us.
                </CardDescription>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Cookie className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Cookie Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Understand how we use cookies and browser storage to enhance your experience on our platform.
                </CardDescription>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Data Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Exercise your rights regarding your personal data under GDPR and other privacy regulations.
                </CardDescription>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our legal policies or need clarification on any terms, please don't hesitate to contact us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
