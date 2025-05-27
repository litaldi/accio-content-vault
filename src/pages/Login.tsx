import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Brain, LogIn, Eye, EyeOff, Sparkles, UserPlus, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { DemoAccountSection } from '@/components/auth/DemoAccountSection';

const Login = () => {
  const [activeView, setActiveView] = useState<'welcome' | 'login' | 'signup'>('welcome');
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

  const resetToWelcome = () => {
    setActiveView('welcome');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  // Welcome/Landing View
  if (activeView === 'welcome') {
    return (
      <>
        <Helmet>
          <title>Welcome to Accio - Transform Knowledge Into Power</title>
          <meta name="description" content="Join thousands of knowledge builders using Accio to capture, organize, and discover insights. Start your free account today." />
        </Helmet>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-lg space-y-8 animate-fade-in">
            {/* Brand Header */}
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Welcome to Accio
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform scattered information into organized intelligence
                </p>
              </div>
            </div>

            {/* Primary Action Cards */}
            <div className="space-y-4">
              {/* Create Account Card */}
              <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02] hover:shadow-xl" 
                    onClick={() => setActiveView('signup')}>
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Sparkles className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Start New Account</h3>
                      <p className="text-muted-foreground text-lg">
                        Begin your knowledge journey with a free account
                      </p>
                    </div>
                    <Button size="lg" className="w-full group-hover:shadow-lg transition-all">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing User Card */}
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group transform hover:scale-[1.02]" 
                    onClick={() => setActiveView('login')}>
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-muted/50 rounded-xl flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                        <LogIn className="h-7 w-7 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Log In with Existing Account</h3>
                      <p className="text-muted-foreground text-lg">
                        Welcome back! Continue building your knowledge empire
                      </p>
                    </div>
                    <Button variant="outline" size="lg" className="w-full border-2 group-hover:border-primary/50 transition-all">
                      Continue Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="text-center space-y-4 pt-4">
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>50K+ users trust us</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Bank-level security</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                No credit card required • Free forever • Ready in 2 minutes
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Login/Signup Form View
  return (
    <>
      <Helmet>
        <title>{activeView === 'login' ? 'Welcome Back' : 'Start Your Journey'} - Accio</title>
        <meta name="description" content={activeView === 'login' ? 'Sign in to continue building your knowledge collection with Accio.' : 'Create your free Accio account and transform how you organize information.'} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={resetToWelcome}
            className="mb-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to options
          </Button>

          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center pb-6">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">
                  {activeView === 'login' ? 'Welcome back!' : 'Start your journey'}
                </CardTitle>
                <CardDescription className="text-base">
                  {activeView === 'login' 
                    ? 'Continue building your knowledge collection'
                    : 'Create your account to organize your knowledge'
                  }
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-0">
              {/* Demo Account Section - Only for Login */}
              {activeView === 'login' && (
                <>
                  <DemoAccountSection />
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-card px-3 text-xs text-muted-foreground uppercase tracking-wide">
                        Or sign in with email
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 text-base"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={activeView === 'login' ? 'Enter your password' : 'Create a secure password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 text-base pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 w-11 px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {activeView === 'login' && (
                    <div className="text-right">
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-medium shadow-lg hover:shadow-xl transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    activeView === 'login' ? 'Signing in...' : 'Creating account...'
                  ) : (
                    <>
                      {activeView === 'login' ? (
                        <>
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </Button>
              </form>

              {/* Social Login Section */}
              <div className="space-y-4">
                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-3 text-xs text-muted-foreground uppercase tracking-wide">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialLoginButtons />
              </div>

              {/* Switch Between Login/Signup */}
              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  {activeView === 'login' ? (
                    <>
                      New to Accio?{" "}
                      <button 
                        onClick={() => setActiveView('signup')}
                        className="text-primary font-medium hover:underline transition-colors"
                      >
                        Create your free account
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button 
                        onClick={() => setActiveView('login')}
                        className="text-primary font-medium hover:underline transition-colors"
                      >
                        Sign in instead
                      </button>
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
