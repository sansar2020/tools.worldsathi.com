import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import AdminAuthGuard from '../../components/AdminAuthGuard';

export default function UserStatistics() {
  return (
    <AdminAuthGuard>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a href="/admin/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </a>
            <h1 className="text-4xl font-bold mb-2">User Statistics</h1>
            <p className="text-muted-foreground">View user analytics and insights</p>
          </div>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                User statistics features are currently under development. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will display comprehensive analytics about user behavior and platform usage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
