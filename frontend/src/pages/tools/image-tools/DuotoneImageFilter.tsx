import React, { useState, useRef, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function DuotoneImageFilter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'duotone-image-filter');
  const relatedTools = tool ? getRelatedTools(tool, ALL_TOOLS) : [];

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [shadowColor, setShadowColor] = useState('#14b8a6');
  const [highlightColor, setHighlightColor] = useState('#f59e0b');
  const [intensity, setIntensity] = useState(100);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'screen' | 'overlay'>('normal');
  const [showBefore, setShowBefore] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageUrl(url);
      loadImage(url);
    };
    reader.readAsDataURL(file);
  };

  const loadImage = (url: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const originalCanvas = originalCanvasRef.current;
      const processedCanvas = processedCanvasRef.current;
      if (!originalCanvas || !processedCanvas) return;

      // Set canvas dimensions
      const maxWidth = 800;
      const scale = Math.min(1, maxWidth / img.width);
      const width = img.width * scale;
      const height = img.height * scale;

      originalCanvas.width = width;
      originalCanvas.height = height;
      processedCanvas.width = width;
      processedCanvas.height = height;

      // Draw original
      const originalCtx = originalCanvas.getContext('2d');
      if (originalCtx) {
        originalCtx.drawImage(img, 0, 0, width, height);
      }

      applyDuotone();
    };
    img.src = url;
  };

  useEffect(() => {
    if (imageUrl) {
      applyDuotone();
    }
  }, [shadowColor, highlightColor, intensity, blendMode]);

  const applyDuotone = () => {
    const originalCanvas = originalCanvasRef.current;
    const processedCanvas = processedCanvasRef.current;
    if (!originalCanvas || !processedCanvas) return;

    const originalCtx = originalCanvas.getContext('2d');
    const processedCtx = processedCanvas.getContext('2d');
    if (!originalCtx || !processedCtx) return;

    const width = originalCanvas.width;
    const height = originalCanvas.height;

    const imageData = originalCtx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Parse colors
    const shadow = hexToRgb(shadowColor);
    const highlight = hexToRgb(highlightColor);

    // Apply duotone effect
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Convert to grayscale
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      const normalized = gray / 255;

      // Interpolate between shadow and highlight
      const newR = shadow.r + (highlight.r - shadow.r) * normalized;
      const newG = shadow.g + (highlight.g - shadow.g) * normalized;
      const newB = shadow.b + (highlight.b - shadow.b) * normalized;

      // Apply intensity
      const factor = intensity / 100;
      data[i] = r + (newR - r) * factor;
      data[i + 1] = g + (newG - g) * factor;
      data[i + 2] = b + (newB - b) * factor;
    }

    processedCtx.putImageData(imageData, 0, 0);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const downloadImage = () => {
    const canvas = processedCanvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'duotone-image.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded!');
      }
    });
  };

  const faqs = [
    {
      question: 'What is a duotone effect?',
      answer: 'A duotone effect maps the dark areas of an image to one color (shadow) and the light areas to another color (highlight), creating a stylized two-tone look.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'You can upload JPG, PNG, GIF, and WebP images. All processing happens in your browser for privacy.',
    },
    {
      question: 'What does intensity control?',
      answer: 'Intensity controls how strongly the duotone effect is applied. At 100%, the effect is fully applied. Lower values blend with the original image.',
    },
    {
      question: 'Can I see the original image?',
      answer: 'Yes! Toggle the "Show Before" switch to compare the original image with the duotone effect.',
    },
  ];

  if (!tool) return <div>Tool not found</div>;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="duotone-filter-hero.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Hidden Original Canvas */}
        <canvas ref={originalCanvasRef} className="hidden" />

        {/* Image Preview */}
        {imageUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Preview</Label>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Show Before</Label>
                <Switch checked={showBefore} onCheckedChange={setShowBefore} />
              </div>
            </div>

            <div className="flex justify-center">
              <canvas
                ref={processedCanvasRef}
                className={`border-2 border-border rounded-lg shadow-lg max-w-full ${showBefore ? 'hidden' : ''}`}
              />
              {showBefore && (
                <canvas
                  ref={originalCanvasRef}
                  className="border-2 border-border rounded-lg shadow-lg max-w-full"
                />
              )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Shadow Color (Dark Areas)</Label>
                <Input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="w-full h-12 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label>Highlight Color (Light Areas)</Label>
                <Input
                  type="color"
                  value={highlightColor}
                  onChange={(e) => setHighlightColor(e.target.value)}
                  className="w-full h-12 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <Label>Intensity: {intensity}%</Label>
                <Slider
                  value={[intensity]}
                  onValueChange={(v) => setIntensity(v[0])}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Blend Mode</Label>
                <Select value={blendMode} onValueChange={(v) => setBlendMode(v as any)}>
                  <SelectTrigger className="bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="multiply">Multiply</SelectItem>
                    <SelectItem value="screen">Screen</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Download Button */}
            <Button onClick={downloadImage} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Duotone Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
