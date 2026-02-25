import { Link } from '@tanstack/react-router';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '../../components/Button';
import { useState } from 'react';

export default function DataRights() {
  const [exportEmail, setExportEmail] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [exportStatus, setExportStatus] = useState<'idle' | 'success'>('idle');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'success'>('idle');

  const handleExportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setExportStatus('success');
    setTimeout(() => setExportStatus('idle'), 5000);
    setExportEmail('');
  };

  const handleDeleteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteStatus('success');
    setTimeout(() => setDeleteStatus('idle'), 5000);
    setDeleteReason('');
  };

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

        <h1 className="text-4xl font-bold mb-4">Your Data Rights</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Under GDPR and CCPA, you have the right to access, export, and delete your personal data.
        </p>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
            <CardDescription>What you can do with your data</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Access your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Correct inaccurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Export your data in a portable format</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Request deletion of your data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Opt-out of data collection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Withdraw consent at any time</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Export Your Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Export Your Data</CardTitle>
            <CardDescription>Request a copy of all your personal data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExportRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="export-email">Email Address</Label>
                <Input
                  id="export-email"
                  type="email"
                  placeholder="your@email.com"
                  value={exportEmail}
                  onChange={(e) => setExportEmail(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  We'll send your data export to this email address within 30 days.
                </p>
              </div>
              {exportStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                  Your data export request has been submitted. You'll receive an email within 30 days.
                </div>
              )}
              <Button type="submit" variant="primary">
                Request Data Export
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delete Your Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Delete Your Data</CardTitle>
            <CardDescription>Permanently remove all your personal data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDeleteRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delete-reason">Reason for Deletion (Optional)</Label>
                <Textarea
                  id="delete-reason"
                  placeholder="Help us improve by telling us why you're leaving..."
                  rows={4}
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                />
              </div>
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-destructive">Warning: This action cannot be undone</p>
                  <p className="text-sm text-muted-foreground">
                    Deleting your data will permanently remove your account, saved tools, usage history, and all associated data. This process will be completed within 30 days.
                  </p>
                </div>
              </div>
              {deleteStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                  Your data deletion request has been submitted. Your data will be permanently deleted within 30 days.
                </div>
              )}
              <Button type="submit" variant="primary">
                Request Data Deletion
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Questions about your data rights?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about your data rights or need assistance with a request, please contact our data protection team at{' '}
              <a href="mailto:privacy@worldsathi.com" className="text-primary hover:underline">
                privacy@worldsathi.com
              </a>
            </p>
            <p className="text-sm text-muted-foreground">
              We will respond to all requests within 30 days as required by GDPR and CCPA regulations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
