import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Code2 } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function SqlFormatter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'sql-formatter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [sqlInput, setSqlInput] = useState<string>('');
  const [sqlOutput, setSqlOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const formatSql = (sql: string): string => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
      'FULL JOIN', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
      'ALTER TABLE', 'DROP TABLE', 'AS', 'DISTINCT', 'LIMIT', 'OFFSET',
      'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ];

    let formatted = sql.trim();

    // Remove extra whitespace
    formatted = formatted.replace(/\s+/g, ' ');

    // Add newlines before major keywords
    const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 
                           'RIGHT JOIN', 'FULL JOIN', 'ORDER BY', 'GROUP BY', 'HAVING',
                           'INSERT INTO', 'UPDATE', 'DELETE FROM', 'UNION', 'UNION ALL'];
    
    majorKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${keyword}`);
    });

    // Add newlines and indentation for AND/OR in WHERE clauses
    formatted = formatted.replace(/\b(AND|OR)\b/gi, '\n  $1');

    // Add indentation for ON clauses
    formatted = formatted.replace(/\bON\b/gi, '\n  ON');

    // Format VALUES
    formatted = formatted.replace(/\bVALUES\b/gi, '\nVALUES');

    // Format SET in UPDATE
    formatted = formatted.replace(/\bSET\b/gi, '\nSET\n  ');

    // Add commas on new lines for SELECT columns
    formatted = formatted.replace(/,\s*/g, ',\n  ');

    // Clean up leading/trailing whitespace on each line
    formatted = formatted.split('\n').map(line => line.trim()).join('\n');

    // Remove empty lines
    formatted = formatted.replace(/\n\s*\n/g, '\n');

    return formatted;
  };

  const handleFormat = () => {
    const result = formatSql(sqlInput);
    setSqlOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What SQL dialects are supported?',
      answer: 'This formatter works with standard SQL syntax and is compatible with MySQL, PostgreSQL, SQL Server, and Oracle SQL.'
    },
    {
      question: 'Does it validate SQL syntax?',
      answer: 'No, this tool only formats SQL. It does not validate syntax or check for errors.'
    },
    {
      question: 'Can I customize the formatting style?',
      answer: 'Currently, the formatter uses a standard style with consistent indentation and keyword capitalization.'
    },
    {
      question: 'Will it preserve my comments?',
      answer: 'Comments may not be preserved in the current version. We recommend removing comments before formatting.'
    },
    {
      question: 'Can I format multiple queries at once?',
      answer: 'Yes, paste multiple queries separated by semicolons, and they will all be formatted.'
    },
    {
      question: 'Is my SQL data secure?',
      answer: 'Yes, all formatting happens in your browser. No data is sent to any server.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-sql-formatter-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sqlInput">SQL Input</Label>
          <Textarea
            id="sqlInput"
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Paste your SQL query here..."
            className="font-mono min-h-[200px]"
          />
        </div>

        <Button variant="primary" onClick={handleFormat} className="w-full">
          <Code2 className="mr-2 h-4 w-4" />
          Format SQL
        </Button>

        {sqlOutput && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Formatted SQL</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={sqlOutput}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
