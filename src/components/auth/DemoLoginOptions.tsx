
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, User, Shield, ChevronDown, ChevronUp, Play } from 'lucide-react';
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

  const handleQuickLogin = (email: string, password: string, userType: string) => {
    onDemoSelect(email, password);
    toast({
      title: "Demo account selected",
      description: `Logging in as ${userType}...`,
    });
  };

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        className="w-full h-12"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <Play className="mr-2 h-4 w-4" />
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
              Experience Accio with pre-loaded sample data - no signup required
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Regular User Demo */}
            <div className="p-4 border rounded-lg space-y-3 bg-background/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{DEMO_CREDENTIALS.regular.label}</span>
                  <Badge variant="secondary" className="text-xs">Demo</Badge>
                </div>
                <Button
                  size="sm"
                  className="h-8"
                  onClick={() => handleQuickLogin(
                    DEMO_CREDENTIALS.regular.email, 
                    DEMO_CREDENTIALS.regular.password,
                    "Regular User"
                  )}
                >
                  Quick Login
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {DEMO_CREDENTIALS.regular.description}
              </p>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <code className="text-xs font-mono">
                    {DEMO_CREDENTIALS.regular.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.regular.email, 'Email')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <code className="text-xs font-mono">
                    {DEMO_CREDENTIALS.regular.password}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.regular.password, 'Password')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Admin User Demo */}
            <div className="p-4 border rounded-lg space-y-3 bg-background/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{DEMO_CREDENTIALS.admin.label}</span>
                  <Badge variant="secondary" className="text-xs">Admin</Badge>
                </div>
                <Button
                  size="sm"
                  className="h-8"
                  onClick={() => handleQuickLogin(
                    DEMO_CREDENTIALS.admin.email, 
                    DEMO_CREDENTIALS.admin.password,
                    "Admin User"
                  )}
                >
                  Quick Login
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {DEMO_CREDENTIALS.admin.description}
              </p>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <code className="text-xs font-mono">
                    {DEMO_CREDENTIALS.admin.email}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.admin.email, 'Email')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-muted/50 p-2 rounded">
                  <code className="text-xs font-mono">
                    {DEMO_CREDENTIALS.admin.password}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(DEMO_CREDENTIALS.admin.password, 'Password')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-muted-foreground pt-2 border-t">
              Demo accounts include sample data and reset on page reload
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
