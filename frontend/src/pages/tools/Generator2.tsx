import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/Button';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { toast } from 'sonner';

export default function Generator2() {
  const tool = ALL_TOOLS.find((t) => t.id === 'qr-code-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [text, setText] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');

  const handleGenerate = () => {
    if (!text.trim()) {
      toast.error('Please enter text or URL');
      return;
    }
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
    setQrCode(qrUrl);
  };

  const handleDownload = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
    toast.success('QR code downloaded');
  };

  const handleReset = () => {
    setText('');
    setQrCode('');
  };

  const faqs = [
    {
      question: 'What can I encode in a QR code?',
      answer: 'You can encode URLs, text, contact information, WiFi credentials, and more.',
    },
    {
      question: 'What size QR code should I use?',
      answer: 'For print, use at least 300x300 pixels. For digital use, 200x200 is usually sufficient.',
    },
    {
      question: 'Can I customize the QR code design?',
      answer: 'This tool generates standard black and white QR codes optimized for scanning reliability.',
    },
    {
      question: 'How do I test my QR code?',
      answer: 'Use your smartphone camera or a QR code scanner app to test the generated code.',
    },
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-qr-code-generator-gradient.dim_1200x300.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text or URL</Label>
          <Input
            id="text"
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="primary" onClick={handleGenerate} className="flex-1">
            Generate QR Code
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {qrCode && (
          <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg text-center space-y-4">
            <img src={qrCode} alt="QR Code" className="mx-auto" />
            <Button variant="primary" onClick={handleDownload}>
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
