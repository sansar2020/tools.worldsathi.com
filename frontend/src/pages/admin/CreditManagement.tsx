import React, { useState } from 'react';
import AdminAuthGuard from '../../components/AdminAuthGuard';
import { useListAllCreditBalances } from '../../hooks/useCredits';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type SortField = 'displayName' | 'totalCreditsAllowed' | 'creditsConsumed' | 'creditsRemaining';
type SortDirection = 'asc' | 'desc';

function CreditManagementContent() {
  const { data: creditBalances, isLoading, error, refetch } = useListAllCreditBalances();
  const [sortField, setSortField] = useState<SortField>('displayName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBalances = React.useMemo(() => {
    if (!creditBalances) return [];

    return [...creditBalances].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'displayName':
          aValue = a.displayName.toLowerCase();
          bValue = b.displayName.toLowerCase();
          break;
        case 'totalCreditsAllowed':
          aValue = Number(a.totalCreditsAllowed);
          bValue = Number(b.totalCreditsAllowed);
          break;
        case 'creditsConsumed':
          aValue = Number(a.creditsConsumed);
          bValue = Number(b.creditsConsumed);
          break;
        case 'creditsRemaining':
          aValue = Number(a.creditsRemaining);
          bValue = Number(b.creditsRemaining);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [creditBalances, sortField, sortDirection]);

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <CreditCard className="h-10 w-10 text-emerald-600" />
                Credit Management
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Monitor and manage user credit balances
              </p>
            </div>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        {creditBalances && creditBalances.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {creditBalances.length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Registered users with credit data
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Credits Allocated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {creditBalances.reduce((sum, user) => sum + Number(user.totalCreditsAllowed), 0)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Across all users
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Credits Consumed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {creditBalances.reduce((sum, user) => sum + Number(user.creditsConsumed), 0)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Platform-wide usage
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card className="bg-white dark:bg-gray-800 border-2">
          <CardHeader>
            <CardTitle>User Credit Balances</CardTitle>
            <CardDescription>
              View credit allocation, consumption, and remaining balance for all users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading credit data...</p>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load credit balances. Please try again.
                </AlertDescription>
              </Alert>
            ) : !creditBalances || creditBalances.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Credit Data Available
                </p>
                <p className="text-muted-foreground">
                  No users have credit balances configured yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <SortButton field="displayName" label="User" />
                      </TableHead>
                      <TableHead>Principal ID</TableHead>
                      <TableHead className="text-right">
                        <SortButton field="totalCreditsAllowed" label="Total Allowed" />
                      </TableHead>
                      <TableHead className="text-right">
                        <SortButton field="creditsConsumed" label="Consumed" />
                      </TableHead>
                      <TableHead className="text-right">
                        <SortButton field="creditsRemaining" label="Remaining" />
                      </TableHead>
                      <TableHead className="text-right">Usage %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedBalances.map((user) => {
                      const totalAllowed = Number(user.totalCreditsAllowed);
                      const consumed = Number(user.creditsConsumed);
                      const remaining = Number(user.creditsRemaining);
                      const usagePercentage = totalAllowed > 0 ? (consumed / totalAllowed) * 100 : 0;

                      return (
                        <TableRow key={user.userId.toString()}>
                          <TableCell className="font-medium">
                            {user.displayName || 'Unnamed User'}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {user.userId.toString().substring(0, 20)}...
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {totalAllowed}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={consumed > 0 ? 'text-orange-600 font-medium' : ''}>
                              {consumed}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={remaining > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {remaining}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`font-medium ${
                                usagePercentage >= 90
                                  ? 'text-red-600'
                                  : usagePercentage >= 70
                                  ? 'text-orange-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {usagePercentage.toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8">
          <Button variant="outline" asChild>
            <a href="/admin/dashboard">← Back to Admin Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreditManagement() {
  return (
    <AdminAuthGuard>
      <CreditManagementContent />
    </AdminAuthGuard>
  );
}
