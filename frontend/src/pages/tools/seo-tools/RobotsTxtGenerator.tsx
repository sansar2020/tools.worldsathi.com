import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Download, Plus, X } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

interface Rule {
  id: number;
  type: 'allow' | 'disallow';
  path: string;
}

export default function RobotsTxtGenerator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'robots-txt-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [userAgent, setUserAgent] = useState<string>('*');
  const [rules, setRules] = useState<Rule[]>([{ id: 1, type: 'disallow', path: '' }]);
  const [crawlDelay, setCrawlDelay] = useState<string>('');
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [nextId, setNextId] = useState<number>(2);

  const addRule = () => {
    setRules([...rules, { id: nextId, type: 'disallow', path: '' }]);
    setNextId(nextId + 1);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: number, field: 'type' | 'path', value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const generateRobotsTxt = () => {
    let result = `User-agent: ${userAgent}\n`;

    rules.forEach(rule => {
      if (rule.path.trim()) {
        result += `${rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}: ${rule.path}\n`;
      }
    });

    if (crawlDelay) {
      result += `Crawl-delay: ${crawlDelay}\n`;
    }

    if (sitemapUrl) {
      result += `\nSitemap: ${sitemapUrl}`;
    }

    setOutput(result);
  };

  const applyPreset = (preset: 'allow-all' | 'disallow-all' | 'standard') => {
    switch (preset) {
      case 'allow-all':
        setUserAgent('*');
        setRules([{ id: 1, type: 'allow', path: '/' }]);
        setCrawlDelay('');
        break;
      case 'disallow-all':
        setUserAgent('*');
        setRules([{ id: 1, type: 'disallow', path: '/' }]);
        setCrawlDelay('');
        break;
      case 'standard':
        setUserAgent('*');
        setRules([
          { id: 1, type: 'disallow', path: '/admin/' },
          { id: 2, type: 'disallow', path: '/private/' },
          { id: 3, type: 'allow', path: '/' }
        ]);
        setNextId(4);
        setCrawlDelay('10');
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      question: 'What is a robots.txt file?',
      answer: 'A robots.txt file tells search engine crawlers which pages or sections of your site they can or cannot access.'
    },
    {
      question: 'Where should I place the robots.txt file?',
      answer: 'Place it in the root directory of your website (e.g., https://example.com/robots.txt).'
    },
    {
      question: 'What does User-agent: * mean?',
      answer: 'The asterisk (*) means the rules apply to all web crawlers. You can specify individual bots like Googlebot.'
    },
    {
      question: 'Should I use Disallow or Allow?',
      answer: 'Use Disallow to block access to specific paths and Allow to explicitly permit access to paths within disallowed directories.'
    },
    {
      question: 'What is Crawl-delay?',
      answer: 'Crawl-delay specifies the number of seconds a crawler should wait between requests to avoid overloading your server.'
    },
    {
      question: 'Do I need to include my sitemap?',
      answer: 'Including your sitemap URL helps search engines discover and index your content more efficiently.'
    },
    {
      question: 'Will robots.txt block all bots?',
      answer: 'No, robots.txt is a guideline. Malicious bots may ignore it. Use other security measures for sensitive content.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-robots-txt-generator-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" size="sm" onClick={() => applyPreset('allow-all')}>
            Allow All
          </Button>
          <Button variant="secondary" size="sm" onClick={() => applyPreset('disallow-all')}>
            Disallow All
          </Button>
          <Button variant="secondary" size="sm" onClick={() => applyPreset('standard')}>
            Standard Template
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userAgent">User-agent</Label>
          <Input
            id="userAgent"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="* (all bots) or specific bot name"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Rules</Label>
            <Button variant="ghost" size="sm" onClick={addRule}>
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </div>
          {rules.map((rule) => (
            <div key={rule.id} className="flex gap-2 items-center">
              <select
                value={rule.type}
                onChange={(e) => updateRule(rule.id, 'type', e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="allow">Allow</option>
                <option value="disallow">Disallow</option>
              </select>
              <Input
                value={rule.path}
                onChange={(e) => updateRule(rule.id, 'path', e.target.value)}
                placeholder="/path/"
                className="flex-1"
              />
              {rules.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRule(rule.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="crawlDelay">Crawl-delay (seconds, optional)</Label>
          <Input
            id="crawlDelay"
            type="number"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
            placeholder="10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sitemapUrl">Sitemap URL (optional)</Label>
          <Input
            id="sitemapUrl"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
          />
        </div>

        <Button variant="primary" onClick={generateRobotsTxt} className="w-full">
          Generate robots.txt
        </Button>

        {output && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated robots.txt</Label>
              <div className="flex gap-2">
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
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
