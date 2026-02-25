import React, { useState, useRef, useEffect } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Copy, Download, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

interface GridPoint {
  color: string;
}

export default function MeshGradientCreator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'mesh-gradient-creator');
  const relatedTools = tool ? getRelatedTools(tool, ALL_TOOLS) : [];

  const [gridSize, setGridSize] = useState<3 | 4>(3);
  const [smoothness, setSmoothness] = useState(80);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [gridPoints, setGridPoints] = useState<GridPoint[]>(
    Array(9).fill(null).map(() => ({ color: '#14b8a6' }))
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Adjust grid points when size changes
    const newSize = gridSize * gridSize;
    if (gridPoints.length !== newSize) {
      setGridPoints(Array(newSize).fill(null).map(() => ({ color: '#14b8a6' })));
      setSelectedPoint(null);
    }
  }, [gridSize]);

  useEffect(() => {
    drawMeshGradient();
  }, [gridPoints, smoothness, gridSize]);

  const drawMeshGradient = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const cols = gridSize;
    const rows = gridSize;
    const cellWidth = width / (cols - 1);
    const cellHeight = height / (rows - 1);

    // Draw radial gradients for each point
    gridPoints.forEach((point, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = col * cellWidth;
      const y = row * cellHeight;

      const radius = (smoothness / 100) * Math.max(width, height);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, point.color);
      gradient.addColorStop(1, point.color + '00'); // Transparent

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  };

  const updatePointColor = (index: number, color: string) => {
    const updated = [...gridPoints];
    updated[index] = { color };
    setGridPoints(updated);
  };

  const randomizeColors = () => {
    const randomColor = () => {
      const colors = ['#14b8a6', '#f59e0b', '#6366f1', '#ec4899', '#10b981', '#f97316', '#8b5cf6', '#06b6d4'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    setGridPoints(gridPoints.map(() => ({ color: randomColor() })));
    toast.success('Colors randomized!');
  };

  const generateCSS = () => {
    const cols = gridSize;
    const rows = gridSize;

    const gradients = gridPoints.map((point, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = (col / (cols - 1)) * 100;
      const y = (row / (rows - 1)) * 100;

      return `radial-gradient(at ${x}% ${y}%, ${point.color} 0px, transparent ${smoothness}%)`;
    });

    return `background: ${gradients.join(',\n  ')};`;
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
        a.download = 'mesh-gradient.png';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded!');
      }
    });
  };

  const faqs = [
    {
      question: 'What is a mesh gradient?',
      answer: 'A mesh gradient is a modern design technique that creates smooth color transitions between multiple points, resulting in organic, flowing color blends.',
    },
    {
      question: 'How do I select a grid point?',
      answer: 'Click on any point in the grid below the preview to select it, then use the color picker to change its color.',
    },
    {
      question: 'What does smoothness control?',
      answer: 'Smoothness controls how far each color spreads from its point. Higher values create softer, more blended gradients.',
    },
    {
      question: 'Can I use this in production?',
      answer: 'Yes! Mesh gradients work in all modern browsers. Export as CSS for web use or PNG for design software.',
    },
  ];

  if (!tool) return <div>Tool not found</div>;

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="mesh-gradient-hero.dim_1200x400.png"
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

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Grid Size</Label>
            <Select value={gridSize.toString()} onValueChange={(v) => setGridSize(Number(v) as 3 | 4)}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3x3 Grid</SelectItem>
                <SelectItem value="4">4x4 Grid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Smoothness: {smoothness}%</Label>
            <Slider
              value={[smoothness]}
              onValueChange={(v) => setSmoothness(v[0])}
              min={20}
              max={150}
              step={5}
            />
          </div>
        </div>

        {/* Grid Point Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Grid Points</Label>
            <Button onClick={randomizeColors} size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <Shuffle className="w-4 h-4 mr-1" />
              Randomize
            </Button>
          </div>

          <div
            className="grid gap-3 p-4 bg-muted/30 rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {gridPoints.map((point, index) => (
              <button
                key={index}
                onClick={() => setSelectedPoint(index)}
                className={`aspect-square rounded-lg border-4 transition-all hover:scale-105 ${
                  selectedPoint === index
                    ? 'border-teal-500 shadow-lg scale-105'
                    : 'border-border'
                }`}
                style={{ backgroundColor: point.color }}
              />
            ))}
          </div>

          {selectedPoint !== null && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <Label>Point {selectedPoint + 1} Color</Label>
              <input
                type="color"
                value={gridPoints[selectedPoint].color}
                onChange={(e) => updatePointColor(selectedPoint, e.target.value)}
                className="w-full h-12 cursor-pointer rounded-lg"
              />
            </div>
          )}
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
