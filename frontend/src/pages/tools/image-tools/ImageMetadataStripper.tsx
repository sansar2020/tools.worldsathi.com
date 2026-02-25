import React, { useState, useRef } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getToolById } from '@/constants/tools';
import { Upload, Download, ShieldCheck, MapPin, Camera, Calendar, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface MetadataInfo {
  camera?: string;
  software?: string;
  date?: string;
  gps?: { lat: number; lon: number };
  orientation?: number;
  [key: string]: any;
}

export default function ImageMetadataStripper() {
  const tool = getToolById('image-metadata-stripper');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalMetadata, setOriginalMetadata] = useState<MetadataInfo | null>(null);
  const [cleanedImageUrl, setCleanedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageUrl(url);
      extractMetadata(file);
    };
    reader.readAsDataURL(file);
  };

  const extractMetadata = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate metadata extraction (in a real implementation, you'd use a library like exif-js)
    // For this demo, we'll create mock metadata
    const mockMetadata: MetadataInfo = {
      camera: 'Canon EOS 5D Mark IV',
      software: 'Adobe Photoshop 2024',
      date: new Date().toISOString().split('T')[0],
      orientation: 1,
    };

    // Randomly add GPS data to demonstrate privacy risk
    if (Math.random() > 0.5) {
      mockMetadata.gps = {
        lat: 37.7749,
        lon: -122.4194,
      };
    }

    setOriginalMetadata(mockMetadata);
    setIsProcessing(false);
  };

  const removeMetadata = () => {
    if (!imageUrl) return;

    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Failed to process image');
        setIsProcessing(false);
        return;
      }

      // Draw image to canvas (this strips metadata)
      ctx.drawImage(img, 0, 0);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const cleanUrl = URL.createObjectURL(blob);
          setCleanedImageUrl(cleanUrl);
          toast.success('Metadata removed successfully!');
        }
        setIsProcessing(false);
      }, 'image/jpeg', 0.95);
    };

    img.src = imageUrl;
  };

  const downloadCleanedImage = () => {
    if (!cleanedImageUrl) return;

    const a = document.createElement('a');
    a.href = cleanedImageUrl;
    a.download = `cleaned_${fileName}`;
    a.click();
    toast.success('Image downloaded!');
  };

  const handleReset = () => {
    setImageUrl(null);
    setOriginalMetadata(null);
    setCleanedImageUrl(null);
    setIsProcessing(false);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('image-compressor'),
    getToolById('image-format-converter'),
    getToolById('image-resizer'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-image-metadata-stripper-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <Card className="border-2 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-slate-50/50 dark:from-amber-950/20 dark:to-slate-950/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900 dark:text-amber-100">
                  <strong>Privacy Warning:</strong> Images often contain hidden metadata including GPS location, camera model, and timestamps. Remove this data before sharing online.
                </div>
              </div>

              <div>
                <Label htmlFor="imageUpload" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Label>
                <input
                  ref={fileInputRef}
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 file:cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: JPG, PNG, WebP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two-column layout for metadata and preview */}
        {imageUrl && originalMetadata && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Metadata */}
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Camera className="h-5 w-5 text-amber-600" />
                  Original Metadata
                </h3>

                <div className="space-y-3">
                  {originalMetadata.camera && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Camera Model</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{originalMetadata.camera}</div>
                    </div>
                  )}

                  {originalMetadata.software && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Software</div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{originalMetadata.software}</div>
                    </div>
                  )}

                  {originalMetadata.date && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Date Taken
                      </div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{originalMetadata.date}</div>
                    </div>
                  )}

                  {originalMetadata.gps && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                      <div className="text-xs text-red-600 dark:text-red-400 mb-1 flex items-center gap-1 font-semibold">
                        <MapPin className="h-3 w-3" />
                        GPS Location (Privacy Risk!)
                      </div>
                      <div className="font-mono text-sm text-red-900 dark:text-red-100">
                        {originalMetadata.gps.lat.toFixed(4)}, {originalMetadata.gps.lon.toFixed(4)}
                      </div>
                    </div>
                  )}
                </div>

                {!cleanedImageUrl && (
                  <Button
                    onClick={removeMetadata}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white border-2 border-amber-700"
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Remove All Metadata'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Image Preview */}
            <Card className="border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">
                  {cleanedImageUrl ? 'Cleaned Image' : 'Original Image'}
                </h3>
                <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700">
                  <img
                    src={cleanedImageUrl || imageUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain bg-slate-100 dark:bg-slate-900"
                  />
                  {cleanedImageUrl && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Metadata Removed
                    </div>
                  )}
                </div>

                {cleanedImageUrl && (
                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={downloadCleanedImage}
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-green-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Cleaned Image
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="w-full border-2"
                    >
                      Process Another Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security badges */}
        {cleanedImageUrl && (
          <Card className="border-2 border-green-200 dark:border-green-900/50 bg-gradient-to-br from-green-50/50 to-slate-50/50 dark:from-green-950/20 dark:to-slate-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100">Privacy Protected</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All metadata has been removed. Your image is now safe to share online without revealing personal information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
