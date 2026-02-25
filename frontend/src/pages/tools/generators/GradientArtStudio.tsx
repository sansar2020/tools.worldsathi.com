import React, { useState, useRef, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Copy, Download, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface GradientLayer {
  id: string;
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  color1: string;
  color2: string;
  opacity: number;
  blendMode: string;
}

export default function GradientArtStudio() {
  const tool = ALL_TOOLS.find((t) => t.id === 'gradient-art-studio');
  const relatedTools = tool ? getRelatedTools(tool, ALL_TOOLS) : [];

  const [layers, setLayers] = useState<GradientLayer[]>([
    {
      id: '1',
      type: 'linear',
      angle: 45,
      color1: '#14b8a6',
      color2: '#f59e0b',
      opacity: 100,
      blendMode: 'normal',
    },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawComposition();
  }, [layers]);

  const drawComposition = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw each layer
    layers.forEach((layer) => {
      ctx.save();
      ctx.globalAlpha = layer.opacity / 100;
      ctx.globalCompositeOperation = layer.blendMode as GlobalCompositeOperation;

      let gradient: CanvasGradient;

      if (layer.type === 'linear') {
        const angleRad = (layer.angle * Math.PI) / 180;
        const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
        const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
        const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
        const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      } else if (layer.type === 'radial') {
        gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
      } else {
        gradient = ctx.createConicGradient((layer.angle * Math.PI) / 180, width / 2, height / 2);
      }

      gradient.addColorStop(0, layer.color1);
      gradient.addColorStop(1, layer.color2);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    });
  };

  const addLayer = () => {
    const newLayer: GradientLayer = {
      id: Date.now().toString(),
      type: 'linear',
      angle: 90,
      color1: '#6366f1',
      color2: '#ec4899',
      opacity: 50,
      blendMode: 'multiply',
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter((l) => l.id !== id));
    }
  };

  const updateLayer = (id: string, updates: Partial<GradientLayer>) => {
    setLayers(layers.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const moveLayer = (index: number, direction: 'up' | 'down') => {
    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < layers.length) {
      [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
      setLayers(newLayers);
    }
  };

  const generateCSS = () => {
    return layers
      .map((layer, index) => {
        const stops = `${layer.color1} 0%, ${layer.color2} 100%`;
        let gradient = '';

        if (layer.type === 'linear') {
          gradient = `linear-gradient(${layer.angle}deg, ${stops})`;
        } else if (layer.type === 'radial') {
          gradient = `radial-gradient(circle, ${stops})`;
        } else {
          gradient = `conic-gradient(from ${layer.angle}deg, ${stops})`;
        }

        return `/* Layer ${index + 1} */
background-image: ${gradient};
opacity: ${layer.opacity / 100};
mix-blend-mode: ${layer.blendMode};`;
      })
      .join('\n\n');
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
        a.download = 'gradient-art.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded!');
      }
    });
  };

  const faqs = [
    {
      question: 'What are blend modes?',
      answer: 'Blend modes determine how layers interact with each other. Multiply darkens, screen lightens, overlay combines both, and normal stacks layers without blending.',
    },
    {
      question: 'How many layers can I add?',
      answer: 'You can add as many layers as you need to create your desired effect. Each layer can have independent gradient settings and blend modes.',
    },
    {
      question: 'Can I reorder layers?',
      answer: 'Yes! Use the up and down arrow buttons to change the stacking order of layers, which affects how they blend together.',
    },
    {
      question: 'What is the best blend mode for vibrant colors?',
      answer: 'Try "screen" or "overlay" for vibrant, luminous effects. "Multiply" creates darker, richer tones.',
    },
  ];

  if (!tool) return <div>Tool not found</div>;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="gradient-art-hero.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Preview Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border-2 border-border rounded-lg shadow-lg w-full max-w-2xl"
          />
        </div>

        {/* Layer Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Layers ({layers.length})</Label>
            <Button onClick={addLayer} size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add Layer
            </Button>
          </div>

          {layers.map((layer, index) => (
            <div key={layer.id} className="p-4 bg-muted/50 rounded-lg space-y-4 border-2 border-border">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Layer {index + 1}</Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => moveLayer(index, 'up')}
                    disabled={index === 0}
                    variant="ghost"
                    size="sm"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => moveLayer(index, 'down')}
                    disabled={index === layers.length - 1}
                    variant="ghost"
                    size="sm"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeLayer(layer.id)}
                    disabled={layers.length === 1}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={layer.type}
                    onValueChange={(v) => updateLayer(layer.id, { type: v as any })}
                  >
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

                <div className="space-y-2">
                  <Label>Blend Mode</Label>
                  <Select
                    value={layer.blendMode}
                    onValueChange={(v) => updateLayer(layer.id, { blendMode: v })}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="multiply">Multiply</SelectItem>
                      <SelectItem value="screen">Screen</SelectItem>
                      <SelectItem value="overlay">Overlay</SelectItem>
                      <SelectItem value="darken">Darken</SelectItem>
                      <SelectItem value="lighten">Lighten</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color 1</Label>
                  <Input
                    type="color"
                    value={layer.color1}
                    onChange={(e) => updateLayer(layer.id, { color1: e.target.value })}
                    className="w-full h-10 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color 2</Label>
                  <Input
                    type="color"
                    value={layer.color2}
                    onChange={(e) => updateLayer(layer.id, { color2: e.target.value })}
                    className="w-full h-10 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Angle: {layer.angle}°</Label>
                <Slider
                  value={[layer.angle]}
                  onValueChange={(v) => updateLayer(layer.id, { angle: v[0] })}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label>Opacity: {layer.opacity}%</Label>
                <Slider
                  value={[layer.opacity]}
                  onValueChange={(v) => updateLayer(layer.id, { opacity: v[0] })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CSS Output */}
        <div className="space-y-2">
          <Label>CSS Code</Label>
          <div className="relative">
            <pre className="p-4 bg-muted rounded-lg text-sm overflow-x-auto max-h-64">
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
