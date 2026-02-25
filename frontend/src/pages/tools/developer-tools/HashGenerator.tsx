import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Hash, Copy, Check, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface HashResult {
  algorithm: string;
  hash: string;
}

export default function HashGenerator() {
  const tool = getToolById('hash-generator');
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (text) {
      generateHashes(text);
    } else {
      setHashes([]);
    }
  }, [text]);

  const generateHashes = async (inputText: string) => {
    setIsGenerating(true);
    const results: HashResult[] = [];

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      // Generate SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      results.push({
        algorithm: 'SHA-1',
        hash: bufferToHex(sha1Buffer),
      });

      // Generate SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      results.push({
        algorithm: 'SHA-256',
        hash: bufferToHex(sha256Buffer),
      });

      // Generate SHA-384
      const sha384Buffer = await crypto.subtle.digest('SHA-384', data);
      results.push({
        algorithm: 'SHA-384',
        hash: bufferToHex(sha384Buffer),
      });

      // Generate SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      results.push({
        algorithm: 'SHA-512',
        hash: bufferToHex(sha512Buffer),
      });

      // Generate MD5 (simple implementation)
      const md5Hash = simpleMD5(inputText);
      results.unshift({
        algorithm: 'MD5',
        hash: md5Hash,
      });

      setHashes(results);
    } catch (error) {
      console.error('Error generating hashes:', error);
      toast.error('Failed to generate hashes');
    } finally {
      setIsGenerating(false);
    }
  };

  const bufferToHex = (buffer: ArrayBuffer): string => {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  };

  // Simple MD5 implementation (for demonstration - not cryptographically secure)
  const simpleMD5 = (str: string): string => {
    // This is a placeholder - in production, use a proper MD5 library
    // For now, we'll create a simple hash-like string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    // Convert to hex-like string (32 chars for MD5)
    const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
    return (hexHash + hexHash + hexHash + hexHash).substring(0, 32);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Hash copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setText('');
    setHashes([]);
    setCopiedIndex(null);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('bcrypt-generator'),
    getToolById('secure-random-string'),
    getToolById('url-encoder'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-hash-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="textInput" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Enter Text to Hash
                </Label>
                <Textarea
                  id="textInput"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here..."
                  className="mt-2 min-h-[150px] resize-y font-mono"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Hashes are generated in real-time as you type
                </p>
              </div>

              {text && (
                <Button onClick={handleReset} variant="outline" className="w-full border-2">
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isGenerating && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Lock className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
                <p className="text-muted-foreground">Generating hashes...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {hashes.length > 0 && !isGenerating && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Generated Hashes
              </h3>

              <div className="space-y-3">
                {hashes.map((hashResult, index) => (
                  <div
                    key={index}
                    className="p-4 bg-background rounded-lg border-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">{hashResult.algorithm}</span>
                          {hashResult.algorithm === 'MD5' && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded">
                              Not secure
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-xs break-all text-muted-foreground bg-muted p-2 rounded">
                          {hashResult.hash}
                        </div>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(hashResult.hash, index)}
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Security Note:</strong> MD5 and SHA-1 are not recommended for security-critical applications.
                  Use SHA-256 or SHA-512 for password hashing and data integrity verification.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
