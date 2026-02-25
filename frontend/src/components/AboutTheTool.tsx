import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Info, Users, Award } from 'lucide-react';
import type { AboutToolContent } from '@/types/tools';

interface AboutTheToolProps {
  content: AboutToolContent;
}

export default function AboutTheTool({ content }: AboutTheToolProps) {
  return (
    <Card className="bg-card border border-border rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">About the Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Introduction */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Introduction
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {content.introduction}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Key Features
          </h3>
          <ul className="space-y-2">
            {content.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Who Benefits */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Who Benefits
          </h3>
          <ul className="space-y-2">
            {content.whoBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Users className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Choose This Tool */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Why Choose This Tool
          </h3>
          <ul className="space-y-2">
            {content.whyChoose.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <Award className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
