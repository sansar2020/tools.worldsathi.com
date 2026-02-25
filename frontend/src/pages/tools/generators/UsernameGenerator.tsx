import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { getToolById } from '@/constants/tools';
import { User, Copy, Check } from 'lucide-react';

const adjectives = ['Swift', 'Brave', 'Clever', 'Mighty', 'Silent', 'Golden', 'Shadow', 'Cosmic', 'Electric', 'Mystic'];
const nouns = ['Tiger', 'Phoenix', 'Dragon', 'Wolf', 'Eagle', 'Ninja', 'Wizard', 'Knight', 'Ranger', 'Hunter'];

type Style = 'camelCase' | 'snake_case' | 'lowercase';

export default function UsernameGenerator() {
  const tool = getToolById('username-generator');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [style, setStyle] = useState<Style>('camelCase');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUsernames = () => {
    const generated: string[] = [];
    for (let i = 0; i < 5; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const number = includeNumbers ? Math.floor(Math.random() * 1000) : '';

      let username = '';
      if (style === 'camelCase') {
        username = `${adj}${noun}${number}`;
      } else if (style === 'snake_case') {
        username = `${adj.toLowerCase()}_${noun.toLowerCase()}${number ? '_' + number : ''}`;
      } else {
        username = `${adj.toLowerCase()}${noun.toLowerCase()}${number}`;
      }

      generated.push(username);
    }
    setUsernames(generated);
    setCopiedIndex(null);
  };

  const copyUsername = (username: string, index: number) => {
    navigator.clipboard.writeText(username);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setUsernames([]);
    setCopiedIndex(null);
  };

  if (!tool) return <div>Tool not found</div>;

  const relatedTools = [
    getToolById('password-generator'),
    getToolById('uuid-generator'),
    getToolById('barcode-generator'),
  ].filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-username-generator-hero-gradient.dim_1200x400.png"
      faqs={tool.faqs || []}
      relatedTools={relatedTools}
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="style">Username Style</Label>
                <Select value={style} onValueChange={(value) => setStyle(value as Style)}>
                  <SelectTrigger id="style" className="mt-2 bg-white dark:bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camelCase">camelCase (MyUsername)</SelectItem>
                    <SelectItem value="snake_case">snake_case (my_username)</SelectItem>
                    <SelectItem value="lowercase">lowercase (myusername)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeNumbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                />
                <Label htmlFor="includeNumbers" className="cursor-pointer">
                  Include numbers
                </Label>
              </div>

              <div className="flex gap-3">
                <Button onClick={generateUsernames} className="flex-1 border-2 border-primary">
                  <User className="h-4 w-4 mr-2" />
                  Generate Usernames
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {usernames.length > 0 && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Generated Usernames</h3>
              <div className="space-y-2">
                {usernames.map((username, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-mono font-semibold">{username}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyUsername(username, index)}
                      className="border-2"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolPageTemplate>
  );
}
