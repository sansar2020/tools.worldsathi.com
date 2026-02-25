import React, { useState, useRef } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function ImageToBase64() {
  const tool = ALL_TOOLS.find((t) => t.id === 'image-to-base64')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        setBase64(result);
        setFileSize((file.size / 1024).toFixed(2));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is Base64 encoding?',
      answer: 'Base64 is a way to encode binary data (like images) into ASCII text format, making it easy to embed in HTML, CSS, or JSON.'
    },
    {
      question: 'When should I use Base64 images?',
      answer: 'Use Base64 for small images, icons, or when you need to embed images directly in code without external files.'
    },
    {
      question: 'Are there any downsides to Base64?',
      answer: 'Base64 increases file size by about 33% and cannot be cached separately by browsers.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'All common formats: JPG, PNG, GIF, WebP, SVG, and more.'
    },
    {
      question: 'How do I use the Base64 string?',
      answer: 'Copy the output and use it in HTML (<img src="data:image/...">), CSS (background-image: url(data:image/...)), or anywhere you need embedded images.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-to-base64-hero-gradient.dim_1200x400.png"
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
              <div className="border-2 border-muted rounded-lg p-4">
                <p className="text-center text-muted-foreground mb-4">Image Preview</p>
                <img src={image} alt="Preview" className="max-w-full h-auto mx-auto max-h-64" />
                <p className="text-center text-sm text-muted-foreground mt-4">
                  File size: {fileSize} KB
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Base64 Output</Label>
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={base64}
                  readOnly
                  className="font-mono text-xs min-h-[200px] bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Base64 length: {base64.length.toLocaleString()} characters
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolPageTemplate>
  );
}
