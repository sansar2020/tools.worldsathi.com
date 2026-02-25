import React, { useState, useRef } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Type } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageWatermark() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-watermark')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('');
  const [position, setPosition] = useState<string>('bottom-right');
  const [opacity, setOpacity] = useState<number[]>([50]);
  const [fontSize, setFontSize] = useState<number[]>([24]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setWatermarkedImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyWatermark = () => {
    if (!image || !canvasRef.current || !watermarkText) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    ctx.font = `${fontSize[0]}px Arial`;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity[0] / 100})`;
    ctx.strokeStyle = `rgba(0, 0, 0, ${opacity[0] / 100})`;
    ctx.lineWidth = 2;

    const metrics = ctx.measureText(watermarkText);
    const textWidth = metrics.width;
    const textHeight = fontSize[0];
    const padding = 20;

    let x = padding;
    let y = padding + textHeight;

    switch (position) {
      case 'top-left':
        x = padding;
        y = padding + textHeight;
        break;
      case 'top-right':
        x = canvas.width - textWidth - padding;
        y = padding + textHeight;
        break;
      case 'bottom-left':
        x = padding;
        y = canvas.height - padding;
        break;
      case 'bottom-right':
        x = canvas.width - textWidth - padding;
        y = canvas.height - padding;
        break;
      case 'center':
        x = (canvas.width - textWidth) / 2;
        y = canvas.height / 2;
        break;
    }

    ctx.strokeText(watermarkText, x, y);
    ctx.fillText(watermarkText, x, y);

    setWatermarkedImage(canvas.toDataURL('image/png'));
  };

  const handleDownload = () => {
    if (!watermarkedImage) return;
    const link = document.createElement('a');
    link.download = 'watermarked-image.png';
    link.href = watermarkedImage;
    link.click();
  };

  const faqs = [
    {
      question: 'Can I add image watermarks instead of text?',
      answer: 'Currently, this tool supports text watermarks. Image watermark support is coming soon.'
    },
    {
      question: 'How do I make the watermark more visible?',
      answer: 'Increase the opacity slider and font size for better visibility.'
    },
    {
      question: 'Can I change the watermark color?',
      answer: 'The watermark uses white text with black outline for maximum visibility on any background.'
    },
    {
      question: 'Is the watermark permanent?',
      answer: 'Yes, the watermark is embedded into the image and cannot be removed without editing software.'
    },
    {
      question: 'What position should I choose?',
      answer: 'Bottom-right is most common, but choose based on your image composition to avoid covering important content.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-watermark-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>

          {image && (
            <>
              <div className="space-y-2">
                <Label htmlFor="watermarkText">Watermark Text</Label>
                <Input
                  id="watermarkText"
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Opacity: {opacity[0]}%</Label>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  min={10}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={12}
                  max={72}
                  step={2}
                />
              </div>

              <Button
                variant="primary"
                onClick={handleApplyWatermark}
                className="w-full"
                disabled={!watermarkText}
              >
                <Type className="mr-2 h-4 w-4" />
                Apply Watermark
              </Button>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {watermarkedImage && (
          <div className="space-y-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <p className="text-center text-foreground font-semibold mb-4">Watermarked Image</p>
              <img src={watermarkedImage} alt="Watermarked" className="max-w-full h-auto mx-auto" />
            </div>
            <Button variant="primary" onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Watermarked Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
