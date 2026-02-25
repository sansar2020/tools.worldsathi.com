import React from 'react';
import AdminAuthGuard from '../../components/AdminAuthGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Wrench,
  Search,
  TrendingUp,
  Target,
  RotateCcw,
  CreditCard
} from 'lucide-react';

function AdminDashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your application and monitor performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">1,234</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Blog Posts
              </CardTitle>
              <FileText className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">48</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                5 drafts pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Forum Threads
              </CardTitle>
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">156</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                23 active today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tool Usage
              </CardTitle>
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">8.5K</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Users
                </CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/users">Manage Users</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Blog Posts
                </CardTitle>
                <CardDescription>Create and edit blog content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/blog">Manage Blog</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Forum Threads
                </CardTitle>
                <CardDescription>Moderate forum discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/forum">Moderate Forum</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Analytics
                </CardTitle>
                <CardDescription>View detailed statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/statistics">View Analytics</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-red-600" />
                  Tools
                </CardTitle>
                <CardDescription>Manage tool metadata</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/tools">Manage Tools</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-indigo-600" />
                  Tools Diagnostic
                </CardTitle>
                <CardDescription>Check tool metadata completeness</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/tools-diagnostic">Run Diagnostic</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  Usage Analytics
                </CardTitle>
                <CardDescription>Track tool usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/usage-analytics">View Usage</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-pink-600" />
                  Quota Management
                </CardTitle>
                <CardDescription>Configure usage limits</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/quota-management">Manage Quotas</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-amber-600" />
                  Reset User Stats
                </CardTitle>
                <CardDescription>Clear user usage data</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/reset-user-stats">Reset Statistics</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Credit Management
                </CardTitle>
                <CardDescription>Monitor user credit balances</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/admin/credits">Manage Credits</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white">Create Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 mb-4">Start writing a new article</p>
                <Button variant="secondary" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white">Add New Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100 mb-4">Register a new tool</p>
                <Button variant="secondary" size="sm" asChild>
                  <a href="/admin/tools">Add Tool</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100 mb-4">Configure application settings</p>
                <Button variant="secondary" size="sm" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminAuthGuard>
      <AdminDashboardContent />
    </AdminAuthGuard>
  );
}
