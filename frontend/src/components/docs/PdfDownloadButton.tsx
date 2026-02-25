import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function PdfDownloadButton() {
  return (
    <div className="mb-8 flex justify-center">
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <a
          href="/assets/ic-developer-guide-complete.pdf"
          download="ic-developer-guide-complete.pdf"
          className="flex items-center gap-2"
        >
          <Download className="h-5 w-5" />
          Download Complete Guide (PDF)
        </a>
      </Button>
    </div>
  );
}
