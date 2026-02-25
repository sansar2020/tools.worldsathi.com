import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wrench, Plus, AlertCircle } from 'lucide-react';
import { TOOL_CATEGORIES } from '../../constants/categories';

export default function ToolManagement() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    iconName: '',
    tags: '',
  });

  const handleReset = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      category: '',
      iconName: '',
      tags: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tool metadata to save:', formData);
    // Backend integration would happen here
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
            <Wrench className="h-10 w-10 text-blue-600" />
            Tool Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Add and manage tool metadata definitions
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            This interface manages tool metadata only. Tool implementations are separate React components. 
            All tools are defined in <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">frontend/src/constants/tools.ts</code>
          </AlertDescription>
        </Alert>

        <Card className="bg-white dark:bg-gray-800 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Tool Definition
            </CardTitle>
            <CardDescription>
              Define metadata for a new tool (implementation required separately)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tool Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Password Generator"
                    required
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., password-generator"
                    required
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the tool's purpose"
                  rows={3}
                  required
                  className="bg-white dark:bg-gray-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category" className="bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900">
                      {TOOL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name} className="bg-white dark:bg-gray-900">
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="iconName">Icon Name *</Label>
                  <Input
                    id="iconName"
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    placeholder="e.g., Key (Lucide icon name)"
                    required
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., security, password, generator"
                  className="bg-white dark:bg-gray-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tool Definition
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset Form
                </Button>
              </div>
            </form>
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
