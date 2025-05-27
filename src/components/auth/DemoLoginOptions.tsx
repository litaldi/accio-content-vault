
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, User, Shield } from 'lucide-react';
import { DEMO_CREDENTIALS } from '@/data/demoCredentials';
import { useToast } from '@/hooks/use-toast';

interface DemoLoginOptionsProps {
  onDemoSelect: (email: string, password: string) => void;
}

export const DemoLoginOptions: React.FC<DemoLoginOptionsProps> = ({ onDemoSelect }) => {
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
    <Card className="mt-6">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Try Demo Accounts</CardTitle>
        <CardDescription>
          Experience Accio with pre-loaded demo data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Regular User Demo */}
        <div className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{DEMO_CREDENTIALS.regular.label}</span>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {DEMO_CREDENTIALS.regular.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-muted-foreground">Email:</label>
              <div className="flex items-center gap-1">
                <code className="bg-muted px-1 rounded">{DEMO_CREDENTIALS.regular.email}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard(DEMO_CREDENTIALS.regular.email, 'Email')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-muted-foreground">Password:</label>
              <div className="flex items-center gap-1">
                <code className="bg-muted px-1 rounded">{DEMO_CREDENTIALS.regular.password}</code>
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
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onDemoSelect(DEMO_CREDENTIALS.regular.email, DEMO_CREDENTIALS.regular.password)}
          >
            Login as Regular User
          </Button>
        </div>

        {/* Admin User Demo */}
        <div className="p-4 border rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="font-medium">{DEMO_CREDENTIALS.admin.label}</span>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {DEMO_CREDENTIALS.admin.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-muted-foreground">Email:</label>
              <div className="flex items-center gap-1">
                <code className="bg-muted px-1 rounded">{DEMO_CREDENTIALS.admin.email}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard(DEMO_CREDENTIALS.admin.email, 'Email')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-muted-foreground">Password:</label>
              <div className="flex items-center gap-1">
                <code className="bg-muted px-1 rounded">{DEMO_CREDENTIALS.admin.password}</code>
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
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => onDemoSelect(DEMO_CREDENTIALS.admin.email, DEMO_CREDENTIALS.admin.password)}
          >
            Login as Admin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
