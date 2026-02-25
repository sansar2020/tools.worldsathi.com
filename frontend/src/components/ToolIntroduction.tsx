import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface ToolIntroductionProps {
  introduction: string;
}

export default function ToolIntroduction({ introduction }: ToolIntroductionProps) {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Info className="h-5 w-5 text-primary" />
          About This Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{introduction}</p>
      </CardContent>
    </Card>
  );
}
