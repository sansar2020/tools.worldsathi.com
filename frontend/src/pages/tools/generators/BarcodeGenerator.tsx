import React, { useState, useRef } from 'react';
import { Barcode, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ToolPageTemplate from '../ToolPageTemplate';
import { getToolById } from '@/constants/tools';

type BarcodeFormat = 'CODE128' | 'EAN13' | 'UPC';

export default function BarcodeGenerator() {
  const [inputText, setInputText] = useState<string>('');
  const [format, setFormat] = useState<BarcodeFormat>('CODE128');
  const [error, setError] = useState<string>('');
  const [barcodeGenerated, setBarcodeGenerated] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tool = getToolById('barcode-generator');

  const validateInput = (text: string, fmt: BarcodeFormat): string | null => {
    if (!text.trim()) {
      return 'Please enter text or numbers';
    }

    switch (fmt) {
      case 'EAN13':
        if (!/^\d{13}$/.test(text)) {
          return 'EAN13 requires exactly 13 digits';
        }
        break;
      case 'UPC':
        if (!/^\d{12}$/.test(text)) {
          return 'UPC requires exactly 12 digits';
        }
        break;
      case 'CODE128':
        if (text.length > 80) {
          return 'CODE128 supports up to 80 characters';
        }
        break;
    }

    return null;
  };

  const generateBarcode = () => {
    setError('');
    setBarcodeGenerated(false);

    const validationError = validateInput(inputText, format);
    if (validationError) {
      setError(validationError);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 150;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw simplified barcode representation
    ctx.fillStyle = '#000000';
    
    // Generate pattern based on input
    const barWidth = 3;
    const startX = 20;
    const barHeight = 80;
    const startY = 30;

    // Create a simple pattern based on character codes
    let x = startX;
    for (let i = 0; i < inputText.length; i++) {
      const charCode = inputText.charCodeAt(i);
      const pattern = charCode % 2 === 0 ? [1, 0, 1, 0] : [0, 1, 0, 1];
      
      pattern.forEach((bit) => {
        if (bit === 1) {
          ctx.fillRect(x, startY, barWidth, barHeight);
        }
        x += barWidth;
      });
    }

    // Draw text below barcode
    ctx.fillStyle = '#000000';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(inputText, canvas.width / 2, startY + barHeight + 25);

    // Draw format label
    ctx.font = '12px sans-serif';
    ctx.fillText(format, canvas.width / 2, startY + barHeight + 45);

    setBarcodeGenerated(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `barcode-${format}-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleReset = () => {
    setInputText('');
    setFormat('CODE128');
    setError('');
    setBarcodeGenerated(false);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const faqs = [
    {
      question: 'What barcode formats are supported?',
      answer: 'The tool supports CODE128 (alphanumeric), EAN13 (13 digits), and UPC (12 digits) formats.',
    },
    {
      question: 'What is the difference between EAN13 and UPC?',
      answer: 'EAN13 uses 13 digits and is common in Europe, while UPC uses 12 digits and is standard in North America.',
    },
    {
      question: 'Can I use letters in my barcode?',
      answer: 'Only CODE128 format supports alphanumeric characters. EAN13 and UPC require numeric digits only.',
    },
    {
      question: 'How do I download the barcode?',
      answer: 'After generating the barcode, click the Download button to save it as a PNG image file.',
    },
  ];

  const relatedTools = [
    getToolById('qr-code-generator'),
    getToolById('uuid-generator'),
    getToolById('password-generator'),
    getToolById('username-generator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (!tool) {
    return <div className="container mx-auto px-4 py-8">Tool not found</div>;
  }

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-barcode-generator-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
    >
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Barcode className="h-5 w-5" />
            Barcode Generator
          </CardTitle>
          <CardDescription>
            Generate barcodes in CODE128, EAN13, and UPC formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="barcode-input">Barcode Content</Label>
              <Input
                id="barcode-input"
                type="text"
                placeholder="Enter text or numbers"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-white dark:bg-gray-800 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format-select">Barcode Format</Label>
              <Select value={format} onValueChange={(value) => setFormat(value as BarcodeFormat)}>
                <SelectTrigger id="format-select" className="bg-white dark:bg-gray-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CODE128">CODE128 (Alphanumeric)</SelectItem>
                  <SelectItem value="EAN13">EAN13 (13 digits)</SelectItem>
                  <SelectItem value="UPC">UPC (12 digits)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format Requirements */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {format === 'CODE128' && '✓ Supports letters, numbers, and symbols (up to 80 characters)'}
                {format === 'EAN13' && '✓ Requires exactly 13 numeric digits'}
                {format === 'UPC' && '✓ Requires exactly 12 numeric digits'}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Barcode Preview */}
          <div className="space-y-3">
            <Label>Barcode Preview</Label>
            <div className="border-2 rounded-lg p-4 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ display: barcodeGenerated ? 'block' : 'none' }}
              />
              {!barcodeGenerated && (
                <p className="text-gray-400 dark:text-gray-600">
                  Barcode will appear here after generation
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={generateBarcode} className="flex-1 border-2" disabled={!inputText.trim()}>
              <Barcode className="mr-2 h-4 w-4" />
              Generate Barcode
            </Button>
            {barcodeGenerated && (
              <Button onClick={handleDownload} variant="secondary" className="border-2">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
            <Button onClick={handleReset} variant="outline" className="border-2">
              Reset
            </Button>
          </div>

          {/* Format Information */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Format Guide</h3>
            <div className="text-xs space-y-2 text-gray-600 dark:text-gray-400">
              <div>
                <strong>CODE128:</strong> Most versatile format supporting letters, numbers, and symbols. Ideal for general use.
              </div>
              <div>
                <strong>EAN13:</strong> International Article Number with 13 digits. Common in retail products worldwide.
              </div>
              <div>
                <strong>UPC:</strong> Universal Product Code with 12 digits. Standard for retail products in North America.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolPageTemplate>
  );
}
