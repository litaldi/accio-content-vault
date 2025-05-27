
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, LogIn, Github, Mail, Lock, Info, Copy } from 'lucide-react';
import { copy } from '@/utils/copy';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  const useDemoCredentials = () => {
    setEmail(copy.demo.credentials.email);
    setPassword(copy.demo.credentials.password);
    toast({
      title: "Demo credentials loaded",
      description: "You can now sign in to explore all features",
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied`,
      description: "Pasted to your clipboard",
    });
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Accio Knowledge Management</title>
        <meta name="description" content="Sign in to your Accio account and access your personal knowledge sanctuary." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Demo Credentials Banner */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">{copy.demo.credentials.title}</h4>
                  <p className="text-blue-800 text-sm mb-3">{copy.demo.credentials.subtitle}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/50 rounded p-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-medium">Email</span>
                      <span className="text-sm font-mono">{copy.demo.credentials.email}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(copy.demo.credentials.email, 'Email')}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white/50 rounded p-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-blue-600 font-medium">Password</span>
                      <span className="text-sm font-mono">{copy.demo.credentials.password}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(copy.demo.credentials.password, 'Password')}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  onClick={useDemoCredentials}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Use Demo Credentials
                </Button>
                
                <p className="text-xs text-blue-700">{copy.demo.credentials.note}</p>
              </div>
            </AlertDescription>
          </Alert>

          <Card className="shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">{copy.buttons.signIn}</CardTitle>
              <CardDescription>
                Access your knowledge collection and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In to Your Knowledge Hub
                </Button>
              </form>

              <div className="my-4 flex items-center">
                <Separator className="flex-grow" />
                <span className="px-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <Separator className="flex-grow" />
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <Github className="h-5 w-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                New to Accio?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Create your free account
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
