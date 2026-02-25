import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Image as ImageIcon, Download } from 'lucide-react';

export default function FaviconGenerator() {
  const tool = getToolById('favicon-generator');
  const [text, setText] = useState('');
  const [favicons, setFavicons] = useState<{ size: number; dataUrl: string }[]>([]);

  const generateFavicons = () => {
    if (!text.trim()) return;

    const sizes = [16, 32, 64];
    const generated = sizes.map((size) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Background
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(0, 0, size, size);

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.charAt(0).toUpperCase(), size / 2, size / 2);
      }

      return { size, dataUrl: canvas.toDataURL() };
    });

    setFavicons(generated);
  };

  const downloadFavicon = (dataUrl: string, size: number) => {
    const link = document.createElement('a');
    link.download = `favicon-${size}x${size}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleReset = () => {
    setText('');
    setFavicons([]);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('qr-code-generator'),
    getToolById('barcode-generator'),
    getToolById('color-palette-generator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-favicon-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Text or Emoji
                </Label>
                <Input
                  id="text"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text or emoji (e.g., A, 🚀)"
                  maxLength={2}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={generateFavicons} disabled={!text.trim()} className="flex-1 border-2 border-primary">
                  Generate Favicons
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {favicons.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Generated Favicons</h3>
              <div className="grid grid-cols-3 gap-4">
                {favicons.map((favicon) => (
                  <div key={favicon.size} className="text-center">
                    <div className="bg-white p-4 rounded-lg inline-block mb-2">
                      <img src={favicon.dataUrl} alt={`Favicon ${favicon.size}x${favicon.size}`} className="mx-auto" />
                    </div>
                    <div className="text-sm font-semibold mb-2">{favicon.size}x{favicon.size}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFavicon(favicon.dataUrl, favicon.size)}
                      className="border-2"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                <p>
                  <strong>Usage:</strong> Add to your HTML: <code className="bg-muted px-1 py-0.5 rounded">&lt;link rel="icon" href="/favicon.ico"&gt;</code>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
