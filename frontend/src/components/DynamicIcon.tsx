import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Dynamic icon component that renders Lucide icons from string names
 * Falls back to Wrench icon if the specified icon is not found
 * Supports all Lucide React icon names in PascalCase format
 */
export default function DynamicIcon({ name, className, size = 24, color, ...props }: DynamicIconProps) {
  // Get the icon component from lucide-react
  const IconComponent = (Icons as any)[name] as React.ComponentType<LucideProps> | undefined;
  
  // Fallback to Wrench icon if not found
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react, using Wrench fallback. Available icons use PascalCase (e.g., "Calculator", "TrendingUp", "BarChart")`);
    const FallbackIcon = Icons.Wrench;
    return <FallbackIcon className={className} size={size} color={color} {...props} />;
  }
  
  return <IconComponent className={className} size={size} color={color} {...props} />;
}
