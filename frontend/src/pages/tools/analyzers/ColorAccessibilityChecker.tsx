import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Eye, CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

interface ContrastResult {
  ratio: number;
  normalAA: boolean;
  normalAAA: boolean;
  largeAA: boolean;
  largeAAA: boolean;
}

export default function ColorAccessibilityChecker() {
  const tool = getToolById('color-accessibility-checker');
  const [foreground, setForeground] = useState<string>('#000000');
  const [background, setBackground] = useState<string>('#FFFFFF');
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(null);

  useEffect(() => {
    calculateContrast();
  }, [foreground, background]);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const calculateContrast = () => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);

    if (!fgRgb || !bgRgb) {
      setContrastResult(null);
      return;
    }

    const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    setContrastResult({
      ratio,
      normalAA: ratio >= 4.5,
      normalAAA: ratio >= 7,
      largeAA: ratio >= 3,
      largeAAA: ratio >= 4.5,
    });
  };

  const suggestBetterColor = () => {
    const bgRgb = hexToRgb(background);
    if (!bgRgb) return;

    const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    
    // Suggest black or white based on background luminance
    const suggested = bgLum > 0.5 ? '#000000' : '#FFFFFF';
    setForeground(suggested);
    toast.success('Applied suggested color for better contrast');
  };

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('color-code-converter'),
    getToolById('color-palette-generator'),
    getToolById('color-palette-extractor'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
    );
  };

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-color-accessibility-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Color Input Section */}
        <Card className="border-2 border-border">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="foreground" className="flex items-center gap-2 mb-2">
                  Foreground Color (Text)
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="foreground"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-12 w-20 rounded border-2 border-border cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="background" className="flex items-center gap-2 mb-2">
                  Background Color
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="background"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-12 w-20 rounded border-2 border-border cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="#FFFFFF"
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={swapColors} variant="outline" className="border-2">
                Swap Colors
              </Button>
              <Button onClick={suggestBetterColor} variant="outline" className="border-2">
                <Lightbulb className="h-4 w-4 mr-2" />
                Suggest Better Color
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visual Preview */}
        <Card className="border-2 border-border">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visual Preview
            </h3>

            <div
              className="p-8 rounded-lg border-2 border-border"
              style={{ backgroundColor: background }}
            >
              <div style={{ color: foreground }}>
                <h2 className="text-3xl font-bold mb-2">Normal Text (18px)</h2>
                <p className="text-base mb-4">
                  This is how normal-sized text will appear with your selected color combination.
                  WCAG requires a contrast ratio of at least 4.5:1 for normal text.
                </p>
                <h2 className="text-4xl font-bold">Large Text (24px+)</h2>
                <p className="text-xl">
                  This is large text. WCAG requires a contrast ratio of at least 3:1 for large text.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contrast Results */}
        {contrastResult && (
          <Card className="border-2 border-border">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">WCAG Compliance Results</h3>

              <div className="mb-6 p-6 bg-muted rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">Contrast Ratio</div>
                <div className="text-5xl font-bold">{contrastResult.ratio.toFixed(2)}:1</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Normal Text (18px or smaller)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AA (4.5:1)</span>
                      {getStatusIcon(contrastResult.normalAA)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AAA (7:1)</span>
                      {getStatusIcon(contrastResult.normalAAA)}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border-2 border-border">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    Large Text (24px or larger)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AA (3:1)</span>
                      {getStatusIcon(contrastResult.largeAA)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WCAG AAA (4.5:1)</span>
                      {getStatusIcon(contrastResult.largeAAA)}
                    </div>
                  </div>
                </div>
              </div>

              {!contrastResult.normalAA && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-900 dark:text-yellow-100">
                    <strong>Accessibility Warning:</strong> This color combination does not meet WCAG AA standards for normal text. Consider using colors with higher contrast or click "Suggest Better Color" for an accessible alternative.
                  </div>
                </div>
              )}

              {contrastResult.normalAAA && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900 dark:text-green-100">
                    <strong>Excellent!</strong> This color combination meets the highest WCAG AAA standard for all text sizes. Your content will be accessible to users with visual impairments.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
