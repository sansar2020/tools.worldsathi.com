import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Table, Plus, Minus, Copy, Download, Upload, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { toast } from 'sonner';

type Alignment = 'left' | 'center' | 'right';

interface TableData {
  headers: string[];
  rows: string[][];
  alignments: Alignment[];
}

export default function MarkdownTableGenerator() {
  const tool = getToolById('markdown-table-generator');
  const [tableData, setTableData] = useState<TableData>({
    headers: ['Header 1', 'Header 2', 'Header 3'],
    rows: [
      ['Cell 1', 'Cell 2', 'Cell 3'],
      ['Cell 4', 'Cell 5', 'Cell 6'],
    ],
    alignments: ['left', 'left', 'left'],
  });

  const addColumn = () => {
    setTableData({
      headers: [...tableData.headers, `Header ${tableData.headers.length + 1}`],
      rows: tableData.rows.map(row => [...row, '']),
      alignments: [...tableData.alignments, 'left'],
    });
  };

  const removeColumn = (index: number) => {
    if (tableData.headers.length <= 1) {
      toast.error('Table must have at least one column');
      return;
    }
    setTableData({
      headers: tableData.headers.filter((_, i) => i !== index),
      rows: tableData.rows.map(row => row.filter((_, i) => i !== index)),
      alignments: tableData.alignments.filter((_, i) => i !== index),
    });
  };

  const addRow = () => {
    setTableData({
      ...tableData,
      rows: [...tableData.rows, new Array(tableData.headers.length).fill('')],
    });
  };

  const removeRow = (index: number) => {
    if (tableData.rows.length <= 1) {
      toast.error('Table must have at least one row');
      return;
    }
    setTableData({
      ...tableData,
      rows: tableData.rows.filter((_, i) => i !== index),
    });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...tableData.headers];
    newHeaders[index] = value;
    setTableData({ ...tableData, headers: newHeaders });
  };

  const cycleAlignment = (index: number) => {
    const alignmentCycle: Alignment[] = ['left', 'center', 'right'];
    const currentIndex = alignmentCycle.indexOf(tableData.alignments[index]);
    const nextIndex = (currentIndex + 1) % alignmentCycle.length;
    const newAlignments = [...tableData.alignments];
    newAlignments[index] = alignmentCycle[nextIndex];
    setTableData({ ...tableData, alignments: newAlignments });
  };

  const generateMarkdown = (): string => {
    const headerRow = `| ${tableData.headers.join(' | ')} |`;
    const separatorRow = `| ${tableData.alignments.map(align => {
      if (align === 'center') return ':---:';
      if (align === 'right') return '---:';
      return '---';
    }).join(' | ')} |`;
    const dataRows = tableData.rows.map(row => `| ${row.join(' | ')} |`).join('\n');
    
    return `${headerRow}\n${separatorRow}\n${dataRows}`;
  };

  const copyMarkdown = () => {
    const markdown = generateMarkdown();
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  const exportToCSV = () => {
    const csv = [
      tableData.headers.join(','),
      ...tableData.rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported!');
  };

  const importFromCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.trim().split('\n');
      if (lines.length < 2) {
        toast.error('CSV must have at least a header row and one data row');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim()));

      setTableData({
        headers,
        rows,
        alignments: new Array(headers.length).fill('left'),
      });
      toast.success('CSV imported successfully!');
    };
    reader.readAsText(file);
  };

  const getAlignmentIcon = (alignment: Alignment) => {
    switch (alignment) {
      case 'left': return <AlignLeft className="h-4 w-4" />;
      case 'center': return <AlignCenter className="h-4 w-4" />;
      case 'right': return <AlignRight className="h-4 w-4" />;
    }
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('lorem-ipsum-generator'),
    getToolById('case-converter'),
    getToolById('csv-to-json'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-markdown-table-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Controls */}
        <Card className="border-2 border-cyan-200 dark:border-cyan-900/50 bg-gradient-to-br from-cyan-50/50 to-neutral-50/50 dark:from-cyan-950/20 dark:to-neutral-950/20">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <Button onClick={addColumn} variant="outline" size="sm" className="border-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Column
              </Button>
              <Button onClick={addRow} variant="outline" size="sm" className="border-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Row
              </Button>
              <div className="flex-1" />
              <label htmlFor="csvImport">
                <Button variant="outline" size="sm" className="border-2" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import CSV
                  </span>
                </Button>
              </label>
              <input
                id="csvImport"
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="hidden"
              />
              <Button onClick={exportToCSV} variant="outline" size="sm" className="border-2">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={copyMarkdown} className="bg-cyan-600 hover:bg-cyan-700 text-white border-2 border-cyan-700" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Markdown
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Editor */}
        <Card className="border-2 border-cyan-200 dark:border-cyan-800">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
              <Table className="h-5 w-5" />
              Table Editor
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-cyan-100 dark:bg-cyan-900/30">
                    {tableData.headers.map((header, index) => (
                      <th key={index} className="border-2 border-cyan-300 dark:border-cyan-700 p-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => updateHeader(index, e.target.value)}
                            className="flex-1 px-2 py-1 bg-white dark:bg-gray-800 border border-cyan-300 dark:border-cyan-700 rounded"
                          />
                          <Button
                            onClick={() => cycleAlignment(index)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            title="Change alignment"
                          >
                            {getAlignmentIcon(tableData.alignments[index])}
                          </Button>
                          <Button
                            onClick={() => removeColumn(index)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-cyan-50 dark:hover:bg-cyan-950/20">
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border-2 border-cyan-200 dark:border-cyan-800 p-2">
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                            className="w-full px-2 py-1 bg-white dark:bg-gray-800 border border-cyan-200 dark:border-cyan-700 rounded"
                          />
                        </td>
                      ))}
                      <td className="border-2 border-cyan-200 dark:border-cyan-800 p-2">
                        <Button
                          onClick={() => removeRow(rowIndex)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Markdown Preview */}
        <Card className="border-2 border-cyan-200 dark:border-cyan-800">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 text-cyan-700 dark:text-cyan-300">Markdown Output</h3>
            <pre className="p-4 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border-2 border-cyan-200 dark:border-cyan-800 overflow-x-auto">
              <code className="text-sm font-mono">{generateMarkdown()}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolPageTemplate>
  );
}
