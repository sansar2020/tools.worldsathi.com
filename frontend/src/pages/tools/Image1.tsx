import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Download, RotateCcw } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageResizer() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-resizer')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
          setImage(event.target?.result as string);
          setResizedImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (value: number) => {
    setWidth(value);
    if (lockAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(value * ratio));
    }
  };

  const handleHeightChange = (value: number) => {
    setHeight(value);
    if (lockAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(value * ratio));
    }
  };

  const handleResize = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL('image/png'));
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!resizedImage) return;
    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = `resized-image-${width}x${height}.png`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setResizedImage(null);
    setWidth(0);
    setHeight(0);
    setOriginalDimensions({ width: 0, height: 0 });
  };

  const faqs = [
    {
      question: 'What image formats are supported?',
      answer: 'The image resizer supports PNG, JPG, GIF, and WebP formats.'
    },
    {
      question: 'Will resizing reduce image quality?',
      answer: 'Resizing down maintains quality well. Resizing up may reduce quality as pixels are interpolated.'
    },
    {
      question: 'What does "lock aspect ratio" mean?',
      answer: 'When locked, changing width automatically adjusts height to maintain the original proportions.'
    },
    {
      question: 'What is the maximum file size?',
      answer: 'You can resize images up to 10MB in size.'
    },
    {
      question: 'Are my images uploaded to a server?',
      answer: 'No, all processing happens in your browser. Your images never leave your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-resizer-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-foreground font-medium mb-2">Click to upload an image</p>
            <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
          </label>
        </div>

        {image && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-foreground mb-2 block">Original Image</Label>
                <img src={image} alt="Original" className="w-full border border-border rounded-lg" />
                <p className="text-sm text-muted-foreground mt-2">
                  {originalDimensions.width} × {originalDimensions.height} px
                </p>
              </div>
              {resizedImage && (
                <div>
                  <Label className="text-foreground mb-2 block">Resized Image</Label>
                  <img src={resizedImage} alt="Resized" className="w-full border border-border rounded-lg" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {width} × {height} px
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width" className="text-foreground">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-foreground">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="aspect-ratio"
                checked={lockAspectRatio}
                onCheckedChange={(checked) => setLockAspectRatio(checked as boolean)}
              />
              <Label htmlFor="aspect-ratio" className="text-foreground cursor-pointer">
                Lock aspect ratio
              </Label>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleResize} variant="primary" className="flex-1">
                Resize Image
              </Button>
              {resizedImage && (
                <Button onClick={handleDownload} variant="secondary" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              <Button onClick={handleReset} variant="ghost">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolPageTemplate>
  );
}
