import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function SecureRandomString() {
  const tool = ALL_TOOLS.find((t) => t.id === 'secure-random-string')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [length, setLength] = useState(32);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [randomString, setRandomString] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSecureRandom = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset.length === 0) {
      setRandomString('Please select at least one character set');
      return;
    }

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    setRandomString(result);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(randomString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-secure-random-string-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="length">String Length (4-256)</Label>
              <Input
                id="length"
                type="number"
                min="4"
                max="256"
                value={length}
                onChange={(e) => setLength(Math.max(4, Math.min(256, parseInt(e.target.value) || 4)))}
              />
            </div>

            <div className="space-y-3">
              <Label>Character Sets</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                  />
                  <Label htmlFor="uppercase" className="cursor-pointer">
                    Uppercase Letters (A-Z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                  />
                  <Label htmlFor="lowercase" className="cursor-pointer">
                    Lowercase Letters (a-z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  />
                  <Label htmlFor="numbers" className="cursor-pointer">
                    Numbers (0-9)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  />
                  <Label htmlFor="symbols" className="cursor-pointer">
                    Symbols (!@#$%^&*...)
                  </Label>
                </div>
              </div>
            </div>

            <Button onClick={generateSecureRandom} className="w-full gap-2">
              <RefreshCw className="h-4 w-4" />
              Generate Secure Random String
            </Button>
          </CardContent>
        </Card>

        {randomString && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated String</CardTitle>
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
                {randomString}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Generated using Web Crypto API for cryptographic security
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
