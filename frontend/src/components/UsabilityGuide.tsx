import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface UsabilityGuideProps {
  steps: string[];
}

export default function UsabilityGuide({ steps }: UsabilityGuideProps) {
  return (
    <Card className="bg-card border border-border shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpen className="h-5 w-5 text-secondary" />
          How to Use This Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-bold text-white shadow-md">
                {index + 1}
              </div>
              <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
