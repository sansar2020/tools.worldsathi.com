import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Upload, Download } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageFormatConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-format-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState<string>('png');
  const [quality, setQuality] = useState<number>(90);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      let mimeType = 'image/png';
      if (format === 'jpeg') mimeType = 'image/jpeg';
      else if (format === 'webp') mimeType = 'image/webp';
      
      const converted = canvas.toDataURL(mimeType, quality / 100);
      setConvertedImage(converted);
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!convertedImage) return;
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = `converted-image.${format}`;
    link.click();
  };

  const faqs = [
    {
      question: 'Which format should I choose?',
      answer: 'PNG for graphics with transparency, JPEG for photographs, WebP for modern web use with smaller file sizes.'
    },
    {
      question: 'Will I lose quality when converting?',
      answer: 'Converting to PNG maintains quality. JPEG and WebP are lossy formats that may reduce quality based on the quality setting.'
    },
    {
      question: 'Can I convert GIF animations?',
      answer: 'This tool converts the first frame of animated GIFs. For full animation conversion, use specialized tools.'
    },
    {
      question: 'What is WebP format?',
      answer: 'WebP is a modern image format that provides superior compression for web images, supported by most modern browsers.'
    },
    {
      question: 'Are my images uploaded to a server?',
      answer: 'No, all conversion happens in your browser. Your images never leave your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-converter-hero-gradient.dim_1200x400.png"
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
            <p className="text-sm text-muted-foreground">PNG, JPG, GIF, WebP</p>
          </label>
        </div>

        {image && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-foreground mb-2 block">Original Image</Label>
                <img src={image} alt="Original" className="w-full border border-border rounded-lg" />
              </div>
              {convertedImage && (
                <div>
                  <Label className="text-foreground mb-2 block">Converted Image ({format.toUpperCase()})</Label>
                  <img src={convertedImage} alt="Converted" className="w-full border border-border rounded-lg" />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="format" className="text-foreground mb-2 block">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(format === 'jpeg' || format === 'webp') && (
              <div>
                <Label htmlFor="quality" className="text-foreground mb-2 block">
                  Quality: {quality}%
                </Label>
                <Slider
                  id="quality"
                  min={10}
                  max={100}
                  step={5}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  className="mt-2"
                />
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={handleConvert} variant="primary" className="flex-1">
                Convert Image
              </Button>
              {convertedImage && (
                <Button onClick={handleDownload} variant="secondary" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </ToolPageTemplate>
  );
}
