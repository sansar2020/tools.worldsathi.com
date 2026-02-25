import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/Button';
import { BarChart3, TrendingUp, Users, Wrench, AlertCircle } from 'lucide-react';

export default function UsageAnalytics() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Usage Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Monitor tool usage patterns and trends across all users
        </p>
      </div>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Backend Integration Required:</strong> This page requires additional backend methods to fetch aggregate usage statistics. 
          The backend needs to implement methods like <code>getAggregateUsageStats()</code>, <code>getMostPopularTools()</code>, 
          and <code>getUsageByCategory()</code> to display real-time analytics data.
        </AlertDescription>
      </Alert>

      {/* Overview Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              All-time tool uses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Users this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Top tool this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Daily</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Uses per day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Most Popular Tools */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Most Popular Tools</CardTitle>
          <CardDescription>Tools ranked by total usage count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Backend integration required to display popular tools</p>
            <p className="text-sm mt-2">Implement <code>getMostPopularTools()</code> method</p>
          </div>
        </CardContent>
      </Card>

      {/* Usage by Category */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Usage by Category</CardTitle>
          <CardDescription>Tool usage breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Backend integration required to display category statistics</p>
            <p className="text-sm mt-2">Implement <code>getUsageByCategory()</code> method</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <a href="/admin">
          <Button variant="secondary">
            Back to Dashboard
          </Button>
        </a>
      </div>
    </div>
  );
}
