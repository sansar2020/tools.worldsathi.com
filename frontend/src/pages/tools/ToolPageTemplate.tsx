import React, { useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolHero from '@/components/ToolHero';
import CategoryBadge from '@/components/CategoryBadge';
import UsabilityGuide from '@/components/UsabilityGuide';
import AboutTheTool from '@/components/AboutTheTool';
import TestimonialsSection from '@/components/TestimonialsSection';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import ApiAccessSection from '@/components/ApiAccessSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Sidebar from '@/components/Sidebar';
import { Link } from '@tanstack/react-router';
import { useRecordToolUsage } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import type { ToolMetadata, ToolFAQ, AboutToolContent, Testimonial, PerformanceMetric, ApiInfo } from '@/types/tools';
import { getCategoryDisplayName } from '@/constants/categories';

interface ToolPageTemplateProps {
  tool: ToolMetadata;
  gradientFilename: string;
  faqs: ToolFAQ[];
  relatedTools: ToolMetadata[];
  children: React.ReactNode;
  aboutContent?: AboutToolContent;
  testimonials?: Testimonial[];
  performanceMetrics?: PerformanceMetric[];
  apiInfo?: ApiInfo;
}

export default function ToolPageTemplate({
  tool,
  gradientFilename,
  faqs,
  relatedTools,
  children,
  aboutContent,
  testimonials,
  performanceMetrics,
  apiInfo,
}: ToolPageTemplateProps) {
  const recordUsage = useRecordToolUsage();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    // Track tool usage if user is authenticated
    if (identity) {
      recordUsage.mutate(tool.id);
    }
  }, [tool.id, identity, recordUsage]);

  const breadcrumbItems = [
    {
      label: getCategoryDisplayName(tool.category),
      path: `/category/${tool.category}`,
    },
    {
      label: tool.name,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <ToolHero
        toolName={tool.name}
        categoryId={tool.category}
        gradientFilename={gradientFilename}
      />

      {/* Breadcrumbs directly under hero */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* 2. Main Tool Interface */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{tool.name}</CardTitle>
                  <CategoryBadge
                    categoryId={tool.category}
                    subcategory={tool.subcategory}
                  />
                </div>
              </CardHeader>
              <CardContent>{children}</CardContent>
            </Card>

            {/* 3. How to Use This Tool */}
            {tool.usabilitySteps && tool.usabilitySteps.length > 0 && (
              <UsabilityGuide steps={tool.usabilitySteps} />
            )}

            {/* 4. About the Tool */}
            {aboutContent && <AboutTheTool content={aboutContent} />}

            {/* 5. Performance Metrics (optional) */}
            {performanceMetrics && performanceMetrics.length > 0 && (
              <PerformanceMetrics metrics={performanceMetrics} />
            )}

            {/* 6. FAQ Section */}
            {faqs && faqs.length > 0 && (
              <Card className="bg-card border border-border shadow-md">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* 7. Testimonials (optional) */}
            {testimonials && testimonials.length > 0 && (
              <TestimonialsSection testimonials={testimonials} />
            )}

            {/* 8. Related Tools */}
            {relatedTools.length > 0 && (
              <Card className="bg-card border border-border shadow-md">
                <CardHeader>
                  <CardTitle>Related Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedTools.map((relatedTool) => (
                      <Link
                        key={relatedTool.id}
                        to={relatedTool.path}
                        className="block p-4 border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
                      >
                        <h4 className="font-semibold text-foreground mb-2">
                          {relatedTool.name}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedTool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 9. API Access (optional) */}
            {apiInfo && apiInfo.available && (
              <ApiAccessSection apiInfo={apiInfo} />
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
