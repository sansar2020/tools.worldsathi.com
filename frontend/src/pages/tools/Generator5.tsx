import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function Generator5() {
  const tool = ALL_TOOLS.find((t) => t.id === 'color-palette-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [colors, setColors] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleGenerate = () => {
    const newColors: string[] = [];
    for (let i = 0; i < 5; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
    setCopiedIndex(null);
  };

  const handleCopy = async (color: string, index: number) => {
    await navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const faqs = [
    {
      question: 'How are the color palettes generated?',
      answer: 'Colors are randomly generated to create diverse palettes. Each generation creates a new set of 5 unique colors.'
    },
    {
      question: 'Can I use these colors in my projects?',
      answer: 'Absolutely! All generated colors are free to use in any personal or commercial project.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="category-generators-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
    >
      <div className="space-y-6">
        <Button variant="primary" onClick={handleGenerate} className="w-full">
          Generate Color Palette
        </Button>

        {colors.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Color Palette</h3>
            <div className="grid grid-cols-1 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg"
                >
                  <div
                    className="w-20 h-20 rounded-lg border-2 border-border shadow-md"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono font-semibold">{color}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(color, index)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-3 w-3 text-success" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{hexToRgb(color)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
