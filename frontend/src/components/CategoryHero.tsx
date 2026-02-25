import React from 'react';
import { TOOL_CATEGORIES } from '@/constants/categories';
import DynamicIcon from './DynamicIcon';

interface CategoryHeroProps {
  categoryId: string;
}

export default function CategoryHero({ categoryId }: CategoryHeroProps) {
  const category = TOOL_CATEGORIES.find((cat) => cat.id === categoryId);

  if (!category) {
    return null;
  }

  const gradientPath = `/assets/generated/category-${categoryId}-hero-gradient.dim_1200x400.png`;

  return (
    <div
      className="relative w-full h-80 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${gradientPath})`,
      }}
    >
      {/* Lighter overlay for better gradient visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <DynamicIcon name={category.icon} size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {category.displayName}
            </h1>
          </div>
        </div>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
          {category.description}
        </p>
      </div>
    </div>
  );
}
