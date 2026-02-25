import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Settings, Save, X, AlertCircle } from 'lucide-react';
import { TOOL_CATEGORIES } from '../../constants/categories';

interface QuotaConfig {
  category: string;
  dailyLimit: number;
  weeklyLimit: number;
}

export default function QuotaManagement() {
  const [quotas, setQuotas] = useState<QuotaConfig[]>(
    TOOL_CATEGORIES.map(cat => ({
      category: cat.name,
      dailyLimit: 20,
      weeklyLimit: 100,
    }))
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempQuota, setTempQuota] = useState<QuotaConfig | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempQuota({ ...quotas[index] });
  };

  const handleSave = (index: number) => {
    if (tempQuota) {
      const newQuotas = [...quotas];
      newQuotas[index] = tempQuota;
      setQuotas(newQuotas);
      setEditingIndex(null);
      setTempQuota(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempQuota(null);
  };

  const handleReset = () => {
    setQuotas(
      TOOL_CATEGORIES.map(cat => ({
        category: cat.name,
        dailyLimit: 20,
        weeklyLimit: 100,
      }))
    );
    setEditingIndex(null);
    setTempQuota(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Settings className="h-10 w-10 text-purple-600" />
            Quota Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Configure usage limits for each tool category
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Backend integration required: These quota settings are currently stored in frontend state only. 
            Backend methods needed: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">getQuotaConfig()</code>, 
            <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded ml-1">saveQuotaConfig()</code>
          </AlertDescription>
        </Alert>

        <Card className="bg-white dark:bg-gray-800 border-2">
          <CardHeader>
            <CardTitle>Category Quota Limits</CardTitle>
            <CardDescription>
              Set daily and weekly usage limits for each tool category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-end">
              <Button variant="outline" onClick={handleReset} size="sm">
                Reset All to Defaults
              </Button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Category</TableHead>
                    <TableHead className="text-center">Daily Limit</TableHead>
                    <TableHead className="text-center">Weekly Limit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotas.map((quota, index) => (
                    <TableRow key={quota.category}>
                      <TableCell className="font-medium">{quota.category}</TableCell>
                      <TableCell className="text-center">
                        {editingIndex === index ? (
                          <Input
                            type="number"
                            min="1"
                            value={tempQuota?.dailyLimit || 0}
                            onChange={(e) =>
                              setTempQuota(prev => prev ? { ...prev, dailyLimit: parseInt(e.target.value) || 0 } : null)
                            }
                            className="w-24 mx-auto bg-white dark:bg-gray-700"
                          />
                        ) : (
                          quota.dailyLimit
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {editingIndex === index ? (
                          <Input
                            type="number"
                            min="1"
                            value={tempQuota?.weeklyLimit || 0}
                            onChange={(e) =>
                              setTempQuota(prev => prev ? { ...prev, weeklyLimit: parseInt(e.target.value) || 0 } : null)
                            }
                            className="w-24 mx-auto bg-white dark:bg-gray-700"
                          />
                        ) : (
                          quota.weeklyLimit
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingIndex === index ? (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={() => handleSave(index)}>
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleEdit(index)}>
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <a href="/admin/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
