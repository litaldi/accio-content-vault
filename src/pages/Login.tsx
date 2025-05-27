
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, LogIn, Github, Mail, Lock, Info, Copy, Eye, EyeOff, User, Shield, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { DemoAccountSection } from '@/components/auth/DemoAccountSection';

const Login = () => {
  const [activeView, setActiveView] = useState<'initial' | 'login' | 'signup'>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Logging in with:', { email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
    }, 1500);
  };

  const resetToInitial = () => {
    setActiveView('initial');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  if (activeView === 'initial') {
    return (
      <>
        <Helmet>
          <title>Welcome - Accio Knowledge Management</title>
          <meta name="description" content="Sign in to your Accio account or create a new one to start building your knowledge empire." />
        </Helmet>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-lg space-y-8">
            {/* Welcome Header */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Welcome to Accio
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your intelligent knowledge management platform
                </p>
              </div>
            </div>

            {/* Action Cards */}
            <div className="space-y-4">
              <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group" 
                    onClick={() => setActiveView('signup')}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Start New Account</CardTitle>
                  <CardDescription className="text-base">
                    Create your free account and begin building your knowledge empire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    Create Your Free Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" 
                    onClick={() => setActiveView('login')}>
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                      <LogIn className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">Log In with Existing Account</CardTitle>
                  <CardDescription className="text-base">
                    Welcome back! Continue building your knowledge collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" size="lg">
                    Sign In to Your Account
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Bank-level security</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>50K+ users trust us</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                No credit card required • 14 days free • Ready in 2 minutes
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{activeView === 'login' ? 'Sign In' : 'Create Account'} - Accio Knowledge Management</title>
        <meta name="description" content={activeView === 'login' ? 'Sign in to your Accio account to access your knowledge collection.' : 'Create your free Accio account and start building your knowledge empire.'} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={resetToInitial}
            className="mb-4"
          >
            ← Back to options
          </Button>

          <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                {activeView === 'login' ? 'Welcome back!' : 'Start your journey'}
              </CardTitle>
              <CardDescription>
                {activeView === 'login' 
                  ? 'Sign in to continue building your knowledge collection'
                  : 'Create your account to start organizing your knowledge'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeView === 'login' && <DemoAccountSection />}

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">
                    {activeView === 'login' ? 'OR SIGN IN WITH EMAIL' : 'OR CREATE WITH EMAIL'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
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
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 w-12 px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {activeView === 'login' && (
                    <div className="text-right">
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12" 
                  disabled={isLoading}
                  loading={isLoading}
                >
                  {isLoading ? (
                    activeView === 'login' ? 'Signing in...' : 'Creating account...'
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      {activeView === 'login' ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </form>

              <SocialLoginButtons />

              <div className="text-center text-sm text-muted-foreground">
                {activeView === 'login' ? (
                  <p>
                    New to Accio?{" "}
                    <button 
                      onClick={() => setActiveView('signup')}
                      className="text-primary font-medium hover:underline"
                    >
                      Create your free account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveView('login')}
                      className="text-primary font-medium hover:underline"
                    >
                      Sign in instead
                    </button>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
