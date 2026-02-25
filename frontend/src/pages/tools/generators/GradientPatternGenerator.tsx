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
import { Copy, Download, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface ColorStop {
  color: string;
  position: number;
}

export default function GradientPatternGenerator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'gradient-pattern-generator');
  const relatedTools = tool ? getRelatedTools(tool, ALL_TOOLS) : [];

  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#14b8a6', position: 0 },
    { color: '#f59e0b', position: 100 },
  ]);
  const [patternOverlay, setPatternOverlay] = useState(false);
  const [patternType, setPatternType] = useState<'dots' | 'lines' | 'grid'>('dots');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawGradient();
  }, [gradientType, angle, colorStops, patternOverlay, patternType]);

  const drawGradient = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create gradient
    let gradient: CanvasGradient;
    
    if (gradientType === 'linear') {
      const angleRad = (angle * Math.PI) / 180;
      const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
      const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
      const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
      const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;
      gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    } else if (gradientType === 'radial') {
      gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    } else {
      gradient = ctx.createConicGradient((angle * Math.PI) / 180, width / 2, height / 2);
    }

    // Add color stops
    colorStops.forEach((stop) => {
      gradient.addColorStop(stop.position / 100, stop.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add pattern overlay if enabled
    if (patternOverlay) {
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = '#000000';
      
      if (patternType === 'dots') {
        for (let x = 0; x < width; x += 20) {
          for (let y = 0; y < height; y += 20) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (patternType === 'lines') {
        for (let x = 0; x < width; x += 10) {
          ctx.fillRect(x, 0, 1, height);
        }
      } else if (patternType === 'grid') {
        for (let x = 0; x < width; x += 20) {
          ctx.fillRect(x, 0, 1, height);
        }
        for (let y = 0; y < height; y += 20) {
          ctx.fillRect(0, y, width, 1);
        }
      }
      
      ctx.globalAlpha = 1;
    }
  };

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const newPosition = colorStops.length > 0 ? 
        Math.min(100, colorStops[colorStops.length - 1].position + 20) : 50;
      setColorStops([...colorStops, { color: '#6366f1', position: newPosition }]);
    }
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const updateColorStop = (index: number, field: 'color' | 'position', value: string | number) => {
    const updated = [...colorStops];
    if (field === 'color') {
      updated[index].color = value as string;
    } else {
      updated[index].position = Math.max(0, Math.min(100, value as number));
    }
    setColorStops(updated);
  };

  const generateCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${stops});`;
    } else if (gradientType === 'radial') {
      return `background: radial-gradient(circle, ${stops});`;
    } else {
      return `background: conic-gradient(from ${angle}deg, ${stops});`;
    }
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast.success('CSS copied to clipboard!');
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gradient-pattern.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded!');
      }
    });
  };

  const faqs = [
    {
      question: 'What gradient types are supported?',
      answer: 'The tool supports linear, radial, and conic gradients. Linear gradients flow in a straight line, radial gradients emanate from a center point, and conic gradients rotate around a center point.',
    },
    {
      question: 'How many color stops can I add?',
      answer: 'You can add up to 5 color stops to create complex multi-color gradients. Each stop can be positioned independently along the gradient.',
    },
    {
      question: 'What are pattern overlays?',
      answer: 'Pattern overlays add subtle textures (dots, lines, or grids) on top of your gradient to create more interesting visual effects.',
    },
    {
      question: 'Can I use these gradients in my projects?',
      answer: 'Yes! Copy the CSS code and paste it directly into your stylesheets, or download the PNG image for use in designs.',
    },
  ];

  if (!tool) return <div>Tool not found</div>;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="gradient-pattern-hero.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Preview Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="border-2 border-border rounded-lg shadow-lg w-full max-w-2xl"
          />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gradient Type */}
          <div className="space-y-2">
            <Label>Gradient Type</Label>
            <Select value={gradientType} onValueChange={(v) => setGradientType(v as any)}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
                <SelectItem value="conic">Conic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Angle Control */}
          <div className="space-y-2">
            <Label>Angle: {angle}°</Label>
            <Slider
              value={[angle]}
              onValueChange={(v) => setAngle(v[0])}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Color Stops */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Color Stops</Label>
            <Button
              onClick={addColorStop}
              disabled={colorStops.length >= 5}
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Stop
            </Button>
          </div>

          {colorStops.map((stop, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Input
                type="color"
                value={stop.color}
                onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                className="w-16 h-10 cursor-pointer"
              />
              <div className="flex-1 space-y-2">
                <Label className="text-sm">Position: {stop.position}%</Label>
                <Slider
                  value={[stop.position]}
                  onValueChange={(v) => updateColorStop(index, 'position', v[0])}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <Button
                onClick={() => removeColorStop(index)}
                disabled={colorStops.length <= 2}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Pattern Overlay */}
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <Label>Pattern Overlay</Label>
            <Switch checked={patternOverlay} onCheckedChange={setPatternOverlay} />
          </div>

          {patternOverlay && (
            <div className="space-y-2">
              <Label>Pattern Type</Label>
              <Select value={patternType} onValueChange={(v) => setPatternType(v as any)}>
                <SelectTrigger className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dots">Dots</SelectItem>
                  <SelectItem value="lines">Lines</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* CSS Output */}
        <div className="space-y-2">
          <Label>CSS Code</Label>
          <div className="relative">
            <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto">
              {generateCSS()}
            </pre>
            <Button
              onClick={copyCSS}
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
          <Button onClick={copyCSS} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
            <Copy className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
          <Button onClick={downloadPNG} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </div>
    </ToolPageTemplate>
  );
}
