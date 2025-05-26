
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AccessibleInput } from '@/components/forms/AccessibleInput';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Invalid email or password.');
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Accio Knowledge Library</title>
        <meta name="description" content="Sign in to your Accio account and access your personal knowledge library." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 mb-6 focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
              aria-label="Go to Accio homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-xl" aria-hidden="true">A</span>
              </div>
              <span className="text-2xl font-bold text-primary">Accio</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your knowledge library</p>
          </div>

          {/* Login Form */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground">Sign In</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {error && (
                  <Alert variant="destructive" role="alert">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Email */}
                <AccessibleInput
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  aria-describedby="email-help"
                />

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                    <span className="text-destructive ml-1" aria-label="required">*</span>
                  </label>
                  <div className="relative">
                    <AccessibleInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label=""
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="pr-10"
                      containerClassName="space-y-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={cn(
                        "absolute right-3 top-1/2 transform -translate-y-1/2",
                        "text-muted-foreground hover:text-foreground",
                        "focus-visible:ring-2 focus-visible:ring-primary rounded-sm p-1"
                      )}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={0}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-announcement" : undefined}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                
                {isLoading && (
                  <div id="loading-announcement" className="sr-only" aria-live="polite">
                    Signing you in, please wait
                  </div>
                )}
              </form>

              {/* Demo Credentials */}
              <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                <h3 className="font-medium mb-2 text-foreground">Demo Accounts</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">Admin:</strong> admin@demo.com / Admin123!
                  </div>
                  <div>
                    <strong className="text-foreground">User:</strong> user@demo.com / User123!
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Use these credentials to explore the app with sample data
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:underline font-medium focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
