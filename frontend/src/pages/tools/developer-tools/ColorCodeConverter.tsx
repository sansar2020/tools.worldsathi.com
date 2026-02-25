import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ColorCodeConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'color-code-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToOklch = (r: number, g: number, b: number): string => {
    // Simplified approximation for OKLCH
    const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const hsl = rgbToHsl(r, g, b);
    const c = (hsl.s / 100) * 0.4;
    return `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${hsl.h})`;
  };

  const rgb = hexToRgb(hexInput);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const oklch = rgb ? rgbToOklch(rgb.r, rgb.g, rgb.b) : null;

  const formats = [
    { label: 'HEX', value: hexInput.toUpperCase() },
    { label: 'RGB', value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid' },
    { label: 'HSL', value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'Invalid' },
    { label: 'OKLCH', value: oklch || 'Invalid' },
  ];

  const handleCopy = async (value: string, format: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleReset = () => {
    setHexInput('#3B82F6');
    setCopiedFormat(null);
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-color-code-converter-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hexInput">HEX Color Code</Label>
              <Input
                id="hexInput"
                type="text"
                placeholder="#3B82F6"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <Label>Color Preview</Label>
              <div
                className="w-full h-24 rounded-lg border-2 border-border"
                style={{ backgroundColor: hexInput }}
              />
            </div>

            <Button variant="secondary" onClick={handleReset} className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {formats.map((format) => (
            <Card key={format.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">{format.label}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(format.value, format.label)}
                  disabled={format.value === 'Invalid'}
                  className="gap-2"
                >
                  {copiedFormat === format.label ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedFormat === format.label ? 'Copied!' : 'Copy'}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-muted font-mono text-sm">
                  {format.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolPageTemplate>
  );
}
