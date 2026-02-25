import React, { useState, useRef } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, RotateCw } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageRotator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-rotator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [rotatedImage, setRotatedImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [customAngle, setCustomAngle] = useState<string>('');
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
          setRotation(0);
          setRotatedImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = (angle: number) => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newRotation = (rotation + angle) % 360;
    setRotation(newRotation);

    const radians = (newRotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));

    canvas.width = image.width * cos + image.height * sin;
    canvas.height = image.width * sin + image.height * cos;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    setRotatedImage(canvas.toDataURL('image/png'));
  };

  const handleCustomRotate = () => {
    const angle = parseInt(customAngle);
    if (!isNaN(angle)) {
      handleRotate(angle - rotation);
    }
  };

  const handleDownload = () => {
    if (!rotatedImage) return;
    const link = document.createElement('a');
    link.download = 'rotated-image.png';
    link.href = rotatedImage;
    link.click();
  };

  const faqs = [
    {
      question: 'Can I rotate by custom angles?',
      answer: 'Yes, enter any angle in degrees in the custom angle field and click Apply.'
    },
    {
      question: 'What happens to image quality when rotating?',
      answer: 'The tool preserves image quality by using canvas rendering without compression.'
    },
    {
      question: 'Can I rotate multiple times?',
      answer: 'Yes, rotations are cumulative. Each click adds to the current rotation.'
    },
    {
      question: 'Is the original image modified?',
      answer: 'No, your original image is never modified. You download a new rotated copy.'
    },
    {
      question: 'What image formats can I upload?',
      answer: 'JPG, PNG, GIF, and WebP formats are supported. Output is always PNG.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-rotator-hero-gradient.dim_1200x400.png"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="secondary" onClick={() => handleRotate(90)}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  90°
                </Button>
                <Button variant="secondary" onClick={() => handleRotate(180)}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  180°
                </Button>
                <Button variant="secondary" onClick={() => handleRotate(270)}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  270°
                </Button>
                <Button variant="secondary" onClick={() => handleRotate(-90)}>
                  <RotateCw className="mr-2 h-4 w-4 scale-x-[-1]" />
                  -90°
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="customAngle">Custom Angle (degrees)</Label>
                  <Input
                    id="customAngle"
                    type="number"
                    value={customAngle}
                    onChange={(e) => setCustomAngle(e.target.value)}
                    placeholder="Enter angle (0-360)"
                    min="0"
                    max="360"
                  />
                </div>
                <Button variant="primary" onClick={handleCustomRotate} className="mt-auto">
                  Apply
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Current rotation: {rotation}°
              </div>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {rotatedImage && (
          <div className="space-y-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <p className="text-center text-foreground font-semibold mb-4">Rotated Image</p>
              <img src={rotatedImage} alt="Rotated" className="max-w-full h-auto mx-auto" />
            </div>
            <Button variant="primary" onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Rotated Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
