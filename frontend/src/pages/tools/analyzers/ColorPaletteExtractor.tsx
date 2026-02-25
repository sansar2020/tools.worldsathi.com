import React, { useState, useRef } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Palette, Upload, Copy, Download, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  percentage: number;
}

export default function ColorPaletteExtractor() {
  const tool = getToolById('color-palette-extractor');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageUrl(url);
      extractColors(url);
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (url: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Scale down large images for performance
      const maxSize = 400;
      let width = img.width;
      let height = img.height;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height / width) * maxSize;
          width = maxSize;
        } else {
          width = (width / height) * maxSize;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      // Sample pixels (every 10th pixel for performance)
      const colorMap = new Map<string, number>();
      for (let i = 0; i < pixels.length; i += 40) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent pixels
        if (a < 128) continue;

        // Quantize colors to reduce similar shades
        const qr = Math.round(r / 32) * 32;
        const qg = Math.round(g / 32) * 32;
        const qb = Math.round(b / 32) * 32;

        const key = `${qr},${qg},${qb}`;
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }

      // Sort by frequency and get top 8
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

      const totalCount = sortedColors.reduce((sum, [, count]) => sum + count, 0);

      const extractedColors: ColorInfo[] = sortedColors.map(([rgb, count]) => {
        const [r, g, b] = rgb.split(',').map(Number);
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        const percentage = (count / totalCount) * 100;

        return { hex, rgb: { r, g, b }, percentage };
      });

      setColors(extractedColors);
      setIsProcessing(false);
    };

    img.onerror = () => {
      toast.error('Failed to load image');
      setIsProcessing(false);
    };

    img.src = url;
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportAsCSS = () => {
    const css = colors
      .map((color, i) => `  --color-${i + 1}: ${color.hex};`)
      .join('\n');
    const fullCSS = `:root {\n${css}\n}`;
    
    const blob = new Blob([fullCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.css';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSS file downloaded!');
  };

  const exportAsJSON = () => {
    const json = JSON.stringify(
      colors.map((color, i) => ({
        name: `color-${i + 1}`,
        hex: color.hex,
        rgb: color.rgb,
        percentage: Math.round(color.percentage * 10) / 10,
      })),
      null,
      2
    );

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON file downloaded!');
  };

  const handleReset = () => {
    setImageUrl(null);
    setColors([]);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('color-palette-generator'),
    getToolById('color-code-converter'),
    getToolById('gradient-pattern-generator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-color-palette-extractor-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUpload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Label>
                <input
                  ref={fileInputRef}
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>

              {imageUrl && (
                <div className="mt-4">
                  <Label className="mb-2 block">Image Preview</Label>
                  <div className="relative rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-auto max-h-96 object-contain bg-muted"
                    />
                  </div>
                </div>
              )}

              {imageUrl && (
                <Button onClick={handleReset} variant="outline" className="w-full border-2">
                  Upload Different Image
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isProcessing && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Palette className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
                <p className="text-muted-foreground">Extracting colors from your image...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {colors.length > 0 && !isProcessing && (
          <>
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Extracted Color Palette
                  </h3>
                  <div className="flex gap-2">
                    <Button onClick={exportAsCSS} variant="outline" size="sm" className="border-2">
                      <Download className="h-4 w-4 mr-2" />
                      CSS
                    </Button>
                    <Button onClick={exportAsJSON} variant="outline" size="sm" className="border-2">
                      <Download className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background rounded-lg border-2 border-border hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-border flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-semibold text-sm">{color.hex}</span>
                            <Button
                              onClick={() => copyToClipboard(color.hex, index)}
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              {copiedIndex === index ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${color.percentage}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground">
                                {color.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-background rounded-lg text-sm text-muted-foreground">
                  <p>
                    <strong>Tip:</strong> The percentage shows how dominant each color is in your image. Export to CSS
                    or JSON to use these colors in your projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolPageTemplate>
  );
}
