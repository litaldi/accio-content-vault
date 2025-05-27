
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Zap } from 'lucide-react';
import { copy } from '@/utils/copy';
import { useToast } from '@/hooks/use-toast';

interface DemoAccountInfoProps {
  onQuickLogin?: () => void;
}

export const DemoAccountInfo: React.FC<DemoAccountInfoProps> = ({ onQuickLogin }) => {
  const { toast } = useToast();

  const copyCredentials = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied!`,
      description: `${type} has been copied to your clipboard.`,
    });
  };

  return (
    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {copy.demo.title}
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-blue-700 dark:text-blue-300">
          {copy.demo.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Email:</span>
            <div className="flex items-center gap-1">
              <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded font-mono">
                {copy.demo.email}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyCredentials(copy.demo.email, 'Email')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Password:</span>
            <div className="flex items-center gap-1">
              <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded font-mono">
                {copy.demo.password}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyCredentials(copy.demo.password, 'Password')}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        {onQuickLogin && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full bg-white dark:bg-gray-800"
            onClick={onQuickLogin}
          >
            <Zap className="h-3 w-3 mr-2" />
            Quick Demo Login
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
