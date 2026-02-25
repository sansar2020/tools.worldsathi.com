import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageCompressor() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-compressor')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const compressed = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressed);
      
      const base64Length = compressed.length - 'data:image/jpeg;base64,'.length;
      const estimatedSize = (base64Length * 3) / 4;
      setCompressedSize(estimatedSize);
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-image-q${quality}.jpg`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const faqs = [
    {
      question: 'How much can I compress an image?',
      answer: 'Compression depends on the original image and quality setting. Typically 50-80% size reduction is possible.'
    },
    {
      question: 'Will compression affect image quality?',
      answer: 'Yes, lower quality settings reduce file size but may introduce artifacts. Quality 80-90 is usually a good balance.'
    },
    {
      question: 'What format is the compressed image?',
      answer: 'Compressed images are saved as JPEG, which is ideal for photographs and complex images.'
    },
    {
      question: 'Can I compress PNG images?',
      answer: 'Yes, but they will be converted to JPEG. For PNG compression, use the format converter first.'
    },
    {
      question: 'Is my image uploaded to a server?',
      answer: 'No, all compression happens in your browser. Your images never leave your device.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-compressor-hero-gradient.dim_1200x400.png"
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
                <p className="text-sm text-muted-foreground mt-2">Size: {formatFileSize(originalSize)}</p>
              </div>
              {compressedImage && (
                <div>
                  <Label className="text-foreground mb-2 block">Compressed Image</Label>
                  <img src={compressedImage} alt="Compressed" className="w-full border border-border rounded-lg" />
                  <p className="text-sm text-muted-foreground mt-2">Size: {formatFileSize(compressedSize)}</p>
                  <p className="text-sm text-success mt-1">
                    Reduced by {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
                  </p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="quality" className="text-foreground mb-2 block">
                Compression Quality: {quality}%
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
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Lower quality (smaller file)</span>
                <span>Higher quality (larger file)</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCompress} variant="primary" className="flex-1">
                Compress Image
              </Button>
              {compressedImage && (
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
