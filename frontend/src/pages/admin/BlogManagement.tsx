import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import AdminAuthGuard from '../../components/AdminAuthGuard';

export default function BlogManagement() {
  return (
    <AdminAuthGuard>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a href="/admin/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </a>
            <h1 className="text-4xl font-bold mb-2">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>

          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Blog management features are currently under development. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will allow you to create, edit, and manage blog posts for your platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
