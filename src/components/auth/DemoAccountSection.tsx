
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, User, Shield, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DemoAccountSection = () => {
  const { toast } = useToast();

  const demoAccounts = [
    {
      type: 'Regular User',
      icon: User,
      email: 'demo@accio.ai',
      password: 'Demo1234',
      description: 'Experience the full power of Accio with sample data',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'Admin Demo',
      icon: Shield,
      email: 'admin@accio.ai',
      password: 'Admin1234',
      description: 'Explore advanced features and admin capabilities',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied`,
      description: "Pasted to your clipboard",
    });
  };

  const fillDemoCredentials = (email: string, password: string) => {
    // This would typically interact with form state
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;
      
      // Trigger change events
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    toast({
      title: "Demo credentials loaded",
      description: "You can now sign in to explore all features",
    });
  };

  return (
    <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
      <Sparkles className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Try Accio instantly</h4>
            <p className="text-blue-800 text-sm">Use demo credentials to explore all features</p>
          </div>
          
          <div className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${account.gradient} flex items-center justify-center`}>
                    <account.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="font-medium text-blue-900 text-sm">{account.type}</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center justify-between bg-white/50 rounded px-2 py-1">
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-medium">Email</span>
                      <span className="text-sm font-mono">{account.email}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.email, 'Email')}
                      className="h-6 w-6 p-0 hover:bg-white/70"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/50 rounded px-2 py-1">
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-medium">Password</span>
                      <span className="text-sm font-mono">{account.password}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.password, 'Password')}
                      className="h-6 w-6 p-0 hover:bg-white/70"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  onClick={() => fillDemoCredentials(account.email, account.password)}
                  className={`w-full bg-gradient-to-r ${account.gradient} hover:opacity-90 text-white border-0`}
                >
                  Use {account.type} Credentials
                </Button>
                
                <p className="text-xs text-blue-700">{account.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
