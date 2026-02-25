import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicy() {
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

        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: 2/19/2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
          </p>

          <h2>How We Use Cookies and Local Storage</h2>
          <p>Worldsathi.com uses browser storage technologies for the following purposes:</p>

          <h3>Essential Storage</h3>
          <ul>
            <li>
              <strong>Authentication:</strong> Internet Identity uses browser storage to maintain your login session securely.
            </li>
            <li>
              <strong>Theme Preferences:</strong> Your light/dark mode preference is stored locally.
            </li>
          </ul>

          <h3>Functional Storage</h3>
          <ul>
            <li>
              <strong>Usage Limits:</strong> For free-tier users, we use LocalStorage to track daily tool usage limits. This data never leaves your browser.
            </li>
            <li>
              <strong>Onboarding:</strong> We store a flag indicating whether you've completed the onboarding tour.
            </li>
          </ul>

          <h2>No Tracking Cookies</h2>
          <p>
            We do not use third-party tracking cookies or analytics services that collect personally identifiable information. All usage analytics are anonymised and stored on-chain.
          </p>

          <h2>Managing Your Preferences</h2>
          <p>You can control browser storage through your browser settings:</p>
          <ul>
            <li>Clear all stored data by clearing your browser's cache and cookies</li>
            <li>Block storage entirely (note: this will prevent login and some features)</li>
            <li>Use private/incognito browsing mode for temporary sessions</li>
          </ul>

          <h2>LocalStorage vs Cookies</h2>
          <p>
            We primarily use LocalStorage instead of cookies. LocalStorage data is never sent to servers automatically, providing better privacy. The data stored includes:
          </p>
          <ul>
            <li>Tool usage counts (for free tier limits)</li>
            <li>Onboarding completion status</li>
            <li>Theme preference</li>
          </ul>

          <h2>Your Consent</h2>
          <p>
            By using Worldsathi.com, you consent to our use of browser storage as described in this policy. You can withdraw consent at any time by clearing your browser data.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our use of cookies and storage, please contact us through our{' '}
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
