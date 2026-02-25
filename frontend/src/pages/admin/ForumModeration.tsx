import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import AdminAuthGuard from '../../components/AdminAuthGuard';

export default function ForumModeration() {
  return (
    <AdminAuthGuard>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a href="/admin/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </a>
            <h1 className="text-4xl font-bold mb-2">Forum Moderation</h1>
            <p className="text-muted-foreground">Moderate forum discussions and threads</p>
          </div>

          <Card>
            <CardHeader>
              <MessageSquare className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Forum moderation features are currently under development. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will allow you to moderate forum discussions, manage threads, and handle reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
