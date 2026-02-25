import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function OpenGraphPreview() {
  const tool = ALL_TOOLS.find((t) => t.id === 'og-preview')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateTags = () => {
    const tags = `<meta property="og:url" content="${url || 'https://example.com'}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title || 'Your Page Title'}">
<meta property="og:description" content="${description || 'Your page description'}">
<meta property="og:image" content="${imageUrl || 'https://example.com/image.jpg'}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url || 'https://example.com'}">
<meta name="twitter:title" content="${title || 'Your Page Title'}">
<meta name="twitter:description" content="${description || 'Your page description'}">
<meta name="twitter:image" content="${imageUrl || 'https://example.com/image.jpg'}">`;

    setMetaTags(tags);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What is Open Graph?',
      answer: 'Open Graph is a protocol that controls how URLs are displayed when shared on social media platforms.'
    },
    {
      question: 'What image size should I use?',
      answer: 'Recommended size is 1200x630 pixels for optimal display across all platforms.'
    },
    {
      question: 'Will this preview be exactly how it appears?',
      answer: 'This is a close approximation. Each platform may render cards slightly differently.'
    },
    {
      question: 'How do I test my actual page?',
      answer: 'Use Facebook Sharing Debugger or Twitter Card Validator to test your live page with real meta tags.'
    },
    {
      question: 'Do I need different tags for each platform?',
      answer: 'Open Graph tags work for most platforms. Twitter has its own tags but will fall back to Open Graph if not present.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-og-preview-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
      testimonials={tool.testimonials}
      performanceMetrics={tool.performanceMetrics}
      apiInfo={tool.apiInfo}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="url" className="text-foreground">Page URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="title" className="text-foreground">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your page title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your page description"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-foreground">Image URL</Label>
            <Input
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
          </div>
        </div>

        {(title || description || imageUrl) && (
          <div className="border border-border rounded-lg p-6 bg-muted">
            <Label className="text-foreground mb-4 block">Preview</Label>
            <div className="bg-background border border-border rounded-lg overflow-hidden">
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {title || 'Your Page Title'}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {description || 'Your page description'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {url || 'https://example.com'}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button onClick={handleGenerateTags} variant="primary" className="w-full">
          Generate Meta Tags
        </Button>

        {metaTags && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-foreground">Generated Meta Tags</Label>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={metaTags}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
