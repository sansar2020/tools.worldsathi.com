import React, { useState, useRef } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Sparkles } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageFilter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-filter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [filteredImage, setFilteredImage] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number[]>([100]);
  const [contrast, setContrast] = useState<number[]>([100]);
  const [blur, setBlur] = useState<number[]>([0]);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [sepia, setSepia] = useState<boolean>(false);
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
          setFilteredImage(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyFilters = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.filter = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) blur(${blur[0]}px)`;
    ctx.drawImage(image, 0, 0);

    if (grayscale || sepia) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (grayscale) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        } else if (sepia) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    setFilteredImage(canvas.toDataURL('image/png'));
  };

  const handleDownload = () => {
    if (!filteredImage) return;
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = filteredImage;
    link.click();
  };

  const handleReset = () => {
    setBrightness([100]);
    setContrast([100]);
    setBlur([0]);
    setGrayscale(false);
    setSepia(false);
    setFilteredImage(null);
  };

  const faqs = [
    {
      question: 'Can I apply multiple filters at once?',
      answer: 'Yes, all filters can be combined. Adjust sliders and toggle effects, then click Apply Filters.'
    },
    {
      question: 'What does the blur filter do?',
      answer: 'The blur filter softens the image. Higher values create a stronger blur effect.'
    },
    {
      question: 'Can I undo filters?',
      answer: 'Click Reset to restore all filters to default values and start over.'
    },
    {
      question: 'What is the difference between grayscale and sepia?',
      answer: 'Grayscale removes all color, while sepia adds a warm brown tone for a vintage look.'
    },
    {
      question: 'Will filters reduce image quality?',
      answer: 'Filters are applied non-destructively. Download quality depends on the original image.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-filter-hero-gradient.dim_1200x400.png"
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Brightness: {brightness[0]}%</Label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contrast: {contrast[0]}%</Label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    min={0}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Blur: {blur[0]}px</Label>
                  <Slider
                    value={blur}
                    onValueChange={setBlur}
                    min={0}
                    max={10}
                    step={1}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant={grayscale ? 'primary' : 'secondary'}
                    onClick={() => {
                      setGrayscale(!grayscale);
                      if (!grayscale) setSepia(false);
                    }}
                    className="flex-1"
                  >
                    Grayscale
                  </Button>
                  <Button
                    variant={sepia ? 'primary' : 'secondary'}
                    onClick={() => {
                      setSepia(!sepia);
                      if (!sepia) setGrayscale(false);
                    }}
                    className="flex-1"
                  >
                    Sepia
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="primary" onClick={handleApplyFilters} className="flex-1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {filteredImage && (
          <div className="space-y-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <p className="text-center text-foreground font-semibold mb-4">Filtered Image</p>
              <img src={filteredImage} alt="Filtered" className="max-w-full h-auto mx-auto" />
            </div>
            <Button variant="primary" onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Filtered Image
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
