import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function MetaTagsGenerator() {
  const tool = ALL_TOOLS.find((t) => t.id === 'meta-tags-generator')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const tags = `<!-- Basic Meta Tags -->
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Your page description'}">
<meta name="keywords" content="${keywords || 'keyword1, keyword2, keyword3'}">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="${ogTitle || title || 'Your Page Title'}">
<meta property="og:description" content="${ogDescription || description || 'Your page description'}">
<meta property="og:image" content="${ogImage || 'https://example.com/image.jpg'}">
<meta property="og:type" content="website">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${ogTitle || title || 'Your Page Title'}">
<meta name="twitter:description" content="${ogDescription || description || 'Your page description'}">
<meta name="twitter:image" content="${ogImage || 'https://example.com/image.jpg'}">`;

    setGeneratedTags(tags);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What are meta tags?',
      answer: 'Meta tags are HTML elements that provide information about a web page to search engines and social media platforms.'
    },
    {
      question: 'Why are Open Graph tags important?',
      answer: 'Open Graph tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter.'
    },
    {
      question: 'What is the ideal meta description length?',
      answer: 'Meta descriptions should be 150-160 characters for optimal display in search results.'
    },
    {
      question: 'Do I need both title and og:title?',
      answer: 'The title tag is for search engines, og:title is for social media. They can be the same or different based on your needs.'
    },
    {
      question: 'Where do I place these meta tags?',
      answer: 'Place all meta tags in the <head> section of your HTML document, before the closing </head> tag.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-meta-tags-generator-hero-gradient.dim_1200x400.png"
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
            <Label htmlFor="title" className="text-foreground">Page Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your page title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">Meta Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your page description (150-160 characters)"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="keywords" className="text-foreground">Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="og-title" className="text-foreground">Open Graph Title (optional)</Label>
            <Input
              id="og-title"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder="Leave empty to use page title"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="og-description" className="text-foreground">Open Graph Description (optional)</Label>
            <Textarea
              id="og-description"
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Leave empty to use meta description"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="og-image" className="text-foreground">Open Graph Image URL</Label>
            <Input
              id="og-image"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
          </div>
        </div>

        <Button onClick={handleGenerate} variant="primary" className="w-full">
          Generate Meta Tags
        </Button>

        {generatedTags && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-foreground">Generated Meta Tags</Label>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={generatedTags}
              readOnly
              className="font-mono min-h-[300px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
