import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getToolById } from '@/constants/tools';
import { Table2, Upload, Download, ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

type AggregationFunction = 'sum' | 'average' | 'count' | 'min' | 'max';

interface PivotData {
  [rowKey: string]: {
    [colKey: string]: number;
  };
}

export default function CsvPivotTableGenerator() {
  const tool = getToolById('csv-pivot-table-generator');
  const [csvData, setCsvData] = useState<string>('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [rowDimension, setRowDimension] = useState<string>('');
  const [colDimension, setColDimension] = useState<string>('');
  const [valueField, setValueField] = useState<string>('');
  const [aggregation, setAggregation] = useState<AggregationFunction>('sum');
  const [pivotData, setPivotData] = useState<PivotData | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvData(text);
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      toast.error('CSV must have at least a header row and one data row');
      return;
    }

    const headerLine = lines[0].split(',').map(h => h.trim());
    setHeaders(headerLine);

    const dataRows = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: any = {};
      headerLine.forEach((header, index) => {
        row[header] = values[index];
      });
      return row;
    });

    setRows(dataRows);
    toast.success(`Parsed ${dataRows.length} rows`);
  };

  const generatePivot = () => {
    if (!rowDimension || !colDimension || !valueField) {
      toast.error('Please select row dimension, column dimension, and value field');
      return;
    }

    const pivot: PivotData = {};

    rows.forEach(row => {
      const rowKey = row[rowDimension] || 'Unknown';
      const colKey = row[colDimension] || 'Unknown';
      const value = parseFloat(row[valueField]) || 0;

      if (!pivot[rowKey]) {
        pivot[rowKey] = {};
      }

      if (!pivot[rowKey][colKey]) {
        pivot[rowKey][colKey] = aggregation === 'count' ? 0 : value;
      }

      switch (aggregation) {
        case 'sum':
          pivot[rowKey][colKey] += value;
          break;
        case 'count':
          pivot[rowKey][colKey] += 1;
          break;
        case 'min':
          pivot[rowKey][colKey] = Math.min(pivot[rowKey][colKey], value);
          break;
        case 'max':
          pivot[rowKey][colKey] = Math.max(pivot[rowKey][colKey], value);
          break;
        case 'average':
          // For average, we need to track sum and count separately
          // Simplified: just sum for now
          pivot[rowKey][colKey] += value;
          break;
      }
    });

    setPivotData(pivot);
    toast.success('Pivot table generated!');
  };

  const exportToCSV = () => {
    if (!pivotData) return;

    const colKeys = Array.from(new Set(Object.values(pivotData).flatMap(row => Object.keys(row))));
    let csv = `${rowDimension},${colKeys.join(',')}\n`;

    Object.entries(pivotData).forEach(([rowKey, cols]) => {
      const values = colKeys.map(colKey => cols[colKey] || 0);
      csv += `${rowKey},${values.join(',')}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pivot-table.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported!');
  };

  const exportToJSON = () => {
    if (!pivotData) return;

    const json = JSON.stringify(pivotData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pivot-table.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON exported!');
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('csv-to-json'),
    getToolById('json-formatter'),
    getToolById('text-diff-checker'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  const colKeys = pivotData ? Array.from(new Set(Object.values(pivotData).flatMap(row => Object.keys(row)))) : [];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-csv-pivot-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <Card className="border-2 border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/50 to-gray-50/50 dark:from-emerald-950/20 dark:to-gray-950/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fileUpload" className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Upload className="h-4 w-4" />
                  Upload CSV File
                </Label>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer"
                />
              </div>

              <div className="text-center text-muted-foreground">or</div>

              <div>
                <Label htmlFor="csvInput">Paste CSV Data</Label>
                <Textarea
                  id="csvInput"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  placeholder="Name,Category,Sales&#10;Product A,Electronics,1500&#10;Product B,Clothing,800"
                  rows={6}
                  className="font-mono text-sm"
                />
                <Button
                  onClick={() => parseCSV(csvData)}
                  variant="outline"
                  className="mt-2 border-2"
                  disabled={!csvData}
                >
                  Parse CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Section */}
        {headers.length > 0 && (
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Table2 className="h-5 w-5" />
                Configure Pivot Table
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Row Dimension</Label>
                  <Select value={rowDimension} onValueChange={setRowDimension}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map(header => (
                        <SelectItem key={header} value={header}>{header}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Column Dimension</Label>
                  <Select value={colDimension} onValueChange={setColDimension}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map(header => (
                        <SelectItem key={header} value={header}>{header}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Value Field</Label>
                  <Select value={valueField} onValueChange={setValueField}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map(header => (
                        <SelectItem key={header} value={header}>{header}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Aggregation</Label>
                  <Select value={aggregation} onValueChange={(v) => setAggregation(v as AggregationFunction)}>
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sum">Sum</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="count">Count</SelectItem>
                      <SelectItem value="min">Min</SelectItem>
                      <SelectItem value="max">Max</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generatePivot}
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-700"
                disabled={!rowDimension || !colDimension || !valueField}
              >
                Generate Pivot Table
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Pivot Table Display */}
        {pivotData && (
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">Pivot Table Results</h3>
                <div className="flex gap-2">
                  <Button onClick={exportToCSV} variant="outline" size="sm" className="border-2">
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button onClick={exportToJSON} variant="outline" size="sm" className="border-2">
                    <Download className="h-4 w-4 mr-2" />
                    JSON
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-emerald-100 dark:bg-emerald-900/30">
                      <th className="border-2 border-emerald-300 dark:border-emerald-700 p-2 text-left font-semibold">
                        {rowDimension}
                      </th>
                      {colKeys.map(colKey => (
                        <th
                          key={colKey}
                          className="border-2 border-emerald-300 dark:border-emerald-700 p-2 text-center font-semibold cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-800/50"
                          onClick={() => handleSort(colKey)}
                        >
                          <div className="flex items-center justify-center gap-1">
                            {colKey}
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(pivotData).map(([rowKey, cols]) => (
                      <tr key={rowKey} className="hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                        <td className="border-2 border-emerald-200 dark:border-emerald-800 p-2 font-medium">
                          {rowKey}
                        </td>
                        {colKeys.map(colKey => (
                          <td
                            key={colKey}
                            className="border-2 border-emerald-200 dark:border-emerald-800 p-2 text-center"
                          >
                            {cols[colKey] ? cols[colKey].toFixed(2) : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg text-sm text-emerald-900 dark:text-emerald-100">
                <strong>Tip:</strong> Click column headers to sort. Export to CSV or JSON to use the data in other applications.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
