import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/Button';
import { CheckCircle2, XCircle, AlertCircle, ArrowUpDown, Home } from 'lucide-react';
import { ALL_TOOLS } from '../../constants/tools';
import { TOOL_CATEGORIES, getCategoryById } from '../../constants/categories';

type SortField = 'name' | 'category' | 'slug' | 'status';
type SortDirection = 'asc' | 'desc';
type FilterStatus = 'all' | 'complete' | 'incomplete' | 'missing-component';

interface DiagnosticTool {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  routePath: string;
  hasIcon: boolean;
  hasDescription: boolean;
  hasFaqs: boolean;
  hasAboutContent: boolean;
  isNew: boolean;
  metadataComplete: boolean;
}

export default function ToolsDiagnostic() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  // Process tools data
  const diagnosticTools: DiagnosticTool[] = useMemo(() => {
    return ALL_TOOLS.map((tool) => {
      const category = getCategoryById(tool.category);
      const hasIcon = !!tool.icon;
      const hasDescription = !!(tool.description && tool.description.length >= 50);
      const hasFaqs = !!(tool.faqs && tool.faqs.length > 0);
      const hasAboutContent = !!tool.aboutContent;
      const metadataComplete = hasIcon && hasDescription && hasFaqs && hasAboutContent;

      return {
        id: tool.id,
        name: tool.name,
        slug: tool.id,
        category: tool.category,
        categoryName: category?.displayName || tool.category,
        routePath: `/tools/${tool.category}/${tool.id}`,
        hasIcon,
        hasDescription,
        hasFaqs,
        hasAboutContent,
        isNew: tool.isNew || false,
        metadataComplete,
      };
    });
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = diagnosticTools.length;
    const incomplete = diagnosticTools.filter((t) => !t.metadataComplete).length;
    const missingIcon = diagnosticTools.filter((t) => !t.hasIcon).length;
    const missingDescription = diagnosticTools.filter((t) => !t.hasDescription).length;
    const missingFaqs = diagnosticTools.filter((t) => !t.hasFaqs).length;
    const missingAbout = diagnosticTools.filter((t) => !t.hasAboutContent).length;

    return {
      total,
      incomplete,
      missingIcon,
      missingDescription,
      missingFaqs,
      missingAbout,
    };
  }, [diagnosticTools]);

  // Filter and sort tools
  const filteredAndSortedTools = useMemo(() => {
    let filtered = [...diagnosticTools];

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    // Apply status filter
    if (filterStatus === 'complete') {
      filtered = filtered.filter((t) => t.metadataComplete);
    } else if (filterStatus === 'incomplete') {
      filtered = filtered.filter((t) => !t.metadataComplete);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: string | boolean = '';
      let bVal: string | boolean = '';

      switch (sortField) {
        case 'name':
          aVal = a.name;
          bVal = b.name;
          break;
        case 'category':
          aVal = a.categoryName;
          bVal = b.categoryName;
          break;
        case 'slug':
          aVal = a.slug;
          bVal = b.slug;
          break;
        case 'status':
          aVal = a.metadataComplete;
          bVal = b.metadataComplete;
          break;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        return sortDirection === 'asc' ? (aVal === bVal ? 0 : aVal ? 1 : -1) : bVal === aVal ? 0 : bVal ? 1 : -1;
      }

      return 0;
    });

    return filtered;
  }, [diagnosticTools, filterCategory, filterStatus, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tools Diagnostic Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of all tools with metadata completeness and routing information
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Incomplete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{stats.incomplete}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Missing Icon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.missingIcon}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Short Desc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.missingDescription}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">No FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.missingFaqs}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">No About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.missingAbout}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by Category</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Categories</SelectItem>
                  {TOOL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by Status</label>
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="All Tools" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Tools</SelectItem>
                  <SelectItem value="complete">Complete Metadata</SelectItem>
                  <SelectItem value="incomplete">Incomplete Metadata</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterStatus('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredAndSortedTools.length} of {diagnosticTools.length} tools
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('name')}
                      className="font-semibold"
                    >
                      Tool Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('slug')}
                      className="font-semibold"
                    >
                      Slug
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('category')}
                      className="font-semibold"
                    >
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Route Path</TableHead>
                  <TableHead className="text-center">Icon</TableHead>
                  <TableHead className="text-center">Desc</TableHead>
                  <TableHead className="text-center">FAQs</TableHead>
                  <TableHead className="text-center">About</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('status')}
                      className="font-semibold"
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {tool.name}
                        {tool.isNew && (
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            NEW
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{tool.slug}</TableCell>
                    <TableCell>{tool.categoryName}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {tool.routePath}
                    </TableCell>
                    <TableCell className="text-center">
                      {tool.hasIcon ? (
                        <CheckCircle2 className="h-5 w-5 text-success inline" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive inline" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {tool.hasDescription ? (
                        <CheckCircle2 className="h-5 w-5 text-success inline" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-warning inline" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {tool.hasFaqs ? (
                        <CheckCircle2 className="h-5 w-5 text-success inline" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive inline" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {tool.hasAboutContent ? (
                        <CheckCircle2 className="h-5 w-5 text-success inline" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive inline" />
                      )}
                    </TableCell>
                    <TableCell>
                      {tool.metadataComplete ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success">
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                          Incomplete
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
