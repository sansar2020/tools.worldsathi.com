import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Target, Shield, TrendingUp } from 'lucide-react';
import type { PerformanceMetric } from '@/types/tools';

interface PerformanceMetricsProps {
  metrics: PerformanceMetric[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  target: Target,
  shield: Shield,
  trending: TrendingUp,
};

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Performance & Speed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = iconMap[metric.icon] || Zap;
          return (
            <Card key={index} className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-accent mb-2">{metric.value}</p>
                <p className="text-sm font-semibold text-foreground mb-1">{metric.label}</p>
                {metric.description && (
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
