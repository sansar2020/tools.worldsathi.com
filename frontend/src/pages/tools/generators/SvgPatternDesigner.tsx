import React, { useState, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function SvgPatternDesigner() {
  const tool = ALL_TOOLS.find((t) => t.id === 'svg-pattern-designer');
  const relatedTools = tool ? getRelatedTools(tool, ALL_TOOLS) : [];

  const [patternType, setPatternType] = useState<'dots' | 'lines' | 'waves' | 'hexagons' | 'triangles'>('dots');
  const [color1, setColor1] = useState('#14b8a6');
  const [color2, setColor2] = useState('#f59e0b');
  const [scale, setScale] = useState(20);
  const [spacing, setSpacing] = useState(10);
  const [rotation, setRotation] = useState(0);

  const generateSVG = () => {
    const patternId = 'pattern-' + Date.now();
    const gradientId = 'gradient-' + Date.now();

    let patternContent = '';

    switch (patternType) {
      case 'dots':
        patternContent = `<circle cx="${scale / 2}" cy="${scale / 2}" r="${scale / 4}" fill="url(#${gradientId})" />`;
        break;
      case 'lines':
        patternContent = `<line x1="0" y1="0" x2="0" y2="${scale}" stroke="url(#${gradientId})" stroke-width="2" />`;
        break;
      case 'waves':
        patternContent = `<path d="M0,${scale / 2} Q${scale / 4},0 ${scale / 2},${scale / 2} T${scale},${scale / 2}" stroke="url(#${gradientId})" fill="none" stroke-width="2" />`;
        break;
      case 'hexagons':
        const h = scale * 0.866;
        patternContent = `<polygon points="${scale / 2},0 ${scale},${h / 2} ${scale},${h * 1.5} ${scale / 2},${h * 2} 0,${h * 1.5} 0,${h / 2}" fill="url(#${gradientId})" />`;
        break;
      case 'triangles':
        patternContent = `<polygon points="${scale / 2},0 ${scale},${scale} 0,${scale}" fill="url(#${gradientId})" />`;
        break;
    }

    return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <pattern id="${patternId}" x="0" y="0" width="${scale + spacing}" height="${scale + spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${rotation})">
      ${patternContent}
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#${patternId})" />
</svg>`;
  };

  const copySVG = () => {
    navigator.clipboard.writeText(generateSVG());
    toast.success('SVG code copied to clipboard!');
  };

  const downloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pattern.svg';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('SVG file downloaded!');
  };

  const faqs = [
    {
      question: 'What is an SVG pattern?',
      answer: 'SVG patterns are repeating graphics defined in SVG format. They are resolution-independent and can be scaled without losing quality, making them perfect for backgrounds and textures.',
    },
    {
      question: 'Are these patterns seamless?',
      answer: 'Yes! All patterns are designed to tile seamlessly, meaning they repeat without visible seams or breaks.',
    },
    {
      question: 'Can I use these patterns commercially?',
      answer: 'Yes, all patterns you create with this tool are yours to use in any project, including commercial work.',
    },
    {
      question: 'How do I use the SVG in my website?',
      answer: 'Copy the SVG code and paste it directly into your HTML, or save it as a .svg file and reference it in your CSS or img tags.',
    },
  ];

  if (!tool) return <div>Tool not found</div>;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="svg-pattern-hero.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Preview */}
        <div className="flex justify-center">
          <div
            className="border-2 border-border rounded-lg shadow-lg w-full max-w-2xl"
            dangerouslySetInnerHTML={{ __html: generateSVG() }}
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Pattern Type</Label>
            <Select value={patternType} onValueChange={(v) => setPatternType(v as any)}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="lines">Lines</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
                <SelectItem value="hexagons">Hexagons</SelectItem>
                <SelectItem value="triangles">Triangles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rotation: {rotation}°</Label>
            <Slider
              value={[rotation]}
              onValueChange={(v) => setRotation(v[0])}
              min={0}
              max={360}
              step={15}
            />
          </div>

          <div className="space-y-2">
            <Label>Start Color</Label>
            <Input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>End Color</Label>
            <Input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>Scale: {scale}px</Label>
            <Slider
              value={[scale]}
              onValueChange={(v) => setScale(v[0])}
              min={10}
              max={100}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Spacing: {spacing}px</Label>
            <Slider
              value={[spacing]}
              onValueChange={(v) => setSpacing(v[0])}
              min={0}
              max={50}
              step={5}
            />
          </div>
        </div>

        {/* SVG Code Output */}
        <div className="space-y-2">
          <Label>SVG Code</Label>
          <div className="relative">
            <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto max-h-64">
              {generateSVG()}
            </pre>
            <Button
              onClick={copySVG}
              size="sm"
              className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4">
          <Button onClick={copySVG} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
            <Copy className="w-4 h-4 mr-2" />
            Copy SVG
          </Button>
          <Button onClick={downloadSVG} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download .svg
          </Button>
        </div>
      </div>
    </ToolPageTemplate>
  );
}
