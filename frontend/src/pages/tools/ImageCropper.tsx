import React, { useState, useRef } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, Crop } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageCropper() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-cropper')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('free');
  const [cropWidth, setCropWidth] = useState<string>('');
  const [cropHeight, setCropHeight] = useState<string>('');
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
          setCroppedImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = parseInt(cropWidth) || image.width;
    let height = parseInt(cropHeight) || image.height;

    // Apply aspect ratio if selected
    if (aspectRatio !== 'free') {
      const [ratioW, ratioH] = aspectRatio.split(':').map(Number);
      if (cropWidth && !cropHeight) {
        height = (width * ratioH) / ratioW;
      } else if (cropHeight && !cropWidth) {
        width = (height * ratioW) / ratioH;
      } else {
        height = (width * ratioH) / ratioW;
      }
    }

    // Ensure dimensions don't exceed original image
    width = Math.min(width, image.width);
    height = Math.min(height, image.height);

    canvas.width = width;
    canvas.height = height;

    // Center crop
    const sx = (image.width - width) / 2;
    const sy = (image.height - height) / 2;

    ctx.drawImage(image, sx, sy, width, height, 0, 0, width, height);
    setCroppedImage(canvas.toDataURL('image/png'));
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = croppedImage;
    link.click();
  };

  const faqs = [
    {
      question: 'What aspect ratios are supported?',
      answer: 'We support common aspect ratios including 1:1 (square), 4:3, 16:9, and free form cropping.'
    },
    {
      question: 'Can I crop to exact pixel dimensions?',
      answer: 'Yes, enter your desired width and height in pixels for precise cropping.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'You can upload JPG, PNG, GIF, and WebP images. The output is always PNG for quality.'
    },
    {
      question: 'Is my image uploaded to a server?',
      answer: 'No, all processing happens in your browser. Your images never leave your device.'
    },
    {
      question: 'What happens if I specify dimensions larger than the original?',
      answer: 'The tool will automatically limit dimensions to the original image size to prevent quality loss.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-cropper-hero-gradient.dim_1200x400.png"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger id="aspectRatio">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free Form</SelectItem>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="3:2">3:2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropWidth">Width (px)</Label>
                  <Input
                    id="cropWidth"
                    type="number"
                    value={cropWidth}
                    onChange={(e) => setCropWidth(e.target.value)}
                    placeholder={`Max: ${image.width}`}
                    min="1"
                    max={image.width}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropHeight">Height (px)</Label>
                  <Input
                    id="cropHeight"
                    type="number"
                    value={cropHeight}
                    onChange={(e) => setCropHeight(e.target.value)}
                    placeholder={`Max: ${image.height}`}
                    min="1"
                    max={image.height}
                  />
                </div>
              </div>

              <Button variant="primary" onClick={handleCrop} className="w-full">
                <Crop className="mr-2 h-4 w-4" />
                Crop Image
              </Button>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {image && !croppedImage && (
          <div className="border-2 border-dashed border-muted rounded-lg p-4">
            <p className="text-center text-muted-foreground">Original Image Preview</p>
            <img src={image.src} alt="Original" className="max-w-full h-auto mx-auto mt-4" />
          </div>
        )}

        {croppedImage && (
          <div className="space-y-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <p className="text-center text-foreground font-semibold mb-4">Cropped Image</p>
              <img src={croppedImage} alt="Cropped" className="max-w-full h-auto mx-auto" />
            </div>
            <Button variant="primary" onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Cropped Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
