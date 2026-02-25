import React from 'react';
import AdminAuthGuard from '../../components/AdminAuthGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, AlertCircle } from 'lucide-react';

function ResetUserStatsContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Reset User Statistics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Clear usage data for a specific user
          </p>
        </div>

        {/* Main Card */}
        <Card className="bg-white dark:bg-gray-800 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              Reset User Usage Data
            </CardTitle>
            <CardDescription>
              This feature will allow admins to reset user usage statistics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Coming Soon Alert */}
            <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Feature In Development</strong>
                <br />
                The user statistics reset functionality is currently being implemented as part of the usage tracking system. This feature will be available in the next phase of development.
              </AlertDescription>
            </Alert>

            {/* Information Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What will this feature do?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Reset all usage counters to zero for a specific user</li>
                <li>• Clear daily, weekly, and total usage statistics</li>
                <li>• Allow users to start fresh with their quota</li>
                <li>• Preserve user profile and favorites data</li>
              </ul>
            </div>

            {/* Planned Features */}
            <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Planned Implementation
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Principal ID input with validation</li>
                <li>• Confirmation dialog before reset</li>
                <li>• Success/error notifications</li>
                <li>• Backend integration with usage tracking system</li>
              </ul>
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" asChild>
                <a href="/admin">← Back to Admin Dashboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetUserStats() {
  return (
    <AdminAuthGuard>
      <ResetUserStatsContent />
    </AdminAuthGuard>
  );
}
