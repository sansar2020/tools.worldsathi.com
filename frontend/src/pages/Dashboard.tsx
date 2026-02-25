import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetCurrentUserFavorites } from '../hooks/useQueries';
import { useGetCreditBalance } from '../hooks/useCredits';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  Target, 
  Star, 
  Clock,
  BarChart3,
  Zap,
  CreditCard,
  RefreshCw
} from 'lucide-react';

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: favorites, isLoading: favoritesLoading } = useGetCurrentUserFavorites();
  const { data: creditBalance, isLoading: creditsLoading, refetch: refetchCredits } = useGetCreditBalance();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [showCreditDialog, setShowCreditDialog] = useState(false);

  const isAuthenticated = !!identity;

  // Update display name when profile loads
  React.useEffect(() => {
    if (userProfile?.displayName) {
      setDisplayName(userProfile.displayName);
    }
  }, [userProfile]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please log in to access your dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profileLoading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async () => {
    // This would call the backend to save the profile
    setIsEditing(false);
  };

  const handleRefreshCredits = async () => {
    await refetchCredits();
  };

  // Placeholder values - tracking system not yet implemented
  const weeklyUsage = 0;
  const totalUsage = 0;
  const toolsUsedThisWeek = 0;
  const todayUsage = 0;
  
  // Quota limits (placeholders for future implementation)
  const dailyLimit = 10;
  const weeklyLimit = 50;
  
  const dailyRemaining = dailyLimit;
  const weeklyRemaining = weeklyLimit;
  const dailyPercentage = 0;
  const weeklyPercentage = 0;

  const favoriteCount = favorites?.favoriteToolIds?.length || 0;
  const averageDaily = 0;

  // Credit balance data
  const creditsAllowed = creditBalance ? Number(creditBalance.totalCreditsAllowed) : 0;
  const creditsConsumed = creditBalance ? Number(creditBalance.creditsConsumed) : 0;
  const creditsRemaining = creditBalance ? Number(creditBalance.creditsRemaining) : 0;
  const creditPercentage = creditsAllowed > 0 ? (creditsConsumed / creditsAllowed) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userProfile?.displayName || 'User'}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your productivity dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Usage This Week
              </CardTitle>
              <Activity className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {weeklyUsage}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tools used this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tools Used This Week
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {toolsUsedThisWeek}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Unique tools accessed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Usage
              </CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalUsage}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                All-time tool uses
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Saved Tools
              </CardTitle>
              <Star className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {favoriteCount}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tools in your collection
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Credit Balance Card */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Credit Balance
                </span>
                <Dialog open={showCreditDialog} onOpenChange={setShowCreditDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      disabled={creditsLoading}
                      onClick={handleRefreshCredits}
                    >
                      {creditsLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Check Balance
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Credit Balance Details</DialogTitle>
                      <DialogDescription>
                        Your current credit usage and remaining balance
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {creditsLoading ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                          <p className="text-sm text-muted-foreground">Loading credit data...</p>
                        </div>
                      ) : creditBalance ? (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Total Allowed</p>
                              <p className="text-2xl font-bold">{creditsAllowed}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Consumed</p>
                              <p className="text-2xl font-bold text-orange-600">{creditsConsumed}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium">Remaining Credits</p>
                              <p className="text-xl font-bold text-green-600">{creditsRemaining}</p>
                            </div>
                            <Progress value={creditPercentage} className="h-2" />
                            <p className="text-xs text-muted-foreground text-center">
                              {creditPercentage.toFixed(1)}% used
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-sm text-muted-foreground">No credit data available</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-5xl font-bold text-white">
                      {creditsRemaining}
                    </div>
                    <p className="text-sm text-emerald-100 mt-1">
                      of {creditsAllowed} credits remaining
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold text-emerald-100">
                      {creditsConsumed}
                    </div>
                    <p className="text-xs text-emerald-200">
                      credits used
                    </p>
                  </div>
                </div>
                <Progress value={creditPercentage} className="h-3 bg-emerald-300" />
                <p className="text-xs text-emerald-100">
                  Click "Check Balance" to refresh your current credit status
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quota Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Daily Quota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {dailyRemaining}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      of {dailyLimit} remaining
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                      {todayUsage}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      uses today
                    </p>
                  </div>
                </div>
                <Progress value={dailyPercentage} className="h-3" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {todayUsage} uses today • Resets at midnight
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Weekly Quota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {weeklyRemaining}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      of {weeklyLimit} remaining
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                      {weeklyUsage}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      uses this week
                    </p>
                  </div>
                </div>
                <Progress value={weeklyPercentage} className="h-3" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {weeklyUsage} uses this week • Resets weekly
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Usage</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayUsage}</div>
              <p className="text-xs text-muted-foreground">Tools used today</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageDaily}</div>
              <p className="text-xs text-muted-foreground">Uses per day this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium mb-2">{userProfile?.displayName || 'User'}</p>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Explore Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 mb-4">Discover new productivity tools</p>
              <Button variant="secondary" size="sm" asChild>
                <a href="/">Browse Tools</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">My Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 mb-4">Access your saved tools</p>
              <Button variant="secondary" size="sm" disabled>
                View Favorites
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Usage History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100 mb-4">Review your activity</p>
              <Button variant="secondary" size="sm" disabled>
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
