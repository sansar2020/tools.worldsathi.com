import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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

        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: 2/19/2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            Welcome to Worldsathi.com. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our online tools platform.
          </p>

          <h2>Data Collection</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> When you create an account using Internet Identity, we store your user profile, including your display name and preferences.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect anonymised data about tool usage to improve our services. This includes timestamps and tool IDs, but no personally identifiable information.
            </li>
            <li>
              <strong>Local Storage:</strong> For free-tier users, usage limits are tracked locally in your browser using LocalStorage. This data never leaves your device.
            </li>
          </ul>

          <h2>Data Usage</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Personalise your experience with saved tools and preferences</li>
            <li>Generate usage analytics and improve our platform</li>
            <li>Communicate important updates and changes</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. You may request deletion of your data at any time through the Data Rights page.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. All data is stored on the Internet Computer blockchain, which provides cryptographic security and decentralisation.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We do not share your personal data with third parties except as required by law or with your explicit consent.
          </p>

          <h2>Your Rights (GDPR/CCPA)</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request the deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Opt-out of data collection</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our{' '}
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
