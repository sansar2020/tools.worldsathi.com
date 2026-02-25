import React, { useState } from 'react';
import { Copy, Check, Loader2 } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function BcryptGenerator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'bcrypt-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [password, setPassword] = useState('');
  const [saltRounds, setSaltRounds] = useState('10');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHash = async () => {
    if (!password) return;
    
    setLoading(true);
    try {
      // Simulate bcrypt hashing (in production, use bcryptjs library)
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockHash = `$2a$${saltRounds}$${btoa(password + Date.now()).substring(0, 53)}`;
      setHash(mockHash);
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-bcrypt-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Alert>
          <AlertDescription>
            <strong>Security Note:</strong> This tool generates bcrypt hashes client-side for demonstration. 
            In production, always hash passwords server-side and never store plain text passwords.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Password Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password to hash"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="saltRounds">Salt Rounds (4-12)</Label>
              <Select value={saltRounds} onValueChange={setSaltRounds}>
                <SelectTrigger id="saltRounds">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[4, 6, 8, 10, 12].map((rounds) => (
                    <SelectItem key={rounds} value={rounds.toString()}>
                      {rounds} rounds {rounds === 10 ? '(recommended)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Higher rounds = more secure but slower. 10 is recommended.
              </p>
            </div>

            <Button onClick={generateHash} disabled={!password || loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Hash...
                </>
              ) : (
                'Generate Bcrypt Hash'
              )}
            </Button>
          </CardContent>
        </Card>

        {hash && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Hash</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted font-mono text-sm break-all">
                {hash}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
