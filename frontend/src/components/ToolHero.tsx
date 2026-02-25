import React from 'react';
import CategoryBadge from '@/components/CategoryBadge';

interface ToolHeroProps {
  toolName: string;
  categoryId: string;
  gradientFilename: string;
}

export default function ToolHero({ toolName, categoryId, gradientFilename }: ToolHeroProps) {
  const gradientPath = `/assets/generated/${gradientFilename}`;

  return (
    <div
      className="relative w-full h-64 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${gradientPath})`,
      }}
    >
      {/* Lighter overlay for better gradient visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <div className="mb-4">
          <CategoryBadge categoryId={categoryId} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {toolName}
        </h1>
      </div>
    </div>
  );
}
