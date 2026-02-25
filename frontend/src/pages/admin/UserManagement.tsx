import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import AdminAuthGuard from '../../components/AdminAuthGuard';

export default function UserManagement() {
  return (
    <AdminAuthGuard>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a href="/admin/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </a>
            <h1 className="text-4xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                User management features are currently under development. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will allow you to manage user accounts, roles, and permissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
