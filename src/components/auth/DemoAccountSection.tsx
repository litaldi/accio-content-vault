
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, User, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DemoAccountSection = () => {
  const { toast } = useToast();

  const demoAccounts = [
    {
      type: 'Regular User Demo',
      icon: User,
      email: 'demo@accio.ai',
      password: 'Demo1234',
      description: 'Experience the full power of Accio with sample data',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900'
    },
    {
      type: 'Admin Demo',
      icon: Shield,
      email: 'admin@accio.ai',
      password: 'Admin1234',
      description: 'Explore advanced features and admin capabilities',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-900'
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
      <Sparkles className="h-4 w-4 text-blue-600" />
      <AlertDescription>
        <div className="space-y-5">
          <div className="text-center">
            <h4 className="font-semibold text-blue-900 mb-2 text-lg">Try Accio Instantly</h4>
            <p className="text-blue-800 text-sm">Use demo credentials to explore all features without signing up</p>
          </div>
          
          <div className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div key={index} className={`${account.bgColor} rounded-lg p-4 space-y-3 border border-blue-200/50`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${account.gradient} flex items-center justify-center shadow-sm`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className={`font-semibold ${account.textColor} text-base`}>{account.type}</span>
                    <p className={`text-xs ${account.textColor}/80`}>{account.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 border border-white/50">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-medium text-blue-600/80 uppercase tracking-wide">Email</span>
                      <span className="text-sm font-mono text-blue-900 truncate">{account.email}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.email, 'Email')}
                      className="h-8 w-8 p-0 hover:bg-blue-100/80 flex-shrink-0"
                      aria-label={`Copy ${account.type} email`}
                    >
                      <Copy className="h-3 w-3 text-blue-600" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/80 rounded-lg px-3 py-2 border border-white/50">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-medium text-blue-600/80 uppercase tracking-wide">Password</span>
                      <span className="text-sm font-mono text-blue-900">{account.password}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(account.password, 'Password')}
                      className="h-8 w-8 p-0 hover:bg-blue-100/80 flex-shrink-0"
                      aria-label={`Copy ${account.type} password`}
                    >
                      <Copy className="h-3 w-3 text-blue-600" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  onClick={() => fillDemoCredentials(account.email, account.password)}
                  className={`w-full bg-gradient-to-r ${account.gradient} hover:opacity-90 text-white border-0 shadow-sm hover:shadow-md transition-all font-medium`}
                  aria-label={`Auto-fill ${account.type} credentials`}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Use {account.type === 'Regular User Demo' ? 'User' : 'Admin'} Account
                </Button>
              </div>
            ))}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
