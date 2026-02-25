import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: 2/19/2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Worldsathi.com, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>Use of Services</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use our tools for lawful purposes only</li>
            <li>Do not attempt to disrupt or compromise our services</li>
            <li>Do not use automated systems to access our tools excessively</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Provide accurate information when creating an account</li>
          </ul>

          <h2>User Accounts</h2>
          <p>
            When you create an account using Internet Identity, you are responsible for maintaining the security of your account. You agree to notify us immediately of any unauthorised access.
          </p>

          <h2>Free and Premium Tiers</h2>
          <ul>
            <li>
              <strong>Free Tier:</strong> Limited daily usage with no account required. Usage limits are enforced via browser LocalStorage.
            </li>
            <li>
              <strong>Premium Tier:</strong> Unlimited usage, API access, and additional features available to authenticated users.
            </li>
          </ul>

          <h2>Content and Conduct</h2>
          <p>When using our community forum, you agree to:</p>
          <ul>
            <li>Be respectful and courteous to other users</li>
            <li>Not post spam, offensive, or illegal content</li>
            <li>Do not impersonate others or misrepresent your identity</li>
            <li>Do not share personal information of others without consent</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content, tools, and features on Worldsathi.com are owned by us or our licensors. You may not copy, modify, or distribute our content without permission.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind. We do not guarantee that our tools will be error-free or uninterrupted.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from your use of our services, including but not limited to data loss, business interruption, or financial loss.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend your account at any time for violation of these terms or for any other reason at our discretion.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us through our{' '}
            <Link to="/legal/data-rights" className="text-primary hover:underline">
              Data Rights page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
