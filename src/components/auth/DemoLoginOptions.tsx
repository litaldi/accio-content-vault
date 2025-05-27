
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, User, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { DEMO_CREDENTIALS } from '@/data/demoCredentials';
import { useToast } from '@/hooks/use-toast';

interface DemoLoginOptionsProps {
  onDemoSelect: (email: string, password: string) => void;
}

export const DemoLoginOptions: React.FC<DemoLoginOptionsProps> = ({ onDemoSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        Try Demo Account
        {isExpanded ? (
          <ChevronUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4" />
        )}
      </Button>

      {isExpanded && (
        <Card className="mt-4 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Demo Accounts
            </CardTitle>
            <CardDescription>
              Try Accio with pre-loaded sample data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Regular User Demo */}
            <div className="p-3 border rounded-lg space-y-3 bg-background">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{DEMO_CREDENTIALS.regular.label}</span>
                <Badge variant="secondary" className="text-xs">Demo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {DEMO_CREDENTIALS.regular.description}
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {DEMO_CREDENTIALS.regular.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.regular.email, 'Email')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {DEMO_CREDENTIALS.regular.password}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.regular.password, 'Password')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                size="sm"
                onClick={() => onDemoSelect(DEMO_CREDENTIALS.regular.email, DEMO_CREDENTIALS.regular.password)}
              >
                Login as Regular User
              </Button>
            </div>

            {/* Admin User Demo */}
            <div className="p-3 border rounded-lg space-y-3 bg-background">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="font-medium">{DEMO_CREDENTIALS.admin.label}</span>
                <Badge variant="secondary" className="text-xs">Demo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {DEMO_CREDENTIALS.admin.description}
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {DEMO_CREDENTIALS.admin.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.admin.email, 'Email')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-muted px-2 py-1 rounded text-xs">
                    {DEMO_CREDENTIALS.admin.password}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.admin.password, 'Password')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button 
                className="w-full" 
                variant="outline"
                size="sm"
                onClick={() => onDemoSelect(DEMO_CREDENTIALS.admin.email, DEMO_CREDENTIALS.admin.password)}
              >
                Login as Admin
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
